export default interface SearchBarProps {
  handleChange: (value: string) => void;
  inputType?: 'text' | 'number';
}
