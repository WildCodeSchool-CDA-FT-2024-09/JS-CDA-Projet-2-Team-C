import fakeRole from '../../pages/Admin/fakeRole';

const translations = [
  { en: 'medecin', fr: 'Médecin' },
  { en: 'agent', fr: 'Agent' },
  { en: 'secretaire', fr: 'Secrétaire' },
  { en: 'admin', fr: 'Admin' }
];

export default function OptionSelect() {
  // Fonction de traduction
  const tradRole = (roles) => {
    return roles.map((role) => {
      const translation = translations.find((t) => t.en === role.labelm);
      if (translation) {
        return { ...role, labelm: translation.fr };
      }
      return role; // Retourne le rôle inchangé s'il n'y a pas de traduction
    });
  };

  const translatedRoles = tradRole(fakeRole);

  return (
    <select>
      {translatedRoles.map((role) => (
        <option key={role.id} value={role.label}>
          {role.label}
        </option>
      ))}
    </select>
  );
  // <option value="admin">Admin</option>
  // <option value="agent">Agent</option>
  // <option value="secretaire">Secrétaire</option>
  // <option value="medecin">Médecin</option>
}
