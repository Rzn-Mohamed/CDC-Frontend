/**
 * Function to download the document as a PDF file
 * In a real application, this would use a library like jsPDF or call a backend API
 */
function downloadPDF() {
    // Dans un environnement réel, cette fonction utiliserait une bibliothèque 
    // comme jsPDF ou appellerait une API backend pour générer le PDF
    alert("Fonctionnalité de téléchargement PDF - Dans une application réelle, cette action générerait un fichier PDF du document");
}

// Script pour le Cahier des Charges éditable
document.addEventListener('DOMContentLoaded', function() {
    const tocItems = document.querySelectorAll('.toc-item');
    
    tocItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionNumber = this.querySelector('.toc-item-number').textContent.replace('.', '');
            const sections = document.querySelectorAll('.section-title');
            
            sections.forEach(section => {
                if (section.textContent.startsWith(sectionNumber)) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Ajouter un style de survol pour indiquer la cliquabilité
        item.style.cursor = 'pointer';
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Initialisation des dates
    setCurrentDates();
    
    // Génération de la table des matières
    generateTableOfContents();
    
    // Événements pour l'édition
    setupEditableContent();
    
    // Événements pour les tableaux éditables
    setupEditableTables();
    
    // Événements pour l'ajout de sections/sous-sections
    setupSectionControls();
    
    // Événement pour le logo
    setupLogoUpload();
    
    // Bouton d'édition
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.addEventListener('click', toggleEditMode);
    }
    
    // Téléchargement PDF (note: nécessite généralement une bibliothèque comme html2pdf.js)
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', function() {
            alert('Pour exporter en PDF, utilisez la fonction d\'impression du navigateur (Ctrl+P ou Cmd+P)');
        });
    }
});

// Définir les dates actuelles dans le document
function setCurrentDates() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('fr-FR', options);
    
    // Date en haut du document
    const currentDateElements = document.querySelectorAll('#current-date');
    currentDateElements.forEach(el => el.textContent = formattedDate);
    
    // Date du document
    const docDateElements = document.querySelectorAll('#doc-date');
    docDateElements.forEach(el => el.textContent = formattedDate);
    
    // Date dans le pied de page
    const footerDateElements = document.querySelectorAll('#footer-date');
    footerDateElements.forEach(el => el.textContent = formattedDate);
}

// Générer la table des matières
function generateTableOfContents() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;
    
    const sections = document.querySelectorAll('.section');
    const tocList = document.createElement('ul');
    
    sections.forEach(section => {
        const sectionId = section.id;
        if (!sectionId) return;
        
        const sectionTitle = section.querySelector('.section-title');
        if (!sectionTitle) return;
        
        // Créer l'élément de la section dans la table des matières
        const sectionItem = document.createElement('li');
        sectionItem.classList.add('toc-section');
        
        const sectionLink = document.createElement('a');
        sectionLink.href = `#${sectionId}`;
        sectionLink.innerHTML = `<span class="toc-number">${sectionTitle.textContent.split('.')[0]}.</span> ${sectionTitle.textContent.split('.').slice(1).join('.').trim()}`;
        
        sectionItem.appendChild(sectionLink);
        tocList.appendChild(sectionItem);
        
        // Ajouter les sous-sections
        const subsections = section.querySelectorAll('.subsection-title');
        if (subsections.length > 0) {
            const subsectionList = document.createElement('ul');
            
            subsections.forEach(subsection => {
                const subsectionItem = document.createElement('li');
                subsectionItem.classList.add('toc-subsection');
                
                const subsectionText = subsection.textContent;
                const subsectionLink = document.createElement('a');
                subsectionLink.href = `#${subsection.id || sectionId}`;
                subsectionLink.innerHTML = `<span class="toc-number">${subsectionText.split('.')[0]}.${subsectionText.split('.')[1]}</span> ${subsectionText.split('.').slice(2).join('.').trim()}`;
                
                subsectionItem.appendChild(subsectionLink);
                subsectionList.appendChild(subsectionItem);
            });
            
            tocList.appendChild(subsectionList);
        }
    });
    
    // Ajouter la table des matières au conteneur
    const existingList = tocContainer.querySelector('ul');
    if (existingList) {
        tocContainer.replaceChild(tocList, existingList);
    } else {
        tocContainer.appendChild(tocList);
    }
}

// Configuration des champs éditables
function setupEditableContent() {
    // Animation initiale pour montrer les éléments éditables
    document.body.classList.add('show-editable');
    setTimeout(() => {
        document.body.classList.remove('show-editable');
    }, 2000);
    
    // Écouter les changements sur les éléments éditables
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.addEventListener('blur', function() {
            // Éventuellement sauvegarder les changements ou mettre à jour la table des matières
            // si un titre est modifié
            if (element.classList.contains('section-title') || element.classList.contains('subsection-title')) {
                generateTableOfContents();
            }
        });
        
        // Éviter les sauts de ligne non désirés
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                if (!element.classList.contains('content-block')) {
                    e.preventDefault();
                    element.blur();
                }
            }
        });
    });
}

