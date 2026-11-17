import { useState } from "react";
import { sculptureList } from "./data.js";

export default function SculpturesPage() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <h2>Sculpures Gallery</h2>
      <button onClick={handleClick}>Next</button>({index + 1} of{" "}
      {sculptureList.length})
      <h2>
        <i>{sculptureList[index].name} </i>
        by {sculptureList[index].artist}
      </h2>
      <p>{sculptureList[index].year}</p>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
