import { AgentFooterProps } from './AgentFooter.type';
import Home from '/images/home.svg';
import Return from '/images/return.svg';

const Footer = ({ handleReturn, resetView }: AgentFooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-evenly rounded-t-xl bg-primary-light p-2">
      <button
        className="flex items-center justify-center rounded text-white"
        onClick={resetView}
        aria-label="Revenir à l'écran d'accueil"
      >
        <img
          src={Home}
          alt=""
          className="h-12 w-12 cursor-pointer fill-white"
        />
      </button>
      <button
        className="flex items-center justify-center rounded text-white"
        onClick={handleReturn}
        aria-label="Retourner à l'écran précédent"
      >
        <img src={Return} alt="" className="h-12 w-12 cursor-pointer" />
      </button>
    </footer>
  );
};

export default Footer;
