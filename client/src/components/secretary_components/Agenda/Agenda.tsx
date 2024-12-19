import { useState, useCallback, useMemo } from 'react';
import { Calendar, DateLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr'; // Import French locale
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Agenda() {
  const localizer: DateLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { fr }
  });

  const [events, setEvents] = useState([
    {
      title: 'Meeting with Team',
      start: new Date(2024, 10, 29, 10, 0), // Adjust dates to suit your example
      end: new Date(2024, 10, 29, 11, 0)
    },
    {
      title: 'Doctor Appointment',
      start: new Date(2024, 10, 30, 14, 0),
      end: new Date(2024, 10, 30, 15, 0)
    },
    {
      title: 'Doctor CONvergence',
      start: new Date(2024, 10, 30, 9, 0),
      end: new Date(2024, 10, 30, 11, 0)
    }
  ]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // After calendar was clicked, we're here !
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  // TODO : pass this as a prop
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6)
    }),
    []
  );

  return (
    <div style={{ height: '700px', width: '800px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        defaultDate={defaultDate}
        messages={{
          next: 'Suivant',
          previous: 'Précédent',
          today: "Aujourd'hui",
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          agenda: 'Dossier',
          date: 'Date',
          time: 'Heure',
          event: 'Rendez-vous',
          noEventsInRange: 'Aucun rendez-vous de prévu.'
        }}
      />
    </div>
  );
}
