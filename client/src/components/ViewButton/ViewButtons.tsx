interface ViewButtonsProps {
  handleViewChange: (view: string) => void;
  buttonLabels: string[];
}

const ViewButtons: React.FC<ViewButtonsProps> = ({
  handleViewChange,
  buttonLabels
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {buttonLabels.map((label) => (
        <button
          key={label}
          className="flex h-[153px] w-full items-center justify-center rounded-[32px] bg-[rgba(24,121,205,0.6)] text-[40px] font-bold transition-opacity duration-300 hover:opacity-100"
          onClick={() => handleViewChange(label.toLowerCase())}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ViewButtons;
