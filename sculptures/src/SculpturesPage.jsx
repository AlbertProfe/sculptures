import { useState } from "react";
import { useSculptures } from "./SculpturesContext";

export default function SculpturesPage() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const { sculptures, loading, error } = useSculptures();

  function handleClick() {
    setIndex((current) => Math.min(current + 1, sculptures.length - 1));
  }

  function handlePrevious() {
    setIndex((current) => Math.max(current - 1, 0));
  }

  function handleLike() {
    setLikes((current) => ({ ...current, [index]: !current[index] }));
  }

  const isLiked = likes[index] === true;
  const isFirst = index === 0;
  const isLast = index >= sculptures.length - 1;
  const sculpture = sculptures[index];

  return (
    <>
      <h2>Sculptures Gallery</h2>
      {loading && <p role="status">Loading sculptures...</p>}
      {error && <p role="alert">Could not load sculptures: {error}</p>}
      {sculpture ? (
        <>
          <button onClick={handlePrevious} disabled={isFirst}>
            Previous
          </button>{" "}
          <button onClick={handleClick} disabled={isLast}>
            Next
          </button>
          <p>
            ({index + 1} of {sculptures.length})
          </p>
          <div>
            {sculptures.map((item, itemIndex) => (
              <button
                key={item.id ?? itemIndex}
                onClick={() => setIndex(itemIndex)}
                aria-current={itemIndex === index}
                title={item.name}
              >
                <img src={item.url} alt={item.alt} />
              </button>
            ))}
          </div>
          <h2>
            <i>{sculpture.name} </i>
            by {sculpture.artist}
          </h2>
          <p>{sculpture.year}</p>
          <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
          <p>{isLiked ? <strong>You like this sculpture</strong> : "Not liked yet"}</p>
          <img src={sculpture.url} alt={sculpture.alt} />
          <p>{sculpture.description}</p>
        </>
      ) : (
        !loading && <p>No sculptures found.</p>
      )}
    </>
  );
}
