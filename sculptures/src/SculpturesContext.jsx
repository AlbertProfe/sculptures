import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { neon } from "./Neon";

const TABLE = "sculptures";

const SculpturesContext = createContext(null);

function toMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

// Neon returns { data, error } instead of throwing.
// Unwrapping it here lets every caller use plain try/catch.
function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

export function SculpturesProvider({ children }) {
  const [sculptures, setSculptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initial load
  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = unwrap(await neon.from(TABLE).select("*"));
        if (active) setSculptures(data ?? []);
      } catch (e) {
        if (active) {
          setSculptures([]);
          setError(toMessage(e));
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  // Shared wrapper for writes: clears the previous error, runs the action,
  // and reports success as a boolean.
  const runMutation = useCallback(async (action) => {
    setError("");
    try {
      await action();
      return true;
    } catch (e) {
      setError(toMessage(e));
      return false;
    }
  }, []);

  const addSculpture = useCallback(
    (sculpture) =>
      runMutation(async () => {
        const created = unwrap(
          await neon.from(TABLE).insert(sculpture).select("*").single(),
        );
        if (!created) {
          throw new Error("Neon did not return the inserted sculpture.");
        }
        setSculptures((current) => [...current, created]);
      }),
    [runMutation],
  );

  const removeSculpture = useCallback(
    (id) =>
      runMutation(async () => {
        if (id == null) {
          throw new Error("Cannot remove a sculpture without a database id.");
        }
        unwrap(await neon.from(TABLE).delete().eq("id", id));
        setSculptures((current) => current.filter((s) => s.id !== id));
      }),
    [runMutation],
  );

  // Memoized so consumers only re-render when something actually changes.
  const value = useMemo(
    () => ({ sculptures, loading, error, addSculpture, removeSculpture }),
    [sculptures, loading, error, addSculpture, removeSculpture],
  );

  return (
    <SculpturesContext.Provider value={value}>
      {children}
    </SculpturesContext.Provider>
  );
}

// The provider and its hook intentionally live in the same module.
// eslint-disable-next-line react-refresh/only-export-components
export function useSculptures() {
  const context = useContext(SculpturesContext);
  if (!context) {
    throw new Error("useSculptures must be used within SculpturesProvider.");
  }
  return context;
}
