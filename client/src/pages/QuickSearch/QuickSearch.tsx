import { Link } from 'react-router-dom';

function QuickSearch() {
  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <img src="/images/logo-main-black.png" alt="Logo du site" />
      <Link
        to="/service"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Service
      </Link>
      <Link
        to="/doctor"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Docteur
      </Link>
      <Link
        to="/patient"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Patient
      </Link>
    </div>
  );
}

export default QuickSearch;
