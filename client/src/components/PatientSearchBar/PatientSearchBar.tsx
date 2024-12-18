import { useEffect, useState } from 'react';
import { useGetPatientsByNameLazyQuery } from '../../generated/graphql-types';
import SearchBar from '../SearchBar/SearchBar';
import PatientSearchBarProps from './PatientSearchBar.type';
import { useDebounce } from '../../utils/useDebounce';
import { genderMap } from '../../utils/genderMap.utils';
import { frenchDate } from '../../utils/dates.utils';

export default function PatientSearchBar({
  handlePatientSelected,
  restriction = false
}: PatientSearchBarProps) {
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce<string>(search, 500);

  const [getPatientsByname, { data }] = useGetPatientsByNameLazyQuery();

  const handleChange = (value: string): void => {
    setSearch(value);
    if (!restriction) {
      // If restriction is false, we update debouncedSearch immediately
    }
  };

  const handleSearch = (): void => {
    if (restriction) {
      const sanitisedSearch = search.trim();
      if (sanitisedSearch) {
        getPatientsByname({ variables: { search: sanitisedSearch } });
      }
    }
  };

  useEffect(() => {
    if (!restriction) {
      const sanitisedSearch = debouncedSearch.trim();
      if (sanitisedSearch) {
        getPatientsByname({ variables: { search: sanitisedSearch } });
      }
    }
  }, [debouncedSearch, restriction, getPatientsByname]);

  return (
    <>
      <div className="dropdown dropdown-end w-[35rem]">
        <SearchBar
          handleChange={handleChange}
          inputType={restriction ? 'number' : 'text'}
        />

        {restriction && (
          <button onClick={handleSearch} className="btn btn-primary mt-2">
            Rechercher
          </button>
        )}

        {data && (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
          >
            {data.patients.length ? (
              data.patients.map((patient) => (
                <li key={`patient-${patient.id}`}>
                  <button onClick={() => handlePatientSelected(patient.id)}>
                    <strong>
                      {patient.firstname} {patient.lastname}
                    </strong>
                    {` - ${genderMap[patient.gender.label]} - ${frenchDate(patient.dateOfBirth, true)} - ${patient.ssn}`}
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
