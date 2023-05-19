import { FC } from "react";
import { Person } from "../hooks/useRSVP";
import { Column } from "./AdminTab";

type AdminTableProps = { items: Person[]; columns: Column[] };

const AdminTable: FC<AdminTableProps> = ({ items, columns }) => {
  return (
    <table className="table-zebra table w-full">
      <thead className="sticky top-0 shadow-md">
        <tr>
          <th>Row</th>
          {columns.map((c) => (
            <th key={`h-${c.name}`}>{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!!items.length ? (
          items.map((i, idx) => (
            <tr key={`row-${i.name}-${idx}`}>
              <td>{idx + 1}</td>
              {columns.map((c) => {
                const value = new Map(Object.entries(i)).get(c.key);
                return (
                  <td key={`col-${i.name}-${idx}-${c.name}`}>
                    {c.transform ? c.transform(value) : value}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} className="text-center">
              No results
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminTable;
