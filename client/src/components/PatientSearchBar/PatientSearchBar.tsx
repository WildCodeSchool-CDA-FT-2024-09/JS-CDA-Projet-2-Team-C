import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

export default function PatientSearchBar() {
  const [searchByName, setSearchByName] = useState<string>('');

  console.info(searchByName);

  const handleChange = (value: string): void => {
    setSearchByName(value);
  };

  return <SearchBar handleChange={handleChange} />;
}
