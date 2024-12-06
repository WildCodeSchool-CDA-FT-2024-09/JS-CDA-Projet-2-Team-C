// this utility will convert a Date string from the api to a string like "01 décembre 2023"

export const frenchLargeDate = (
  consultationDate: Date | string | undefined
): string => {
  try {
    const localizedDate = new Date(consultationDate as Date).toLocaleDateString(
      'fr-FR',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );
    if (localizedDate === 'Invalid Date') throw new Error();
    return localizedDate;
  } catch {
    return 'date inconnue';
  }
};
