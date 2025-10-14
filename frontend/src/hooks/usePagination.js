import { useState } from "react";
const usePagination = (init = 1, per = 20) => {
  const [page, setPage] = useState(init);
  return { page, perPage: per, next: () => setPage((p) => p+1), prev: () => setPage((p) => Math.max(1,p-1)), reset: () => setPage(1) };
};
export default usePagination;