import { useState } from 'react';
import {
  PatientQuery,
  usePatientLazyQuery
} from '../../../generated/graphql-types';
import { useEffect } from 'react';
import PatientSearchBar from '../../PatientSearchBar/PatientSearchBar';
import InputField from '../InputField/InputField';
import PatientSelectorProps from './PatientSelector.types';

export default function PatientSelector({
  patientId,
  handlePatientSelected
}: PatientSelectorProps) {
  const [getPatient, { data }] = usePatientLazyQuery();
  const [patient, setPatient] = useState<
    PatientQuery['patient'] | Partial<PatientQuery['patient']> | null
  >(null);

  useEffect(() => {
    if (patientId) {
      getPatient({ variables: { patientId } });
    } else {
      setPatient(null);
    }
  }, [patientId]);

  useEffect(() => {
    if (data) {
      setPatient(data.patient);
    }
  }, [data]);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPatient = { ...patient, [field]: e.target.value };
      setPatient(newPatient);
    };

  if (patientId) {
    return (
      <>
        <div className="grid grid-cols-6 grid-rows-3 gap-2">
          <InputField
            className="col-span-2"
            name={'lastname'}
            label={'Nom'}
            value={patient?.lastname}
            onChange={handleChange('lastname')}
          />
          <InputField
            className="col-span-2"
            name={'firstname'}
            label={'Prénom'}
            value={patient?.firstname}
            onChange={handleChange('firstname')}
          />
          <InputField
            className="col-span-2"
            name={'dateOfBirth'}
            label={'Date de naissance'}
            value={patient?.dateOfBirth}
            type={'date'}
            onChange={handleChange('dateOfBirth')}
          />
          <InputField
            className="col-span-3"
            name={'email'}
            label={'E-mail'}
            value={patient?.email}
            onChange={handleChange('email')}
          />
          <InputField
            className="col-span-3"
            name={'ssn'}
            label={'Numéro de sécurité sociale'}
            value={patient?.ssn}
            onChange={handleChange('ssn')}
          />
          <InputField
            className="col-span-4"
            name={'city'}
            label={'Ville'}
            value={patient?.town}
            onChange={handleChange('city')}
          />
          <InputField
            className="col-span-2"
            name={'postcode'}
            label={'Code Postal'}
            value={patient?.postcode}
            onChange={handleChange('postcode')}
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
