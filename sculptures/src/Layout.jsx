import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h1>Sculptures Site </h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add</Link>
        <Link to="/remove">Remove</Link>
        <Link to="/filter-by-year">Filter by year</Link>
      </nav>

      <Outlet />
    </>
  );
}
