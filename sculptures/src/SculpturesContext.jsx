import { createContext, useContext, useEffect, useState } from "react";
import { neon } from "./Neon";

const TABLE = "sculptures";

// Neon returns { data, error } instead of throwing, so unwrap it here.
function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}

// API service: only talks to Neon, no React state.
const SculptureApiService = {
  getAll: async () => unwrap(await neon.from(TABLE).select("*")) ?? [],

  create: async (sculpture) => {
    const created = unwrap(
      await neon.from(TABLE).insert(sculpture).select("*").single(),
    );
    if (!created)
      throw new Error("Neon did not return the inserted sculpture.");
    return created;
  },

  remove: async (id) => {
    if (id == null) throw new Error("Cannot remove a sculpture without an id.");
    unwrap(await neon.from(TABLE).delete().eq("id", id));
  },
};

const SculpturesContext = createContext(null);

export function SculpturesProvider({ children }) {
  const [sculptures, setSculptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    SculptureApiService.getAll()
      .then((data) => active && setSculptures(data))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  // Runs a write, resets the error and returns true/false for success.
  async function run(action) {
    setError("");
    try {
      await action();
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  const addSculpture = (sculpture) =>
    run(async () => {
      const created = await SculptureApiService.create(sculpture);
      setSculptures((current) => [...current, created]);
    });

  const removeSculpture = (id) =>
    run(async () => {
      await SculptureApiService.remove(id);
      setSculptures((current) => current.filter((s) => s.id !== id));
    });

  return (
    <SculpturesContext.Provider
      value={{ sculptures, loading, error, addSculpture, removeSculpture }}
    >
      {children}
    </SculpturesContext.Provider>
  );
}

// Provider and hook share this file on purpose.
// eslint-disable-next-line react-refresh/only-export-components
export function useSculptures() {
  const context = useContext(SculpturesContext);
  if (!context) {
    throw new Error("useSculptures must be used within SculpturesProvider.");
  }
  return context;
}