// Configuration des tableaux éditables
function setupEditableTables() {
    document.querySelectorAll('.add-row-btn').forEach(button => {
        button.addEventListener('click', function() {
            const table = this.previousElementSibling;
            if (table && table.tagName === 'TABLE') {
                const lastRow = table.rows[table.rows.length - 1];
                const newRow = table.insertRow();
                
                // Créer les cellules basées sur le nombre de cellules dans la dernière ligne
                for (let i = 0; i < lastRow.cells.length; i++) {
                    const cell = newRow.insertCell();
                    cell.textContent = 'Cliquez pour éditer';
                    cell.contentEditable = true;
                }
            }
        });
    });
}

// Configuration des contrôles de section
function setupSectionControls() {
    // Bouton pour ajouter une section complète
    const addSectionBtn = document.getElementById('add-section-btn');
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', function() {
            const sections = document.querySelectorAll('.section');
            const newSectionNumber = sections.length + 1;
            
            const newSection = document.createElement('div');
            newSection.className = 'section';
            newSection.id = `nouvelle-section-${newSectionNumber}`;
            
            newSection.innerHTML = `
                <h2 class="section-title" contenteditable="true">${newSectionNumber}. Nouvelle section</h2>
                
                <div class="subsection">
                    <h3 class="subsection-title" contenteditable="true">${newSectionNumber}.1 Nouvelle sous-section</h3>
                    <div class="content-block" contenteditable="true">
                        <p>Cliquez pour éditer le contenu.</p>
                    </div>
                </div>
                
                <div class="template-section">
                    <button class="add-subsection-btn" data-section="nouvelle-section-${newSectionNumber}">+ Ajouter une sous-section</button>
                </div>
            `;
            
            // Insérer avant les contrôles de section
            const sectionControls = document.querySelector('.section-controls');
            sectionControls.parentNode.insertBefore(newSection, sectionControls);
            
            // Mettre à jour la table des matières
            generateTableOfContents();
            
            // Configurer les événements sur la nouvelle section
            setupEditableContent();
            setupSectionControls();
        });
    }
    
    // Boutons pour ajouter des sous-sections
    document.querySelectorAll('.add-subsection-btn').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId) || this.closest('.section');
            
            if (section) {
                const sectionTitle = section.querySelector('.section-title');
                const sectionNumber = sectionTitle ? sectionTitle.textContent.split('.')[0] : '?';
                
                const subsections = section.querySelectorAll('.subsection');
                const newSubsectionNumber = subsections.length + 1;
                
                const newSubsection = document.createElement('div');
                newSubsection.className = 'subsection';
                
                newSubsection.innerHTML = `
                    <h3 class="subsection-title" contenteditable="true">${sectionNumber}.${newSubsectionNumber} Nouvelle sous-section</h3>
                    <div class="content-block" contenteditable="true">
                        <p>Cliquez pour éditer le contenu.</p>
                    </div>
                `;
                
                // Insérer avant la template-section
                const templateSection = section.querySelector('.template-section');
                if (templateSection) {
                    section.insertBefore(newSubsection, templateSection);
                } else {
                    section.appendChild(newSubsection);
                }
                
                // Mettre à jour la table des matières
                generateTableOfContents();
                
                // Configurer les événements sur la nouvelle sous-section
                setupEditableContent();
            }
        });
    });
}

// Configuration du téléchargement de logo
function setupLogoUpload() {
    const logoPlaceholder = document.querySelector('.logo-placeholder');
    if (logoPlaceholder) {
        logoPlaceholder.addEventListener('click', function() {
            // Créer un input file invisible
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', function() {
                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Créer une image avec le fichier téléchargé
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        
                        // Remplacer le contenu du placeholder par l'image
                        logoPlaceholder.innerHTML = '';
                        logoPlaceholder.appendChild(img);
                    };
                    
                    reader.readAsDataURL(fileInput.files[0]);
                }
            });
            
            // Déclencher le dialogue de sélection de fichier
            fileInput.click();
        });
    }
}

// Activer/désactiver le mode d'édition
function toggleEditMode() {
    const editables = document.querySelectorAll('[contenteditable="true"]');
    const isCurrentlyEditable = editables[0].contentEditable === 'true';
    
    editables.forEach(element => {
        element.contentEditable = isCurrentlyEditable ? 'false' : 'true';
    });
    
    // Mettre à jour le texte du bouton
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.innerHTML = isCurrentlyEditable ? 
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Activer l\'édition' : 
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M5 12L12 19M5 12L12 5"></path></svg> Désactiver l\'édition';
    }
    
    // Afficher/masquer les contrôles d'édition
    const editControls = document.querySelectorAll('.add-row-btn, .add-subsection-btn, .section-controls');
    editControls.forEach(control => {
        control.style.display = isCurrentlyEditable ? 'none' : 'block';
    });
    
    // Mettre en évidence les champs éditables
    if (!isCurrentlyEditable) {
        document.body.classList.add('show-editable');
        setTimeout(() => {
            document.body.classList.remove('show-editable');
        }, 2000);
    }
}