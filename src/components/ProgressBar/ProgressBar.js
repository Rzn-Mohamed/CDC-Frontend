import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ duration = 45000, onComplete, phrases = [] }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  // Default phrases if none provided
  const defaultPhrases = [
    "Initialisation du cahier des charges...",
    "Compilation des données...",
    "Structuration du document...",
    "Amélioration des contenus...",
    "Optimisation des sections...",
    "Application des bonnes pratiques...",
    "Vérification des formats...",
    "Finalisation du document...",
    "C'est presque prêt !"
  ];
  
  const phrasesToUse = phrases.length > 0 ? phrases : defaultPhrases;
  
  useEffect(() => {
    // Calculate the time interval for progress updates (for smooth animation)
    const updateInterval = 50; // Update every 50ms for smooth animation
    const incrementPerUpdate = (updateInterval / duration) * 100;
    
    // Calculate when to change phrases
    const phraseChangeInterval = duration / phrasesToUse.length;
    
    // Progress bar timer
    const progressTimer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + incrementPerUpdate;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          clearInterval(phraseTimer);
          // Call onComplete after a small delay to ensure animations complete
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, updateInterval);
    
    // Phrase change timer
    const phraseTimer = setInterval(() => {
      setCurrentPhrase(prevPhrase => {
        const nextPhrase = prevPhrase + 1;
        if (nextPhrase >= phrasesToUse.length) {
          return phrasesToUse.length - 1; // Stay on last phrase
        }
        return nextPhrase;
      });
    }, phraseChangeInterval);
    
    // Cleanup
    return () => {
      clearInterval(progressTimer);
      clearInterval(phraseTimer);
    };
  }, [duration, phrasesToUse, onComplete]);
  
  return (
    <div className="progress-container">
      <div className="progress-icon">
        <div className="spinner"></div>
      </div>
      <div className="progress-text">
        <h2>Génération de votre cahier des charges</h2>
        <p className="progress-phrase">{phrasesToUse[currentPhrase]}</p>
      </div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-percentage">{Math.round(progress)}%</p>
    </div>
  );
};

export default ProgressBar;
