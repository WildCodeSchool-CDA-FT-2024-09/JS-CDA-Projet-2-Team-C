import { AgentFooterProps } from './AgentFooter.type';
import Home from '/images/home.svg';
import Return from '/images/return.svg';

const Footer = ({ handleReturn, resetView }: AgentFooterProps) => {
  return (
    <footer className="fixed bottom-0 flex w-full items-center justify-evenly rounded-t-xl bg-primary-light p-2">
      <img
        src={Home}
        alt="Retour à la maison"
        className="h-12 w-12"
        onClick={resetView}
      />

      <img
        src={Return}
        alt="Retour en arrière"
        className="h-12 w-12"
        onClick={handleReturn}
      />
    </footer>
  );
};

export default Footer;
