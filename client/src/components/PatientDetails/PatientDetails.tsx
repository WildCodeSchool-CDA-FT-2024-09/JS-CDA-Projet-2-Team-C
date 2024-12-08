import { usePatientQuery } from '../../generated/graphql-types';
import { frenchLargeDate, getAge } from '../../utils/dates.utils';
import { PatientDetailsProps } from './PatientDetails.types';

export default function PatientDetails({ patientId }: PatientDetailsProps) {
  const { data, loading, error } = usePatientQuery({
    variables: { patientId: patientId }
  });

  const genderMap: Record<string, string> = {
    Male: 'H',
    Female: 'F'
  };

  if (loading) return <h1>Chargement ...</h1>;

  if (error) return <h1>Erreur</h1>;

  if (data)
    return (
      <section className="rounded-2xl bg-primary-lighter p-4">
        <h3>
          <strong>
            {data.patient.firstname} {data.patient.lastname}
          </strong>
          {` - ${genderMap[data.patient.gender.label]} -  ${getAge(data.patient.dateOfBirth)}`}
        </h3>
        <p>
          N° {data.patient.ssn}
          <br />
          {data.patient.gender.label === 'Male' ? 'né' : 'née'} le{' '}
          {frenchLargeDate(data.patient.dateOfBirth)}
          <br />
          {data.patient.town} {data.patient.postcode}
        </p>
      </section>
    );
}
