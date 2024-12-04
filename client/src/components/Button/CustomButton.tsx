import { useNavigate } from 'react-router-dom';

interface CustomButtonProps {
  label: string;
  path: string;
  className?: string;
}

const CustomButton = ({ label, path, className }: CustomButtonProps) => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(path)} className={className}>
        {label}
      </button>
    </>
  );
};

export default CustomButton;
