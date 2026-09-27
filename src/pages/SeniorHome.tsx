import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { 
  Volume2, 
  Phone, 
  Image as ImageIcon, 
  Heart, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  Settings, 
  Video, 
  Mic, 
  Play, 
  Pause, 
  CalendarDays, 
  Droplet, 
  Activity, 
  Moon, 
  AlertCircle, 
  Bookmark, 
  ChevronRight,
  Shield,
  X
} from 'lucide-react';
import seniorHomeHeroImg from '../assets/senior_home_hero.png';
import nostalgiaTravelImg from '../assets/nostalgia_travel.png';
import nostalgiaAchievementsImg from '../assets/nostalgia_achievements.png';
import nostalgiaMarriageImg from '../assets/nostalgia_marriage.png';

// Interfaces
interface FamilyMember {
  name: string;
  relation: string;
  location: string;
  lastContact: string;
  status: 'online' | 'active' | 'busy';
  avatar: string;
}

interface Memory {
  title: string;
  date: string;
  desc: string;
  imageUrl: string;
}

interface DevotionItem {
  id: string;
  title: string;
  type: string;
  language: string;
  src: string;
  artist?: string;
}

export const SeniorHome: React.FC = () => {
  const navigate = useNavigate();
  const { currentTrack: globalTrack, isPlaying: globalIsPlaying, playTrack, pauseTrack } = useAudio();
  const { user, isDemo } = useAuth();

  // 1. ACCESSIBILITY STATES
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    return (localStorage.getItem('senior-text-size') as 'normal' | 'large' | 'xlarge') || 'large';
  });
  const [contrast, setContrast] = useState<'standard' | 'high'>(() => {
    return (localStorage.getItem('senior-contrast') as 'standard' | 'high') || 'standard';
  });
  const [motion, setMotion] = useState<'normal' | 'reduced'>(() => {
    return (localStorage.getItem('senior-motion') as 'normal' | 'reduced') || 'normal';
  });
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('senior-lang') as 'en' | 'hi') || 'en';
  });

  // Local state persistence
  useEffect(() => {
    localStorage.setItem('senior-text-size', textSize);
    localStorage.setItem('senior-contrast', contrast);
    localStorage.setItem('senior-motion', motion);
    localStorage.setItem('senior-lang', lang);
  }, [textSize, contrast, motion, lang]);

  // 2. EMOTIONAL CHECK-IN STATE
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodTimeline, setMoodTimeline] = useState<{ mood: string; time: string }[]>([
    { mood: '😊 Happy / खुश', time: '09:00 AM' }
  ]);
  const [moodSummary, setMoodSummary] = useState<string>('Select how you feel today to share with your family.');

  // 3. DIALER SIMULATOR STATE
  const [showCallModal, setShowCallModal] = useState(false);
  const [callContact, setCallContact] = useState<string>('');
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [callDuration, setCallDuration] = useState(0);
  const [callActive, setCallActive] = useState(false);

  // 4. PLAYBACK STATES

  // 5. WELLNESS WATER STATE
  const [waterGlasses, setWaterGlasses] = useState(5);

  // 6. SOS POPUP STATE
  const [showSosConfirm, setShowSosConfirm] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  // 7. NOSTALGIA ALBUM MODAL STATE
  const [showNostalgiaModal, setShowNostalgiaModal] = useState(false);

  // Timer for calls
  useEffect(() => {
    let interval: any;
    if (callActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const formatDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startMockCall = (name: string, type: 'audio' | 'video') => {
    setCallContact(name);
    setCallType(type);
    setShowCallModal(true);
    setCallActive(false);
    // Simulate connection delay
    setTimeout(() => {
      setCallActive(true);
    }, 2000);
  };

  const endMockCall = () => {
    setCallActive(false);
    setShowCallModal(false);
  };

  const handleMoodSelect = (moodName: string, icon: string) => {
    setCurrentMood(moodName);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMoodTimeline([{ mood: `${icon} ${moodName}`, time: timeString }, ...moodTimeline]);
    
    // Custom responses mapping
    const summaries: Record<string, string> = {
      'Happy': `${seniorName} is feeling positive and energetic. Daily walk completed!`,
      'Neutral': `${seniorName} is resting and taking things easy this afternoon.`,
      'Sad': 'Feeling a little lonely. An automatic wellness check has been shared.',
      'Anxious': 'Slightly anxious. SAATHI is playing relaxing classical prayers.',
      'Grateful': `Feeling grateful. ${seniorName} sent family photo updates.`
    };
    setMoodSummary(summaries[moodName] || 'Mood updated.');
  };

  const togglePlayback = (item: DevotionItem) => {
    const isCurrent = globalTrack?.src === item.src;
    if (isCurrent && globalIsPlaying) {
      pauseTrack();
    } else {
      playTrack({
        src: item.src,
        title: item.title,
        artist: item.artist || 'Spiritual Corner'
      });
    }
  };

  const triggerSos = () => {
    setShowSosConfirm(false);
    setSosActive(true);
    // Simulate messaging Rohan/Priya immediately
    setTimeout(() => {
      // Automatic safety resolution after 5s for demo purposes
      setSosActive(false);
    }, 6000);
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return lang === 'en' ? 'Good Morning' : 'शुभ प्रभात (Good Morning)';
    if (hr < 17) return lang === 'en' ? 'Good Afternoon' : 'नमस्कार / शुभ दोपहर (Good Afternoon)';
    return lang === 'en' ? 'Good Evening' : 'शुभ संध्या (Good Evening)';
  };

  // Profile data
  const seniorName = isDemo ? 'Ramesh Kumar' : (user?.displayName || 'User');
  const location = isDemo ? 'Lucknow, Uttar Pradesh' : 'Registered Member';
  const quote = lang === 'en' 
    ? '“Do not count the days, make the days count. SAHAARA is always with you.”' 
    : '“दिनों को मत गिनो, दिनों को सार्थक बनाओ। सहारा सदैव आपके साथ है।”';

  const familyMembers: FamilyMember[] = isDemo ? [
    { name: 'Rohan', relation: lang === 'en' ? 'Son' : 'बेटा (Son)', location: 'Bangalore', lastContact: '2 hours ago', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { name: 'Priya', relation: lang === 'en' ? 'Daughter-in-law' : 'बहू (Daughter-in-law)', location: 'Bangalore', lastContact: 'Yesterday', status: 'active', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
    { name: 'Ananya', relation: lang === 'en' ? 'Granddaughter' : 'पोती (Granddaughter)', location: 'Mumbai', lastContact: 'Today, 10 AM', status: 'busy', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' }
  ] : [];

  const memories: Memory[] = isDemo ? [
    { title: lang === 'en' ? 'Shimla Trip 1995' : 'शिमला यात्रा १९९५', date: 'June 1995', desc: 'Summer holiday at the Mall Road Shimla with Rohan and family.', imageUrl: nostalgiaTravelImg },
    { title: lang === 'en' ? 'Graduation 2018' : 'दीक्षांत समारोह २०१८', date: 'May 2018', desc: 'Proud moment celebrating Ananya’s Bachelor Degree in Mumbai.', imageUrl: nostalgiaAchievementsImg },
    { title: lang === 'en' ? 'Anniversary 1981' : 'वैवाहिक वर्षगांठ १९८१', date: 'Dec 1981', desc: 'Cherished memories from the traditional marriage ceremony.', imageUrl: nostalgiaMarriageImg }
  ] : [];

  const devotionList: DevotionItem[] = [
    { 
      id: 'bhajan', 
      title: lang === 'en' ? 'Morning Bhajan (Ganesh Chants)' : 'प्रातःकालीन भजन (गणेश वंदना)', 
      type: 'Audio Stream', 
      language: 'Hindi',
      src: '/audio/devotion/ganesh_chants.mp3',
      artist: 'Challakere Brothers'
    },
    { 
      id: 'dohe', 
      title: lang === 'en' ? 'Kabir Amritwani Dohe' : 'कबीर अमृतवाणी दोहे', 
      type: 'Verse reading', 
      language: 'Hindi',
      src: '/audio/devotion/kabir_amritwani.mp3',
      artist: 'Kabir Amritwani'
    },
    { 
      id: 'ramayan', 
      title: lang === 'en' ? 'Ramayan Katha Discourse' : 'रामायण कथा प्रवचन', 
      type: 'Audio Stream', 
      language: 'Hinglish',
      src: '/audio/devotion/ramayan_katha.mp3',
      artist: 'Shri Rajendra Das Ji Maharaj'
    }
  ];

  return (
    <div className={`senior-home-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''}`} style={{ transition: 'var(--transition-smooth)' }}>
      
      {/* PERSISTENT ACCESSIBILITY CONTROL HUB */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.25rem', 
          marginBottom: '2rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '1.25rem',
          borderBottom: '4px solid var(--color-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>
          <Settings size={22} className="animate-spin-slow" style={{ animationDuration: '6s' }} />
          <span>{lang === 'en' ? 'Accessibility Controls' : 'सुविधा एवं भाषा सेटिंग्स'}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          
          {/* Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                onClick={() => setLang('en')}
                style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'en' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: lang === 'en' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}
              >
                English
              </button>
              <button 
                onClick={() => setLang('hi')}
                style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'hi' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: lang === 'hi' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Text Size Toggler */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Text Size:' : 'अक्षरों का आकार:'}</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button 
                onClick={() => setTextSize('normal')} 
                style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'normal' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'normal' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}
              >
                A
              </button>
              <button 
                onClick={() => setTextSize('large')} 
                style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'large' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'large' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}
              >
                A+
              </button>
              <button 
                onClick={() => setTextSize('xlarge')} 
                style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'xlarge' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'xlarge' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 900 }}
              >
                A++
              </button>
            </div>
          </div>

          {/* Contrast Toggler */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Contrast:' : 'रंग कंट्रास्ट:'}</span>
            <button
              onClick={() => setContrast(prev => prev === 'standard' ? 'high' : 'standard')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: contrast === 'high' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: contrast === 'high' ? 'var(--bg-primary)' : 'var(--text-primary)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {contrast === 'high' ? (lang === 'en' ? 'Yellow/Black' : 'पीला/काला') : (lang === 'en' ? 'Standard' : 'साधारण')}
            </button>
          </div>

          {/* Motion Toggler */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Animations:' : 'एनिमेशन:'}</span>
            <button
              onClick={() => setMotion(prev => prev === 'normal' ? 'reduced' : 'normal')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {motion === 'reduced' ? (lang === 'en' ? 'Off 🛑' : 'बंद 🛑') : (lang === 'en' ? 'On 🟢' : 'चालू 🟢')}
            </button>
          </div>

        </div>
      </div>

      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* LEFT COLUMN - PERSONALIZED AND QUICK BUTTONS */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION 1 — PERSONALIZED WELCOME HERO */}
          <section 
            className="glass-card animate-slide-up fade-in-gentle" 
            style={{ 
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end',
              padding: '2.5rem', 
              borderRadius: 'var(--radius-lg)',
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.15) 100%), url(${seniorHomeHeroImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              border: 'none',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '2rem'
            }}
          >
            {/* Weather badge */}
            <div 
              style={{ 
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(20, 20, 20, 0.65)', 
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff',
                zIndex: 3
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🌤️</span>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Lucknow, 32°C</span>
            </div>

            <div style={{ zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              <span style={{ color: 'var(--color-primary-light)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.95rem', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>
                {lang === 'en' ? 'Senior Portal' : 'वृद्ध कल्याण केंद्र'}
              </span>
              <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#ffffff', lineHeight: 1.2 }}>
                {lang === 'en' ? `${getGreeting()}, ${seniorName.split(' ')[0]} Ji.` : `${getGreeting()}, ${seniorName.split(' ')[0]} जी।`}
              </h1>
              <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-accent-light)', margin: '0 0 1rem 0', maxWidth: '600px' }}>
                {lang === 'en' ? 'Your family is only one conversation away.' : 'आपका परिवार आपसे बस एक बातचीत की दूरी पर है।'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', fontSize: '1.05rem', opacity: 0.9 }}>
                <span>📍 {location}</span>
                <span>🏡 {lang === 'en' ? 'Lucknow Residence' : 'लखनऊ निवास'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span>
                  {lang === 'en' ? 'Connected to Care Circle' : 'केयर सर्कल से जुड़े हैं'}
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 1.5 - WARM FAMILY MESSAGE & QUOTE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Quote of the Day */}
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '5px solid var(--color-secondary)' }}>
              <p style={{ fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {quote}
              </p>
            </div>

            {/* Letter banner */}
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid var(--color-accent)' }}>
              <span style={{ fontSize: '2.5rem' }}>✉️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--color-accent-dark)', marginBottom: '0.25rem' }}>
                  {lang === 'en' ? 'Recent Family Note' : 'नवीनतम पारिवारिक पत्र'}
                </strong>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {lang === 'en' 
                    ? 'Ananya sent: "Dadu! Hope you had your calcium pill. Call me tonight!"'
                    : 'अनन्या ने भेजा: "दादू! आशा है आपने अपनी कैल्शियम की गोली ले ली। आज रात मुझे कॉल करना!"'}
                </p>
              </div>
            </div>
          </div>


          {/* SECTION 2 — QUICK ACTION HUB */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {lang === 'en' ? 'Quick Actions' : 'त्वरित विकल्प'}
            </h2>
            <div className="grid-container grid-2" style={{ gap: '1.5rem' }}>
              
              <button 
                onClick={() => navigate('/senior/saathi')}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-primary)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Volume2 size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    🎤 {lang === 'en' ? 'Talk to SAATHI AI' : 'साथी से बात करें'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Start voice companion' : 'आवाज में बात करें'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => startMockCall('Rohan', 'audio')}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-secondary)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    📞 {lang === 'en' ? 'Call Family' : 'परिवार को कॉल करें'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Connect with Rohan' : 'रोहन या अनन्या से बात करें'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/senior/nostalgia')}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-accent)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImageIcon size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    🖼 {lang === 'en' ? 'View Memories' : 'यादें देखें'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Open family photo album' : 'पारिवारिक फोटो एल्बम खोलें'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/senior/devotion')}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-primary)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    🕉 {lang === 'en' ? 'Spiritual Corner' : 'आध्यात्मिक कोना'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Stream bhajan & prayers' : 'भजन एवं धार्मिक प्रवचन सुनें'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => navigate('/senior/legacy')}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-accent)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    📁 {lang === 'en' ? 'Digital Legacy Vault' : 'डिजिटल विरासत तिजोरी'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Preserve memories & life stories' : 'जीवन की यादें और कहानियाँ संजोएं'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => {
                  const element = document.getElementById('elder-circle');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  borderLeft: '5px solid var(--color-secondary)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem' }}>
                    👥 {lang === 'en' ? 'Elder Circle' : 'वृद्ध मंडली'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Join local senior events' : 'आस-पड़ोस के दोस्तों से जुड़ें'}
                  </span>
                </div>
              </button>

              <button 
                onClick={() => setShowSosConfirm(true)}
                className="glass-card hover-card quick-action-button"
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  backgroundColor: 'var(--color-danger-light)',
                  borderLeft: '5px solid var(--color-danger)'
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ffffff', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--color-danger)' }}>
                  <AlertTriangle size={24} className="animate-pulse-soft" />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.15rem', color: 'var(--color-danger)' }}>
                    🚨 {lang === 'en' ? 'Emergency SOS' : 'आपातकालीन मदद (SOS)'}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'Alert family & emergency call' : 'रोहन और पुलिस को तुरंत संदेश भेजें'}
                  </span>
                </div>
              </button>

            </div>
          </section>

          {/* SECTION 4 — SAATHI AI COMPANION PREVIEW CARD */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '2px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>
              <Volume2 size={24} />
              <span>{lang === 'en' ? 'SAATHI AI Companion' : 'साथी एआई साथी'}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
              
              {/* Glowing Voice Orb */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div 
                  className="voice-orb animate-pulse-soft"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    border: '4px solid var(--bg-secondary)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <Sparkles size={44} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {lang === 'en' ? 'AI Companion Active' : 'साथी एआई सक्रिय है'}
                  </span>
                </div>
              </div>

              {/* Conversation preview */}
              <div style={{ flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem 1.25rem', borderRadius: '12px 12px 12px 0px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    {lang === 'en' 
                      ? `Good Afternoon ${seniorName} ji. I hope you ate lunch. How are you feeling today?` 
                      : `नमस्कार ${seniorName} जी, दोपहर का भोजन हो गया? आज आपका मन कैसा है?`}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => navigate('/senior/saathi')}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Volume2 size={18} />
                    {lang === 'en' ? 'Start Conversation' : 'बातचीत शुरू करें'}
                  </button>
                  <span style={{ alignSelf: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {lang === 'en' ? 'Last spoke: 1 hour ago' : 'अंतिम बात: १ घंटे पहले'}
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 5 — FAMILY CONNECTION PORTAL */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {lang === 'en' ? '❤️ My Family Connection Portal' : '❤️ मेरा पारिवारिक संवाद पोर्टल'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
              {/* Left Column: Family Presence Board */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>
                  {lang === 'en' ? 'Care Circle Status & Live Presence' : 'परिवार के सदस्यों की स्थिति और उपस्थिति'}
                </strong>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {familyMembers.map((member) => (
                    <div 
                      key={member.name} 
                      className="glass-card hover-card fade-in-gentle" 
                      style={{ 
                        padding: '1.25rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        gap: '1.5rem', 
                        borderLeft: `5px solid ${member.status === 'online' ? 'var(--color-success)' : member.status === 'active' ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Profile Frame with status indicator */}
                        <div style={{ position: 'relative' }}>
                          <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: 'var(--bg-tertiary)', 
                            border: '3px solid var(--border-color)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}>
                            {member.avatar.startsWith('http') ? (
                              <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span style={{ fontSize: '2rem' }}>{member.avatar}</span>
                            )}
                          </div>
                          <span style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            border: '2px solid var(--bg-secondary)',
                            backgroundColor: member.status === 'online' ? 'var(--color-success)' : member.status === 'active' ? 'var(--color-primary)' : 'var(--color-secondary)'
                          }}></span>
                        </div>

                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                            {member.name} Ji 
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '0.5rem', fontWeight: 500 }}>
                              ({member.relation})
                            </span>
                          </h3>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>
                            📍 {member.location} &bull; {member.lastContact}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: member.status === 'online' ? 'var(--color-success-dark)' : 'var(--text-secondary)', fontWeight: 600 }}>
                            {member.status === 'online' 
                              ? (lang === 'en' ? 'Online & Available' : 'ऑनलाइन और उपलब्ध') 
                              : member.status === 'active' 
                                ? (lang === 'en' ? 'Active recently' : 'सक्रिय') 
                                : (lang === 'en' ? 'At work / busy' : 'काम में व्यस्त')}
                          </span>
                        </div>
                      </div>

                      {/* Call button options */}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          onClick={() => startMockCall(member.name, 'audio')}
                          style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <Phone size={15} /> {lang === 'en' ? 'Voice' : 'कॉल'}
                        </button>
                        
                        <button 
                          onClick={() => startMockCall(member.name, 'video')}
                          style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: 'var(--color-primary-light)',
                            color: 'var(--color-primary-dark)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <Video size={15} /> {lang === 'en' ? 'Video' : 'वीडियो'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Letters from Grandkids */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>
                  {lang === 'en' ? 'Letters from Grandkids' : 'पोते-पोतियों के पत्र'}
                </strong>

                {/* Hand-written styled letter page */}
                <div 
                  className="polaroid-card" 
                  style={{ 
                    padding: '1.5rem', 
                    background: '#fffdf0', 
                    backgroundImage: 'radial-gradient(circle at 100px 100px, rgba(239, 68, 68, 0.05) 0%, transparent 100%)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-md)',
                    minHeight: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: '#1e293b',
                    fontFamily: '"Outfit", sans-serif'
                  }}
                >
                  <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-accent-dark)' }}>📬 {lang === 'en' ? 'New Letter Received!' : 'नया पत्र मिला!'}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>June 15, 2026</span>
                  </div>

                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic', fontWeight: 500 }}>
                    {lang === 'en' 
                      ? '"Dearest Dadu, I got my Science exam results today! I scored 95%. I remember how you spent afternoons teaching me physics. Miss you so much! Sending you lots of love."'
                      : '"प्रिय दादू, मुझे आज विज्ञान परीक्षा का परिणाम मिला! मैंने ९५% अंक प्राप्त किए। मुझे याद है कि कैसे आपने मुझे दोपहर में भौतिकी सिखाई थी। आपकी बहुत याद आती है! बहुत सारा प्यार।"'
                    }
                  </p>

                  <div style={{ marginTop: '1rem', borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>- Ananya 👧❤️</span>
                    <button 
                      onClick={() => navigate('/senior/nostalgia')}
                      style={{
                        padding: '0.35rem 0.75rem',
                        backgroundColor: 'var(--color-accent)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {lang === 'en' ? 'Write Back' : 'उत्तर दें'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 — NOSTALGIA CORNER PREVIEW */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {lang === 'en' ? 'Nostalgia Corner' : 'यादों का कोना (Nostalgia)'}
              </h2>
              <button 
                onClick={() => navigate('/senior/nostalgia')}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-dark)', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center' }}
              >
                {lang === 'en' ? 'Open Album' : 'पूरा एल्बम खोलें'} <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid-container grid-3" style={{ gap: '1.25rem' }}>
              {memories.map((memory) => (
                <div key={memory.title} className="glass-card hover-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <div style={{ height: '120px', backgroundColor: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
                    {memory.imageUrl && memory.imageUrl !== '#' ? (
                      <img src={memory.imageUrl} alt={memory.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="soft-zoom" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary-dark)', fontWeight: 700 }}>{memory.date}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{memory.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0.25rem 0 0 0' }}>
                      {memory.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7 — DEVOTION & CULTURAL HUB */}
          <section id="devotion-hub" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              🕉 {lang === 'en' ? 'Devotion & Spiritual Corner' : 'भक्ति एवं आध्यात्मिक कोना'}
            </h2>
            
            <div className="grid-container grid-2" style={{ gap: '1.25rem' }}>
              
              {/* Devotional audio selector list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {devotionList.map((item) => {
                  const isPlaying = globalTrack?.src === item.src && globalIsPlaying;
                  return (
                    <div 
                      key={item.id} 
                      className="glass-card" 
                      style={{ 
                        padding: '1rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        borderLeft: isPlaying ? '5px solid var(--color-secondary)' : '1px solid var(--border-color)',
                        backgroundColor: isPlaying ? 'var(--color-secondary-light)' : 'var(--bg-secondary)',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: 700 }}>{item.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.type} &bull; {item.language}</span>
                      </div>
                      <button 
                        onClick={() => togglePlayback(item)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--color-primary-light)',
                          color: isPlaying ? '#ffffff' : 'var(--color-primary-dark)',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Cultural Fasting/Discourse Calendar Card */}
              <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  <CalendarDays size={20} style={{ color: 'var(--color-secondary-dark)' }} />
                  {lang === 'en' ? 'Festival Calendar' : 'धार्मिक पंचांग एवं त्योहार'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ display: 'block', fontWeight: 700, color: 'var(--color-secondary-dark)' }}>Devshayani Ekadashi (July 6, 2026)</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Holy fasting day. Morning special prayers are scheduled at 6:30 AM.</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 700 }}>Guru Purnima (July 29, 2026)</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Discourse streams celebrating spiritual mentors.</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 10 — DIGITAL LEGACY VAULT */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              🛡 {lang === 'en' ? 'Digital Legacy Vault' : 'डिजिटल विरासत तिजोरी (Legacy Vault)'}
            </h2>
            
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)', textAlign: 'left' }}>
              <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)' }}>
                  {lang === 'en' ? 'Preserve Your Stories' : 'अपनी जीवन-गाथा सुरक्षित करें'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Record oral histories, voice logs, and write letters for your children. Your memories are encrypted and preserved safely for future generations.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <button style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', padding: '0.75rem 1.25rem', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Mic size={16} /> {lang === 'en' ? 'Record Life Story' : 'जीवन गाथा रिकॉर्ड करें'}
                  </button>
                  <button style={{ backgroundColor: 'transparent', border: '2px solid var(--color-primary)', color: 'var(--color-primary-dark)', padding: '0.75rem 1.25rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                    {lang === 'en' ? 'Upload Letter' : 'पत्र अपलोड करें'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Bookmark size={18} style={{ color: 'var(--color-accent-dark)' }} />
                  <span>{lang === 'en' ? 'Shimla trip recollections (Recorded)' : 'शिमला यात्रा संस्मरण (रिकॉर्डेड)'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Bookmark size={18} style={{ color: 'var(--color-accent-dark)' }} />
                  <span>{lang === 'en' ? 'Recipe: Grandma Ka Mango Pickle' : 'रेसिपी: दादी का आम का अचार'}</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN - WELLNESS, EMOTIONAL CHECK-IN, AND HELPLINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION 11 — PERSISTENT EMERGENCY ASSISTANCE */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'var(--color-danger-light)', border: '3px solid var(--color-danger)', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-danger)', margin: 0, fontWeight: 800 }}>
              🚨 Emergency SOS Assistance
            </h3>
            
            <p style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
              Press the SOS button below to trigger real-time emergency alert logs, broadcast alarms to Rohan and Priya, and contact help numbers.
            </p>

            <button 
              onClick={() => setShowSosConfirm(true)}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-danger)',
                color: '#ffffff',
                border: 'none',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                fontSize: '1.35rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertTriangle size={26} className="animate-pulse-soft" />
              TRIGGER SOS EMERGENCY
            </button>

            {/* Helpline Contacts list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid rgba(225, 29, 72, 0.2)', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-danger)' }}>HOTLINES</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 600 }}>
                <span>Lucknow Police Direct</span>
                <a href="tel:112" style={{ color: 'var(--color-danger)' }}>112</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 600 }}>
                <span>Helpline Caregiver Rohan</span>
                <span>Bangalore Link</span>
              </div>
            </div>
          </section>

          {/* SECTION 3 — DAILY EMOTIONAL CHECK-IN */}
          <section className="glass-card" style={{ padding: '2.0rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              💭 {lang === 'en' ? 'Daily Mood Check-in' : 'दैनिक मानसिक स्वास्थ्य'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {lang === 'en' ? 'Tell your family how you are feeling:' : 'चुनें कि आज आप कैसा महसूस कर रहे हैं:'}
            </p>

            {/* Mood selector buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Happy', icon: '😊' },
                { name: 'Neutral', icon: '😐' },
                { name: 'Sad', icon: '😔' },
                { name: 'Anxious', icon: '😟' },
                { name: 'Grateful', icon: '❤️' }
              ].map(m => (
                <button
                  key={m.name}
                  onClick={() => handleMoodSelect(m.name, m.icon)}
                  style={{
                    flex: 1,
                    minWidth: '55px',
                    padding: '0.75rem 0.25rem',
                    borderRadius: '8px',
                    border: currentMood === m.name ? '3px solid var(--color-primary)' : '1px solid var(--border-color)',
                    backgroundColor: currentMood === m.name ? 'var(--color-primary-light)' : 'var(--bg-secondary)',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'var(--transition-bounce)'
                  }}
                  title={m.name}
                >
                  <span>{m.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {lang === 'hi' && m.name === 'Happy' ? 'खुश' : lang === 'hi' && m.name === 'Neutral' ? 'ठीक' : lang === 'hi' && m.name === 'Sad' ? 'उदास' : lang === 'hi' && m.name === 'Anxious' ? 'चिंतित' : lang === 'hi' && m.name === 'Grateful' ? 'कृतज्ञ' : m.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Dynamic Emotional summary */}
            <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'en' ? 'Emotional Summary Log' : 'भावनात्मक स्थिति सारांश'}
              </span>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', fontWeight: 600 }}>{moodSummary}</p>
            </div>

            {/* Timeline widget */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {lang === 'en' ? 'Mood Timeline Today' : 'आज की मूड समय-सीमा (Timeline)'}
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {moodTimeline.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifySelf: 'flex-start', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span>
                    <span style={{ fontWeight: 700 }}>{item.mood}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>at {item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9 — WELLNESS SNAPSHOT PROGRESS */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              🩺 {lang === 'en' ? 'Wellness snapshot' : 'दैनिक स्वास्थ्य प्रगति'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Medicine check */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                  <span>💊 {lang === 'en' ? 'Medication adherence' : 'दवाइयां समय पर'}</span>
                  <span style={{ color: 'var(--color-primary-dark)' }}>2 / 3 Taken</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>&bull; Morning BP Pill: <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>Taken 09:00 AM ✅</span></div>
                  <div>&bull; Afternoon BP Pill: <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>Taken 02:00 PM ✅</span></div>
                  <div>&bull; Evening Calcium: <span style={{ color: 'var(--color-secondary-dark)', fontWeight: 700 }}>Pending (08:00 PM) ⏳</span></div>
                </div>
              </div>

              {/* Water Intake */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Droplet size={16} style={{ color: '#0284c7' }} fill="#0284c7" />
                    {lang === 'en' ? 'Water Intake' : 'पानी पीने की मात्रा'}
                  </span>
                  <span>{waterGlasses} / 8 Glasses</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(waterGlasses / 8) * 100}%`, height: '100%', backgroundColor: '#0284c7', transition: 'var(--transition-smooth)' }}></div>
                  </div>
                  <button 
                    onClick={() => setWaterGlasses(prev => Math.min(prev + 1, 8))}
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                  >
                    + Glass
                  </button>
                </div>
              </div>

              {/* Steps Progress */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Activity size={16} style={{ color: 'var(--color-primary)' }} />
                    {lang === 'en' ? 'Steps Walked' : 'कदम चले'}
                  </span>
                  <span>3,840 / 5,000</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: '76.8%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                </div>
              </div>

              {/* Sleep log */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Moon size={16} style={{ color: 'var(--color-secondary-dark)' }} />
                  {lang === 'en' ? 'Sleep Log (Last night)' : 'नींद (कल रात)'}
                </span>
                <span style={{ color: 'var(--color-primary-dark)' }}>7.5 Hours</span>
              </div>

            </div>
          </section>

          {/* SECTION 8 — ELDER CIRCLE PREVIEW */}
          <section id="elder-circle" className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
              👥 {lang === 'en' ? 'Elder Circle Community' : 'वृद्ध मंडली सामुदायिक कार्यक्रम'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                  🧘‍♂️ Gomti Nagar Yoga Group
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Meets every morning at 7:00 AM at Central Park. 5 friends are attending.
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                  🎶 Bhajan Mandali Spiritual Session
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Thursday evening chants and tea meet. 5:00 PM at Community Hall.
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                  🚶‍♂️ Lucknow Senior Walking Club
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Evenings walks at 6:00 PM along Gomti Riverfront.
                </span>
              </div>

              <button 
                onClick={() => navigate('/senior/community')}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                👥 Join Community Hub &rarr;
              </button>

            </div>
          </section>

        </div>

      </div>

      {/* SOS TRIGGER SIMULATION OVERLAY MODAL */}
      {showSosConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(225, 29, 72, 0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 150
        }}>
          <div className="glass-card animate-slide-up" style={{
            width: '90%',
            maxWidth: '500px',
            padding: '2.5rem',
            backgroundColor: '#ffffff',
            border: '4px solid var(--color-danger)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            color: '#000000'
          }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <AlertTriangle size={38} className="animate-pulse-soft" />
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-danger)', margin: 0 }}>
              Confirm SOS Call?
            </h3>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              This will immediately dial emergency services and broadcast alert messages to **Rohan (Son)** and **Priya (Daughter-in-law)**.
            </p>

            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <button 
                onClick={() => setShowSosConfirm(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: '2px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                No, Cancel
              </button>
              
              <button 
                onClick={triggerSos}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  backgroundColor: 'var(--color-danger)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
              >
                Yes, Send Alerts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOS ACTIVE SIMULATED NOTIFICATION BANNER */}
      {sosActive && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '650px',
          backgroundColor: 'var(--color-danger)',
          color: '#ffffff',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          zIndex: 200,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'left'
        }}>
          <AlertCircle size={36} className="animate-pulse-soft" />
          <div>
            <strong style={{ fontSize: '1.25rem', display: 'block' }}>SOS Alerts Broadcasting...</strong>
            <span style={{ fontSize: '0.95rem' }}>
              Alert logs generated. SMS triggers sent to Rohan (Bangalore) and Priya (Home). Contacting emergency hospital...
            </span>
          </div>
        </div>
      )}

      {/* FAMILY CALL SIMULATION OVERLAY MODAL */}
      {showCallModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 160
        }}>
          <div className="glass-card animate-slide-up" style={{
            width: '90%',
            maxWidth: '420px',
            padding: '3rem 2rem',
            backgroundColor: 'var(--bg-secondary)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            border: '2px solid var(--color-primary)'
          }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--color-primary-light)', 
              color: 'var(--color-primary-dark)', 
              margin: '0 auto',
              border: '3px solid var(--color-primary)',
              overflow: 'hidden'
            }}>
              {callContact === 'Rohan' ? (
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Rohan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : callContact === 'Priya' ? (
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Priya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Ananya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
                {callContact}
              </h3>
              <span style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>
                {callType === 'video' ? 'Video Calling...' : 'Calling family link...'}
              </span>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
              {callActive ? formatDuration(callDuration) : 'Connecting / जुड़ रहा है...'}
            </div>

            <button 
              onClick={endMockCall}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-danger)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Hang Up
            </button>
          </div>
        </div>
      )}

      {/* NOSTALGIA CORNER MOCK PICTURE ALBUM */}
      {showNostalgiaModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 170
        }}>
          <div className="glass-card animate-slide-up" style={{
            width: '90%',
            maxWidth: '700px',
            padding: '2.5rem',
            backgroundColor: 'var(--bg-secondary)',
            maxHeight: '85vh',
            overflowY: 'auto',
            border: '2px solid var(--color-secondary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                🖼 {lang === 'en' ? 'Nostalgia Corner Album' : 'यादों का कोना (Nostalgia Album)'}
              </h3>
              <button 
                onClick={() => setShowNostalgiaModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {lang === 'en' 
                  ? 'A compilation of memories uploaded by Rohan and family to trigger comfortable memory retention.' 
                  : 'रोहन और परिवार द्वारा यादों को ताज़ा करने के लिए अपलोड किए गए सुंदर क्षण।'}
              </p>

              <div className="grid-container grid-2" style={{ gap: '1.5rem' }}>
                {memories.map((m, idx) => (
                  <div key={idx} className="glass-card" style={{ overflow: 'hidden', textAlign: 'left' }}>
                    <div style={{ height: '140px', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <ImageIcon size={36} />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 700 }}>{m.date}</span>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.1rem 0' }}>{m.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeniorHome;
