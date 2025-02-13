import type React from "react";

interface TableFooterProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TableFooter: React.FC<TableFooterProps> = ({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <tfoot>
      <tr>
        <td colSpan={1000} className="px-4 py-2 border-t bg-white text-black">
          <div className="flex items-center justify-between">
            <div>
              <select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                className="p-1 border rounded"
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 mr-2 border rounded"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 ml-2 border rounded"
              >
                Next
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
