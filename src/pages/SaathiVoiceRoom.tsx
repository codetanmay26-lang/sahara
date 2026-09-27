import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  StopCircle, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  RefreshCw, 
  Settings, 
  Check, 
  User, 
  Clock, 
  Heart, 
  Users, 
  AlertTriangle,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Sliders,
  Smile,
  X
} from 'lucide-react';

// Interfaces
interface Message {
  id: string;
  sender: 'senior' | 'saathi';
  text: string;
  time: string;
  isMemoryNarration?: boolean;
  audioSrc?: string;
}

interface SuggestionChip {
  labelEn: string;
  labelHi: string;
  intent: string;
}

export const SaathiVoiceRoom: React.FC = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { currentTrack, isPlaying: isPlayingAudio, playTrack, stopTrack } = useAudio();

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

  // 2. CHAT AND TYPING STATES
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'saathi', text: 'Namaste Ramesh ji. Main aapka companion SAATHI hoon. Aapka dopahar ka bhojan kaisa raha? (Hello Ramesh ji, I am SAATHI. How was your lunch today?)', time: '01:30 PM', audioSrc: '/audio/saathi/saathi_lunch.wav' },
    { id: '2', sender: 'senior', text: 'Mujhe aaj thoda akela lag raha hai. (I am feeling a little lonely today.)', time: '01:31 PM' },
    { id: '3', sender: 'saathi', text: 'Ramesh ji, main hamesha aapke saath hoon. Kya hum Shimla Trip 1995 ki suhaani yaadon ke baare mein baat karein? (Ramesh ji, I am always here for you. Shall we chat about those beautiful Shimla Trip 1995 memories?)', time: '01:32 PM', audioSrc: '/audio/saathi/saathi_shimla.wav' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');

  // 3. VOICE AI PREVIEW STATES
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [voiceTone, setVoiceTone] = useState<'warm' | 'gentle' | 'energetic'>('warm');
  const [isMuted, setIsMuted] = useState(false);
  const [isComforting, setIsComforting] = useState(false);

  // 4. MOCK ANALYTICS
  const [lonelinessScore, setLonelinessScore] = useState(24);
  const [engagementScore, setEngagementScore] = useState(92);
  const [streakCount, setStreakCount] = useState(5);

  // 5. CALL MODAL SIMULATION
  const [showCallModal, setShowCallModal] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callActive, setCallActive] = useState(false);
  const [callContact, setCallContact] = useState<string>('Rohan');

  // 6. EMERGENCY STATE
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);
  const [showEmergencyNotification, setShowEmergencyNotification] = useState(false);

  // Persistent accessibility sync
  useEffect(() => {
    localStorage.setItem('senior-text-size', textSize);
    localStorage.setItem('senior-contrast', contrast);
    localStorage.setItem('senior-motion', motion);
    localStorage.setItem('senior-lang', lang);
  }, [textSize, contrast, motion, lang]);

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: motion === 'reduced' ? 'auto' : 'smooth' });
  }, [messages, isTyping, motion]);

  // Call duration timer
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

  // 7. RESPONSIVE AI CONVERSATION ENGINE (MOCKS)
  const sendUserMessage = (text: string, customIntent?: string) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'senior',
      text,
      time: timeString
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);
    setVoiceState('processing');

    // Generate responsive response
    setTimeout(() => {
      setIsTyping(false);
      
      let reply = '';
      let audioSrc = '/audio/saathi/saathi_default.wav';
      const intent = customIntent || text.toLowerCase();

      if (intent.includes('happy') || intent.includes('khush')) {
        reply = 'Ramesh ji, aapki khushi dekh kar mera mann bhi prasan ho gaya! Main aapke wellness status ko family dashboard par update kar rahi hoon taaki Rohan aur Ananya bhi ise dekh sakein. (Ramesh ji, seeing you happy makes me glad! I will update this in your wellness report for your family to see.)';
        audioSrc = '/audio/saathi/saathi_happy.wav';
        setLonelinessScore(prev => Math.max(prev - 5, 10));
        setEngagementScore(prev => Math.min(prev + 4, 100));
        setStreakCount(prev => prev + 1);
        setIsComforting(false);
      } else if (intent.includes('lonely') || intent.includes('akela') || intent.includes('miss my family')) {
        reply = 'Main samajh sakti hoon Ramesh ji. Main aapke saath hoon, chinta mat kijiye. Kya main aapke liye koi prarthana chalau ya hum 1981 ki anniversary ki baare mein baat karein? (I understand Ramesh ji. I am with you, do not worry. Shall I play some morning bhajan or shall we talk about your 1981 wedding anniversary?)';
        audioSrc = '/audio/saathi/saathi_lonely.wav';
        setLonelinessScore(prev => Math.min(prev + 10, 80));
        setIsComforting(true);
      } else if (intent.includes('worried') || intent.includes('chinta')) {
        reply = 'Ramesh ji, chinta mat kijiye. Aaiye hum milkar dhyan lagayein. Main ek shanti mantra play karti hoon. Maine Rohan ko bhi notification bheja hai ki wo free hote hi call karein. (Ramesh ji, do not worry. Let us meditate together. I will play a peace chant. I have notified Rohan to call you when he is free.)';
        audioSrc = '/audio/saathi/saathi_worried.wav';
        setLonelinessScore(prev => Math.min(prev + 5, 80));
        setIsComforting(true);
      } else if (intent.includes('story') || intent.includes('kahani')) {
        reply = 'Lucknow ki ek purani lok katha suniye, Ramesh ji. Gomti nadi ke kinare ek chota sa mandir tha... (Listen to an old folklore of Lucknow, Ramesh ji. Near the Gomti riverfront, there was a small temple...)';
        audioSrc = '/audio/saathi/saathi_story.wav';
        setEngagementScore(prev => Math.min(prev + 5, 100));
        setIsComforting(false);
      } else if (intent.includes('bhajan') || intent.includes('devotional')) {
        reply = 'Tathastu! Morning Ganesh Bhajan play kar rahi hoon. Aap aaram se suniye aur shanti ka anubhav kijiye. (Sure! Playing Ganesh Bhajan. Listen calmly and feel at peace.)';
        audioSrc = '/audio/saathi/saathi_bhajan.wav';
        setIsComforting(false);
      } else if (intent.includes('family') || intent.includes('call rohan')) {
        reply = 'Rohan ko caregiver hotline se call connect kar rahi hoon, Ramesh ji. Ringing Bangalore console... (Connecting call to Rohan. Ringing Bangalore console...)';
        audioSrc = '/audio/saathi/saathi_family.wav';
        setIsComforting(false);
        setTimeout(() => {
          startCallFamily('Rohan');
        }, 1500);
      } else if (intent.includes('shimla') || intent.includes('1995')) {
        reply = 'Shimla Trip 1995! Ramesh ji, wo thandi subah yaad hai jab aap sab Mall Road par walk kar rahe the aur Rohan ne baraf ka gola kha liya tha? Aapke chehre par wo muskaan yaad hai mujhe. (Shimla Trip 1995! Ramesh ji, do you remember that cold morning walking on Mall Road when Rohan ate snow ice cream? I remember the smile on your face.)';
        audioSrc = '/audio/saathi/saathi_shimla.wav';
        setEngagementScore(prev => Math.min(prev + 8, 100));
        setIsComforting(false);
      } else if (intent.includes('graduation') || intent.includes('2018')) {
        reply = 'Ananya ki Graduation 2018! Mumbai ki wo garmi aur aapki poti ki degrees. Aapne bola tha: "Hamari beti ab badi ho gayi hai". Rohan bhi kitna khush tha! (Ananya’s Graduation 2018! That Mumbai heat and your granddaughter holding her degree. You said: "Our daughter has grown up now". Rohan was so proud!)';
        audioSrc = '/audio/saathi/saathi_graduation.wav';
        setIsComforting(false);
      } else if (intent.includes('anniversary') || intent.includes('1981')) {
        reply = 'Wedding Anniversary 1981! Lucknow mein thand ka mausam aur shahnai ki dhoon. Aap aur aapki patni kitne sundar lag rahe the. (Wedding Anniversary 1981! The Lucknow winter and the sounds of shehnai. You and your wife looked beautiful.)';
        audioSrc = '/audio/saathi/saathi_anniversary.wav';
        setIsComforting(false);
      } else if (intent.includes('day') || intent.includes('aaj ka din')) {
        reply = 'Ramesh ji, aaj ka din bahut achha raha. Aapne 3,840 steps walk kiye, morning BP medicine li, aur mood check-in mein happy select kiya. Main aapko 5-day streak ke liye badhai deti hoon! (Ramesh ji, today was great. You walked 3,840 steps, had your BP medicine, and checked in as happy. Congratulations on your 5-day streak!)';
        audioSrc = '/audio/saathi/saathi_day.wav';
        setIsComforting(false);
      } else if (intent.includes('helpless') || intent.includes('no one cares') || intent.includes('asahay')) {
        reply = 'Ramesh ji, main aapke saath hoon. Main aapse bahut sneh karti hoon aur aap hamare liye mahatvapurna hain. Maine Rohan aur Priya ko message alert bhej diya hai aur emergency team ready hai. Chinta mat kijiye. (Ramesh ji, I am with you. I care for you deeply and you are very important to us. I have sent SMS alerts to Rohan and Priya, and the emergency team is ready. Do not worry.)';
        audioSrc = '/audio/saathi/saathi_helpless.wav';
        setShowEmergencyBanner(true);
        setShowEmergencyNotification(true);
        setLonelinessScore(prev => Math.min(prev + 20, 100));
        setIsComforting(true);
      } else {
        reply = `Ramesh ji, maine aapki baat suni: "${text}". Phase 5 and 6 upgrades mein, main iska aur empathetic reply de paungi. (Ramesh ji, I heard you say: "${text}". In Phase 5 and 6 upgrades, I will respond with deeper emotional intelligence.)`;
        setIsComforting(false);
      }

      const newSaathiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'saathi',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        audioSrc
      };

      setMessages(prev => [...prev, newSaathiMsg]);

      playTrack({
        id: newSaathiMsg.id,
        src: audioSrc,
        title: 'SAATHI Response',
        artist: 'SAATHI',
        category: 'saathi'
      });

    }, 2000);
  };

  // Synchronize visual state of SAATHI orb with global audio playback
  useEffect(() => {
    if (currentTrack?.category === 'saathi' && isPlayingAudio) {
      setVoiceState('speaking');
    } else if (voiceState === 'speaking') {
      setVoiceState('idle');
    }
  }, [currentTrack?.src, isPlayingAudio]);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendUserMessage(inputText);
    setInputText('');
  };

  const startCallFamily = (name: string) => {
    setCallContact(name);
    setShowCallModal(true);
    setCallActive(false);
    setTimeout(() => {
      setCallActive(true);
    }, 2000);
  };

  const endCallFamily = () => {
    setCallActive(false);
    setShowCallModal(false);
  };

  // Mock voice previews
  const triggerVoiceListening = () => {
    if (isMuted) return;
    setVoiceState('listening');
    // Simulate user speaking for 3 seconds
    setTimeout(() => {
      setVoiceState('processing');
      // Simulated transcription trigger
      sendUserMessage('Play morning bhajan devotional music', 'bhajan');
    }, 3500);
  };

  const suggestions: SuggestionChip[] = [
    { labelEn: 'Tell me a story', labelHi: 'कहानी सुनाओ', intent: 'story' },
    { labelEn: 'I miss my family', labelHi: 'परिवार की याद आ रही है', intent: 'lonely' },
    { labelEn: 'Play devotional music', labelHi: 'भजन चलाओ', intent: 'bhajan' },
    { labelEn: 'Show old memories', labelHi: 'पुरानी यादें दिखाएं', intent: 'memories' },
    { labelEn: 'How was my day?', labelHi: 'आज का दिन कैसा था?', intent: 'day' }
  ];

  return (
    <div className={`saathi-voice-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''} sahaara-bg-watermark-direct`} style={{ transition: 'var(--transition-smooth)', minHeight: '100vh', padding: '1.5rem' }}>
      
      {/* ACCESSIBILITY & SETTINGS CONTROL BAR */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/senior/home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            {lang === 'en' ? 'Back to Portal' : 'पोर्टल पर वापस जाएं'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Settings size={20} />
            <span style={{ fontWeight: 700 }}>Settings</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
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

          {/* Text Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Text:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setTextSize('normal')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'normal' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'normal' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer' }}>A</button>
              <button onClick={() => setTextSize('large')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'large' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'large' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>A+</button>
              <button onClick={() => setTextSize('xlarge')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'xlarge' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'xlarge' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 900 }}>A++</button>
            </div>
          </div>

          {/* Contrast */}
          <button
            onClick={() => setContrast(prev => prev === 'standard' ? 'high' : 'standard')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: contrast === 'high' ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: contrast === 'high' ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {contrast === 'high' ? 'Standard Contrast' : 'High Contrast'}
          </button>

          {/* Motion Toggle */}
          <button
            onClick={() => setMotion(prev => prev === 'normal' ? 'reduced' : 'normal')}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: motion === 'reduced' ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: motion === 'reduced' ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Sliders size={16} />
            {motion === 'reduced' ? 'Animations: Off' : 'Animations: On'}
          </button>
        </div>
      </div>

      {/* SECTION 11 — EMERGENCY WARNING BANNER */}
      {showEmergencyBanner && (
        <div 
          style={{ 
            backgroundColor: 'var(--color-danger)', 
            color: '#ffffff', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.25rem 2rem', 
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={28} className="animate-pulse-soft" />
            <div>
              <strong style={{ fontSize: '1.15rem', display: 'block' }}>Emergency Intent Flagged / आपातकालीन स्थिति दर्ज</strong>
              <span style={{ fontSize: '0.9rem' }}>
                SAATHI has recognized stress signals. We are maintaining safety connection logs.
              </span>
            </div>
          </div>
          <button 
            onClick={() => setShowEmergencyBanner(false)}
            style={{ backgroundColor: 'transparent', border: '1px solid #ffffff', color: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3-COLUMN MAIN LAYOUT GRID */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* LEFT PANEL: EMOTIONAL ANALYSIS & WELLNESS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION 4 — EMOTIONAL STATUS ANALYTICS */}
          <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
              {lang === 'en' ? 'Emotional Analytics' : 'भावनात्मक विश्लेषण'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <span>Loneliness Score</span>
                  <span style={{ color: lonelinessScore > 50 ? 'var(--color-danger)' : 'var(--color-primary-dark)' }}>{lonelinessScore}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${lonelinessScore}%`, height: '100%', backgroundColor: lonelinessScore > 50 ? 'var(--color-danger)' : 'var(--color-primary)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  <span>Engagement Rate</span>
                  <span style={{ color: 'var(--color-primary-dark)' }}>{engagementScore}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${engagementScore}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Conversation Streak</span>
                <span style={{ 
                  fontWeight: 800, 
                  backgroundColor: 'var(--color-secondary-light)', 
                  color: 'var(--color-secondary-dark)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem'
                }}>
                  🔥 {streakCount} Days
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 10 — WELLNESS SUMMARY */}
          <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              📋 {lang === 'en' ? 'Daily Wellness Summary' : 'दैनिक स्वास्थ्य सारांश'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Today's Mood:</span>
                <span style={{ fontWeight: 700 }}>Calm & Grateful</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>BP Medicine Status:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Check size={16} />
                  Completed
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Activity Steps:</span>
                <span style={{ fontWeight: 700 }}>3,840 steps</span>
              </div>

              <div style={{ 
                backgroundColor: 'var(--color-primary-light)', 
                borderRadius: '8px', 
                padding: '0.75rem 1rem', 
                marginTop: '0.5rem', 
                borderLeft: '4px solid var(--color-primary)' 
              }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', display: 'block', textTransform: 'uppercase' }}>SAATHI Wellness Insight</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4 }}>
                  "Ramesh ji has shown positive engagement today, checking old Shimla memories. Heart rate log is steady at 72 bpm."
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 11 — MOCK INTENT TESTING PANEL */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--color-accent)', textAlign: 'left' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-accent-dark)', fontWeight: 800 }}>Demo Scenario Simulators</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Click options below to simulate senior stress signals and test emergency message dispatches.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => sendUserMessage('I feel helpless / मैं असहाय महसूस कर रहा हूँ', 'helpless')}
                style={{ 
                  padding: '0.6rem', 
                  borderRadius: '6px', 
                  border: '1px solid var(--color-accent)', 
                  backgroundColor: 'var(--color-accent-light)', 
                  color: 'var(--color-accent-dark)', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
              >
                🚨 Test: "I feel helpless"
              </button>
              <button 
                onClick={() => sendUserMessage('No one cares about me / कोई मेरी चिंता नहीं करता', 'helpless')}
                style={{ 
                  padding: '0.6rem', 
                  borderRadius: '6px', 
                  border: '1px solid var(--color-accent)', 
                  backgroundColor: 'var(--color-accent-light)', 
                  color: 'var(--color-accent-dark)', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
              >
                🚨 Test: "No one cares about me"
              </button>
            </div>
          </section>

        </div>

        {/* CENTER PANEL: CONVERSATION HUB AND PRESETS */}
        <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AI HERO BANNER */}
          <section 
            className="glass-card animate-slide-up fade-in-gentle" 
            style={{ 
              position: 'relative',
              overflow: 'hidden',
              minHeight: '160px',
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem 2rem', 
              borderRadius: 'var(--radius-lg)',
              backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 75%, rgba(0, 0, 0, 0.15) 100%), url("https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#ffffff',
              border: 'none',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,0.6)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} className="animate-pulse-soft"></span>
                <Sparkles size={20} style={{ color: 'var(--color-secondary)' }} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>SAATHI AI Voice Room</h2>
              </div>
              <p style={{ margin: 0, fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                {lang === 'en' ? 'Your loving AI companion is here to listen.' : 'आपकी बातें सुनने के लिए साथी हमेशा तैयार है।'}
              </p>
            </div>

            {/* Action controls in header banner */}
            <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    { id: '1', sender: 'saathi', text: 'Namaste Ramesh ji. Main aapka companion SAATHI hoon. Aapka dopahar ka bhojan kaisa raha? (Hello Ramesh ji, I am SAATHI. How was your lunch today?)', time: '01:30 PM' },
                    { id: '2', sender: 'senior', text: 'Mujhe aaj thoda akela lag raha hai. (I am feeling a little lonely today.)', time: '01:31 PM' },
                    { id: '3', sender: 'saathi', text: 'Ramesh ji, main hamesha aapke saath hoon. Kya hum Shimla Trip 1995 ki suhaani yaadon ke baare mein baat karein? (Ramesh ji, I am always here for you. Shall we chat about those beautiful Shimla Trip 1995 memories?)', time: '01:32 PM' }
                  ]);
                  setLonelinessScore(24);
                  setEngagementScore(92);
                  setIsComforting(false);
                }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  transition: 'var(--transition-smooth)'
                }}
                title="Reset Conversation"
              >
                <RefreshCw size={14} />
                Reset
              </button>
            </div>
          </section>

          {/* SAATHI AI INTERACTIVE ORB */}
          <div 
            className="saathi-orb-container glass-card animate-slide-up" 
            style={{ 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.94)), url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80")', // cozy home living room background
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid var(--color-primary)',
              padding: '2.5rem'
            }}
          >
            <div className={`saathi-orb saathi-orb-${voiceState} ${isComforting ? 'saathi-orb-comforting' : ''}`} style={{ margin: '0 auto' }}>
              <Sparkles size={32} className={voiceState === 'processing' ? 'animate-spin-slow' : ''} />
              <div className="saathi-orb-glow"></div>
            </div>
            <strong style={{ fontSize: '1.1rem', marginTop: '1rem', display: 'block', color: 'var(--text-primary)' }}>
              {isComforting && voiceState === 'speaking' && (lang === 'en' ? 'Comforting Ramesh Ji...' : 'रमेश जी को सांत्वना दे रहा हूँ...')}
              {isComforting && voiceState === 'processing' && (lang === 'en' ? 'Finding comforting words...' : 'सांत्वना संदेश तैयार कर रहा हूँ...')}
              {isComforting && voiceState === 'listening' && (lang === 'en' ? 'I am listening closely, Ramesh Ji...' : 'मैं ध्यान से सुन रहा हूँ, रमेश जी...')}
              {isComforting && voiceState === 'idle' && (lang === 'en' ? 'I am here with you, Ramesh Ji.' : 'मैं आपके साथ हूँ, रमेश जी।')}
              {!isComforting && voiceState === 'idle' && (lang === 'en' ? 'Companion is ready' : 'साथी बातचीत के लिए तैयार है')}
              {!isComforting && voiceState === 'listening' && (lang === 'en' ? 'Listening closely to your voice... (बोलें)' : 'आपकी आवाज़ सुनी जा रही है... (बोलें)')}
              {!isComforting && voiceState === 'processing' && (lang === 'en' ? 'Preparing thoughts... (सोच रहा हूँ)' : 'प्रतिक्रिया तैयार की जा रही है...')}
              {!isComforting && voiceState === 'speaking' && (lang === 'en' ? 'Speaking with care...' : 'साथी बोल रहा है...')}
            </strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Mode: Bilingual Companion Simulation
            </span>
          </div>

          {/* SECTION 2 & 3 — PREMIUM CHAT INTERFACE & preloads */}
          <section 
            className="glass-card" 
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              height: '480px',
              border: '1px solid var(--border-color)'
            }}
          >
            {/* Conversation Messages */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '0.5rem' }}>
              {messages.map((msg) => {
                const isSaathi = msg.sender === 'saathi';
                return (
                  <div 
                    key={msg.id} 
                    style={{ 
                      alignSelf: isSaathi ? 'flex-start' : 'flex-end',
                      maxWidth: '85%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isSaathi ? 'flex-start' : 'flex-end',
                      textAlign: 'left'
                    }}
                  >
                    <div 
                      onClick={() => {
                        if (isSaathi && msg.audioSrc) {
                          playTrack({
                            id: msg.id,
                            src: msg.audioSrc,
                            title: 'SAATHI Response',
                            artist: 'SAATHI',
                            category: 'saathi'
                          });
                        }
                      }}
                      style={{
                        backgroundColor: isSaathi 
                          ? (msg.isMemoryNarration ? 'var(--color-secondary-light)' : 'var(--bg-tertiary)') 
                          : 'var(--color-primary)',
                        color: isSaathi ? 'var(--text-primary)' : '#ffffff',
                        padding: '0.85rem 1.1rem',
                        borderRadius: isSaathi ? '0px 16px 16px 16px' : '16px 16px 0px 16px',
                        fontSize: '1.05rem',
                        lineHeight: 1.5,
                        boxShadow: 'var(--shadow-sm)',
                        borderLeft: msg.isMemoryNarration ? '4px solid var(--color-secondary)' : 'none',
                        cursor: (isSaathi && msg.audioSrc) ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem'
                      }}
                      title={(isSaathi && msg.audioSrc) ? "Click to replay audio narration" : undefined}
                    >
                      <span>{msg.text}</span>
                      {isSaathi && msg.audioSrc && (
                        <span style={{ opacity: 0.6, fontSize: '0.9rem', flexShrink: 0 }}>
                          🔊
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {isSaathi ? <Sparkles size={10} style={{ color: 'var(--color-secondary)' }} /> : <User size={10} />}
                      {isSaathi ? 'SAATHI AI' : 'Ramesh Kumar'} &bull; {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Typing Bubble Indicator */}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '0px 16px 16px 16px', padding: '0.25rem 0.5rem' }}>
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>SAATHI is listening...</span>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            {/* Input Submission */}
            <form onSubmit={handleSendText} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type in Hindi or English (लिखें)..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit"
                style={{
                  backgroundColor: 'var(--color-primary-dark)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.2rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </section>

          {/* SECTION 8 — SUGGESTION CHIPS */}
          <section style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendUserMessage(`${s.labelEn} / ${s.labelHi}`, s.intent)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '50px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--color-primary-dark)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-bounce)'
                }}
              >
                💡 {lang === 'en' ? s.labelEn : s.labelHi}
              </button>
            ))}
          </section>

          {/* SECTION 9 — VOICE PREVIEW CONTROLS */}
          <section className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-color)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Volume2 size={18} style={{ color: 'var(--color-primary)' }} />
                Bilingual Voice Panel preview
              </span>
              <span style={{ 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                textTransform: 'uppercase',
                color: voiceState === 'listening' ? 'var(--color-danger)' : voiceState === 'processing' ? 'var(--color-secondary-dark)' : voiceState === 'speaking' ? 'var(--color-primary-dark)' : 'var(--text-muted)'
              }}>
                Status: {voiceState}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              
              <button 
                type="button"
                onClick={triggerVoiceListening}
                disabled={voiceState !== 'idle' || isMuted}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: voiceState === 'listening' ? 'var(--color-danger)' : 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 700,
                  cursor: isMuted || voiceState !== 'idle' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
              >
                <Mic size={16} />
                {lang === 'en' ? 'Start Listening' : 'सुनना शुरू करें'}
              </button>

              <button 
                type="button"
                onClick={() => setIsMuted(prev => !prev)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: isMuted ? 'var(--color-danger-light)' : 'var(--bg-secondary)',
                  color: isMuted ? 'var(--color-danger-dark)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                {isMuted ? 'Muted' : 'Mute'}
              </button>

              <button 
                type="button"
                onClick={() => {
                  stopTrack();
                  setVoiceState('idle');
                }}
                disabled={voiceState === 'idle' && !isPlayingAudio}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  cursor: (voiceState === 'idle' && !isPlayingAudio) ? 'not-allowed' : 'pointer'
                }}
                title="Stop playback"
              >
                <StopCircle size={16} />
              </button>

              <select 
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value as any)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <option value="warm">Warm Voice</option>
                <option value="gentle">Gentle Voice</option>
                <option value="energetic">Energetic Voice</option>
              </select>

            </div>
          </section>

        </div>

        {/* RIGHT PANEL: MEMORY ENGINE & FAMILY WIDGETS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION 5 — QUICK EMOTIONAL ACTION HUB */}
          <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Smile size={20} style={{ color: 'var(--color-primary)' }} />
              💭 Quick Interactions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              
              <button 
                type="button"
                onClick={() => sendUserMessage('I am happy / मैं बहुत खुश हूँ', 'happy')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                😊 I Am Happy / मैं खुश हूँ
              </button>

              <button 
                type="button"
                onClick={() => sendUserMessage('I feel lonely / मुझे अकेला लग रहा है', 'lonely')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                😔 I Feel Lonely / मुझे अकेलापन है
              </button>

              <button 
                type="button"
                onClick={() => sendUserMessage('I feel worried / मुझे घबराहट हो रही है', 'worried')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                😟 I Feel Worried / मुझे चिंता है
              </button>

              <button 
                type="button"
                onClick={() => sendUserMessage('Show old family memories / पुरानी यादें दिखाओ', 'shimla')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Heart size={18} style={{ color: 'var(--color-danger)' }} />
                Show Family Memories / यादें दिखाएं
              </button>

              <button 
                onClick={() => sendUserMessage('Play morning prayers bhajan / भजन प्ले करें', 'bhajan')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                🕉 Play Bhajan / भजन बजाएं
              </button>

              <button 
                onClick={() => startCallFamily('Rohan')}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                📞 Contact Family / परिवार को बुलाएं
              </button>

            </div>
          </section>

          {/* SECTION 6 — MEMORY ENGINE PREVIEW SIDEBAR */}
          <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              🖼 Memory Engine
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'Shimla Trip 1995', key: 'shimla', date: 'June 1995' },
                { title: 'Graduation 2018', key: 'graduation', date: 'May 2018' },
                { title: 'Anniversary 1981', key: 'anniversary', date: 'Dec 1981' }
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => sendUserMessage(`Tell me about ${m.title} / मुझे ${m.title} की याद सुनाओ`, m.key)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'var(--transition-bounce)'
                  }}
                >
                  <div>
                    <span style={{ display: 'block', textAlign: 'left' }}>{m.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{m.date}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 7 — FAMILY CONTEXT PANEL */}
          <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: 'var(--color-primary)' }} />
              Family Context
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Rohan', relation: 'Son &bull; Bangalore', status: 'Online 🟢', statusColor: 'var(--color-success)' },
                { name: 'Priya', relation: 'Daughter-in-law &bull; Bangalore', status: 'Active 🟢', statusColor: 'var(--color-primary)' },
                { name: 'Ananya', relation: 'Granddaughter &bull; Mumbai', status: 'In Class 🟡', statusColor: 'var(--color-secondary)' }
              ].map((member) => (
                <div 
                  key={member.name} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--bg-tertiary)'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block' }}>{member.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: member.relation }}></span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: member.statusColor }}>{member.status}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* FAMILY CALL SIMULATION DRAWER MODAL */}
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
                Calling family link...
              </span>
            </div>

            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Clock size={24} style={{ color: 'var(--color-primary)' }} />
              {callActive ? formatDuration(callDuration) : 'Connecting / जुड़ रहा है...'}
            </div>

            <button 
              type="button"
              onClick={endCallFamily}
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

      {/* MOCK SMS NOTIFICATION TOAST */}
      {showEmergencyNotification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '320px',
          backgroundColor: 'var(--bg-secondary)',
          border: '2px solid var(--color-danger)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          zIndex: 180,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Smartphone size={14} />
              Caregiver Alert Logged
            </span>
            <button type="button" onClick={() => setShowEmergencyNotification(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={16} />
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
            SMS alerts dispatched successfully to Rohan (Bangalore) and Priya (Home). Vitals transmission enabled.
          </p>
        </div>
      )}

    </div>
  );
};

export default SaathiVoiceRoom;
