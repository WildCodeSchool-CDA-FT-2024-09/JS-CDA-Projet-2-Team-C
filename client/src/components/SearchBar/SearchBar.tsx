import { useState, useEffect } from 'react';
import SearchBarProps from './SearchBar.type';
import SearchIcon from '../../icons/SearchIcon';

export default function SearchBar({
  handleChange,
  inputType = 'text'
}: SearchBarProps) {
  const [search, setSearch] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Fonction pour formater la valeur en ajoutant des espaces
  const formatValue = (value: string) => {
    const cleanedValue = value.replace(/\s+/g, ''); // Enlever tous les espaces

    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length; i++) {
      formattedValue += cleanedValue[i];
      if (i === 0 || i === 2 || i === 4 || i === 6 || i === 9 || i === 12) {
        formattedValue += ' ';
      }
    }
    return formattedValue.trim(); // Supprimer les espaces en trop à la fin
  };

  // Fonction pour nettoyer la valeur en supprimant les espaces
  const sanitizeValue = (value: string) => value.replace(/\s+/g, '');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Appliquer le formatage uniquement si ce n'est pas une touche de suppression
    if (!isDeleting) {
      if (inputType !== 'text') {
        const numericValue = value.replace(/\D/g, ''); // Supprimer les caractères non numériques
        value = formatValue(numericValue); // Formatage avec les espaces
      }
    }

    setSearch(value); // Mettre à jour l'état local
    const sanitizedValue = sanitizeValue(value); // Nettoyer la valeur pour la BDD
    handleChange(sanitizedValue); // Passer la valeur nettoyée à la fonction parent
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      setIsDeleting(true);
    } else {
      setIsDeleting(false);
    }
  };

  useEffect(() => {}, [search]);

  return (
    <div className="flex w-full justify-center">
      <label
        htmlFor="search-input"
        className="flex w-full gap-4 rounded-lg border border-primary-dark p-1"
      >
        <SearchIcon aria-hidden="true" />
        <input
          id="search-input"
          type="text"
          placeholder="rechercher"
          className="focus:outline-none"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          value={search}
          aria-label="champ de recherche"
          maxLength={inputType !== 'text' ? 21 : undefined}
        />
      </label>
    </div>
  );
}
