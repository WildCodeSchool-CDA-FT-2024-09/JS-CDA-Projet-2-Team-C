import { useEffect, useState } from 'react';
import {
  DepartmentsWithDoctorsQuery,
  useDepartmentsWithDoctorsQuery
} from '../../../generated/graphql-types';
import { SelectField } from '../../AdminPopup/Fields';
import DoctorSelectorProps from './DoctorSelector.types';

export default function DoctorSelector({
  handleDoctorSelected
}: DoctorSelectorProps) {
  const { data, loading, error } = useDepartmentsWithDoctorsQuery();

  // TODO : find the department of the user and use it a default department
  const defaultDept = { id: 0, label: 'default dept', users: [] };

  const [department, setDepartment] =
    useState<DepartmentsWithDoctorsQuery['allDepartmentsWithDoctors'][number]>(
      defaultDept
    );
  const [doctors, setDoctors] = useState<
    DepartmentsWithDoctorsQuery['allDepartmentsWithDoctors'][number]['users']
  >([]);

  useEffect(() => {
    setDoctors(department.users);
  }, [department]);

  if (loading) return <p>Chargement ...</p>;

  if (error)
    return <p>Erreur de récupération des services, recharger la page</p>;

  if (data)
    return (
      <>
        <div className="flex gap-2">
          <SelectField
            name="service"
            label="Service"
            options={
              data.allDepartmentsWithDoctors.map((d) => ({
                value: d.label,
                label: d.label
              })) || []
            }
            value={department.label}
            onChange={(e) =>
              setDepartment(
                data.allDepartmentsWithDoctors.find(
                  (d) => d.label === e.target.value
                ) || defaultDept
              )
            }
          />
          <SelectField
            name="Médecin"
            label="Médecin"
            options={
              doctors.map((d) => ({
                value: `${d.id}`,
                label: `${d.firstname} ${d.lastname}`
              })) || []
            }
            value={'jimmy'}
            onChange={handleDoctorSelected}
          />
        </div>
      </>
    );
}
