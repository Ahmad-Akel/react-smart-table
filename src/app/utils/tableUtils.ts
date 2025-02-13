export const sortData = (
  data: any[],
  key: string,
  direction: "asc" | "desc",
) => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const paginateData = (
  data: any[],
  currentPage: number,
  rowsPerPage: number,
) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  return data.slice(startIndex, startIndex + rowsPerPage);
};
