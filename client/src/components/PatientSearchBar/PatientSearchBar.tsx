import { useEffect, useState } from 'react';
import { useGetPatientsByNameLazyQuery } from '../../generated/graphql-types';
import SearchBar from '../SearchBar/SearchBar';
import PatientSearchBarProps from './PatientSearchBar.type';

export default function PatientSearchBar({
  handlePatientSelected
}: PatientSearchBarProps) {
  const [search, setSearch] = useState<string>('');
  const [getPatientsByname, { data }] = useGetPatientsByNameLazyQuery();

  const handleChange = (value: string): void => {
    setSearch(value);
  };

  useEffect(() => {
    const sanitisedSearch = search.trim();
    if (sanitisedSearch) {
      getPatientsByname({ variables: { search: sanitisedSearch } });
    }
  }, [search]);

  // see https://daisyui.com/components/dropdown/
  return (
    <>
      <div className="dropdown dropdown-end">
        <SearchBar handleChange={handleChange} />
        {data && (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
          >
            {data.patients.length ? (
              data.patients.map((patient) => (
                <li key={`patient-${patient.id}`}>
                  <button onClick={() => handlePatientSelected(patient.id)}>
                    {patient.firstname} {patient.lastname}
                  </button>
                </li>
              ))
            ) : (
              <li>pas de résultat</li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
