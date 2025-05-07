// Script pour communiquer avec Gemini via la console en se basant sur les données d'un CDC spécifique
import { fetchDataFromBackend, askGemini, initGeminiModel, fetchAllCDCs, fetchCDCById } from '../genai.js';
import readline from 'readline';

// Création d'une interface pour la saisie dans le terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour poser une question à Gemini avec le contexte du CDC
const askGeminiWithCDCContext = async (question, cdcData) => {
  try {
    console.log(`Analysant les données du CDC et préparant la réponse à: "${question}"`);
    
    const model = initGeminiModel();
    
    // Préparer un prompt qui inclut les données du CDC et la question de l'utilisateur
    const prompt = `
    Tu es un assistant spécialisé dans l'aide à la rédaction de Cahiers des Charges (CDC).
    Utilise les données du CDC suivantes pour répondre à la question de l'utilisateur.
    
    Données du CDC:
    ${JSON.stringify(cdcData, null, 2)}
    
    Question de l'utilisateur: ${question}
    
    Réponds de manière concise et précise en te basant uniquement sur les données fournies.
    `;
    
    // Envoyer le prompt à Gemini
    const result = await model.generateContent(prompt);
    const response = result.response?.text();
    
    console.log("\n--- Réponse de Gemini sur le CDC ---");
    console.log(response);
    console.log("--- Fin de la réponse ---\n");
    
    return response;
  } catch (error) {
    console.error("Erreur lors de la communication avec Gemini:", error.message);
    throw error;
  }
};

// Fonction pour afficher la liste des CDC disponibles et permettre à l'utilisateur de choisir
const selectCDC = async () => {
  try {
    console.log("Récupération de la liste des CDC disponibles...");
    
    let allCDCs;
    
    try {
      // Tenter de récupérer tous les CDC
      allCDCs = await fetchAllCDCs();
      
      if (!allCDCs || allCDCs.length === 0) {
        throw new Error("Aucun CDC trouvé");
      }
      
    } catch (error) {
      console.warn("Impossible de récupérer la liste des CDC depuis le backend. Utilisation de données fictives.");
      
      // Données fictives au cas où le backend n'est pas disponible
      allCDCs = [
        { id: "mock-cdc-1", title: "Projet de gestion documentaire" },
        { id: "mock-cdc-2", title: "Application mobile de suivi de santé" },
        { id: "mock-cdc-3", title: "Plateforme e-commerce" }
      ];
    }
    
    console.log("\n=== CDC Disponibles ===");
    allCDCs.forEach((cdc, index) => {
      console.log(`${index + 1}. ${cdc.title} (ID: ${cdc.id})`);
    });
    
    return new Promise((resolve) => {
      const promptChoice = () => {
        rl.question("\nChoisissez un CDC par son numéro ou entrez l'ID directement: ", async (choice) => {
          // Si l'utilisateur entre un nombre, c'est l'index dans la liste
          if (/^\d+$/.test(choice) && parseInt(choice) >= 1 && parseInt(choice) <= allCDCs.length) {
            const selectedCDC = allCDCs[parseInt(choice) - 1];
            console.log(`Vous avez sélectionné: ${selectedCDC.title}`);
            resolve(selectedCDC.id);
          } 
          // Sinon, considérer que c'est l'ID du CDC
          else if (choice.trim()) {
            const cdcId = choice.trim();
            console.log(`Récupération du CDC avec l'ID: ${cdcId}`);
            resolve(cdcId);
          } 
          // Si rien n'est entré, redemander
          else {
            console.log("Veuillez entrer un numéro ou un ID valide.");
            promptChoice();
          }
        });
      };
      
      promptChoice();
    });
  } catch (error) {
    console.error("Erreur lors de la sélection du CDC:", error.message);
    throw error;
  }
};

