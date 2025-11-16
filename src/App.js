import SculpturesPage from "./SculpturesPage";
import SculptureAdd from "./SculpturesAdd";
import SculptureRemove from "./SculpturesRemove";
import SculpturesFilteredByYear from "./SculpturesFilteredByYear";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("sculpture-page");

  const dispatcherPage = () => {
    switch (currentPage) {
      case "sculpture-page":
        return <SculpturesPage />;
      case "sculpture-add":
        return <SculptureAdd />;
      case "sculpture-remove":
        return <SculptureRemove />;
      case "sculptures-filtered-by-year":
        return <SculpturesFilteredByYear />;

      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <>
      <h1>Sculptures Site </h1>

      <div>
        <button onClick={() => setCurrentPage("sculpture-page")}>Home</button>
        <button onClick={() => setCurrentPage("sculpture-add")}>Add</button>
        <button onClick={() => setCurrentPage("sculpture-remove")}>
          Remove
        </button>
        <button onClick={() => setCurrentPage("sculptures-filtered-by-year")}>
          Filter by year
        </button>
      </div>

      {dispatcherPage()}
    </>
  );
}
