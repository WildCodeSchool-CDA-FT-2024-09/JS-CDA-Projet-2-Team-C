import { useConsultationSubjectsQuery } from '../../../generated/graphql-types';
import InputField from '../InputField/InputField';
import { SubjectSelectorProps } from './SubjectSelector.types';

export default function SubjectSelector({
  details,
  handleSubjectSelected,
  handleDescriptionChange
}: SubjectSelectorProps) {
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
              <span className="label-text text-primary-darker">Motif</span>
            </div>
            <select
              className="select select-bordered"
              onChange={handleSubjectSelected}
              defaultValue="null"
            >
              {!details?.subject && (
                <option value="null" disabled>
                  Sélectionnez un motif
                </option>
              )}
              {consultationSubjects.map((subject) => (
                <option key={subject.id}>{subject.label}</option>
              ))}
            </select>
          </label>
          <InputField
            name={'description'}
            label={'Description'}
            value={details ? details.description : ''}
            onChange={handleDescriptionChange}
          />
        </div>
      </>
    );
}
