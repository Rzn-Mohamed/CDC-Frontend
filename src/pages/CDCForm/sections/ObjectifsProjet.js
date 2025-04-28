import React from 'react';

const ObjectifsProjet = ({ formData, onChange }) => {
  const data = formData.objectifsProjet;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Objectifs fonctionnels *</label>
        <textarea
          className="form-textarea"
          value={data.objectifsFonctionnels}
          onChange={(e) => onChange('objectifsFonctionnels', e.target.value)}
          placeholder="Décrivez ce que le système doit faire (ex: permettre aux utilisateurs de s'inscrire, gérer les commandes...)"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Objectifs non-fonctionnels *</label>
        <textarea
          className="form-textarea"
          value={data.objectifsNonFonctionnels}
          onChange={(e) => onChange('objectifsNonFonctionnels', e.target.value)}
          placeholder="Décrivez les contraintes de performances, sécurité, ergonomie, etc."
          required
        />
      </div>
    </div>
  );
};

export default ObjectifsProjet;