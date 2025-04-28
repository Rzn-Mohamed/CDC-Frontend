import React from 'react';

const Budget = ({ formData, onChange }) => {
  const data = formData.budget;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Estimation des coûts</label>
        <textarea
          className="form-textarea"
          value={data.estimationCouts}
          onChange={(e) => onChange('estimationCouts', e.target.value)}
          placeholder="Détaillez l'estimation des coûts du projet (ressources, licences, hébergement, etc.)"
        />
      </div>
    </div>
  );
};

export default Budget;