import { useConsultationSubjectsQuery } from '../../../generated/graphql-types';
import InputField from '../InputField/InputField';

export default function SubjectSelector({ handleSubjectSelected }) {
  const { data, loading, error } = useConsultationSubjectsQuery();

  if (loading) return <p>Chargement ...</p>;

  if (error)
    return <p>Erreur de récupération des services, recharger la page</p>;

  const consultationSubjects = data?.consultationSubjects || [];

  if (data)
    return (
      <>
        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-primary-darker">Sujet</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) => handleSubjectSelected(e.target.value)}
              defaultValue={consultationSubjects[0].label}
            >
              {consultationSubjects.length ? (
                consultationSubjects.map((subject) => (
                  <option key={subject.id}>{subject.label}</option>
                ))
              ) : (
                <option> aucun médecin dans ce service</option>
              )}
            </select>
          </label>
          <InputField
            name={'description'}
            label={'Description'}
            value={'a plugger'}
            onChange={() => {}}
          />
        </div>
      </>
    );
}
