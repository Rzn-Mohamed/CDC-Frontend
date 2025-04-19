import React from 'react';

const Annexes = ({ formData, onChange }) => {
  const data = formData.annexes;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Glossaire</label>
        <textarea
          className="form-textarea"
          value={data.glossaire}
          onChange={(e) => onChange('glossaire', e.target.value)}
          placeholder="Définissez les termes techniques ou spécifiques utilisés dans le document"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Documents techniques complémentaires</label>
        <textarea
          className="form-textarea"
          value={data.documentsComplementaires}
          onChange={(e) => onChange('documentsComplementaires', e.target.value)}
          placeholder="Listez les documents techniques complémentaires (schémas, maquettes, etc.)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Références / liens utiles</label>
        <textarea
          className="form-textarea"
          value={data.referencesUtiles}
          onChange={(e) => onChange('referencesUtiles', e.target.value)}
          placeholder="Indiquez des références ou liens utiles pour le projet"
        />
      </div>
    </div>
  );
};

export default Annexes;