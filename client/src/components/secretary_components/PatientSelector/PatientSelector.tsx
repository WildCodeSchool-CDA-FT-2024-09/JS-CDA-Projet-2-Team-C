// import { useState } from 'react';
// import { Patient } from '../../../generated/graphql-types';
import PatientSearchBar from '../../PatientSearchBar/PatientSearchBar';
import InputField from '../InputField/InputField';
import PatientSelectorProps from './PatientSelector.types';

export default function PatientSelector({
  patientId,
  handlePatientSelected
}: PatientSelectorProps) {
  // const [patient, setPatient] = useState<Patient | null>(null);

  if (patientId) {
    return (
      <>
        <InputField name={'Nom'} label={'Nom'} value={patientId.toString()} />
        <p>selected {patientId}</p>
      </>
    );
  } else
    return (
      <>
        <PatientSearchBar handlePatientSelected={handlePatientSelected} />
        <button> add </button>
      </>
    );
}
