import React from 'react';

const PageDeGarde = ({ formData, onChange }) => {
  const data = formData.pageDeGarde;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Nom du projet *</label>
        <input
          type="text"
          className="form-input"
          value={data.nomProjet}
          onChange={(e) => onChange('nomProjet', e.target.value)}
          placeholder="Entrez le nom du projet"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Nom du client ou de l'entreprise *</label>
        <input
          type="text"
          className="form-input"
          value={data.nomClient}
          onChange={(e) => onChange('nomClient', e.target.value)}
          placeholder="Entrez le nom du client"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Date *</label>
        <input
          type="date"
          className="form-input"
          value={data.date}
          onChange={(e) => onChange('date', e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Version du document</label>
        <input
          type="text"
          className="form-input"
          value={data.versionDocument}
          onChange={(e) => onChange('versionDocument', e.target.value)}
          placeholder="ex: 1.0"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Nom des rédacteurs ou responsables *</label>
        <textarea
          className="form-textarea"
          value={data.redacteurs}
          onChange={(e) => onChange('redacteurs', e.target.value)}
          placeholder="Entrez les noms des rédacteurs ou responsables (un par ligne)"
          required
        />
      </div>
    </div>
  );
};

export default PageDeGarde;