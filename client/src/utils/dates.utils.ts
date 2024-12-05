// this utility will convert a Date string from the api to a string like "01 décembre 2023"
export const frenchLargeDate = (consultationDate: Date | undefined): string => {
  let date = 'date inconnue';
  if (consultationDate) {
    date = new Date(consultationDate).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return date;
};
