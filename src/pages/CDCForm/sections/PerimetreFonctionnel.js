import React from 'react';

const PerimetreFonctionnel = ({ formData, onChange }) => {
  const data = formData.perimetreFonctionnel;
  
  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">Authentification / inscription</label>
        <textarea
          className="form-textarea"
          value={data.authentification}
          onChange={(e) => onChange('authentification', e.target.value)}
          placeholder="Décrivez les fonctionnalités d'authentification et d'inscription (ex: inscription par email, authentification à deux facteurs...)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Tableau de bord</label>
        <textarea
          className="form-textarea"
          value={data.tableauBord}
          onChange={(e) => onChange('tableauBord', e.target.value)}
          placeholder="Décrivez les fonctionnalités du tableau de bord (ex: statistiques, widgets, graphiques...)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Gestion des utilisateurs</label>
        <textarea
          className="form-textarea"
          value={data.gestionUtilisateurs}
          onChange={(e) => onChange('gestionUtilisateurs', e.target.value)}
          placeholder="Décrivez les fonctionnalités de gestion des utilisateurs (ex: CRUD, permissions, rôles...)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Gestion des données</label>
        <textarea
          className="form-textarea"
          value={data.gestionDonnees}
          onChange={(e) => onChange('gestionDonnees', e.target.value)}
          placeholder="Décrivez les fonctionnalités de gestion des données (ex: import/export, filtrage, tri...)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Notifications</label>
        <textarea
          className="form-textarea"
          value={data.notifications}
          onChange={(e) => onChange('notifications', e.target.value)}
          placeholder="Décrivez les fonctionnalités de notifications (ex: emails, notifications push, alertes...)"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Autres fonctionnalités</label>
        <textarea
          className="form-textarea"
          value={data.autresFonctionnalites}
          onChange={(e) => onChange('autresFonctionnalites', e.target.value)}
          placeholder="Décrivez toute autre fonctionnalité non mentionnée ci-dessus"
        />
      </div>
    </div>
  );
};

export default PerimetreFonctionnel;