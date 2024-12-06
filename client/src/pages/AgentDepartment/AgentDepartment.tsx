import { useNavigate } from 'react-router-dom';
import { useDepartmentsQuery } from '../../generated/graphql-types';
import { PartialDepartment } from '../AgentDepartment/AgentDepartment.type';

function AgentDepartment() {
  const { loading, error, data } = useDepartmentsQuery();
  const navigate = useNavigate();

  if (loading) return <h1>Chargement ...</h1>;
  if (error) return <p>Erreur</p>;
  if (!data) {
    return <p>Pas de data valide</p>;
  }

  const handleNavigation = (label: string) => {
    navigate(`/rechercher/service/docteur?label=${encodeURIComponent(label)}`);
  };

  return (
    <section>
      <h1 className="my-2 text-center text-[32px] font-bold">Service</h1>
      <ul className="flex flex-col items-center justify-center gap-4">
        {data.departments?.map((department: PartialDepartment) => (
          <li
            key={department.id}
            className="flex h-[60px] w-full max-w-[calc(100%-40px)] cursor-pointer items-center justify-center rounded-[10px] bg-[rgba(24,121,205,0.6)] text-[24px] font-bold transition-opacity duration-300 hover:opacity-100"
            onClick={() => handleNavigation(department.label)}
          >
            {department.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AgentDepartment;
