import { useEffect, useState } from 'react';
import { useRestrictedConsultationsQuery } from '../../../generated/graphql-types';
import { useGetRestrictedPatientsBySsnLazyQuery } from '../../../generated/graphql-types';
import AgentSearchBar from '../AgentSearchBar/AgentSearchBar';
import {
  AgentPatientSearchBarProps,
  Patient
} from './AgentPatientSearchBar.type';
import AgentModal from '../AgentModal/AgentModal';

export default function AgentPatientSearchBar({
  handlePatientSelected
}: AgentPatientSearchBarProps) {
  const [search, setSearch] = useState<string>('');
  const [getPatientsByName, { data }] =
    useGetRestrictedPatientsBySsnLazyQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { data: dataAppointments } = useRestrictedConsultationsQuery({
    variables: {
      ssn: selectedPatient?.ssn ? selectedPatient.ssn.toString() : ''
    }
  });

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

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    if (handlePatientSelected) {
      handlePatientSelected(Number(patient.ssn));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="dropdown dropdown-end sm:w-auto md:w-[35rem]">
      <AgentSearchBar handleChange={handleChange} search={search} />

      {data && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
        >
          {data && data.restrictedPatients ? (
            data.restrictedPatients[0] ? (
              <li key={`patient-${data.restrictedPatients[0].ssn}`}>
                <button
                  onClick={() => handlePatientClick(data.restrictedPatients[0])}
                >
                  <strong>Accéder au rendez-vous</strong>
                </button>
              </li>
            ) : (
              <li>Pas de rendez-vous</li>
            )
          ) : null}
        </ul>
      )}
      {selectedPatient && isModalOpen && dataAppointments && (
        <AgentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedItem={dataAppointments.restrictedConsultations[0]}
        />
      )}
    </div>
  );
}
