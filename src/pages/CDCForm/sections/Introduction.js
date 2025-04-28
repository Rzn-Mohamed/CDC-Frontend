import React from 'react';

const Introduction = ({ formData, onChange }) => {
  const data = formData.introduction;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Contexte du projet *</label>
        <textarea
          className="form-textarea"
          value={data.contexteProjet}
          onChange={(e) => onChange('contexteProjet', e.target.value)}
          placeholder="Décrivez le contexte dans lequel s'inscrit le projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Objectif global *</label>
        <textarea
          className="form-textarea"
          value={data.objectifGlobal}
          onChange={(e) => onChange('objectifGlobal', e.target.value)}
          placeholder="Décrivez l'objectif principal du projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Présentation du commanditaire *</label>
        <textarea
          className="form-textarea"
          value={data.presentationCommanditaire}
          onChange={(e) => onChange('presentationCommanditaire', e.target.value)}
          placeholder="Présentez brièvement l'entreprise ou la personne qui commande le projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Portée du projet (inclusions/exclusions) *</label>
        <textarea
          className="form-textarea"
          value={data.porteeProjet}
          onChange={(e) => onChange('porteeProjet', e.target.value)}
          placeholder="Définissez le périmètre du projet (ce qui est inclus et ce qui est exclu)"
          required
        />
      </div>
    </div>
  );
};

export default Introduction;