import type React from "react";
import { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
  Edit2Icon,
} from "lucide-react";
import Popup from "./Popup";

interface TableHeaderProps {
  headers: string[];
  hiddenColumns: string[];
  isEditable: boolean;
  onSort: (key: string) => void;
  onColumnVisibility: (header: string) => void;
  onColumnAction: (action: string, columnIndex: number) => void;
  onHeaderEdit: (oldHeader: string, newHeader: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  hiddenColumns,
  isEditable,
  onSort,
  onColumnVisibility,
  onColumnAction,
  onHeaderEdit,
}) => {
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [editedHeaderText, setEditedHeaderText] = useState("");

  const handleHeaderEditStart = (header: string) => {
    setEditingHeader(header);
    setEditedHeaderText(header);
  };

  const handleHeaderEditSave = (oldHeader: string) => {
    if (editedHeaderText && editedHeaderText !== oldHeader) {
      onHeaderEdit(oldHeader, editedHeaderText);
    }
    setEditingHeader(null);
  };

  return (
    <thead>
      <tr>
        {headers.map((header, index) => {
          if (hiddenColumns.includes(header)) return null;
          return (
            <th
              key={header}
              className="px-4 py-2 border-b text-left bg-white text-black"
            >
              <div className="flex items-center justify-between">
                {editingHeader === header ? (
                  <input
                    type="text"
                    value={editedHeaderText}
                    onChange={(e) => setEditedHeaderText(e.target.value)}
                    onBlur={() => handleHeaderEditSave(header)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleHeaderEditSave(header);
                      }
                    }}
                    className="w-full p-1 border rounded"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => onSort(header)}
                    className="cursor-pointer"
                  >
                    {header}
                    <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
                    <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
                  </span>
                )}
                {isEditable ? (
                  <div className="flex items-center">
                    <Edit2Icon
                      className="w-4 h-4 cursor-pointer mr-2"
                      onClick={() => handleHeaderEditStart(header)}
                    />
                    <Popup
                      trigger={
                        <MoreVerticalIcon className="w-4 h-4 cursor-pointer" />
                      }
                      content={
                        <div>
                          <button
                            onClick={() => onColumnAction("delete", index)}
                          >
                            Delete column
                          </button>
                          <button
                            onClick={() => onColumnAction("addRight", index)}
                          >
                            Add column right
                          </button>
                          <button
                            onClick={() => onColumnAction("addLeft", index)}
                          >
                            Add column left
                          </button>
                        </div>
                      }
                    />
                  </div>
                ) : (
                  <Popup
                    trigger={
                      <MoreVerticalIcon className="w-4 h-4 cursor-pointer" />
                    }
                    content={
                      <div>
                        {headers.map((h) => (
                          <button key={h} onClick={() => onColumnVisibility(h)}>
                            {hiddenColumns.includes(h) ? "Show" : "Hide"} {h}
                          </button>
                        ))}
                      </div>
                    }
                  />
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
