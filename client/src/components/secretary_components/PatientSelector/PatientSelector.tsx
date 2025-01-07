import { useState } from 'react';
import { PatientQuery } from '../../../generated/graphql-types';
import { useEffect } from 'react';
import { usePatientQuery } from '../../../generated/graphql-types';
import PatientSearchBar from '../../PatientSearchBar/PatientSearchBar';
import InputField from '../InputField/InputField';
import PatientSelectorProps from './PatientSelector.types';

export default function PatientSelector({
  patientId,
  handlePatientSelected
}: PatientSelectorProps) {
  const { data } = usePatientQuery({
    variables: { patientId: patientId }
  });
  const [patient, setPatient] = useState<PatientQuery['patient'] | null>(null);

  useEffect(() => {
    if (data) {
      setPatient(data.patient);
    }
  }, [data]);

  if (patientId) {
    return (
      <>
        <div className="grid grid-cols-6 grid-rows-3 gap-2">
          <InputField
            className="col-span-2"
            name={'lastname'}
            label={'Nom'}
            value={patient?.lastname}
          />
          <InputField
            className="col-span-2"
            name={'firstname'}
            label={'Prénom'}
            value={patient?.firstname}
          />
          <InputField
            className="col-span-2"
            name={'dateOfBirth'}
            label={'Date de naissance'}
            value={patient?.dateOfBirth}
          />
          <InputField
            className="col-span-3"
            name={'email'}
            label={'E-mail'}
            value={patient?.email}
          />
          <InputField
            className="col-span-3"
            name={'ssn'}
            label={'Numéro de sécurité sociale'}
            value={patient?.ssn}
          />
          <InputField
            className="col-span-4"
            name={'city'}
            label={'Ville'}
            value={patient?.town}
          />
          <InputField
            className="col-span-2"
            name={'postcode'}
            label={'Code Postal'}
            value={patient?.postcode}
          />
        </div>
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
