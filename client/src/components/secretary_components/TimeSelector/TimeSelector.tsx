import { frenchDate } from '../../../utils/dates.utils';
import { TimeSelectorProps } from './TimeSelector.types';

export default function TimeSelector({
  consultationDateTime
}: TimeSelectorProps) {
  if (consultationDateTime === null)
    return <> sélectionnez un créneau sur l'agenda</>;
  else return <> {frenchDate(consultationDateTime.consultationDate)} </>;
}
