import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetDoctorByIdQuery } from '../../generated/graphql-types';
import TimeSelect from './TimeSelectWorkingHour';

interface AdminPopupDoctorHourProps {
  isOpen: boolean;
  onClose: () => void;
  idDoctor: number;
  nameDoctor: string;
}

export default function AdminPopupDoctorHour({
  isOpen,
  onClose,
  idDoctor,
  nameDoctor
}: AdminPopupDoctorHourProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data } = useGetDoctorByIdQuery({
    variables: {
      id: idDoctor
    }
  });

  const weekDays: ReadonlyArray<string> = useMemo(
    () => ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    []
  );

  const [workingHoursState, setWorkingHoursState] = useState<
    { weekDay: number; startTime: string; endTime: string }[]
  >([]);

  function formatTimeToHHMM(time: string): string {
    return time.slice(0, 5); // Garde uniquement les heures et minutes
  }

  // Synchronisation de l'état avec les données récupérées
  useEffect(() => {
    if (data?.getDoctorById?.workingHours) {
      setWorkingHoursState(
        data.getDoctorById.workingHours.map((wh) => ({
          ...wh,
          startTime: formatTimeToHHMM(wh.startTime), // Conversion en HH:mm
          endTime: formatTimeToHHMM(wh.endTime) // Conversion en HH:mm
        }))
      );
    } else {
      setWorkingHoursState(
        weekDays.map((_, index) => ({
          weekDay: index,
          startTime: '',
          endTime: ''
        }))
      );
    }
  }, [data, weekDays]);

  // Synchronisation de l'état avec l'affichage de la modale
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, idDoctor]);

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

  const timesAM = addTimes(6, 16); // Matin (6h à 16h)
  const timesPM = addTimes(12, 20); // Après-midi (12h à 20h)

  // Mettre à jour l'état des horaires pour un jour spécifique
  const updateWorkingHour = (
    dayIndex: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    setWorkingHoursState((prev) =>
      prev.map((wh) =>
        wh.weekDay === dayIndex ? { ...wh, [field]: value } : wh
      )
    );
  };

  return (
    <div>
      <dialog ref={dialogRef} className="modal" role="dialog">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-center text-lg font-bold text-primary">
              horaire du médecin {nameDoctor} / id:{idDoctor}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Sélectionner les jours et les horaires de travail
                </span>
              </label>
              {weekDays.map((day, index) => {
                const workingHour = workingHoursState.find(
                  (wh) => wh.weekDay === index
                );

                return (
                  <div key={index} className="mb-4 flex items-center gap-4">
                    <input
                      type="checkbox"
                      name={`day-${index}`}
                      id={`day-${index}`}
                      checked={!!workingHour} // Si `workingHour` existe, la case est cochée
                      onChange={(e) => {
                        // Ajouter ou supprimer un horaire pour le jour en fonction de la case cochée
                        if (e.target.checked) {
                          // Si cochée, ajouter une plage horaire par défaut
                          setWorkingHoursState((prev) => [
                            ...prev,
                            {
                              weekDay: index,
                              startTime: '',
                              endTime: ''
                            }
                          ]);
                        } else {
                          // Si décochée, retirer l'horaire pour ce jour
                          setWorkingHoursState((prev) =>
                            prev.filter((wh) => wh.weekDay !== index)
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
              className="btn btn-md w-full bg-secondary text-white"
            >
              {workingHoursState.length > 0
                ? 'Modifier les horaires'
                : 'Ajouter les horaires'}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
