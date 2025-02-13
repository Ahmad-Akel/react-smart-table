"use client";

import type React from "react";
import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import { sortData, paginateData } from "../utils/tableUtils";

interface TableProps {
  data: any[];
  isEditable: boolean;
  onDataChange: (newData: any[]) => void;
}

const Table: React.FC<TableProps> = ({ data, isEditable, onDataChange }) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (data.length > 0) {
      const initialHeaders = Object.keys(data[0]);
      setHeaders(initialHeaders);
      setTableData(
        data.map((row) => {
          return initialHeaders.reduce((acc, header) => {
            acc[header] = row[header];
            return acc;
          }, {} as any);
        }),
      );
    }
  }, [data]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setTableData(sortData(tableData, key, direction));
  };

  const handleColumnVisibility = (header: string) => {
    setHiddenColumns((prev) =>
      prev.includes(header)
        ? prev.filter((h) => h !== header)
        : [...prev, header],
    );
  };

  const handleCellEdit = (rowIndex: number, header: string, value: any) => {
    const newData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [header]: value };
      }
      return row;
    });
    setTableData(newData);
    onDataChange(newData);
  };

  const handleColumnAction = (action: string, columnIndex: number) => {
    const newHeaders = [...headers];
    let newData = [...tableData];

    switch (action) {
      case "delete":
        const deletedHeader = newHeaders[columnIndex];
        newHeaders.splice(columnIndex, 1);
        newData = newData.map((row) => {
          const { [deletedHeader]: _, ...rest } = row;
          return rest;
        });
        break;
      case "addRight":
      case "addLeft":
        const newColumnName = `New Column ${newHeaders.length + 1}`;
        const insertIndex =
          action === "addRight" ? columnIndex + 1 : columnIndex;
        newHeaders.splice(insertIndex, 0, newColumnName);
        newData = newData.map((row) => {
          const newRow: any = {};
          newHeaders.forEach((header) => {
            newRow[header] = header === newColumnName ? "" : row[header];
          });
          return newRow;
        });
        break;
    }

    setHeaders(newHeaders);
    setTableData(newData);
    onDataChange(newData);
  };

  const handleRowAction = (action: string, rowIndex: number) => {
    const newData = [...tableData];

    switch (action) {
      case "delete":
        newData.splice(rowIndex, 1);
        break;
      case "addAbove":
      case "addBelow":
        const newRow = headers.reduce(
          (acc, header) => ({ ...acc, [header]: "" }),
          {},
        );
        const insertIndex = action === "addBelow" ? rowIndex + 1 : rowIndex;
        newData.splice(insertIndex, 0, newRow);
        break;
    }

    setTableData(newData);
    onDataChange(newData);
  };

  const handleHeaderEdit = (oldHeader: string, newHeader: string) => {
    const headerIndex = headers.indexOf(oldHeader);
    if (headerIndex !== -1) {
      const newHeaders = headers.map((h) => (h === oldHeader ? newHeader : h));
      setHeaders(newHeaders);

      const newData = tableData.map((row) => {
        const newRow: any = {};
        newHeaders.forEach((header) => {
          newRow[header] = header === newHeader ? row[oldHeader] : row[header];
        });
        return newRow;
      });

      setTableData(newData);
      onDataChange(newData);
    }
  };

  const paginatedData = paginateData(tableData, currentPage, rowsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-black">
        <TableHeader
          headers={headers}
          hiddenColumns={hiddenColumns}
          isEditable={isEditable}
          onSort={handleSort}
          onColumnVisibility={handleColumnVisibility}
          onColumnAction={handleColumnAction}
          onHeaderEdit={handleHeaderEdit}
        />
        <TableBody
          data={paginatedData}
          headers={headers}
          hiddenColumns={hiddenColumns}
          isEditable={isEditable}
          onCellEdit={handleCellEdit}
          onRowAction={handleRowAction}
        />
        <TableFooter
          totalRows={tableData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      </table>
    </div>
  );
};

export default Table;
