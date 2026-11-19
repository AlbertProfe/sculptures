import SculpturesPage from "./SculpturesPage";
import SculptureAdd from "./SculpturesAdd";
import SculptureRemove from "./SculpturesRemove";
import SculpturesFilteredByYear from "./SculpturesFilteredByYear";
import Layout from "./Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SculpturesPage />} />
          <Route path="add" element={<SculptureAdd />} />
          <Route path="remove" element={<SculptureRemove />} />
          <Route path="filter-by-year" element={<SculpturesFilteredByYear />} />
          <Route path="*" element={<div>Select a page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
