import React from 'react';

const ContraintesTechniques = ({ formData, onChange }) => {
  const data = formData.contraintesTechniques;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Langages ou frameworks imposés</label>
        <textarea
          className="form-textarea"
          value={data.langagesFrameworks}
          onChange={(e) => onChange('langagesFrameworks', e.target.value)}
          placeholder="Précisez les langages, frameworks ou technologies imposés pour le projet"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Base de données</label>
        <textarea
          className="form-textarea"
          value={data.baseDonnees}
          onChange={(e) => onChange('baseDonnees', e.target.value)}
          placeholder="Précisez le type de base de données à utiliser (MySQL, MongoDB, PostgreSQL, etc.)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Hébergement</label>
        <textarea
          className="form-textarea"
          value={data.hebergement}
          onChange={(e) => onChange('hebergement', e.target.value)}
          placeholder="Précisez le type d'hébergement requis (on-premise, cloud, serveur dédié, etc.)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Sécurité</label>
        <textarea
          className="form-textarea"
          value={data.securite}
          onChange={(e) => onChange('securite', e.target.value)}
          placeholder="Précisez les exigences de sécurité (authentification, RGPD, chiffrement, etc.)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Compatibilité</label>
        <textarea
          className="form-textarea"
          value={data.compatibilite}
          onChange={(e) => onChange('compatibilite', e.target.value)}
          placeholder="Précisez les contraintes de compatibilité (navigateurs, appareils mobiles, etc.)"
        />
      </div>
    </div>
  );
};

export default ContraintesTechniques;