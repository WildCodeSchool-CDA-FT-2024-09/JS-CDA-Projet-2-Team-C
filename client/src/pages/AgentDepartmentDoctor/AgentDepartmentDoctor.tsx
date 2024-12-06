import { useLocation } from 'react-router-dom';
import { useGetDoctorByDepartmentQuery } from '../../generated/graphql-types';

function AgentDepartmentDoctor() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const label = searchParams.get('label');

  const { loading, error, data } = useGetDoctorByDepartmentQuery({
    variables: { label: label || '' }
  });
  if (!label) {
    return <p>Error: No department label found in the URL</p>;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Doctors in Department: {label}</h2>
      <ul className="flex flex-col items-center justify-center gap-4">
        {data?.getDoctorByDepartment[0].users.map((doctor) => (
          <li
            key={doctor.id}
            className="flex h-[60px] w-full max-w-[calc(100%-40px)] cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
          >
            DR. {doctor.firstname} {doctor.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentDepartmentDoctor;
