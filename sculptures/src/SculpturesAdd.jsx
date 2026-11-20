import { useState } from "react";
import { useSculptures } from "./SculpturesContext";

export default function SculpturesAdd() {
  const { sculptures, addSculpture, loading, error } = useSculptures();
  const [sculpture, setSculpture] = useState({
    name: "",
    artist: "",
    year: "",
    url: "",
    alt: "",
    description: "",
  });

  function handleChange(e) {
    setSculpture({
      ...sculpture,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const added = await addSculpture({
      ...sculpture,
      year: sculpture.year ? Number(sculpture.year) : null,
    });

    if (added) {
      setSculpture({
        name: "",
        artist: "",
        year: "",
        url: "",
        alt: "",
        description: "",
      });
    }
  }

  return (
    <>
      <h2>Add New Sculpture</h2>
      <h4>Create new sculpture:</h4>
      {loading && <p role="status">Loading sculptures...</p>}
      {error && <p role="alert">Sculpture request failed: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={sculpture.name}
            onChange={handleChange}
            required
          />
        </label>{" "}
        <br />
        <label>
          Artist:
          <input
            name="artist"
            value={sculpture.artist}
            onChange={handleChange}
            required
          />
        </label>{" "}
        <br />
        <label>
          Year:
          <input
            name="year"
            type="number"
            value={sculpture.year}
            onChange={handleChange}
          />
        </label>{" "}
        <br />
        <label>
          Image URL:
          <input name="url" value={sculpture.url} onChange={handleChange} />
        </label>{" "}
        <br />
        <label>
          Alt Text:
          <input name="alt" value={sculpture.alt} onChange={handleChange} />
        </label>{" "}
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={sculpture.description}
            onChange={handleChange}
          />
        </label>{" "}
        <br />
        <button type="submit" disabled={loading}>
          Add Sculpture
        </button>
      </form>
      <h4>Sculptures list:</h4>
      <ul>
        {sculptures.map((scul, index) => (
          <li key={scul.id ?? index}>
            {"#"}
            {index + 1} {scul.name} by {scul.artist}, {scul.year}{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
