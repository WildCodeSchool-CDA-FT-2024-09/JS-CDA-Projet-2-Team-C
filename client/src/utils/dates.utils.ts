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

export const getAge = (date: Date): string => {
  const today = new Date();
  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust for cases where the birthday hasn't occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return `${age} ans`;
};
