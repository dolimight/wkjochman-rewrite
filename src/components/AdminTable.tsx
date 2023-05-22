import { FC } from "react";
import { Person } from "../hooks/useRSVP";
import { Column } from "./AdminTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

type Item = Person & {
  code?: string;
};

type AdminTableProps = {
  items: Item[];
  columns: Column[];
};

const AdminTable: FC<AdminTableProps> = ({ items, columns }) => {
  return (
    <table className="table-zebra table w-full">
      <thead className="sticky top-0 shadow-md">
        <tr>
          <th>Row</th>
          {columns.map((c) => (
            <th key={`h-${c.name}`}>{c.name}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!!items.length ? (
          items.map((i, idx) => (
            <tr key={`row-${i.name}-${idx}`} className="hover">
              <td>{idx + 1}</td>
              {columns.map((c) => {
                const value = new Map(Object.entries(i)).get(c.key);
                return (
                  <td key={`col-${i.name}-${idx}-${c.name}`}>
                    {c.transform ? c.transform(value) : value}
                  </td>
                );
              })}
              <td key={`col-${i.name}-${idx}-action`}>
                <button
                  className="btn-primary btn-sm btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/rsvp?code=${i.code}`);
                  }}
                >
                  Open
                  <FontAwesomeIcon icon={faExternalLink} className="ml-2" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 2} className="text-center">
              No results
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminTable;

export type { Item };
