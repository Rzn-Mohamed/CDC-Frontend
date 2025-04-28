import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './CDCForm.css';

// Form sections components
import PageDeGarde from './sections/PageDeGarde';
import Introduction from './sections/Introduction';
import ObjectifsProjet from './sections/ObjectifsProjet';
import DescriptionBesoin from './sections/DescriptionBesoin';
import PerimetreFonctionnel from './sections/PerimetreFonctionnel';
import ContraintesTechniques from './sections/ContraintesTechniques';
import PlanningPrevisionnel from './sections/PlanningPrevisionnel';
import Budget from './sections/Budget';
import CriteresValidation from './sections/CriteresValidation';
import Annexes from './sections/Annexes';

const CDCForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    pageDeGarde: {
      nomProjet: '',
      nomClient: '',
      date: new Date().toISOString().split('T')[0],
      versionDocument: '1.0',
      redacteurs: '',
    },
    introduction: {
      contexteProjet: '',
      objectifGlobal: '',
      presentationCommanditaire: '',
      porteeProjet: '',
    },
    objectifsProjet: {
      objectifsFonctionnels: '',
      objectifsNonFonctionnels: '',
    },
    descriptionBesoin: {
      problemesActuels: '',
      utilisateursCibles: '',
      besoinsExprimes: '',
    },
    perimetreFonctionnel: {
      authentification: '',
      tableauBord: '',
      gestionUtilisateurs: '',
      gestionDonnees: '',
      notifications: '',
      autresFonctionnalites: '',
    },
    contraintesTechniques: {
      langagesFrameworks: '',
      baseDonnees: '',
      hebergement: '',
      securite: '',
      compatibilite: '',
    },
    planningPrevisionnel: {
      phasesProjet: '',
      datesCles: '',
      dureeEstimee: '',
    },
    budget: {
      estimationCouts: '',
    },
    criteresValidation: {
      elementsVerifier: '',
      scenariosTest: '',
    },
    annexes: {
      glossaire: '',
      documentsComplementaires: '',
      referencesUtiles: '',
    },
  });
  
  // Form sections
  const sections = [
    { title: 'Page de garde', component: PageDeGarde },
    { title: 'Introduction', component: Introduction },
    { title: 'Objectifs du projet', component: ObjectifsProjet },
    { title: 'Description du besoin', component: DescriptionBesoin },
    { title: 'Périmètre fonctionnel', component: PerimetreFonctionnel },
    { title: 'Contraintes techniques', component: ContraintesTechniques },
    { title: 'Planning prévisionnel', component: PlanningPrevisionnel },
    { title: 'Budget', component: Budget },
    { title: 'Critères de validation', component: CriteresValidation },
    { title: 'Annexes', component: Annexes },
  ];
  
  // Handle next step
  const handleNext = () => {
    if (activeStep < sections.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit form
      handleSubmit();
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submit
  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Here you would typically send the data to your backend
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard', { 
      state: { 
        message: 'Cahier des charges généré avec succès!',
        cdcData: formData
      } 
    });
  };
  
  // Handle form field changes
  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };
  
  // Get current section component
  const CurrentSection = sections[activeStep].component;
  
  return (
    <Layout>
      <div className="cdc-form-container">
        {/* Sidebar Navigation */}
        <div className="cdc-sidebar">
          <h2 className="sidebar-title">Cahier des Charges</h2>
          <ul className="sidebar-nav">
            {sections.map((section, index) => (
              <li 
                key={index}
                className={`sidebar-item ${activeStep === index ? 'active' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <span className="sidebar-number">{index + 1}</span>
                <span className="sidebar-text">{section.title}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Form Content */}
        <div className="cdc-content">
          <div className="cdc-form-header">
            <h2>{sections[activeStep].title}</h2>
            <div className="step-indicator">
              Étape {activeStep + 1} / {sections.length}
            </div>
          </div>
          
          <div className="cdc-form-body">
            <CurrentSection 
              formData={formData} 
              onChange={(field, value) => handleChange(Object.keys(formData)[activeStep], field, value)} 
            />
          </div>
          
          <div className="cdc-form-navigation">
            <button 
              className="btn-previous"
              onClick={handlePrev}
              disabled={activeStep === 0}
            >
              Précédent
            </button>
            <button 
              className="btn-next"
              onClick={handleNext}
            >
              {activeStep === sections.length - 1 ? 'Générer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CDCForm;