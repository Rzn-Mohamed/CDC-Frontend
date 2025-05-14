import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../templates/cdc-style.css';
import ProgressBar from '../ProgressBar/ProgressBar.js';

const CDCTemplate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [titleColor, setTitleColor] = useState('#2563eb');
  const [showProgressBar, setShowProgressBar] = useState(false);

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

  // Enhance the document UI
  const enhanceDocumentUI = useCallback(() => {
    // Add subtle shadow to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.03)';
      section.style.borderRadius = '6px';
      section.style.background = 'white';
      section.style.marginBottom = '20px';
    });
    
    // Enhance table of contents
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach(item => {
      item.style.transition = 'transform 0.2s ease';
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(5px)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
      });
    });
    
    // Add subtle animations and effects to elements
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      title.style.position = 'relative';
      title.style.overflow = 'hidden';
      
      // Add decorative element
      const decorativeElement = document.createElement('div');
      decorativeElement.style.position = 'absolute';
      decorativeElement.style.bottom = '0';
      decorativeElement.style.left = '0';
      decorativeElement.style.width = '80px';
      decorativeElement.style.height = '2px';
      decorativeElement.style.backgroundColor = titleColor;
      decorativeElement.style.transition = 'width 0.3s ease';
      
      title.appendChild(decorativeElement);
      
      title.addEventListener('mouseenter', () => {
        decorativeElement.style.width = '100%';
      });
      
      title.addEventListener('mouseleave', () => {
        decorativeElement.style.width = '80px';
      });
    });
  }, [titleColor]);

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
            
            // Split by line breaks and create a paragraph for each significant chunk
            const paragraphs = content.split(/\n\s*\n/); // Split on empty lines
            paragraphs.forEach(paragraph => {
              if (paragraph.trim()) {
                // Create paragraph element
                const p = document.createElement('p');
                
                // Handle line breaks within paragraphs
                const lines = paragraph.split('\n');
                for (let i = 0; i < lines.length; i++) {
                  if (i > 0) {
                    p.appendChild(document.createElement('br'));
                  }
                  p.appendChild(document.createTextNode(lines[i]));
                }
                
                contentBlock.appendChild(p);
              }
            });
          }
          
          // Add print-friendly classes to all paragraphs
          const paragraphs = contentBlock.querySelectorAll('p');
          paragraphs.forEach(p => {
            p.classList.add('print-paragraph');
          });
        }
        break;
      }
    }
  }, []);

  // Sample data for testing/preview
  const getSampleData = useCallback(() => {
    return {
      pageDeGarde: {
        nomProjet: "Outils en ligne de génération automatique des cahiers des charges",
        nomClient: "EMSI - École Marocaine des Sciences de l'Ingénieur",
        date: new Date().toLocaleDateString('fr-FR'),
        versionDocument: "1.0",
        redacteurs: "Razin Mohamed, Équipe IA, Département Informatique"
      },
      introduction: {
        contexteProjet: "Dans un environnement professionnel de plus en plus exigeant en termes de qualité documentaire, la rédaction de cahiers des charges reste une étape cruciale mais chronophage dans le développement de projets. Les entreprises et indépendants peinent souvent à produire des documents formalisés, complets et adaptés à leurs besoins spécifiques.",
        objectifGlobal: "Ce projet vise à développer une plateforme web intuitive permettant de générer automatiquement des cahiers des charges professionnels, structurés et personnalisables. L'outil guidera l'utilisateur à travers un processus simplifié de saisie d'informations pour produire un document répondant aux standards de l'industrie, tout en intégrant des recommandations adaptatives basées sur l'intelligence artificielle.",
        presentationCommanditaire: "Ce projet est commandité par le département d'informatique de l'EMSI (École Marocaine des Sciences de l'Ingénieur). Il s'inscrit dans une initiative visant à améliorer les pratiques de gestion de projet et à fournir aux étudiants, professionnels et entreprises des outils modernes pour la formalisation de leurs besoins fonctionnels et techniques.",
        porteeProjet: "La plateforme permettra aux utilisateurs de générer des cahiers des charges pour divers types de projets informatiques, avec différents niveaux de complexité et de personnalisation. Elle intégrera des modèles prédéfinis, des suggestions intelligentes de contenu, et des fonctionnalités d'exportation vers différents formats."
      },
      objectifsProjet: {
        objectifsFonctionnels: "- Création de cahiers des charges dynamiques via une interface guidée et intuitive\n- Proposition automatique de contenus adaptés au secteur et à la nature du projet\n- Génération de documents structurés selon différents modèles (traditionnel, agile, etc.)\n- Exportation des documents en formats PDF, Word et HTML\n- Partage sécurisé des cahiers des charges avec possibilité de collaboration",
        objectifsNonFonctionnels: "- Interface utilisateur responsive, accessible sur tous appareils (desktop, tablette, mobile)\n- Haute performance avec temps de génération des documents inférieur à 3 secondes\n- Protection des données utilisateurs conforme au RGPD\n- Architecture modulaire facilitant l'ajout de nouveaux modèles et fonctionnalités\n- Disponibilité du service 24/7 avec un taux de disponibilité de 99,9%"
      },
      descriptionBesoin: {
        problemesActuels: "La rédaction de cahiers des charges est souvent perçue comme un exercice fastidieux et technique. Les difficultés rencontrées incluent le manque de structure cohérente, l'omission d'informations essentielles, et la difficulté à adapter le document au contexte spécifique du projet.",
        utilisateursCibles: "La plateforme s'adresse principalement aux chefs de projet, consultants IT, entrepreneurs, étudiants en informatique et aux équipes de développement qui doivent régulièrement produire ou analyser des cahiers des charges.",
        besoinsExprimes: "Les utilisateurs ont besoin d'un outil qui les guide à travers le processus de création d'un cahier des charges sans qu'ils aient besoin de connaissances préalables sur sa structure idéale. Ils souhaitent pouvoir générer rapidement un document professionnel, personnalisable, et qui intègre automatiquement les bonnes pratiques du domaine."
      }
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
      // Get the CDC ID from URL query parameter if available
      const urlParams = new URLSearchParams(window.location.search);
      const cdcId = urlParams.get('id');
      const isGenerating = urlParams.get('generate') === 'true';

      // If we're generating a new document, show the progress bar
      if (isGenerating) {
        setShowProgressBar(true);
      } else {
        setShowProgressBar(false);
      }

      // Check if we have an ID and if it's from a saved document
      if (cdcId) {
        console.log('Looking for document with ID:', cdcId);
        // Try to find the document in dashboardDocuments
        const savedDocuments = localStorage.getItem('dashboardDocuments');
        
        if (savedDocuments) {
          const documents = JSON.parse(savedDocuments);
          const savedDocument = documents.find(doc => doc.id.toString() === cdcId.toString());
          
          if (savedDocument) {
            console.log('Found saved document:', savedDocument);
            // Document found in dashboard, no need for progress bar
            setShowProgressBar(false);
            
            // Document found in dashboard, try to load the corresponding form data
            const formData = localStorage.getItem('cdcFormData');
            
            if (formData) {
              processCDCData(JSON.parse(formData));
              setLoading(false);
              return;
            }
          }
        }
      }

      // If no ID provided or document not found by ID, check if form data exists in localStorage
      const localData = localStorage.getItem('cdcFormData');
      if (localData) {
        processCDCData(JSON.parse(localData));
        
        // If not explicitly generating, don't show progress bar
        if (!isGenerating) {
          setShowProgressBar(false);
          setLoading(false);
        }
        return;
      }

      // No data found, use sample data as fallback
      console.warn('No document found. Using sample data.');
      processCDCData(getSampleData());

    } catch (error) {
      console.error('Error loading CDC data:', error);
      // Use sample data on error
      processCDCData(getSampleData());
    }
  }, [processCDCData, getSampleData]);

  // Function to handle color change - improve to ensure it works properly
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setTitleColor(newColor);
    
    // Apply the color to all section and subsection titles
    const sectionTitles = document.querySelectorAll('.section-title, .subsection-title, .cover-title');
    sectionTitles.forEach(title => {
      title.style.color = newColor;
    });
    
    // Store the color preference in localStorage for persistence
    localStorage.setItem('cdcTitleColor', newColor);
  };
  
  // Function to handle save
  const handleSave = () => {
    try {
      // Get document data - first try from localStorage, then get from current document content
      const currentData = localStorage.getItem('cdcFormData') 
        ? JSON.parse(localStorage.getItem('cdcFormData')) 
        : {};
      
      // Extract title and version info from the document
      const projectNameElement = document.querySelector('.project-name');
      const metaValues = document.querySelectorAll('.meta-value');
      
      // Generate unique document data to be saved to dashboard
      const newDocument = {
        id: Date.now(), // Unique ID based on timestamp
        title: projectNameElement ? `CDC - ${projectNameElement.textContent}` : 'CDC - New Document',
        type: 'pdf',
        lastModified: 'Just now',
        version: metaValues.length > 0 ? metaValues[0].textContent : 'v1.0',
        contributors: []
      };
      
      // If we have redacteurs/authors data, use it for contributors
      if (currentData.pageDeGarde && currentData.pageDeGarde.redacteurs) {
        // Convert string to array if needed
        if (typeof currentData.pageDeGarde.redacteurs === 'string') {
          newDocument.contributors = currentData.pageDeGarde.redacteurs
            .split(/[,\n]/) // Split by commas or newlines
            .map(name => name.trim())
            .filter(name => name); // Remove empty entries
        } else if (Array.isArray(currentData.pageDeGarde.redacteurs)) {
          newDocument.contributors = currentData.pageDeGarde.redacteurs;
        }
      }
      
      // Get existing documents from localStorage or use empty array
      const existingDocuments = localStorage.getItem('dashboardDocuments') 
        ? JSON.parse(localStorage.getItem('dashboardDocuments')) 
        : [];
      
      // Add new document to the beginning of the array
      const updatedDocuments = [newDocument, ...existingDocuments];
      
      // Save the updated documents array back to localStorage
      localStorage.setItem('dashboardDocuments', JSON.stringify(updatedDocuments));
      
      // Show confirmation message to user
      alert('Document sauvegardé avec succès! Redirection vers le tableau de bord...');
      
      // Close the actions menu
      setIsActionsOpen(false);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Une erreur est survenue lors de la sauvegarde du document. Veuillez réessayer.');
    }
  };
  
  // Toggle actions menu
  const toggleActions = () => {
    setIsActionsOpen(prev => !prev);
  };

  // Memoize initializeButtons function for dependency array
  const initializeButtons = useCallback(() => {
    // Set up the download PDF button
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    if (downloadPdfButton) {
      downloadPdfButton.addEventListener('click', function() {
        window.print();
        setIsActionsOpen(false); // Close the menu after action
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

  // Handle progress bar completion
  const handleProgressComplete = () => {
    setShowProgressBar(false);
    setLoading(false); // Turn off loading once progress bar is complete
  };

  // Add the missing dependencies to useEffect
  useEffect(() => {
    // Add print styles to handle page breaks
    const printStyles = document.createElement('style');
    printStyles.textContent = `
      @media print {
        /* Avoid breaking inside important elements */
        .subsection, h2, h3 {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        /* Allow paragraphs to break across pages if needed */
        p {
          orphans: 3;
          widows: 3;
        }
        
        /* Force page breaks before major sections */
        .section {
          break-before: page;
          page-break-before: always;
        }
        
        /* Prevent page breaks after headings */
        h2, h3 {
          break-after: avoid;
          page-break-after: avoid;
        }
        
        /* First section shouldn't have page break before it */
        .section:first-of-type {
          break-before: auto;
          page-break-before: auto;
        }
        
        /* Special handling for cover page and TOC */
        .cover-page {
          break-after: page;
          page-break-after: always;
        }
        
        .toc {
          break-after: page;
          page-break-after: always;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Load data and initialize template when component mounts
    loadCDCData();

    // Load saved color preference if exists
    const savedColor = localStorage.getItem('cdcTitleColor');
    if (savedColor) {
      setTitleColor(savedColor);
      setTimeout(() => {
        const sectionTitles = document.querySelectorAll('.section-title, .subsection-title, .cover-title');
        sectionTitles.forEach(title => {
          title.style.color = savedColor;
        });
      }, 100);
    }

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

    // Initialize buttons after rendering but don't set loading to false here
    setTimeout(() => {
      initializeButtons();
      addPageNumbers();
      enhanceDocumentUI();
      
      // If no progress bar is shown, set loading to false immediately
      if (!showProgressBar) {
        setLoading(false);
      }
      // Otherwise, let the progress bar control when loading is set to false
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
      document.head.removeChild(printStyles);
    };
  }, [loadCDCData, initializeButtons, addPageNumbers, enhanceDocumentUI, showProgressBar]);

  return (
    <>
      {showProgressBar && (
        <ProgressBar 
          duration={45000} // 45 seconds
          onComplete={handleProgressComplete}
          phrases={[
            "Initialisation du cahier des charges...",
            "Analyse des données du projet...",
            "Structuration des sections...",
            "Optimisation du contenu avec IA...",
            "Génération des annexes...",
            "Mise en page du document...",
            "Application des bonnes pratiques...",
            "Vérification de la cohérence...",
            "Finalisation du document...",
            "C'est presque terminé !"
          ]}
        />
      )}
      
      {loading && !showProgressBar && (
        <div className="progress-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <div className="progress-icon">
            <div className="spinner"></div>
          </div>
          <div className="progress-text">
            <h2>Chargement du document</h2>
            <p className="progress-phrase">Préparation du cahier des charges...</p>
          </div>
        </div>
      )}

      {/* The rest of the UI is only displayed after the progress bar completes */}
      <div style={{ display: showProgressBar ? 'none' : 'block' }}>
        {/* Floating Actions Button - moved to top */}
        <div className={`floating-actions-container no-print ${isActionsOpen ? 'open' : ''}`}>
          <button 
            className="floating-action-button main-action" 
            onClick={toggleActions}
            title={isActionsOpen ? "Fermer les actions" : "Ouvrir les actions"}
          >
            {isActionsOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            }
          </button>
          
          {isActionsOpen && (
            <div className="action-buttons">
              <button className="action-button" onClick={() => window.print()} title="Imprimer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>Imprimer</span>
              </button>
              
              <button className="action-button" onClick={handleSave} title="Sauvegarder">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Sauvegarder</span>
              </button>
              
              <div className="action-button color-picker-container" title="Changer couleur des titres">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c-4.97 0-9-4.03-9-9m9 9a9 9 0 0 0 9-9m-9 0c4.97 0 9 4.03 9 9m-9 0a9 9 0 0 0-9 9"></path>
                </svg>
                <span>Couleur titres</span>
                <input 
                  type="color" 
                  value={titleColor} 
                  onChange={handleColorChange}
                  className="color-picker"
                  title="Choisir une couleur"
                />
              </div>
            </div>
          )}
        </div>

        {/* CDC Template HTML Structure */}
        <div>
          {/* Remove old controls since we now have the floating action menu */}
          
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
      </div>

      {/* CSS styles for the floating action button and menu */}
        <style jsx="true">{`
          .floating-actions-container {
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1000;
          }
          
          .floating-action-button {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #2563eb;
            color: white;
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 10px;
          }
          
          .floating-action-button:hover {
            background-color: #1d4ed8;
            transform: scale(1.05);
          }
          
          .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            background-color: white;
            border-radius: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            border: 1px solid #e0e0e0;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }
          
          .action-button:hover {
            background-color: #f5f5f5;
            transform: translateX(-5px);
          }
          
          .action-button svg {
            margin-right: 8px;
            flex-shrink: 0;
          }
          
          .color-picker-container {
            position: relative;
            display: flex;
            align-items: center;
          }
          
          .color-picker {
            margin-left: 10px;
            width: 30px;
            height: 30px;
            padding: 0;
            border: none;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            background-color: transparent;
          }
          
          .color-picker::-webkit-color-swatch-wrapper {
            padding: 0;
          }
          
          .color-picker::-webkit-color-swatch {
            border: none;
            border-radius: 50%;
          }
          
          /* Fix for Firefox */
          .color-picker::-moz-color-swatch {
            border: none;
            border-radius: 50%;
          }
        `}</style>
    </>
  );
};

export default CDCTemplate;