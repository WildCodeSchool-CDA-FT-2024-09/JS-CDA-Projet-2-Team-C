import { useLocation } from 'react-router-dom';

function AgentDepartmentDoctor() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const label = searchParams.get('label');

  return (
    <div>
      <p>Label : {label}</p>
    </div>
  );
}
export default AgentDepartmentDoctor;
