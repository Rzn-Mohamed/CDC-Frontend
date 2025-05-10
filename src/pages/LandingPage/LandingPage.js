import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../../components/Logo/Logo.js';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    pricing: useRef(null),
    testimonials: useRef(null),
    cta: useRef(null)
  };

  // Initialize dark mode on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Setup animations using Intersection Observer
  useEffect(() => {
    const options = { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observers = [];
    
    // Create observers for each section
    Object.keys(sectionRefs).forEach(section => {
      if (!sectionRefs[section].current) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        });
      }, options);
      
      observer.observe(sectionRefs[section].current);
      observers.push(observer);
    });
    
    // Cleanup observers
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);
  
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Testimonial slider
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      text: "CDC-GEN has revolutionized how we create specification documents. What used to take us days now takes only hours, and the quality is consistently better.",
      author: "Sophie Martin",
      title: "Project Manager, TechSolutions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      text: "As a consultant, I need to create detailed cahiers de charge for various clients. CDC-GEN saves me at least 10 hours per project and helps me deliver more professional documents.",
      author: "Thomas Dubois",
      title: "IT Consultant, Digiconsult",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      text: "The collaborative features allow our entire team to work on specification documents together in real-time. CDC-GEN has standardized our documentation process.",
      author: "Camille Bernard",
      title: "CTO, Innovatech",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];
  
  const nextTestimonial = () => {
    setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonialIndex]);

  return (
    <div className="landing-page overflow-hidden bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">CDC-GEN</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Testimonials</a>
              <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors bg-transparent border-0 p-0 cursor-pointer">Examples</button>
              
              {/* Dark mode toggle */}
              <button 
                onClick={toggleDarkMode} 
                className="group p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                aria-label="Toggle color mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {/* Sign in and Get Started buttons */}
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                Sign in
              </Link>
              <Link to="/signup" className="ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Get Started
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={toggleDarkMode} className="mr-4 text-gray-500 dark:text-gray-400" aria-label="Toggle dark mode">
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none" aria-label="Open menu">
                <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200 dark:border-gray-800`}>
          <div className="pt-2 pb-4 space-y-1 px-4">
            <a href="#features" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Features</a>
            <a href="#pricing" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Pricing</a>
            <a href="#testimonials" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">Testimonials</a>
            <button className="block w-full text-left py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium bg-transparent border-0">Examples</button>
            
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
              <Link to="/login" className="block py-2 text-indigo-600 dark:text-indigo-400 font-medium">Sign in</Link>
              <Link to="/signup" className="block mt-2 px-4 py-2 text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24" ref={sectionRefs.hero}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight ${isVisible.hero ? 'fade-in-left' : 'opacity-0'}`}>
                Générateur de Cahier des Charges <span className="text-indigo-600 dark:text-indigo-400">Intelligent</span>
              </h1>
              <p className={`mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl ${isVisible.hero ? 'fade-in-left delay-200' : 'opacity-0'}`}>
                Créez des cahiers des charges professionnels et complets en quelques minutes grâce à notre générateur alimenté par l'intelligence artificielle.
              </p>
              <div className={`mt-8 flex flex-col sm:flex-row gap-4 ${isVisible.hero ? 'fade-in-up delay-400' : 'opacity-0'}`}>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Commencer gratuitement
                </Link>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Découvrir les fonctionnalités
                </a>
              </div>
              <div className={`mt-8 ${isVisible.hero ? 'fade-in-up delay-600' : 'opacity-0'}`}>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Aucune compétence technique requise</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Export PDF, Word et HTML</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Modèles de documents adaptés à votre secteur</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className={`rounded-lg shadow-xl overflow-hidden ${isVisible.hero ? 'fade-in-right' : 'opacity-0'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Aperçu du document" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/20 rounded-lg"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-70 z-0"></div>
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-70 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients/Logos Section */}
      <section className="py-12 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium">Utilisé par des entreprises et des indépendants de tous secteurs</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center items-center">
            <div className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-400 transition-colors">TECH-CO</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-400 transition-colors">AGILE-DEV</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-400 transition-colors">SPEC-PROS</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-400 transition-colors">DOC-TECH</div>
            <div className="text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-400 transition-colors">DEVHUB</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900" ref={sectionRefs.features}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl ${isVisible.features ? 'fade-in-up' : 'opacity-0'}`}>
              Une solution complète pour vos cahiers des charges
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 ${isVisible.features ? 'fade-in-up delay-200' : 'opacity-0'}`}>
              Tout ce dont vous avez besoin pour créer des documents professionnels qui impressionnent vos clients.
            </p>
          </div>

          <div className={`mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 ${isVisible.features ? 'fade-in-up delay-400' : 'opacity-0'}`}>
            {/* Feature 1 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-5 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Modèles IA Adaptatifs
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Choisissez parmi des dizaines de modèles spécifiques à votre industrie ou laissez l'IA générer des sections personnalisées pour vos besoins.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-5 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Gestion des Exigences
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Organisez facilement les exigences fonctionnelles et techniques avec notre système de catégorisation intelligent.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-5 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Édition Collaborative
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Travaillez en équipe pour créer, réviser et finaliser vos documents de spécification grâce au mode d'édition en temps réel.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-5 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Export Multi-Format
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Exportez vos documents en plusieurs formats dont PDF, Word, HTML et markdown pour répondre à tous vos besoins.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-5 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Rapports et Analyses
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Suivez l'avancement de vos documents et obtenez des analyses détaillées pour optimiser votre processus de création.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-5 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sécurité Avancée
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Protégez vos documents confidentiels avec notre système de sécurité avancé incluant le chiffrement de bout en bout.
              </p>
              <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center text-sm font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                En savoir plus
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-800" ref={sectionRefs.pricing}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl ${isVisible.pricing ? 'fade-in-up' : 'opacity-0'}`}>
              Tarification simple et transparente
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 ${isVisible.pricing ? 'fade-in-up delay-200' : 'opacity-0'}`}>
              Choisissez le forfait qui correspond à vos besoins. Tous les forfaits incluent un essai gratuit de 14 jours.
            </p>
          </div>

          <div className={`mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto ${isVisible.pricing ? 'fade-in-up delay-400' : 'opacity-0'}`}>
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Basique</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Pour les utilisateurs individuels</p>
                <div className="mt-8 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-5xl font-extrabold tracking-tight">0€</span>
                  <span className="ml-1 text-2xl font-medium">/mois</span>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Jusqu'à 3 documents</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Modèles de base</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Export PDF uniquement</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-500 dark:text-gray-500">Édition collaborative</p>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link to="/signup" className="w-full inline-flex justify-center items-center px-6 py-3 border border-indigo-600 dark:border-indigo-500 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-500 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Démarrer gratuitement
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border-2 border-indigo-600 dark:border-indigo-500 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 lg:scale-105">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <div className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700">
                <p className="text-center text-xs font-medium uppercase tracking-wider text-white">Recommandé</p>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professionnel</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Pour les petites équipes</p>
                <div className="mt-8 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-5xl font-extrabold tracking-tight">29€</span>
                  <span className="ml-1 text-2xl font-medium">/mois</span>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Documents illimités</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Tous les modèles</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Tous les formats d'export</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Édition collaborative</p>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link to="/signup" className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition">
                    Essai gratuit de 14 jours
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Entreprise</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Pour les grandes organisations</p>
                <div className="mt-8 flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-5xl font-extrabold tracking-tight">99€</span>
                  <span className="ml-1 text-2xl font-medium">/mois</span>
                </div>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Tout ce qui est dans Professionnel</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Personnalisation de marque</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Accès API</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 dark:text-gray-300">Gestionnaire de compte dédié</p>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link to="/contact" className="w-full inline-flex justify-center items-center px-6 py-3 border border-indigo-600 dark:border-indigo-500 text-base font-medium rounded-md text-indigo-600 dark:text-indigo-500 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    Contacter les ventes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-900" ref={sectionRefs.testimonials}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl ${isVisible.testimonials ? 'fade-in-up' : 'opacity-0'}`}>
              Ce que nos clients disent
            </h2>
            <p className={`mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 ${isVisible.testimonials ? 'fade-in-up delay-200' : 'opacity-0'}`}>
              Découvrez comment CDC-GEN aide des professionnels de tous secteurs à gagner du temps et à impressionner leurs clients.
            </p>
          </div>

          <div className={`mt-16 max-w-4xl mx-auto relative ${isVisible.testimonials ? 'fade-in-up delay-400' : 'opacity-0'}`}>
            <div className="testimonial-slider overflow-hidden">
              <div className="relative">
                {/* Testimonial */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 transition-all duration-500 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-8">
                    "{testimonials[testimonialIndex].text}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonials[testimonialIndex].avatar} 
                      alt={testimonials[testimonialIndex].author} 
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{testimonials[testimonialIndex].author}</p>
                      <p className="text-gray-500 dark:text-gray-400">{testimonials[testimonialIndex].title}</p>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial controls */}
                <div className="flex justify-between items-center mt-8">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setTestimonialIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full ${index === testimonialIndex ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      aria-label="Previous testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      aria-label="Next testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible.testimonials ? 'fade-in-up delay-600' : 'opacity-0'}`}>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">98%</h3>
              <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">de satisfaction client</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">80%</h3>
              <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">de gain de temps</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">5000+</h3>
              <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">documents générés</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-indigo-600 to-purple-600" ref={sectionRefs.cta}>
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-80 transform translate-y-1/2 opacity-20" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <path d="M0,0V100C200,120,400,120,500,110C600,100,700,80,800,80C900,80,980,90,1000,100V0Z" fill="white" />
          </svg>
          <svg className="absolute top-0 right-0 w-80 h-80 transform translate-x-1/4 -translate-y-1/4 opacity-20" viewBox="0 0 200 200">
            <path fill="white" d="M37.5,-48.4C52.2,-42.5,70.2,-36.2,75.9,-24.5C81.6,-12.9,75,4.1,67.9,19.2C60.8,34.3,53.2,47.6,41.8,57.9C30.4,68.3,15.2,75.8,0.6,75C-13.9,74.2,-27.9,65.1,-41.1,55C-54.3,45,-66.8,33.9,-71.8,19.8C-76.8,5.7,-74.3,-11.4,-67.9,-26.6C-61.5,-41.9,-51.1,-55.3,-38.2,-62C-25.2,-68.7,-12.6,-68.8,-0.9,-67.5C10.8,-66.2,21.7,-63.4,37.5,-48.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold text-white sm:text-4xl ${isVisible.cta ? 'fade-in-up' : 'opacity-0'}`}>
              Prêt à créer vos cahiers des charges professionnels ?
            </h2>
            <p className={`mt-4 text-xl text-indigo-100 max-w-2xl mx-auto ${isVisible.cta ? 'fade-in-up delay-200' : 'opacity-0'}`}>
              Rejoignez des milliers de professionnels qui gagnent du temps et impressionnent leurs clients avec des documents de spécification complets.
            </p>
            <div className={`mt-10 flex justify-center ${isVisible.cta ? 'fade-in-up delay-400' : 'opacity-0'}`}>
              <Link 
                to="/signup" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600"
              >
                Commencer gratuitement
              </Link>
              <Link 
                to="/login" 
                className="ml-4 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-600"
              >
                Se connecter
              </Link>
            </div>
            <p className={`mt-4 text-sm text-indigo-100 ${isVisible.cta ? 'fade-in-up delay-600' : 'opacity-0'}`}>
              Aucune carte de crédit requise. Commencez avec un essai gratuit.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Logo />
                <span className="ml-2 text-xl font-bold text-white">CDC-GEN</span>
              </div>
              <p className="text-gray-400 text-sm">
                Génération professionnelle de cahiers des charges pour équipes et entreprises partout dans le monde.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.057 10.057 0 01-3.127 1.198 4.92 4.92 0 00-8.384 4.482C7.68 8.095 4.067 6.13 1.64 3.16a4.914 4.914 0 001.524 6.573 4.88 4.88 0 01-2.226-.616v.061a4.928 4.928 0 003.95 4.827 4.9 4.9 0 01-2.223.084 4.935 4.935 0 004.6 3.42A9.9 9.9 0 010 19.54a13.95 13.95 0 007.548 2.212c9.059 0 14.012-7.5 14.012-14.012 0-.21-.005-.426-.015-.636A10.025 10.025 0 0024 4.59l-.047-.02z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Modèles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centre d'aide</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Restez informé</h3>
              <p className="text-gray-400 mb-4 text-sm">Inscrivez-vous pour recevoir nos dernières actualités</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-3 py-2 min-w-0 flex-1 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                >
                  S'inscrire
                </button>
              </form>
              <p className="mt-3 text-xs text-gray-500">En vous inscrivant, vous acceptez notre politique de confidentialité.</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between">
              <p className="text-gray-400 text-sm">&copy; 2025 CDC-GEN. Tous droits réservés.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Politique de confidentialité</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Conditions d'utilisation</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Mentions légales</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:scale-110"
          aria-label="Chat with us"
          onClick={() => alert('Besoin d\'aide avec votre cahier des charges ? Discutez avec nous !')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;