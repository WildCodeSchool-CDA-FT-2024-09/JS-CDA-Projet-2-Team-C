import { useEffect, useState } from 'react';
import {
  DepartmentsWithDoctorsQuery,
  useDepartmentsWithDoctorsQuery
} from '../../../generated/graphql-types';
import DoctorSelectorProps from './DoctorSelector.types';

export default function DoctorSelector({
  handleDoctorSelected
}: DoctorSelectorProps) {
  const { data, loading, error } = useDepartmentsWithDoctorsQuery();

  // TODO : find the department of the user and use it a default department
  const defaultDoctor = {
    id: 0,
    firstname: 'docteur',
    lastname: 'non défini'
  };
  const defaultDept = { id: 0, label: 'default dept', users: [defaultDoctor] };

  const [department, setDepartment] =
    useState<DepartmentsWithDoctorsQuery['allDepartmentsWithDoctors'][number]>(
      defaultDept
    );

  const [doctors, setDoctors] = useState<
    DepartmentsWithDoctorsQuery['allDepartmentsWithDoctors'][number]['users']
  >([defaultDoctor]);

  const [doctor, setDoctor] =
    useState<
      DepartmentsWithDoctorsQuery['allDepartmentsWithDoctors'][number]['users'][number]
    >(defaultDoctor);

  useEffect(() => {
    setDoctors(department.users);
  }, [department]);

  // this useEffect transmits the info to the parent component

  useEffect(() => handleDoctorSelected(doctor), [doctor, handleDoctorSelected]);

  if (loading) return <p>Chargement ...</p>;

  if (error)
    return <p>Erreur de récupération des services, recharger la page</p>;

  const departments = data?.allDepartmentsWithDoctors || [];

  if (data)
    return (
      <>
        <div className="flex gap-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-primary">Service</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) =>
                setDepartment(
                  departments.find((d) => d.label === e.target.value) ||
                    defaultDept
                )
              }
            >
              {departments.map((d, index) => (
                <option key={d.id} selected={index === 0}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-primary">Médecin</span>
            </div>
            <select
              className="select select-bordered"
              onChange={(e) =>
                setDoctor(
                  doctors.find(
                    (d) => `${d.firstname} ${d.lastname}` === e.target.value
                  ) || defaultDoctor
                )
              }
            >
              {doctors.length ? (
                doctors.map((d, index) => (
                  <option key={d.id} selected={index === 0}>
                    {d.firstname} {d.lastname}
                  </option>
                ))
              ) : (
                <option> aucun médecin dans ce service</option>
              )}
            </select>
          </label>
        </div>
      </>
    );
}
