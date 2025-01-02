import { useState } from 'react';
import SearchBarProps from './SearchBar.type';
import SearchIcon from '../../icons/SearchIcon';

export default function SearchBar({
  handleChange,
  inputType = 'text'
}: SearchBarProps) {
  const [search, setSearch] = useState<string>('');

  const formatSSN = (value: string): string => {
    const cleanedValue = value.replace(/\s+/g, '');
    let formattedValue = '';

    for (let i = 0; i < cleanedValue.length; i++) {
      formattedValue += cleanedValue[i];

      if ([0, 2, 4, 6, 9, 12].includes(i)) {
        formattedValue += ' ';
      }
    }

    return formattedValue.trim();
  };

  const removeSpaces = (value: string): string => value.replace(/\s+/g, '');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (inputType !== 'text') {
      value = formatSSN(value.replace(/\D/g, ''));
    }

    setSearch(value);
    handleChange(removeSpaces(value));
  };

  return (
    <div className="flex w-full justify-center">
      <label
        htmlFor="search-input"
        className="flex w-full gap-4 rounded-lg border border-primary-dark p-1"
      >
        <SearchIcon aria-hidden="true" />
        <input
          id="search-input"
          type="texte"
          placeholder="rechercher"
          className="focus:outline-none"
          onChange={handleChangeInput}
          value={search}
          aria-label="champ de recherche"
          maxLength={inputType !== 'text' ? 21 : undefined}
        />
      </label>
    </div>
  );
}
