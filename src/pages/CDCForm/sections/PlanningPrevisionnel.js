import React from 'react';

const PlanningPrevisionnel = ({ formData, onChange }) => {
  const data = formData.planningPrevisionnel;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Phases du projet *</label>
        <textarea
          className="form-textarea"
          value={data.phasesProjet}
          onChange={(e) => onChange('phasesProjet', e.target.value)}
          placeholder="Décrivez les différentes phases du projet (analyse, conception, développement, tests, déploiement, etc.)"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Dates clés / livrables / jalons *</label>
        <textarea
          className="form-textarea"
          value={data.datesCles}
          onChange={(e) => onChange('datesCles', e.target.value)}
          placeholder="Listez les dates clés, livrables ou jalons importants du projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Durée estimée *</label>
        <textarea
          className="form-textarea"
          value={data.dureeEstimee}
          onChange={(e) => onChange('dureeEstimee', e.target.value)}
          placeholder="Indiquez la durée estimée globale du projet et des différentes phases"
          required
        />
      </div>
    </div>
  );
};

export default PlanningPrevisionnel;