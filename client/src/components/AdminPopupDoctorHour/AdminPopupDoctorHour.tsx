import { useEffect, useRef } from 'react';

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

  const weekDays: ReadonlyArray<string> = [
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi'
  ];

  // Synchronisation de l'état avec l'affichage de la modale
  useEffect(() => {
    if (idDoctor === 0) {
      return; // Rien à afficher si aucun médecin n'est sélectionné
    }
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, idDoctor]);

  if (idDoctor === 0) {
    return null; // Rien à afficher si aucun médecin n'est sélectionné
  }

  function addTimes(startHour: number, endHour: number) {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        // Stopper après 20:00
        if (hour === 20 && minutes > 0) break;

        const time = `${hour.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  }

  // Remplir les plages horaires
  const timesAM = addTimes(6, 11); // Matin (6h à 11h)
  const timesPM = addTimes(12, 20); // Après-midi (12h à 20h)

  return (
    <div>
      {/* Modale */}
      <dialog ref={dialogRef} className="modal" role="dialog">
        <div className="modal-box">
          <form method="dialog">
            {/* Bouton pour fermer la modale */}
            <button
              onClick={onClose}
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-center text-lg font-bold text-primary">
              horaire du médecin {nameDoctor}
            </h3>
            {/* Contenu de la modale */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Sélectionner les jours et heures de travail
                </span>
              </label>
              {weekDays.map((day, index) => (
                <div key={index} className="mb-4 flex gap-4">
                  {/* Affiche le nom du jour */}
                  <label htmlFor="">
                    <input type="checkbox" name="" id="" />
                  </label>
                  <p className="min-w-[70px] font-bold capitalize">{day}</p>

                  {/* Sélecteur pour les horaires */}
                  <select className="select select-bordered max-w-xs">
                    <option disabled selected>
                      debut de journée
                    </option>
                    {timesAM.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select className="select select-bordered max-w-xs">
                    <option disabled selected>
                      fin de journée
                    </option>
                    {timesPM.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>{' '}
          </form>
        </div>
      </dialog>
    </div>
  );
}
