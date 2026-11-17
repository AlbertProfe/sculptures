import { useState } from "react";
import { sculptureList } from "./data.js";

export default function SculpturesFilteredByYear() {
  const [year, setYear] = useState("");
  const [sculptures, setSculptures] = useState(sculptureList);

  function handleYearChange(e) {
    setYear(e.target.value);
    // Filter sculptures by entered year
    const filtered = sculptureList.filter(
      (scul) => scul.year && scul.year.toString() === e.target.value
    );
    setSculptures(filtered);
  }

  return (
    <>
      <h2>Filter Sculptures By Year</h2>
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter year"
        />
      </label>
      <h4>Filtered Sculptures list:</h4>
      <ul>
        {sculptures.length === 0 ? (
          <li>No sculptures found for this year.</li>
        ) : (
          sculptures.map((scul, index) => (
            <li key={index}>
              {"#"}
              {index + 1} {scul.name} by {scul.artist}, {scul.year}{" "}
            </li>
          ))
        )}
      </ul>
    </>
  );
}
