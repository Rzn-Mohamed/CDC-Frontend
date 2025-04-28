import React from 'react';

const CriteresValidation = ({ formData, onChange }) => {
  const data = formData.criteresValidation;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Éléments à vérifier pour accepter le projet *</label>
        <textarea
          className="form-textarea"
          value={data.elementsVerifier}
          onChange={(e) => onChange('elementsVerifier', e.target.value)}
          placeholder="Listez les éléments qui seront vérifiés pour valider la livraison du projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Scénarios de test, critères d'acceptation *</label>
        <textarea
          className="form-textarea"
          value={data.scenariosTest}
          onChange={(e) => onChange('scenariosTest', e.target.value)}
          placeholder="Décrivez les scénarios de test et les critères d'acceptation du projet"
          required
        />
      </div>
    </div>
  );
};

export default CriteresValidation;