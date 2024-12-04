function AgentHome() {
  return (
    <div className="mt-8 flex flex-col items-center gap-8">
      <img src="/images/logo-main-black.png" alt="Logo du site" />
      <a
        href="/service"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Service
      </a>
      <a
        href="/service"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Docteur
      </a>
      <a
        href="/service"
        className="flex h-[153px] w-full max-w-[calc(100%-40px)] items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
      >
        Patient
      </a>
    </div>
  );
}

export default AgentHome;
