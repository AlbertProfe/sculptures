import { useState } from "react";
import { sculptureList } from "./data.js";

export default function SculpturesAdd() {
  const [sculpture, setSculpture] = useState({
    name: "",
    artist: "",
    year: "",
    url: "",
    alt: "",
    description: "",
  });
  const [sculptures, setSculptures] = useState(sculptureList);

  function handleChange(e) {
    setSculpture({
      ...sculpture,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here we would normally handle adding the sculpture
    console.log("New Sculpture:", sculpture);
    setSculptures([...sculptures, sculpture]);
  }

  return (
    <>
      <h2>Add New Sculpture</h2>
      <h4>Create new sculpture:</h4>
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
        <button type="submit">Add Sculpture</button>
      </form>
      {sculpture.name} {sculpture.artist} {sculpture.year} {sculpture.url}{" "}
      {sculpture.alt} {sculpture.description}
      <h4>Sculptures list:</h4>
      <ul>
        {sculptures.map((scul, index) => (
          <li key={index}>
            {"#"}
            {index + 1} {scul.name} by {scul.artist}, {scul.year}{" "}
          </li>
        ))}
      </ul>
    </>
  );
}
