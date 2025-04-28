import React from 'react';

const DescriptionBesoin = ({ formData, onChange }) => {
  const data = formData.descriptionBesoin;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Problèmes actuels ou opportunités *</label>
        <textarea
          className="form-textarea"
          value={data.problemesActuels}
          onChange={(e) => onChange('problemesActuels', e.target.value)}
          placeholder="Décrivez les problèmes actuels que le projet vise à résoudre ou les opportunités à saisir"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Utilisateurs cibles (profils types/personas) *</label>
        <textarea
          className="form-textarea"
          value={data.utilisateursCibles}
          onChange={(e) => onChange('utilisateursCibles', e.target.value)}
          placeholder="Décrivez les différents types d'utilisateurs qui utiliseront le système"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Besoins exprimés par le client *</label>
        <textarea
          className="form-textarea"
          value={data.besoinsExprimes}
          onChange={(e) => onChange('besoinsExprimes', e.target.value)}
          placeholder="Listez les besoins exprimés par le client"
          required
        />
      </div>
    </div>
  );
};

export default DescriptionBesoin;