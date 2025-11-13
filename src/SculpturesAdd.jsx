import { useState } from "react";

export default function SculpturesAdd() {
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

  function handleSubmit(e) {
    e.preventDefault();
    // Here we would normally handle adding the sculpture
    console.log("New Sculpture:", sculpture);
  }

  return (
    <>
      <h2>Add New Sculpture</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={sculpture.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Artist:
          <input
            name="artist"
            value={sculpture.artist}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Year:
          <input
            name="year"
            type="number"
            value={sculpture.year}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input name="url" value={sculpture.url} onChange={handleChange} />
        </label>
        <label>
          Alt Text:
          <input name="alt" value={sculpture.alt} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={sculpture.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Sculpture</button>
      </form>
      {sculpture.name} {sculpture.artist} {sculpture.year} {sculpture.url}{" "}
      {sculpture.alt} {sculpture.description}{" "}
    </>
  );
}