// Fonction pour démarrer l'interaction avec l'utilisateur
const startInteractiveCDCSession = async () => {
  console.log("=== Assistant CDC Gemini ===");
  console.log("Cet outil vous permet de poser des questions sur un CDC spécifique.\n");
  
  // Demander à l'utilisateur de sélectionner un CDC
  const cdcId = await selectCDC();
  
  // Récupérer les données du CDC sélectionné
  let cdcData;
  try {
    // Tenter de récupérer le CDC spécifique par son ID
    cdcData = await fetchCDCById(cdcId);
    console.log(`Données du CDC "${cdcData.title}" récupérées avec succès.`);
  } catch (error) {
    console.warn(`Impossible de récupérer le CDC avec l'ID ${cdcId}, utilisation de données fictives à la place`);
    cdcData = {
      id: cdcId,
      title: "CDC Exemple",
      sections: [
        { name: "Introduction", content: "Ceci est un exemple d'introduction pour un CDC fictif." },
        { name: "Objectifs", content: "Ce projet vise à améliorer le traitement des documents." }
      ],
      createdAt: new Date().toISOString()
    };
  }

  console.log("\n=== Assistant CDC Gemini ===");
  console.log(`CDC actif: ${cdcData.title}`);
  console.log("Posez des questions sur ce CDC. Tapez 'exit' pour quitter ou 'change' pour changer de CDC.");
  
  // Fonction récursive pour continuer à poser des questions
  const askQuestion = () => {
    rl.question("\nVotre question > ", async (question) => {
      const cmd = question.toLowerCase();
      
      // Gestion des commandes spéciales
      if (cmd === 'exit' || cmd === 'quit') {
        console.log("Au revoir!");
        rl.close();
        return;
      } else if (cmd === 'change') {
        // Relancer le processus de sélection de CDC
        const newCdcId = await selectCDC();
        try {
          cdcData = await fetchCDCById(newCdcId);
          console.log(`CDC changé pour: ${cdcData.title}`);
        } catch (error) {
          console.warn(`Impossible de récupérer le CDC avec l'ID ${newCdcId}, utilisation de données fictives à la place`);
          cdcData = {
            id: newCdcId,
            title: "CDC Exemple (nouveau)",
            sections: [
              { name: "Introduction", content: "Introduction du nouveau CDC fictif." },
              { name: "Objectifs", content: "Objectifs du nouveau CDC fictif." }
            ],
            createdAt: new Date().toISOString()
          };
        }
        console.log(`CDC actif: ${cdcData.title}`);
      } else {
        // Question normale - envoyer à Gemini
        try {
          await askGeminiWithCDCContext(question, cdcData);
        } catch (error) {
          console.error("Une erreur est survenue:", error.message);
        }
      }
      
      // Continuer à poser des questions
      askQuestion();
    });
  };
  
  // Démarrer l'interaction
  askQuestion();
};

// Traitement des arguments de ligne de commande
const args = process.argv.slice(2);
const directCdcId = args[0]; // Premier argument = ID du CDC (optionnel)

// Si un ID est fourni en argument, récupérer directement ce CDC
if (directCdcId) {
  console.log(`Mode direct: récupération du CDC avec l'ID ${directCdcId}`);
  let cdcData;
  
  try {
    cdcData = await fetchCDCById(directCdcId);
    console.log(`CDC "${cdcData.title}" récupéré avec succès.`);
    
    console.log("\n=== Assistant CDC Gemini - Mode Direct ===");
    console.log(`CDC: ${cdcData.title}`);
    console.log("Posez des questions sur ce CDC. Tapez 'exit' pour quitter.");
    
    // Fonction récursive pour poser des questions sur ce CDC spécifique
    const askDirectQuestion = () => {
      rl.question("\nVotre question > ", async (question) => {
        if (question.toLowerCase() === 'exit' || question.toLowerCase() === 'quit') {
          console.log("Au revoir!");
          rl.close();
          return;
        }
        
        try {
          await askGeminiWithCDCContext(question, cdcData);
        } catch (error) {
          console.error("Une erreur est survenue:", error.message);
        }
        
        // Continuer à poser des questions
        askDirectQuestion();
      });
    };
    
    // Démarrer l'interaction directe
    askDirectQuestion();
    
  } catch (error) {
    console.error(`Impossible de récupérer le CDC avec l'ID ${directCdcId}.`);
    console.log("Lancement du mode interactif à la place...");
    startInteractiveCDCSession();
  }
} else {
  // Mode interactif - l'utilisateur choisira le CDC
  startInteractiveCDCSession();
}