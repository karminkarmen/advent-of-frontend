export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  const startPageIdx = (pageNumber-1) * itemsPerPage;
  const endPageIdx = startPageIdx + itemsPerPage;

  const currentPageItems = endPageIdx > totalItems 
    ? items.slice(startPageIdx, totalItems) 
    : items.slice(startPageIdx, endPageIdx);

  return {
    currentPageItems,
    totalItems,
    totalPages
  }
}
