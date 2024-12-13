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

export const frenchCompactDate = (
  consultationDate: Date | string | undefined
): string => {
  try {
    const localizedDate = new Date(consultationDate as Date).toLocaleDateString(
      'fr-FR',
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
    );
    if (localizedDate === 'Invalid Date') throw new Error();
    return localizedDate;
  } catch {
    return 'date inconnue';
  }
};

export const getAge = (date: Date | string | undefined): string => {
  try {
    const today = new Date();
    const birthDate = new Date(date as string); // the type is cast knowing we'll catch the eventual error later
    if (birthDate.toDateString() === 'Invalid Date') throw new Error();

    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust for cases where the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} an${age > 1 ? 's' : ''}`;
  } catch {
    return 'age inconnu';
  }
};
