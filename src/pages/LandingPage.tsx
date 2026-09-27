import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  ArrowRight,
  Heart,
  Volume2,
  Users,
  Shield,
  Activity,
  User,
  Lock,
  Mail,
  Phone as PhoneIcon
} from 'lucide-react';
import nostalgiaFamilyImg from '../assets/nostalgia_family.png';
import elderGrandkidHugImg from '../assets/elder_grandkid_hug.png';
import elderVideoCallImg from '../assets/elder_video_call.png';
import elderAICompanionshipImg from '../assets/elder_ai_companion.png';
import elderPrayerDevotionImg from '../assets/elder_prayer_devotion.png';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, register, switchToDemo } = useAuth();
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  const [role, setRole] = useState<'Senior' | 'Caregiver'>('Caregiver');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Senior') {
        navigate('/senior/home');
      } else if (user.role === 'Caregiver') {
        navigate('/caregiver/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoadingLocal(true);
    try {
      if (modalType === 'login') {
        await login(formData.email, formData.password);
        closeModal();
      } else {
        await register(formData.email, formData.password, formData.name, role);
        closeModal();
      }
    } catch (err: any) {
      console.error(err);
      let message = 'Authentication failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use by another account.';
      } else if (err.code === 'auth/weak-password') {
        message = 'The password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please verify and try again.';
      } else if (err.code === 'auth/network-request-failed') {
        message = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        message = err.message;
      }
      setErrorMsg(message);
    } finally {
      setLoadingLocal(false);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setIsSubmitted(false);
    setErrorMsg(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', padding: '1rem 0', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. HERO SECTION WITH IMAGE COLLAGE */}
      <section 
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          minHeight: '500px',
          padding: '2rem 1.5rem',
          textAlign: 'left',
          position: 'relative'
        }}
      >
        {/* Left Column: Copy & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            alignSelf: 'flex-start',
            gap: '0.5rem', 
            backgroundColor: 'var(--color-primary-light)', 
            color: 'var(--color-primary-dark)', 
            padding: '0.5rem 1.25rem', 
            borderRadius: '100px', 
            fontWeight: 700, 
            fontSize: '0.9rem',
            border: '1px solid rgba(13, 148, 136, 0.2)'
          }}>
            <Sparkles size={16} />
            <span>Saath, Sneh aur Samvaad</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: 900, 
              color: 'var(--text-primary)', 
              lineHeight: 1.1, 
              margin: 0, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-1px'
            }}>
              SAHAARA
            </h1>
            <p style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: 'var(--color-primary-dark)', 
              margin: 0,
              lineHeight: 1.2
            }}>
              "Every Parent Deserves Companionship"
            </p>
          </div>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6, 
            margin: 0, 
            fontWeight: 500,
            maxWidth: '540px' 
          }}>
            Helping seniors stay connected, heard, remembered, and loved through family, memories, wellness, and companionship.
          </p>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <button 
              onClick={() => { switchToDemo(); navigate('/senior/home'); }}
              className="interactive-btn"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '1.1rem 2.2rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-smooth)'
              }}
            >
              Explore Demo
              <ArrowRight size={20} />
            </button>

            <button 
              onClick={() => setModalType('signup')}
              className="interactive-btn"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                padding: '1.1rem 2.2rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
            >
              Create Account
            </button>

            <button 
              onClick={() => setModalType('login')}
              className="interactive-btn"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-primary-dark)',
                border: 'none',
                padding: '1.1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 750,
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Column: Premium Memory Scrapbook Collage */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '450px', width: '100%', maxWidth: '500px', margin: '0 auto', zIndex: 1 }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            
            {/* Base Image: Happy Senior Family */}
            <div 
              className="polaroid-card premium-float" 
              style={{ 
                position: 'absolute', 
                top: '40px', 
                left: '20px', 
                width: '320px', 
                transform: 'rotate(-4deg)', 
                zIndex: 1,
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 12px 28px 12px'
              }}
            >
              <img 
                src={nostalgiaFamilyImg} 
                alt="Family gathering together" 
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginTop: '12px', textAlign: 'center' }}>
                Family Gatherings & Warmth ❤️
              </div>
            </div>

            {/* Overlapping Image 1: Grandkid Hug */}
            <div 
              className="polaroid-card hover-card" 
              style={{ 
                position: 'absolute', 
                top: '0px', 
                right: '10px', 
                width: '180px', 
                transform: 'rotate(5deg)', 
                zIndex: 3,
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 8px 20px 8px'
              }}
            >
              <img 
                src={elderGrandkidHugImg} 
                alt="Grandchild hugging elder" 
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>
                Ananya & Dadu
              </div>
            </div>

            {/* Overlapping Image 2: Video Call */}
            <div 
              className="polaroid-card hover-card" 
              style={{ 
                position: 'absolute', 
                bottom: '10px', 
                right: '30px', 
                width: '195px', 
                transform: 'rotate(-6deg)', 
                zIndex: 2,
                boxShadow: 'var(--shadow-lg)',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 8px 20px 8px'
              }}
            >
              <img 
                src={elderVideoCallImg} 
                alt="Video call with family" 
                style={{ width: '100%', height: '135px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#64748b', marginTop: '8px', textAlign: 'center' }}>
                Sunday Video Calls 📞
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE SAHAARA PILLARS SECTION */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-primary-dark)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Holistic Ecosystem
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Four Pillars of Devoted Elder Care
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            We address the emotional, social, and wellness challenges of aging.
          </p>
        </div>

        <div className="grid-container grid-4" style={{ gap: '1.5rem' }}>
          {/* Pillar 1 */}
          <div className="glass-card hover-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Volume2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>SAATHI AI Voice</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              An empathetic, bilingual voice companion listening with patience, sharing stories, and playing relaxing prayers.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card hover-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Family Portal</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Connecting distance through active check-ins, medication logs, grandchild notes, and live presence dashboards.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card hover-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Legacy Vault</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Preserve life scrapbooks, marriage histories, college stories, and advice letters for future generations securely.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card hover-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Wellness Insights</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Proactive loneliness risk analysis, wellness alerts, sleep metrics, and automatic health check escalations.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE PREVIEW COLLAGE SECTION */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
            <span style={{ color: 'var(--color-accent-dark)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Product Features
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: 0 }}>
              Designed For Real Elders
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
              Every screen is built with high contrast, double-size buttons, voice support, and localized Hindi/English languages to guarantee comfort.
            </p>
            <button 
              onClick={() => { switchToDemo(); navigate('/senior/home'); }}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-sm)',
                width: 'fit-content',
                marginTop: '0.5rem'
              }}
            >
              Test Live Demo Portal
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Feature 1 */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ height: '140px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={elderAICompanionshipImg} alt="Voice interface" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <strong style={{ fontSize: '1.05rem' }}>Bilingual Voice Dialogues</strong>
            </div>

            {/* Feature 2 */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ height: '140px', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={elderPrayerDevotionImg} alt="Devotional section" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <strong style={{ fontSize: '1.05rem' }}>Temple & Devotional Corner</strong>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MODALS FOR PLACEHOLDER SIGN UP / LOGIN */}
      {modalType && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div className="glass-card animate-slide-up" style={{
            width: '90%',
            maxWidth: '460px',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--color-primary)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            textAlign: 'left',
            color: 'var(--text-primary)'
          }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 0', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '2rem', fontWeight: 'bold' }}>
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Demo Registration Success</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    Your simulated account data has been logged! Database and authentication features will launch in a future phase.
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    closeModal();
                    navigate('/senior/home');
                  }}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Explore Ramesh Kumar Demo Experience
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {errorMsg && (
                  <div style={{ backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)' }}>
                  <Heart size={24} fill="currentColor" />
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>SAHAARA</span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
                    {modalType === 'login' ? 'Welcome Back' : 'Join Sahaara Care'}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    {modalType === 'login' 
                      ? 'Log in to manage your senior family circle.' 
                      : 'Register your family and set up a companion circle.'}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {modalType === 'signup' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Sanjay Kumar"
                          style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                        />
                      </div>
                    </div>
                  )}

                  {modalType === 'signup' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Account Role</label>
                      <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                        <button
                          type="button"
                          onClick={() => setRole('Caregiver')}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: 'none',
                            backgroundColor: role === 'Caregiver' ? 'var(--color-primary)' : 'var(--bg-primary)',
                            color: role === 'Caregiver' ? '#ffffff' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                          }}
                        >
                          Family Caregiver
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('Senior')}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: 'none',
                            backgroundColor: role === 'Senior' ? 'var(--color-primary)' : 'var(--bg-primary)',
                            color: role === 'Senior' ? '#ffffff' : 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                          }}
                        >
                          Senior Citizen
                        </button>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Email Address</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="caregiver@sahaara.care"
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  {modalType === 'signup' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Phone Number</label>
                      <div style={{ position: 'relative' }}>
                        <PhoneIcon size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                        />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="password" 
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loadingLocal}
                  style={{
                    backgroundColor: loadingLocal ? 'var(--color-primary-light)' : 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: loadingLocal ? 'not-allowed' : 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {loadingLocal ? 'Connecting...' : (modalType === 'login' ? 'Login' : 'Create Account')}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexWrap: 'wrap', justifyItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                  <span>{modalType === 'login' ? "Don't have an account?" : "Already registered?"}</span>
                  <button 
                    type="button"
                    onClick={() => {
                      setModalType(prev => prev === 'login' ? 'signup' : 'login');
                      setIsSubmitted(false);
                    }}
                    style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {modalType === 'login' ? 'Sign up here' : 'Log in here'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;
