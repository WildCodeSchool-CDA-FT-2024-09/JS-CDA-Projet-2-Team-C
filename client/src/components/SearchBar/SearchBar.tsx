import SearchBarProps from './SearchBar.type';
import Loupe from './Loupe.svg';

export default function SearchBar({ handleChange }: SearchBarProps) {
  return (
    <section className="flex w-full justify-center">
      <label
        htmlFor="search-input"
        className="flex w-96 gap-4 rounded-lg border border-primary-dark p-1"
      >
        <Loupe aria-hidden="true" />
        <input
          id="search-input"
          type="text"
          placeholder="rechercher"
          className="focus:outline-none"
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Champ de recherche d'utilisateur"
        />
      </label>
    </section>
  );
}
