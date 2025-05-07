/**
 * Cahier des Charges - Scripts
 * Handles dynamic functionality for a professional document similar to Google Docs
 */

/**
 * Function to download the document as a PDF file
 * In a real application, this would use a library like jsPDF or call a backend API
 */
function downloadPDF() {
    // Dans un environnement réel, cette fonction utiliserait une bibliothèque 
    // comme jsPDF ou appellerait une API backend pour générer le PDF
    alert("Fonctionnalité de téléchargement PDF - Dans une application réelle, cette action générerait un fichier PDF du document");
}

document.addEventListener('DOMContentLoaded', function() {
    // Set current date in the document
    updateDates();
    
    // Initialize page numbering
    initPageNumbering();
    
    // Make document editable on click
    initEditableDocument();
    
    // Initialize print and download functionality
    initButtons();
    
    // Configure TOC items for smooth scrolling
    initTOCNavigation();
    
    // Génération de la table des matières
    generateTableOfContents();
    
    // Événements pour les tableaux éditables
    setupEditableTables();
    
    // Événements pour l'ajout de sections/sous-sections
    setupSectionControls();
    
    // Événement pour le logo
    setupLogoUpload();
});

/**
 * Initialize table of contents navigation
 */
function initTOCNavigation() {
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
            this.style.backgroundColor = 'rgba(26, 115, 232, 0.1)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

/**
 * Updates all date fields in the document
 */
function updateDates() {
    // Current date for the document generation date
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('fr-FR', options);
    const shortFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const shortFormattedDate = now.toLocaleDateString('fr-FR', shortFormatOptions);
    
    // Update current date elements
    const currentDateElements = document.querySelectorAll('#current-date');
    currentDateElements.forEach(el => {
        if (el) el.textContent = shortFormattedDate;
    });
    
    // Update document date elements
    const docDateElements = document.querySelectorAll('#doc-date');
    docDateElements.forEach(el => {
        if (el) el.textContent = shortFormattedDate;
    });
    
    // Update generation date in footer
    const generationDateElements = document.querySelectorAll('#doc-generation-date');
    generationDateElements.forEach(el => {
        if (el) el.textContent = formattedDate;
    });
    
    // Date dans le pied de page
    const footerDateElements = document.querySelectorAll('#footer-date');
    footerDateElements.forEach(el => {
        if (el) el.textContent = shortFormattedDate;
    });
}

/**
 * Initializes page numbering in the document footer
 */
function initPageNumbering() {
    // Count total number of pages (sections + cover + toc)
    const sections = document.querySelectorAll('.section');
    const totalPages = sections.length + 2; // +2 for cover page and TOC
    
    // Update all total pages elements
    const totalPagesElements = document.querySelectorAll('.total-pages');
    totalPagesElements.forEach(el => {
        if (el) el.textContent = totalPages;
    });
    
    // Initialize page numbers
    const pageNumElements = document.querySelectorAll('.page-num');
    pageNumElements.forEach((el, index) => {
        if (el) el.textContent = (index + 3); // Start from 3 because cover page is 1, TOC is 2
    });
    
    // Special handling for print mode to show correct page numbers
    window.addEventListener('beforeprint', function() {
        updatePageNumbersForPrint();
    });
}

/**
 * Updates page numbers when printing
 */
function updatePageNumbersForPrint() {
    // This function would be more complex in a full implementation
    // to accurately track page numbers during print
    console.log('Preparing document for printing with page numbers');
}

/**
 * Générer la table des matières
 */
function generateTableOfContents() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;
    
    const sections = document.querySelectorAll('.section');
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    sections.forEach(section => {
        const sectionId = section.id;
        if (!sectionId) return;
        
        const sectionTitle = section.querySelector('.section-title');
        if (!sectionTitle) return;
        
        // Créer l'élément de la section dans la table des matières
        const sectionItem = document.createElement('li');
        sectionItem.classList.add('toc-item');
        
        const sectionNumber = document.createElement('span');
        sectionNumber.className = 'toc-item-number';
        sectionNumber.textContent = sectionTitle.textContent.split('.')[0] + '.';
        
        const sectionTitleSpan = document.createElement('span');
        sectionTitleSpan.className = 'toc-item-title';
        sectionTitleSpan.textContent = sectionTitle.textContent.split('.').slice(1).join('.').trim();
        
        const dotsSpan = document.createElement('span');
        dotsSpan.className = 'toc-item-dots';
        
        const pageSpan = document.createElement('span');
        pageSpan.className = 'toc-item-page';
        pageSpan.textContent = sections.indexOf(section) + 3; // +3 car page 1=couverture, page 2=TOC
        
        sectionItem.appendChild(sectionNumber);
        sectionItem.appendChild(sectionTitleSpan);
        sectionItem.appendChild(dotsSpan);
        sectionItem.appendChild(pageSpan);
        tocList.appendChild(sectionItem);
    });
    
    // Ajouter la table des matières au conteneur
    const existingList = tocContainer.querySelector('ul');
    if (existingList) {
        tocContainer.replaceChild(tocList, existingList);
    } else {
        tocContainer.appendChild(tocList);
    }
    
    // Initialize TOC navigation after generating
    initTOCNavigation();
}

