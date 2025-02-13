import type React from "react";
import { MoreVerticalIcon } from "lucide-react";
import Popup from "./Popup";

interface TableBodyProps {
  data: any[];
  headers: string[];
  hiddenColumns: string[];
  isEditable: boolean;
  onCellEdit: (rowIndex: number, header: string, value: any) => void;
  onRowAction: (action: string, rowIndex: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  headers,
  hiddenColumns,
  isEditable,
  onCellEdit,
  onRowAction,
}) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {headers.map((header) => {
            if (hiddenColumns.includes(header)) return null;
            return (
              <td
                key={header}
                className="px-4 py-2 border-b bg-white text-black"
              >
                {isEditable ? (
                  <input
                    type="text"
                    value={row[header] || ""}
                    onChange={(e) =>
                      onCellEdit(rowIndex, header, e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  row[header] || ""
                )}
              </td>
            );
          })}
          {isEditable && (
            <td className="px-4 py-2 border-b">
              <Popup
                trigger={
                  <MoreVerticalIcon className="w-4 h-4 cursor-pointer" />
                }
                content={
                  <div>
                    <button onClick={() => onRowAction("delete", rowIndex)}>
                      Delete row
                    </button>
                    <button onClick={() => onRowAction("addAbove", rowIndex)}>
                      Add row above
                    </button>
                    <button onClick={() => onRowAction("addBelow", rowIndex)}>
                      Add row below
                    </button>
                  </div>
                }
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
