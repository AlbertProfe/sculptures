import { useState } from "react";
import { useSculptures } from "./SculpturesContext";

export default function SculpturesFilteredByYear() {
  const [year, setYear] = useState("");
  const { sculptures, loading, error } = useSculptures();

  const filteredSculptures = year
    ? sculptures.filter((scul) => String(scul.year) === year)
    : sculptures;

  return (
    <>
      <h2>Filter Sculptures By Year</h2>
      {loading && <p role="status">Loading sculptures...</p>}
      {error && <p role="alert">Sculpture request failed: {error}</p>}
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Enter year"
        />
      </label>
      <h4>Filtered Sculptures list:</h4>
      <ul>
        {filteredSculptures.length === 0 ? (
          <li>No sculptures found for this year.</li>
        ) : (
          filteredSculptures.map((scul, index) => (
            <li key={scul.id ?? index}>
              {"#"}
              {index + 1} {scul.name} by {scul.artist}, {scul.year}{" "}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
