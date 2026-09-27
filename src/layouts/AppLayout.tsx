import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, User, Shield, Phone, Sparkles, Mail, MapPin, Globe, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AppLayout: React.FC = () => {
  const { isAuthenticated, user, isDemo, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sahaara-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const location = useLocation();
  const isSeniorRoute = location.pathname.startsWith('/senior');
  const isCaregiverRoute = location.pathname.startsWith('/caregiver');

  useEffect(() => {
    // Set theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sahaara-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Determine layout class
  const themeClass = isSeniorRoute ? 'senior-theme senior-gradient' : isCaregiverRoute ? 'caregiver-theme' : 'hero-gradient';

  return (
    <div className={`app-container ${themeClass} sahaara-bg-art`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header 
        style={{
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'var(--transition-smooth)'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: isSeniorRoute ? '1.25rem 2rem' : '0.875rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div 
              style={{
                width: isSeniorRoute ? '48px' : '40px',
                height: isSeniorRoute ? '48px' : '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontWeight: 'bold'
              }}
            >
              <Heart size={isSeniorRoute ? 28 : 22} fill="currentColor" />
            </div>
            <div>
              <span 
                style={{
                  fontSize: isSeniorRoute ? '1.8rem' : '1.5rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.5px',
                  color: 'var(--text-primary)',
                  display: 'block',
                  lineHeight: 1
                }}
              >
                SAHAARA
              </span>
              <span 
                style={{
                  fontSize: isSeniorRoute ? '0.9rem' : '0.75rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                {isSeniorRoute ? 'Senior Portal' : isCaregiverRoute ? 'Caregiver Portal' : 'Elder Care Platform'}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: isSeniorRoute ? '1.5rem' : '1rem' }}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontSize: isSeniorRoute ? '1.15rem' : '0.95rem',
                transition: 'var(--transition-smooth)'
              })}
            >
              Home
            </NavLink>

            <NavLink 
              to="/senior/home" 
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontSize: isSeniorRoute ? '1.15rem' : '0.95rem',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              })}
            >
              <User size={isSeniorRoute ? 22 : 16} />
              Senior Home
            </NavLink>

            <NavLink 
              to="/senior/saathi" 
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontSize: isSeniorRoute ? '1.15rem' : '0.95rem',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              })}
            >
              <Sparkles size={isSeniorRoute ? 22 : 16} />
              SAATHI AI
            </NavLink>

            <NavLink 
              to="/caregiver/dashboard" 
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                fontSize: isSeniorRoute ? '1.15rem' : '0.95rem',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              })}
            >
              <Shield size={isSeniorRoute ? 22 : 16} />
              Caregiver
            </NavLink>
          </nav>

          {/* Action buttons (Theme Toggle & Logout) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={toggleTheme}
              style={{
                width: isSeniorRoute ? '52px' : '40px',
                height: isSeniorRoute ? '52px' : '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-smooth)'
              }}
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={isSeniorRoute ? 26 : 20} /> : <Sun size={isSeniorRoute ? 26 : 20} />}
            </button>

            {isAuthenticated && (
              <button 
                onClick={logout}
                className="interactive-btn"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  border: '1px solid var(--color-primary)',
                  padding: isSeniorRoute ? '0.65rem 1.25rem' : '0.4rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: isSeniorRoute ? '1rem' : '0.85rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                Logout ({isDemo ? 'Demo' : (user?.displayName ? (user.displayName.length > 8 ? user.displayName.substring(0, 8) + '..' : user.displayName) : 'Real')})
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="app-main" style={{ flex: '1 0 auto', maxWidth: '1280px', width: '100%', margin: '0 auto', padding: isSeniorRoute ? '2rem' : '1.5rem', boxSizing: 'border-box' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer 
        style={{
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)',
          marginTop: 'auto',
          transition: 'var(--transition-smooth)',
          padding: '4rem 1.5rem 2rem 1.5rem'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          {/* Col 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={24} style={{ color: 'var(--color-primary)' }} fill="currentColor" />
              <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>SAHAARA</span>
            </div>
            <p style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              Saath, Sneh aur Samvaad
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              India's First Holistic AI Elder Care Platform. Supporting independent aging, social connection, and total peace of mind for families.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-smooth)' }} aria-label="Facebook">
                <Share2 size={20} />
              </a>
              <a href="#" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-smooth)' }} aria-label="Twitter">
                <Globe size={20} />
              </a>
              <a href="#" style={{ color: 'var(--text-secondary)', transition: 'var(--transition-smooth)' }} aria-label="Mail">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Future Pillars Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ecosystem Pillars</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
              <li>
                <Link to="/senior/saathi" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  SAATHI AI Voice Companion
                </Link>
              </li>
              <li>
                <Link to="#" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  Elder Circle Community
                </Link>
              </li>
              <li>
                <Link to="#" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  Nostalgia Corner Memories
                </Link>
              </li>
              <li>
                <Link to="/caregiver/dashboard" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  Caregiver Insights Panel
                </Link>
              </li>
              <li>
                <Link to="/senior/home" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  Devotion & Cultural Hub
                </Link>
              </li>
              <li>
                <Link to={isCaregiverRoute ? "/caregiver/legacy" : "/senior/legacy"} style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'block', transition: 'var(--transition-smooth)' }}>
                  Digital Legacy Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hotline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Get In Touch</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>New Delhi, Delhi, India</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>contact@sahaara.care</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Helpline: 1-800-SAHAARA (7242272)</span>
              </li>
            </ul>
            <div style={{ 
              backgroundColor: 'var(--color-primary-light)', 
              border: '1px solid var(--color-primary)', 
              borderRadius: 'var(--radius-md)', 
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-primary-dark)',
              fontWeight: 600
            }}>
              <Phone size={20} className="animate-pulse-soft" />
              <span>24/7 Elder Emergency: Direct Dial</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          style={{
            maxWidth: '1280px',
            margin: '2rem auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <p>&copy; {new Date().getFullYear()} SAHAARA. Created with care for seniors and their families.</p>
          <p style={{ fontSize: '0.8rem' }}>Phase 2 Hackathon Showcase Release. Approved for investor & SIH demonstration.</p>
        </div>
      </footer>
    </div>
  );
};
export default AppLayout;
