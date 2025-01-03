import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Calendar,
  DateLocalizer,
  dateFnsLocalizer,
  Event
} from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr'; // Import French locale
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { convertToCalendarEvents } from './events.utils';
import { AgendaProps } from './Agenda.types';

export default function Agenda({ consultations }: AgendaProps) {
  const localizer: DateLocalizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), // Needed to start the week on monday instead of sunday
    getDay,
    locales: { fr }
  });

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const newEvents = convertToCalendarEvents(consultations);
    setEvents(newEvents);
  }, [consultations]);

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
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6)
    }),
    []
  );

  return (
    <div style={{ height: '700px', width: '800px' }}>
      <Calendar
        localizer={localizer}
        culture="fr"
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
