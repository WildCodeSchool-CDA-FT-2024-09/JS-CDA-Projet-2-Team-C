import Logo from '/images/logo-main-black.png';

export default function Login() {
  return (
    <section className="flex w-80 flex-col place-items-center place-self-center">
      <h1 className="text-center font-medium">Agenda Médical</h1>
      <section className="flex w-full flex-col place-items-center gap-4">
        <img className="place-self-center" src={Logo} />
        <h2 className="text-center">Connexion</h2>
        <p className="text-center">
          Veuillez rentrer vos informations de connexion
        </p>
        <input
          type="text"
          placeholder="Email ..."
          className="input input-bordered input-primary w-full max-w-xs rounded-full"
        />
        <input
          type="text"
          placeholder="Mot de passe ..."
          className="input input-bordered input-primary w-full max-w-xs rounded-full"
        />
        <button className="btn w-40 bg-primary">CONNEXION</button>
      </section>
    </section>
  );
}
