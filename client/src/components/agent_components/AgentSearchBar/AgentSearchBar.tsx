import AgentSearchBarProps from './AgentSearchBar.type';
import SearchIcon from '../../../icons/SearchIcon';

export default function AgentSearchBar({
  handleChange,
  search
}: AgentSearchBarProps) {
  return (
    <div className="flex w-full flex-col justify-center">
      <label
        htmlFor="search-input"
        className={`flex w-full gap-4 rounded-lg p-1 ${search.length !== 21 ? 'border-red-500' : 'border-blue-500'} border`}
      >
        <SearchIcon aria-hidden="true" />
        <input
          id="search-input"
          type="text"
          placeholder="rechercher par N° social"
          className="focus:outline-none"
          onChange={(e) => handleChange(e.target.value)}
          aria-label="champ de recherche"
          maxLength={21}
          value={search}
        />
      </label>
      <p className={`${search.length === 21 ? 'hidden' : 'text-red-500'}`}>
        Le numéro doit contenir 15 chiffres.
      </p>
    </div>
  );
}
