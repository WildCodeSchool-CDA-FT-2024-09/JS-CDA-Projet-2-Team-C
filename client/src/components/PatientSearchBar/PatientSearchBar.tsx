import { useEffect, useState, useCallback } from 'react';
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
  };

  const handleSearch = useCallback((): void => {
    const sanitisedSearch = search.trim();
    if (restriction && sanitisedSearch.length === 15) {
      getPatientsByname({ variables: { search: sanitisedSearch } });
    } else if (!restriction && debouncedSearch.trim()) {
      getPatientsByname({ variables: { search: debouncedSearch.trim() } });
    }
  }, [search, debouncedSearch, restriction, getPatientsByname]);

  useEffect(() => {
    handleSearch();
  }, [search, debouncedSearch, restriction, handleSearch]);

  return (
    <div className="dropdown dropdown-end sm:w-auto md:w-[35rem]">
      <SearchBar
        handleChange={handleChange}
        inputType={restriction ? 'number' : 'text'}
      />

      {data && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
        >
          {data.patients.length ? (
            data.patients.map((patient) => (
              <li key={`patient-${patient.id}`}>
                <button onClick={() => handlePatientSelected(patient.id)}>
                  {restriction ? (
                    <strong>{patient.ssn}</strong>
                  ) : (
                    <>
                      <strong>
                        {patient.firstname} {patient.lastname}
                      </strong>
                      {` - ${genderMap[patient.gender.label]} - ${frenchDate(
                        patient.dateOfBirth,
                        true
                      )} - ${patient.ssn}`}
                    </>
                  )}
                </button>
              </li>
            ))
          ) : (
            <li>pas de résultat</li>
          )}
        </ul>
      )}
    </div>
  );
}
