import { useEffect, useState } from 'react';
import { useGetPatientsByNameLazyQuery } from '../../../generated/graphql-types';
import AgentSearchBar from '../AgentSearchBar.tsx/AgentSearchBar';
import AgentPatientSearchBarProps from './AgentPatientSearchBar.type';

export default function AgentPatientSearchBar({
  handlePatientSelected
}: AgentPatientSearchBarProps) {
  const [search, setSearch] = useState<string>('');
  const [getPatientsByName, { data }] = useGetPatientsByNameLazyQuery();

  const formatSSN = (value: string): string => {
    const cleanedValue = value.replace(/\s+/g, '');
    let formattedValue = '';

    for (let i = 0; i < cleanedValue.length; i++) {
      formattedValue += cleanedValue[i];
      if ([0, 2, 4, 6, 9, 12].includes(i)) {
        formattedValue += ' ';
      }
    }

    return formattedValue.trim();
  };

  const handleChange = (value: string): void => {
    const sanitisedValue = formatSSN(value.replace(/\D/g, ''));
    setSearch(sanitisedValue);
  };

  useEffect(() => {
    const sanitisedSearch = search.replace(/\s+/g, '');
    if (sanitisedSearch.length === 15) {
      getPatientsByName({ variables: { search: sanitisedSearch } });
    }
  }, [search, getPatientsByName]);

  return (
    <div className="dropdown dropdown-end sm:w-auto md:w-[35rem]">
      <AgentSearchBar handleChange={handleChange} search={search} />

      {data && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
        >
          {data.patients.length ? (
            data.patients.map((patient) => (
              <li key={`patient-${patient.id}`}>
                <button onClick={() => handlePatientSelected(patient.id)}>
                  <strong>Acceder au rendez-vous</strong>
                </button>
              </li>
            ))
          ) : (
            <li>Pas de rendez-vous</li>
          )}
        </ul>
      )}
    </div>
  );
}
