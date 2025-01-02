import PaginationProps from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  hasMore
}) => {
  return (
    <div className="join mr-14 w-3/12">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`btn join-item ${currentPage === 0 ? 'bg-wrigth cursor-not-allowed' : ''}`}
      >
        «
      </button>
      <span className="join-item inline-flex h-12 w-80 items-center justify-center font-semibold">
        Page : {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasMore}
        className={`btn join-item ${!hasMore ? 'bg-light-gray cursor-not-allowed' : ''}`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
