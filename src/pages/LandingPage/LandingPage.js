import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    // Setup animations
    const setupAnimations = () => {
      const faders = document.querySelectorAll('.fade-section');
      const options = { threshold: 0.2 };
      
      const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
          }
        });
      }, options);
      
      faders.forEach(fader => {
        appearOnScroll.observe(fader);
      });
    };
    
    setupAnimations();
    
    // Setup testimonial slider
    const setupSlider = () => {
      const track = document.querySelector('.testimonial-track');
      const slides = document.querySelectorAll('.testimonial-slide');
      const dots = document.querySelectorAll('.testimonial-dot');
      const prevBtn = document.querySelector('.testimonial-prev');
      const nextBtn = document.querySelector('.testimonial-next');
      
      if (!track || !slides.length || !dots.length || !prevBtn || !nextBtn) return;
      
      let currentIndex = 0;
      const slideWidth = 100; // percentage
      
      // Update slider function
      const updateSlider = () => {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add('bg-primary', 'dark:bg-indigo-500');
            dot.classList.remove('bg-gray-300', 'dark:bg-gray-600');
            dot.classList.add('active');
          } else {
            dot.classList.remove('bg-primary', 'dark:bg-indigo-500');
            dot.classList.add('bg-gray-300', 'dark:bg-gray-600');
            dot.classList.remove('active');
          }
        });
      };
      
      // Set initial position
      updateSlider();
      
      // Next button
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSlider();
      });
      
      // Previous button
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.length - 1;
        }
        updateSlider();
      });
      
      // Dot clicks
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentIndex = index;
          updateSlider();
        });
      });
      
      // Auto-advance slides
      const interval = setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
      }, 5000);
      
      // Clean up interval on component unmount
      return () => clearInterval(interval);
    };
    
    // Set a little timeout to make sure DOM is fully rendered
    const sliderId = setTimeout(setupSlider, 500);
    
    // Setup mobile menu
    const setupMobileMenu = () => {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      
      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      }
      
      // Smooth scroll for nav links
      document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
          if (this.hash !== '') {
            e.preventDefault();
            const element = document.querySelector(this.hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    };
    
    setupMobileMenu();
    
    // Cleanup function
    return () => {
      clearTimeout(sliderId);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm py-4 sticky top-0 z-50 transition-colors duration-300 glassmorphism">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-primary dark:text-indigo-400 font-bold text-2xl">CDC-GEN</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Testimonials</a>
            <button className="hover:text-primary dark:hover:text-indigo-400 transition-colors bg-transparent border-0 p-0 cursor-pointer font-normal">Examples</button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle Switch (Desktop) */}
            <div className="flex items-center">
              <button 
                onClick={toggleDarkMode} 
                className="theme-toggle-btn flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <i className="fas fa-sun text-yellow-400"></i>
                ) : (
                  <i className="fas fa-moon text-gray-600"></i>
                )}
              </button>
            </div>
            <Link to="/login" className="bg-white dark:bg-gray-700 text-primary dark:text-indigo-400 font-medium px-4 py-2 rounded-lg mr-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm hover:shadow">Sign In</Link>
            <Link to="/signup" className="bg-primary dark:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shadow-sm hover:shadow">Get Started</Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            {/* Dark Mode Toggle Switch (Mobile) */}
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle-btn flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <i className="fas fa-sun text-yellow-400 text-sm"></i>
              ) : (
                <i className="fas fa-moon text-gray-600 text-sm"></i>
              )}
            </button>
            <button className="text-gray-500 dark:text-gray-300" id="mobileMenuBtn">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div id="mobileMenu" className="hidden md:hidden bg-white dark:bg-gray-800 px-4 py-5 shadow-md rounded-b-lg absolute top-full left-0 right-0 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors py-2">Features</a>
            <a href="#pricing" className="hover:text-primary dark:hover:text-indigo-400 transition-colors py-2">Pricing</a>
            <a href="#testimonials" className="hover:text-primary dark:hover:text-indigo-400 transition-colors py-2">Testimonials</a>
            <button className="hover:text-primary dark:hover:text-indigo-400 transition-colors py-2 text-left bg-transparent border-0 cursor-pointer font-normal">Examples</button>
            <div className="flex flex-col space-y-3 pt-3 border-t dark:border-gray-700">
              <Link to="/login" className="bg-white dark:bg-gray-700 text-primary dark:text-indigo-400 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm w-full text-center">Sign In</Link>
              <Link to="/signup" className="bg-primary dark:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shadow-sm w-full text-center">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 dark:text-white hero-text">Generate Professional Cahiers de Charge in Minutes</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 hero-text">Create comprehensive, customizable and professional specification documents with our AI-powered generator.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="bg-primary hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 button-animate text-center">Start Creating Now</Link>
                <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-dark dark:text-white font-medium px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 button-animate">See Examples <i className="fas fa-file-alt ml-2"></i></button>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <i className="fas fa-check-circle text-green-500 mr-2"></i> No technical skills required
                <i className="fas fa-check-circle text-green-500 mx-2 ml-6"></i> Export to PDF, Word or HTML
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Cahier de Charge Document Preview" className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Theme Toggle */}
      <div className="theme-toggle-floating">
        <button 
          onClick={toggleDarkMode} 
          className="theme-toggle-floating-btn" 
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <>
              <i className="fas fa-sun"></i>
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <i className="fas fa-moon"></i>
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Logos Section */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Trusted by companies and agencies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 dark:opacity-50 hover:opacity-100 dark:hover:opacity-80 transition-opacity duration-300">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">TECH-CO</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">AGILE-DEV</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">SPEC-PROS</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">DOC-TECH</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">DEVHUB</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Powerful Document Generation</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to create comprehensive cahiers de charge that impress your clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg hover-translate transition-all glassmorphism group">
              <div className="bg-blue-50 dark:bg-blue-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40">
                <i className="fas fa-file-contract text-primary dark:text-blue-400 text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">AI-Powered Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from dozens of industry-specific templates or let AI generate custom sections for your needs.</p>
              <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Document Templates" className="w-full h-32 object-cover rounded-lg mt-4 opacity-90 hover:opacity-100 transition-opacity duration-300 image-hover" />
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg hover-translate transition-all glassmorphism group">
              <div className="bg-green-50 dark:bg-green-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-green-100 dark:group-hover:bg-green-800/40">
                <i className="fas fa-chart-pie text-secondary dark:text-green-400 text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Requirements Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Easily organize functional and technical requirements with our smart categorization system.</p>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Requirements Management" className="w-full h-32 object-cover rounded-lg mt-4 opacity-90 hover:opacity-100 transition-opacity duration-300 image-hover" />
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg hover-translate transition-all glassmorphism group">
              <div className="bg-purple-50 dark:bg-purple-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/40">
                <i className="fas fa-users-cog text-purple-500 dark:text-purple-400 text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Collaborative Editing</h3>
              <p className="text-gray-600 dark:text-gray-300">Work together with your team to create, review and finalize your specification documents.</p>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Collaborative Editing" className="w-full h-32 object-cover rounded-lg mt-4 opacity-90 hover:opacity-100 transition-opacity duration-300 image-hover" />
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg hover-translate transition-all glassmorphism group">
              <div className="bg-red-50 dark:bg-red-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-red-100 dark:group-hover:bg-red-800/40">
                <i className="fas fa-file-export text-red-500 dark:text-red-400 text-xl group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">Multi-Format Export</h3>
              <p className="text-gray-600 dark:text-gray-300">Export your documents in multiple formats including PDF, Word, HTML, and markdown.</p>
              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Multi-Format Export" className="w-full h-32 object-cover rounded-lg mt-4 opacity-90 hover:opacity-100 transition-opacity duration-300 image-hover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Choose the plan that fits your document generation needs. All plans include a 14-day free trial.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover-translate glassmorphism">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Basic</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for individuals</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold dark:text-white">$0</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Up to 3 documents</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">PDF export only</span>
                  </li>
                  <li className="flex items-center text-gray-400 dark:text-gray-500">
                    <i className="fas fa-times text-gray-300 dark:text-gray-600 mr-2"></i>
                    <span>Collaborative editing</span>
                  </li>
                </ul>
                <Link to="/signup" className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-primary dark:text-indigo-400 font-medium py-3 px-4 rounded-lg border border-primary dark:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 block text-center">Get Started</Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-glass border border-primary dark:border-indigo-500 transform scale-105 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover-translate glassmorphism">
              <div className="bg-primary dark:bg-indigo-600 text-white text-center py-2 text-sm font-medium">MOST POPULAR</div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Professional</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for small teams</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold dark:text-white">$29</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Unlimited documents</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">All templates</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">All export formats</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Collaborative editing</span>
                  </li>
                </ul>
                <Link to="/signup" className="w-full bg-primary dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 block text-center">Start Free Trial</Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover-translate glassmorphism">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">For large organizations</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold dark:text-white">$99</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">API access</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    <span className="dark:text-gray-300">Dedicated account manager</span>
                  </li>
                </ul>
                <Link to="/contact" className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-primary dark:text-indigo-400 font-medium py-3 px-4 rounded-lg border border-primary dark:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 block text-center">Contact Sales</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Trusted by thousands of organizations worldwide.</p>
          </div>
          
          <div className="relative testimonial-slider max-w-4xl mx-auto">
            <div className="testimonial-container overflow-hidden">
              <div className="testimonial-track flex transition-transform duration-300">
                {/* Testimonial 1 */}
                <div className="testimonial-slide w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 glassmorphism">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">"CDC-GEN has revolutionized how we create specification documents. What used to take us days now takes only hours, and the quality is consistently better. The templates are incredibly useful."</p>
                    <div className="flex items-center">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                      <div>
                        <h4 className="font-semibold dark:text-white">Sophie Martin</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Project Manager, TechSolutions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="testimonial-slide w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 glassmorphism">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">"As a consultant, I need to create detailed cahiers de charge for various clients. CDC-GEN saves me at least 10 hours per project and helps me deliver more professional documents to my clients."</p>
                    <div className="flex items-center">
                      <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                      <div>
                        <h4 className="font-semibold dark:text-white">Thomas Dubois</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">IT Consultant, Digiconsult</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 3 */}
                <div className="testimonial-slide w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-sm dark:shadow-glass border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 glassmorphism">
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 flex">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">"The collaborative features allow our entire team to work on specification documents together in real-time. CDC-GEN has standardized our documentation process and improved our client relationships."</p>
                    <div className="flex items-center">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="Customer" className="w-12 h-12 rounded-full mr-4 object-cover" />
                      <div>
                        <h4 className="font-semibold dark:text-white">Camille Bernard</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">CTO, Innovatech</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slider Navigation */}
            <button className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 bg-white dark:bg-gray-700 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 testimonial-prev">
              <i className="fas fa-chevron-left text-gray-500 dark:text-gray-300"></i>
            </button>
            <button className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 bg-white dark:bg-gray-700 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 testimonial-next">
              <i className="fas fa-chevron-right text-gray-500 dark:text-gray-300"></i>
            </button>
            
            {/* Slider Dots */}
            <div className="flex justify-center mt-8 testimonial-dots">
              <button className="w-3 h-3 rounded-full bg-primary dark:bg-indigo-500 mx-1 testimonial-dot active"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mx-1 testimonial-dot"></button>
              <button className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mx-1 testimonial-dot"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-indigo-700 dark:from-indigo-800 dark:to-indigo-900 text-white transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create professional cahiers de charge?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">Join thousands of satisfied professionals who save time and impress clients with comprehensive specification documents.</p>
          <Link to="/signup" className="bg-white hover:bg-gray-100 text-primary hover:text-indigo-700 font-medium px-8 py-3 rounded-lg transition-all duration-300 mb-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 button-animate inline-block">Create Your First Document</Link>
          <p className="text-indigo-200">No technical skills required. Start for free today.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark dark:bg-gray-950 text-white pt-16 pb-8 transition-colors duration-300 fade-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-bold mb-6">CDC-GEN</h4>
              <p className="text-gray-400 mb-6">Professional cahier de charge generation for teams and businesses worldwide.</p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Templates</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Guides</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Documentation</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Help Center</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">About Us</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Careers</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Contact</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 text-left p-0">Partners</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Subscribe to our newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with the latest features and releases.</p>
              <form className="flex mb-4">
                <input type="email" placeholder="Enter your email" className="bg-gray-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-primary" />
                <button type="submit" className="bg-primary hover:bg-indigo-600 px-4 py-2 rounded-r-lg transition-colors duration-300">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
              <p className="text-gray-500 text-xs">By subscribing, you agree to our Privacy Policy.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">&copy; 2023 CDC-GEN. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button className="text-gray-400 hover:text-white text-sm transition-colors bg-transparent border-0">Privacy Policy</button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors bg-transparent border-0">Terms of Service</button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors bg-transparent border-0">Cookie Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <div className="chat-widget" onClick={() => alert('Need help with your cahier de charge? Chat with us!')}>
        <i className="fas fa-comment"></i>
      </div>
    </div>
  );
};

export default LandingPage;