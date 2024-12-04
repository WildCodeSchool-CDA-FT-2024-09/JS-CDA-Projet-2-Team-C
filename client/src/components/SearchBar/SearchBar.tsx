import Loupe from './Loupe.svg';

interface SearchBarProps {
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar({ handleChange }: SearchBarProps) {
  return (
    <section className="flex w-full justify-center">
      <label className="flex w-96 gap-4 rounded-lg border border-primary-dark p-2">
        <Loupe />

        <input
          type="text"
          placeholder="rechercher"
          className="focus:outline-none"
          onChange={(e) => handleChange(e.target.value)}
        />
      </label>
    </section>
  );
}
