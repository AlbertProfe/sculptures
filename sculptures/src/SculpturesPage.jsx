import { useState } from "react";
import { sculptureList } from "./data.js";

export default function SculpturesPage() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});

  function handleClick() {
    setIndex(index + 1);
  }

  function handlePrevious() {
    setIndex(index - 1);
  }

  function handleLike() {
    setLikes({ ...likes, [index]: !likes[index] });
  }

  const isLiked = likes[index] === true;
  const isFirst = index === 0;
  const isLast = index === sculptureList.length - 1;

  let sculpture = sculptureList[index];
  return (
    <>
      <h2>Sculpures Gallery</h2>
      <button onClick={handlePrevious} disabled={isFirst}>
        Previous
      </button>{" "}
      <button onClick={handleClick} disabled={isLast}>
        Next
      </button>
      <p>
        ({index + 1} of {sculptureList.length})
      </p>
      <h2>
        <i>{sculptureList[index].name} </i>
        by {sculptureList[index].artist}
      </h2>
      <p>{sculptureList[index].year}</p>
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <p>{isLiked ? <strong>You like this sculpture</strong> : "Not liked yet"}</p>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
