type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  hasMore: boolean;
};

export default PaginationProps;
