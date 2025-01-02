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
    if (!restriction) {
      // If restriction is false, we let the debounce handle the search.
    }
  };

  const handleSearch = useCallback((): void => {
    if (restriction) {
      const sanitisedSearch = search.trim();
      //
      //****WARNING****
      // Currently, the SSN is set to 15 digits,
      // but it will need to be changed to 13 digits
      // before production!
      //****WARNING****
      //
      if (sanitisedSearch.length === 15) {
        getPatientsByname({ variables: { search: sanitisedSearch } });
      }
    }
  }, [restriction, search, getPatientsByname]);

  useEffect(() => {
    if (restriction && search.length === 15) {
      handleSearch();
    } else if (!restriction) {
      const sanitisedSearch = debouncedSearch.trim();
      if (sanitisedSearch) {
        getPatientsByname({ variables: { search: sanitisedSearch } });
      }
    }
  }, [debouncedSearch, search, restriction, handleSearch, getPatientsByname]);

  return (
    <div className="dropdown dropdown-end sm:w-auto md:w-[35rem]">
      <SearchBar
        handleChange={handleChange}
        inputType={restriction ? 'number' : 'text'}
      />

      {restriction && (
        <button
          onClick={handleSearch}
          className={`btn mt-2 ${
            //
            //****WARNING****
            // Currently, the SSN is set to 15 digits,
            // but it will need to be changed to 13 digits
            // before production!
            //****WARNING****
            //
            search.length !== 15 ? 'btn-disabled bg-gray-300' : 'btn-primary'
          }`}
          disabled={search.length !== 15}
        >
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
