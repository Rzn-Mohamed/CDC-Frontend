import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../templates/cdc-style.css';

const CDCTemplate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Add page numbering
  const addPageNumbers = useCallback(() => {
    // This will be executed when printing or after layout is complete
    const totalPages = document.querySelectorAll('.section').length + 2; // +2 for cover and TOC
    const totalPagesElements = document.querySelectorAll('.total-pages');

    // Set total pages count
    totalPagesElements.forEach(element => {
      element.textContent = totalPages;
    });

    // Page numbers will be added by CSS counters during printing
  }, []);

  // Helper function to update section content
  const updateSectionContent = useCallback((subsectionTitle, content) => {
    if (!content) return;

    // Find the subsection by its title
    const subsections = document.querySelectorAll('.subsection-title');
    for (const subsection of subsections) {
      if (subsection.textContent.trim() === subsectionTitle) {
        // Find the content block within this subsection
        const contentBlock = subsection.parentElement.querySelector('.content-block');
        if (contentBlock) {
          // Check if the content is HTML or plain text
          if (/<[a-z][\s\S]*>/i.test(content)) {
            // It's HTML
            contentBlock.innerHTML = content;
          } else {
            // It's plain text - convert line breaks and preserve formatting
            contentBlock.innerHTML = '';
            const paragraph = document.createElement('p');
            paragraph.textContent = content;
            contentBlock.appendChild(paragraph);
          }
        }
        break;
      }
    }
  }, []);

  // Sample data for testing/preview
  const getSampleData = useCallback(() => {
    return {
      pageDeGarde: {
        nomProjet: "Plateforme E-commerce EcoStyle",
        nomClient: "EcoStyle SAS",
        date: new Date().toLocaleDateString('fr-FR'),
        versionDocument: "1.0",
        redacteurs: "Marie Dupont, Pierre Martin"
      },
      introduction: {
        contexteProjet: "Description du contexte du projet...",
        objectifGlobal: "Description de l'objectif global...",
        presentationCommanditaire: "Présentation du commanditaire...",
        porteeProjet: "Portée du projet..."
      },
      objectifsProjet: {
        objectifsFonctionnels: "Objectifs fonctionnels du projet...",
        objectifsNonFonctionnels: "Objectifs non fonctionnels du projet..."
      },
      // Sample data for other sections
    };
  }, []);

  // Function to process the CDC data from the form
  const processCDCData = useCallback((data) => {
    console.log('Processing CDC data:', data);

    // Update page de garde / cover page
    if (data.pageDeGarde) {
      const projectNameElement = document.querySelector('.project-name');
      const clientNameElement = document.querySelector('.client-name');

      if (projectNameElement) {
        projectNameElement.textContent = data.pageDeGarde.nomProjet || 'Titre du projet';
      }

      if (clientNameElement) {
        clientNameElement.textContent = 'Pour : ' + (data.pageDeGarde.nomClient || 'Nom du client');
      }

      // Update meta information
      const metaValues = document.querySelectorAll('.meta-value');
      if (metaValues.length >= 3) {
        metaValues[0].textContent = data.pageDeGarde.versionDocument || '1.0';
        metaValues[1].textContent = data.pageDeGarde.date || new Date().toLocaleDateString('fr-FR');

        // Format redacteurs (might be string or array)
        let redacteursText = '';
        if (data.pageDeGarde.redacteurs) {
          if (Array.isArray(data.pageDeGarde.redacteurs)) {
            redacteursText = data.pageDeGarde.redacteurs.join(', ');
          } else {
            redacteursText = data.pageDeGarde.redacteurs;
          }
        }
        metaValues[2].textContent = redacteursText || 'Prénom Nom';
      }
    }

    // Update introduction section
    if (data.introduction) {
      updateSectionContent('1.1 Contexte du projet', data.introduction.contexteProjet);
      updateSectionContent('1.2 Objectif global', data.introduction.objectifGlobal);
      updateSectionContent('1.3 Présentation du commanditaire', data.introduction.presentationCommanditaire);
      updateSectionContent('1.4 Portée du projet', data.introduction.porteeProjet);
    }

    // Update objectives section
    if (data.objectifsProjet) {
      updateSectionContent('2.1 Objectifs fonctionnels', data.objectifsProjet.objectifsFonctionnels);
      updateSectionContent('2.2 Objectifs non-fonctionnels', data.objectifsProjet.objectifsNonFonctionnels);
    }

    // Update needs description section
    if (data.descriptionBesoin) {
      updateSectionContent('3.1 Problèmes actuels ou opportunités', data.descriptionBesoin.problemesActuels);
      updateSectionContent('3.2 Utilisateurs cibles', data.descriptionBesoin.utilisateursCibles);
      updateSectionContent('3.3 Besoins exprimés par le client', data.descriptionBesoin.besoinsExprimes);
    }

    // Update functional scope section
    if (data.perimetreFonctionnel) {
      updateSectionContent('4.1 Authentification / inscription', data.perimetreFonctionnel.authentification);
      updateSectionContent('4.2 Tableau de bord', data.perimetreFonctionnel.tableauBord);
      updateSectionContent('4.3 Gestion des utilisateurs', data.perimetreFonctionnel.gestionUtilisateurs);
      updateSectionContent('4.4 Gestion des données', data.perimetreFonctionnel.gestionDonnees);
      updateSectionContent('4.5 Notifications', data.perimetreFonctionnel.notifications);
      updateSectionContent('4.6 Autres fonctionnalités', data.perimetreFonctionnel.autresFonctionnalites);
    }

    // Update technical constraints section
    if (data.contraintesTechniques) {
      updateSectionContent('5.1 Langages ou frameworks imposés', data.contraintesTechniques.langagesFrameworks);
      updateSectionContent('5.2 Base de données', data.contraintesTechniques.baseDonnees);
      updateSectionContent('5.3 Hébergement', data.contraintesTechniques.hebergement);
      updateSectionContent('5.4 Sécurité', data.contraintesTechniques.securite);
      updateSectionContent('5.5 Compatibilité', data.contraintesTechniques.compatibilite);
    }

    // Update planning section
    if (data.planningPrevisionnel) {
      updateSectionContent('6.1 Phases du projet', data.planningPrevisionnel.phasesProjet);
      updateSectionContent('6.2 Dates clés / livrables / jalons', data.planningPrevisionnel.datesCles);
      updateSectionContent('6.3 Durée estimée', data.planningPrevisionnel.dureeEstimee);
    }

    // Update budget section
    if (data.budget) {
      updateSectionContent('7.1 Estimation des coûts', data.budget.estimationCouts);
    }

    // Update validation criteria section
    if (data.criteresValidation) {
      updateSectionContent('8.1 Éléments à vérifier pour accepter le projet', data.criteresValidation.elementsVerifier);
      updateSectionContent('8.2 Scénarios de test, critères d\'acceptation', data.criteresValidation.scenariosTest);
    }

    // Update annexes section
    if (data.annexes) {
      updateSectionContent('9.1 Glossaire', data.annexes.glossaire);
      updateSectionContent('9.2 Documents techniques complémentaires', data.annexes.documentsComplementaires);
      updateSectionContent('9.3 Références / liens utiles', data.annexes.referencesUtiles);
    }

    // Update dates
    const currentDate = new Date().toLocaleDateString('fr-FR');
    if (document.getElementById('current-date')) {
      document.getElementById('current-date').textContent = currentDate;
    }
    if (document.getElementById('doc-date')) {
      document.getElementById('doc-date').textContent = data.pageDeGarde?.date || currentDate;
    }
    if (document.getElementById('doc-generation-date')) {
      document.getElementById('doc-generation-date').textContent = currentDate;
    }

    // Update footer copyright year
    const copyright = document.querySelector('.copyright');
    if (copyright) {
      copyright.innerHTML = copyright.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }

    // Add numbering to pages for the PDF
    addPageNumbers();
  }, [updateSectionContent, addPageNumbers]);

  // Use useCallback to memoize functions that will be used in useEffect dependencies
  const loadCDCData = useCallback(() => {
    console.log('Loading CDC data...');

    try {
      // Check if data is available in localStorage (for preview/testing)
      const localData = localStorage.getItem('cdcFormData');
      if (localData) {
        processCDCData(JSON.parse(localData));
        return;
      }

      // Get the CDC ID from URL query parameter if available
      const urlParams = new URLSearchParams(window.location.search);
      const cdcId = urlParams.get('id');

      if (!cdcId) {
        console.warn('No CDC ID provided in URL. Using sample data.');
        // Use sample data for preview
        processCDCData(getSampleData());
        return;
      }

      // For future implementation:
      // Fetch from API if needed
      processCDCData(getSampleData());

    } catch (error) {
      console.error('Error loading CDC data:', error);
      // Use sample data on error
      processCDCData(getSampleData());
    }
  }, [processCDCData, getSampleData]);

  // Memoize initializeButtons function for dependency array
  const initializeButtons = useCallback(() => {
    // Set up the download PDF button
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    if (downloadPdfButton) {
      downloadPdfButton.addEventListener('click', function() {
        window.print();
      });
    }

    // Set up the edit button
    const editButton = document.getElementById('editButton');
    if (editButton) {
      editButton.addEventListener('click', function() {
        // Navigate back to the form
        navigate('/create-cdc');
      });
    }
  }, [navigate]);

  // Add the missing dependencies to useEffect
  useEffect(() => {
    // Load data and initialize template when component mounts
    loadCDCData();

    // Initialize date fields
    const currentDate = new Date().toLocaleDateString('fr-FR');
    if (document.getElementById('current-date')) {
      document.getElementById('current-date').textContent = currentDate;
    }
    if (document.getElementById('doc-date')) {
      document.getElementById('doc-date').textContent = currentDate;
    }
    if (document.getElementById('doc-generation-date')) {
      document.getElementById('doc-generation-date').textContent = currentDate;
    }

    // Initialize buttons after rendering
    setTimeout(() => {
      initializeButtons();
      addPageNumbers();
      setLoading(false);
    }, 500);

    // Clean up event listeners on unmount
    return () => {
      const downloadPdfButton = document.getElementById('downloadPdfButton');
      const editButton = document.getElementById('editButton');

      if (downloadPdfButton) {
        downloadPdfButton.replaceWith(downloadPdfButton.cloneNode(true));
      }

      if (editButton) {
        editButton.replaceWith(editButton.cloneNode(true));
      }
    };
  }, [loadCDCData, initializeButtons, addPageNumbers]);

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
          }}>
            Chargement du cahier des charges...
          </div>
        </div>
      )}

      {/* CDC Template HTML Structure */}
      <div>
        {/* Contrôles (non imprimables) */}
        <div className="controls no-print">
          <button className="btn" onClick={() => window.print()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Imprimer
          </button>
          <button className="btn btn-secondary" id="editButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0-2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Modifier
          </button>
          <button className="btn btn-secondary" id="downloadPdfButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Télécharger PDF
          </button>
        </div>

        <div className="cdc-document">
          {/* Date de génération */}
          <div className="generate-date" contentEditable="true">Document généré le <span id="current-date"></span></div>

          {/* Page de garde */}
          <div className="cover-page">
            <div className="cover-header">
              <div className="logo-placeholder" contentEditable="true">
                <span className="upload-prompt">Cliquez pour ajouter un logo</span>
              </div>
            </div>

            <div className="cover-content">
              <h1 className="cover-title" contentEditable="true">CAHIER DES CHARGES</h1>
              <h2 className="project-name" contentEditable="true">Titre du projet</h2>
              <p className="client-name" contentEditable="true">Pour : Nom du client</p>
            </div>

            <div className="document-meta">
              <div className="meta-item">
                <span className="meta-label">Version du document :</span>
                <span className="meta-value" contentEditable="true">1.0</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date :</span>
                <span className="meta-value" contentEditable="true" id="doc-date"></span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Rédigé par :</span>
                <span className="meta-value" contentEditable="true">Prénom Nom</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Statut :</span>
                <span className="meta-value" contentEditable="true">Brouillon</span>
              </div>
            </div>

            <div className="cover-footer">
              <p contentEditable="true">Confidentiel – Reproduction interdite sans autorisation</p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="toc">
            <h2 className="toc-title">Table des matières</h2>
            <ul className="toc-list">
              <li className="toc-item">
                <span className="toc-item-number">1.</span>
                <span className="toc-item-title">Introduction</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">3</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">2.</span>
                <span className="toc-item-title">Objectifs du projet</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">4</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">3.</span>
                <span className="toc-item-title">Description du besoin</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">5</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">4.</span>
                <span className="toc-item-title">Périmètre fonctionnel</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">7</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">5.</span>
                <span className="toc-item-title">Contraintes techniques</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">10</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">6.</span>
                <span className="toc-item-title">Planning prévisionnel</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">12</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">7.</span>
                <span className="toc-item-title">Budget</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">13</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">8.</span>
                <span className="toc-item-title">Critères de validation</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">14</span>
              </li>
              <li className="toc-item">
                <span className="toc-item-number">9.</span>
                <span className="toc-item-title">Annexes</span>
                <span className="toc-item-dots"></span>
                <span className="toc-item-page">15</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <div className="section">
            <h2 className="section-title">1. Introduction</h2>

            <div className="subsection">
              <h3 className="subsection-title">1.1 Contexte du projet</h3>
              <div className="content-block">
                <p>Contexte du projet...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">1.2 Objectif global</h3>
              <div className="content-block">
                <p>Objectif global du projet...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">1.3 Présentation du commanditaire</h3>
              <div className="content-block">
                <p>Présentation du commanditaire...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">1.4 Portée du projet</h3>
              <div className="content-block">
                <p>Portée du projet...</p>
              </div>
            </div>
          </div>

          {/* Objectifs du projet */}
          <div className="section">
            <h2 className="section-title">2. Objectifs du projet</h2>

            <div className="subsection">
              <h3 className="subsection-title">2.1 Objectifs fonctionnels</h3>
              <div className="content-block">
                <p>Objectifs fonctionnels...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">2.2 Objectifs non-fonctionnels</h3>
              <div className="content-block">
                <p>Objectifs non-fonctionnels...</p>
              </div>
            </div>
          </div>

          {/* Description du besoin */}
          <div className="section">
            <h2 className="section-title">3. Description du besoin</h2>

            <div className="subsection">
              <h3 className="subsection-title">3.1 Problèmes actuels ou opportunités</h3>
              <div className="content-block">
                <p>Problèmes actuels ou opportunités...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">3.2 Utilisateurs cibles</h3>
              <div className="content-block">
                <p>Utilisateurs cibles...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">3.3 Besoins exprimés par le client</h3>
              <div className="content-block">
                <p>Besoins exprimés par le client...</p>
              </div>
            </div>
          </div>

          {/* Périmètre fonctionnel */}
          <div className="section">
            <h2 className="section-title">4. Périmètre fonctionnel</h2>

            <div className="subsection">
              <h3 className="subsection-title">4.1 Authentification / inscription</h3>
              <div className="content-block">
                <p>Authentification / inscription...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">4.2 Tableau de bord</h3>
              <div className="content-block">
                <p>Tableau de bord...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">4.3 Gestion des utilisateurs</h3>
              <div className="content-block">
                <p>Gestion des utilisateurs...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">4.4 Gestion des données</h3>
              <div className="content-block">
                <p>Gestion des données...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">4.5 Notifications</h3>
              <div className="content-block">
                <p>Notifications...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">4.6 Autres fonctionnalités</h3>
              <div className="content-block">
                <p>Autres fonctionnalités...</p>
              </div>
            </div>
          </div>

          {/* Contraintes techniques */}
          <div className="section">
            <h2 className="section-title">5. Contraintes techniques</h2>

            <div className="subsection">
              <h3 className="subsection-title">5.1 Langages ou frameworks imposés</h3>
              <div className="content-block">
                <p>Langages ou frameworks imposés...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">5.2 Base de données</h3>
              <div className="content-block">
                <p>Base de données...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">5.3 Hébergement</h3>
              <div className="content-block">
                <p>Hébergement...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">5.4 Sécurité</h3>
              <div className="content-block">
                <p>Sécurité...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">5.5 Compatibilité</h3>
              <div className="content-block">
                <p>Compatibilité...</p>
              </div>
            </div>
          </div>

          {/* Planning prévisionnel */}
          <div className="section">
            <h2 className="section-title">6. Planning prévisionnel</h2>

            <div className="subsection">
              <h3 className="subsection-title">6.1 Phases du projet</h3>
              <div className="content-block">
                <p>Phases du projet...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">6.2 Dates clés / livrables / jalons</h3>
              <div className="content-block">
                <p>Dates clés / livrables / jalons...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">6.3 Durée estimée</h3>
              <div className="content-block">
                <p>Durée estimée...</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="section">
            <h2 className="section-title">7. Budget</h2>

            <div className="subsection">
              <h3 className="subsection-title">7.1 Estimation des coûts</h3>
              <div className="content-block">
                <p>Estimation des coûts...</p>
              </div>
            </div>
          </div>

          {/* Critères de validation */}
          <div className="section">
            <h2 className="section-title">8. Critères de validation</h2>

            <div className="subsection">
              <h3 className="subsection-title">8.1 Éléments à vérifier pour accepter le projet</h3>
              <div className="content-block">
                <p>Éléments à vérifier pour accepter le projet...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">8.2 Scénarios de test, critères d'acceptation</h3>
              <div className="content-block">
                <p>Scénarios de test, critères d'acceptation...</p>
              </div>
            </div>
          </div>

          {/* Annexes */}
          <div className="section">
            <h2 className="section-title">9. Annexes</h2>

            <div className="subsection">
              <h3 className="subsection-title">9.1 Glossaire</h3>
              <div className="content-block">
                <p>Glossaire...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">9.2 Documents techniques complémentaires</h3>
              <div className="content-block">
                <p>Documents techniques complémentaires...</p>
              </div>
            </div>

            <div className="subsection">
              <h3 className="subsection-title">9.3 Références / liens utiles</h3>
              <div className="content-block">
                <p>Références / liens utiles...</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-container">
              <div className="footer-left">
                <p className="confidentiality">CONFIDENTIEL</p>
              </div>
              <div className="footer-center">
                <p className="company-name">Cahier des Charges</p>
              </div>
              <div className="footer-right">
                <p className="page-number">Page <span className="page-num"></span> sur <span className="total-pages"></span></p>
              </div>
            </div>
            <div className="footer-bottom">
              <hr />
              <p className="copyright">© 2025 - Tous droits réservés. Document généré le <span id="doc-generation-date"></span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CDCTemplate;