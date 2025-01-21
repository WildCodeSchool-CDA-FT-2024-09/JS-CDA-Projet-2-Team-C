import { useEffect, useRef, useState } from 'react';
import { useGetDoctorByIdQuery } from '../../generated/graphql-types';
import TimeSelect from './TimeSelectWorkingHour';
import { useUpdateDoctorWorkingHoursMutation } from '../../generated/graphql-types';
import { useToast } from '../../contexts/toasts/useToast';
import { AdminPopupDoctorHourProps } from './AdminPopupDoctorHour.types';

export default function AdminPopupDoctorHour({
  isOpen,
  onClose,
  doctorId,
  nameDoctor,
  onUpdate
}: AdminPopupDoctorHourProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [updateDoctorWorkingHours, { loading: saving }] =
    useUpdateDoctorWorkingHoursMutation();

  const { showToast } = useToast();

  const { data, refetch } = useGetDoctorByIdQuery({
    variables: {
      id: doctorId
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      workingHours.some(
        (wh) => !wh.startTime || !wh.endTime || wh.startTime >= wh.endTime
      )
    ) {
      showToast('Veuillez vérifier les horaires saisis.', 'error');
      return;
    }

    try {
      await updateDoctorWorkingHours({
        variables: {
          doctorId: doctorId,
          workingHours: workingHours.map((wh) => ({
            weekday: wh.weekday,
            startTime: wh.startTime,
            endTime: wh.endTime
          }))
        }
      });

      showToast('Les horaires ont été mis à jour avec succès', 'success');

      // Refetch the data after the update
      const updatedData = await refetch();

      // Update local state with new data
      if (updatedData?.data?.getDoctorById?.workingHours) {
        setWorkingHours(
          updatedData.data.getDoctorById.workingHours.map((wh) => ({
            ...wh,
            startTime: formatTimeToHHMM(wh.startTime),
            endTime: formatTimeToHHMM(wh.endTime)
          }))
        );
      }

      onClose();
      onUpdate();
    } catch {
      showToast('Une erreur inattendue est survenue.', 'error');
    }
  };

  const weekdays: string[] = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi'
  ];

  const [workingHours, setWorkingHours] = useState<
    { weekday: number; startTime: string; endTime: string }[]
  >([]);

  // function for Conversion to HH:mm
  function formatTimeToHHMM(time: string): string {
    return time.slice(0, 5);
  }

  // Synchronizing state with retrieved data
  useEffect(() => {
    if (isOpen) {
      if (data?.getDoctorById?.workingHours) {
        setWorkingHours(
          data.getDoctorById.workingHours.map((wh) => ({
            ...wh,
            startTime: formatTimeToHHMM(wh.startTime),
            endTime: formatTimeToHHMM(wh.endTime)
          }))
        );
      } else {
        setWorkingHours(
          weekdays.map((_, index) => ({
            weekday: index,
            startTime: '',
            endTime: ''
          }))
        );
      }

      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, data]);

  // Synchronizing state with modal display
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, doctorId]);

  function addTimes(startHour: number, endHour: number) {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        if (hour === 20 && minutes > 0) break;

        const time = `${hour.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  }

  const timesAM = addTimes(6, 16);
  const timesPM = addTimes(12, 20);

  // Update schedule status for a specific day
  const updateWorkingHour = (
    dayIndex: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setWorkingHours((prev) =>
      prev.map((wh) =>
        wh.weekday === dayIndex ? { ...wh, [field]: value } : wh
      )
    );
  };

  const handlecloseDoctorHour = () => {
    setWorkingHours([]);
    onClose();
  };

  return (
    <>
      <dialog ref={dialogRef} className="modal" role="dialog">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={handlecloseDoctorHour}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="text-center text-lg font-bold text-primary">
            horaire du médecin {nameDoctor}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-slate-500">
                  Sélectionner les jours et les horaires de travail
                </span>
              </label>
              {weekdays.map((day, index) => {
                const workingHour = workingHours.find(
                  // weekday needs to be offset because SQL defines sun - sat as 0 - 6
                  (wh) => wh.weekday === index
                );

                return (
                  <div key={index} className="mb-4 flex items-center gap-4">
                    <input
                      type="checkbox"
                      name={`day-${index}`}
                      id={`day-${index}`}
                      checked={!!workingHour} // If `workingHour` exists, the box is checked
                      onChange={(e) => {
                        if (e.target.checked) {
                          // select the schedule only if the day is checked
                          setWorkingHours((prev) => [
                            ...prev,
                            {
                              weekday: index,
                              startTime: '',
                              endTime: ''
                            }
                          ]);
                        } else {
                          // If unchecked, remove schedule for that day
                          setWorkingHours((prev) =>
                            prev.filter((wh) => wh.weekday !== index)
                          );
                        }
                      }}
                    />
                    <p className="min-w-[70px] font-bold capitalize">{day}</p>

                    <TimeSelect
                      value={workingHour?.startTime || ''}
                      onChange={(value) =>
                        updateWorkingHour(index, 'startTime', value)
                      }
                      options={timesAM}
                      label="Début de journée"
                    />

                    <TimeSelect
                      value={workingHour?.endTime || ''}
                      onChange={(value) =>
                        updateWorkingHour(index, 'endTime', value)
                      }
                      options={timesPM}
                      label="Fin de journée"
                    />
                  </div>
                );
              })}
            </div>
            <button
              type="submit"
              className={`w-full ${saving ? 'btn-disabled' : ''} h-12 w-5/6 rounded-lg bg-secondary text-white hover:opacity-85`}
            >
              {saving
                ? 'Enregistrement...'
                : workingHours.length > 0
                  ? 'Modifier les horaires'
                  : 'Ajouter les horaires'}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
