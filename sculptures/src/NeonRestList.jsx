import { useEffect, useState } from "react";
import { neon } from "./Neon";

export default function NeonRestList({ table = "sculptures" }) {
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        neon.from(table).select("*").limit(20).then(({ data, error }) => {
            if (error) setError(error.message);
            else setRows(data);
        });
    }, [table]);

    if (error) return <p>Error: {error}</p>;
    return <pre>{JSON.stringify(rows, null, 2)}</pre>;
}