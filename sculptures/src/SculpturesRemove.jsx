import { useState } from "react";
import { sculptureList } from "./data.js";

export default function SculpturesRemove() {
  const [sculptures, setSculptures] = useState(sculptureList);

  function handleRemove(idToRemove) {
    setSculptures(sculptures.filter((scul, index) => index !== idToRemove));
  }

  return (
    <>
      <h2>Remove Sculpture</h2>
      <table>
        {sculptures.map((scul, index) => (
          <tr>
            <td key={index}>
              {scul.name} by {scul.artist} ({scul.year}){" "}
            </td>
            <td></td>
            <td>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