/**
 * Makes the document editable with visual cues
 */
function initEditableDocument() {
    // Animation initiale pour montrer les éléments éditables
    document.body.classList.add('show-editable');
    setTimeout(() => {
        document.body.classList.remove('show-editable');
    }, 2000);
    
    // Show edit button functionality
    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.addEventListener('click', toggleEditMode);
    }
    
    // Add contenteditable attribute change tracking
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.addEventListener('focus', function() {
            this.dataset.beforeEditContent = this.innerHTML;
        });
        
        el.addEventListener('blur', function() {
            if (this.dataset.beforeEditContent !== this.innerHTML) {
                console.log('Content changed:', this);
                // Here you could implement saving changes to backend
                
                // Update TOC if a title was changed
                if (this.classList.contains('section-title') || this.classList.contains('subsection-title')) {
                    generateTableOfContents();
                }
            }
        });
        
        // Éviter les sauts de ligne non désirés
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                if (!this.classList.contains('content-block')) {
                    e.preventDefault();
                    this.blur();
                }
            }
        });
    });
}

/**
 * Initialize button functionality
 */
function initButtons() {
    // Print button already handled by inline onclick in HTML
    
    // PDF Download button
    const downloadPdfButton = document.getElementById('downloadPdfButton');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', downloadPDF);
    }
}

/**
 * Configuration des tableaux éditables
 */
function setupEditableTables() {
    document.querySelectorAll('.add-row-btn').forEach(button => {
        button.addEventListener('click', function() {
            const table = this.previousElementSibling;
            if (table && table.tagName === 'TABLE') {
                addTableRow(table);
            }
        });
    });
}

/**
 * Function to add a new row to a table
 * @param {HTMLElement} tableElement - The table to add a row to
 */
function addTableRow(tableElement) {
    if (!tableElement) return;
    
    const lastRow = tableElement.rows[tableElement.rows.length - 1];
    const newRow = tableElement.insertRow();
    
    // Créer les cellules basées sur le nombre de cellules dans la dernière ligne
    for (let i = 0; i < lastRow.cells.length; i++) {
        const cell = newRow.insertCell();
        cell.textContent = 'Cliquez pour éditer';
        cell.contentEditable = true;
    }
}

/**
 * Configuration des contrôles de section
 */
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
            initEditableDocument();
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
                
                const newSubsection = createNewSubsection(`${sectionNumber}.${newSubsectionNumber} Nouvelle sous-section`);
                
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
                initEditableDocument();
            }
        });
    });
}

/**
 * Generate placeholder content for a new subsection
 * @param {string} sectionTitle - Title of the new subsection
 * @returns {HTMLElement} - New subsection element
 */
function createNewSubsection(sectionTitle = 'Nouvelle sous-section') {
    const subsection = document.createElement('div');
    subsection.className = 'subsection';
    
    const title = document.createElement('h3');
    title.className = 'subsection-title';
    title.setAttribute('contenteditable', 'true');
    title.textContent = sectionTitle;
    
    const content = document.createElement('div');
    content.className = 'content-block';
    
    const paragraph = document.createElement('p');
    paragraph.setAttribute('contenteditable', 'true');
    paragraph.textContent = 'Cliquez pour éditer le contenu...';
    
    content.appendChild(paragraph);
    subsection.appendChild(title);
    subsection.appendChild(content);
    
    return subsection;
}

/**
 * Configuration du téléchargement de logo
 */
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

/**
 * Activer/désactiver le mode d'édition
 */
function toggleEditMode() {
    const editables = document.querySelectorAll('[contenteditable="true"]');
    const isCurrentlyEditable = editables[0].contentEditable === 'true';
    
    editables.forEach(element => {
        element.contentEditable = isCurrentlyEditable ? 'false' : 'true';
    });
    
    // Mettre à jour le texte du bouton
    const editButton = document.getElementById('editButton');
    if (editButton) {
        if (isCurrentlyEditable) {
            editButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Modifier
            `;
        } else {
            editButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5"></path>
                </svg>
                Terminer l'édition
            `;
        }
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