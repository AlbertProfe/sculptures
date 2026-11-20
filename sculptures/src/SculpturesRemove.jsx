import { useSculptures } from "./SculpturesContext";

export default function SculpturesRemove() {
  const { sculptures, removeSculpture, loading, error } = useSculptures();

  return (
    <>
      <h2>Remove Sculpture</h2>
      {loading && <p role="status">Loading sculptures...</p>}
      {error && <p role="alert">Sculpture request failed: {error}</p>}
      <table>
        <tbody>
          {sculptures.map((scul, index) => (
            <tr key={scul.id ?? index}>
              <td>
                {scul.name} by {scul.artist} ({scul.year}){" "}
              </td>
              <td>
                <button
                  onClick={() => removeSculpture(scul.id)}
                  disabled={loading || scul.id == null}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
