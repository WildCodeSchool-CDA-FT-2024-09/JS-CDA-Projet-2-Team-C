import { useState } from 'react';
import SearchBarProps from './SearchBar.type';
import SearchIcon from '../../icons/SearchIcon';

export default function SearchBar({
  handleChange,
  inputType = 'text'
}: SearchBarProps) {
  const [search, setSearch] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      inputType === 'number' &&
      !/^\d$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete'
    ) {
      e.preventDefault();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleChange(e.target.value);
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
          type={inputType}
          placeholder="rechercher"
          className="focus:outline-none"
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          value={search}
          aria-label="champ de recherche"
        />
      </label>
    </div>
  );
}
