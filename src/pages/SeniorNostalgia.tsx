import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Play, 
  Pause, 
  Search, 
  X, 
  Sparkles, 
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import nostalgiaMarriageImg from '../assets/nostalgia_marriage.png';
import nostalgiaTravelImg from '../assets/nostalgia_travel.png';
import nostalgiaAchievementsImg from '../assets/nostalgia_achievements.png';
import nostalgiaFestivalsImg from '../assets/nostalgia_festivals.png';
import nostalgiaChildhoodImg from '../assets/nostalgia_childhood.png';
import nostalgiaFamilyImg from '../assets/nostalgia_family.png';

// Memory interface
interface FamilyMemory {
  id: string;
  title: string;
  date: string;
  category: 'marriage' | 'festivals' | 'travel' | 'achievements' | 'family' | 'childhood';
  description: string;
  imageUrl: string;
  uploader: string;
  story: string;
  tags: string[];
}

// Timeline node interface
interface TimelineNode {
  year: string;
  title: string;
  story: string;
  desc: string;
  details: string;
}

export const SeniorNostalgia: React.FC = () => {
  const {
    currentTrack,
    isPlaying: globalIsPlaying,
    currentTime,
    duration,
    error,
    playTrack,
    pauseTrack,
    seekTrack,
    stopTrack,
    replayTrack
  } = useAudio();

  const getMemoryAudioSrc = (id: string) => {
    const srcMap: Record<string, string> = {
      'mem-1': '/audio/memories/anniversary_1981.mp3',
      'mem-2': '/audio/memories/shimla_trip_1995.wav',
      'mem-3': '/audio/memories/graduation_2018.wav',
      'mem-4': '/audio/memories/holi_2005.wav',
      'mem-5': '/audio/memories/bhu_college_1968.wav',
      'mem-6': '/audio/memories/granddaughter_first_step_1999.wav'
    };
    return srcMap[id] || '';
  };

  const getVoiceGreetingSrc = (id: string) => {
    const srcMap: Record<string, string> = {
      'voice-1': '/audio/family/ananya_granddaughter.mp3',
      'voice-2': '/audio/family/rohan_son.mp3',
      'voice-3': '/audio/family/sushila_spouse.mp3'
    };
    return srcMap[id] || '';
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // 1. ACCESSIBILITY PARAMETERS
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    return (localStorage.getItem('senior-text-size') as any) || 'large';
  });
  const [contrast, setContrast] = useState<'standard' | 'high'>(() => {
    return (localStorage.getItem('senior-contrast') as any) || 'standard';
  });
  const [motion, setMotion] = useState<'normal' | 'reduced'>(() => {
    return (localStorage.getItem('senior-motion') as any) || 'normal';
  });
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('senior-lang') as any) || 'en';
  });

  // Local storage save
  useEffect(() => {
    localStorage.setItem('senior-text-size', textSize);
    localStorage.setItem('senior-contrast', contrast);
    localStorage.setItem('senior-motion', motion);
    localStorage.setItem('senior-lang', lang);
  }, [textSize, contrast, motion, lang]);

  // 2. MOCK DATASETS
  const initialMemories: FamilyMemory[] = [
    {
      id: 'mem-1',
      title: lang === 'en' ? 'Anniversary 1981' : 'वैवाहिक वर्षगांठ १९८१',
      date: 'December 18, 1981',
      category: 'marriage',
      description: 'Ramesh and Sushila Wedding anniversary in Lucknow. Traditional shehnai music and grand family feast.',
      imageUrl: nostalgiaMarriageImg,
      uploader: 'Rohan (Son)',
      story: 'It was a cold Lucknow night, but the house was warm with the echoes of shehnai. Sushila looked radiant in her crimson silk saree, and all neighbors from Gomti Nagar joined the street celebration.',
      tags: ['Sushila', 'Wedding', 'Lucknow', 'Feast']
    },
    {
      id: 'mem-2',
      title: lang === 'en' ? 'Shimla Family Trip 1995' : 'शिमला यात्रा १९९५',
      date: 'June 1995',
      category: 'travel',
      description: 'Summer holidays walking along Shimla Mall Road with Rohan and Priya.',
      imageUrl: nostalgiaTravelImg,
      uploader: 'Rohan (Son)',
      story: 'We escaped the Lucknow summer heat to visit Shimla. Rohan was only a teenager, running around taking photos with a Kodak film camera. We ate soft-serve ice cream in the breezy evenings at the Ridge.',
      tags: ['Shimla', 'Rohan', 'Summer', 'Ice Cream']
    },
    {
      id: 'mem-3',
      title: lang === 'en' ? 'Graduation Day 2018' : 'दीक्षांत समारोह २०१८',
      date: 'May 12, 2018',
      category: 'achievements',
      description: 'Granddaughter Ananya holding her engineering degree with Dadu in Mumbai.',
      imageUrl: nostalgiaAchievementsImg,
      uploader: 'Ananya (Granddaughter)',
      story: 'A proud grandfather moment. Ananya was the top scorer in her computer engineering batch. Ramesh ji traveled all the way to Mumbai by train, carrying Lucknow pedas for all her hostel friends.',
      tags: ['Ananya', 'Graduation', 'Mumbai', 'Pedas']
    },
    {
      id: 'mem-4',
      title: lang === 'en' ? 'Lucknow Holi Festival 2005' : 'होली मिलन २००५',
      date: 'March 2005',
      category: 'festivals',
      description: 'Gomti Nagar colony colors assembly and gujiya exchange with neighbors.',
      imageUrl: nostalgiaFestivalsImg,
      uploader: 'Priya (Daughter-in-law)',
      story: 'Traditional organic colours and buckets of cold water. Ramesh ji lead the bhajan mandali song, followed by distribution of homemade mathri and saffron gujiya made by Sushila.',
      tags: ['Holi', 'Colors', 'Gujiya', 'Bhajans']
    },
    {
      id: 'mem-5',
      title: lang === 'en' ? 'BHU College Days 1968' : 'बीएचयू कॉलेज दिन १९६८',
      date: 'June 1968',
      category: 'childhood',
      description: 'Ramesh ji with hostel batchmates outside BHU Engineering block in Varanasi.',
      imageUrl: nostalgiaChildhoodImg,
      uploader: 'Rohan (Son)',
      story: 'In Varanasi, studying civil engineering at Banaras Hindu University. Ramesh spent evenings drinking tea at Assi Ghat, discussing poetry with professors and debating politics in hostel rooms.',
      tags: ['BHU', 'College', 'Hostel', 'Varanasi']
    },
    {
      id: 'mem-6',
      title: lang === 'en' ? 'Granddaughter First Step 1999' : 'अनन्या के पहले कदम १९९९',
      date: 'September 1999',
      category: 'family',
      description: 'Ananya walking in Bangalore courtyard holding Dadu’s index finger.',
      imageUrl: nostalgiaFamilyImg,
      uploader: 'Priya (Daughter-in-law)',
      story: 'Ananya took her very first steps in the Bangalore courtyard. Dadu was guiding her gently, while Rohan took this beautiful frame from the window grid. She giggled whenever Dadu whistled.',
      tags: ['Ananya', 'Courtyard', 'Bangalore', 'Courage']
    }
  ];

  const timelineData: TimelineNode[] = [
    { year: '1968', title: 'BHU College Graduation', desc: 'Civil Engineering BHU Varanasi', story: 'Graduated from Banaras Hindu University. Ramesh carried a suitcase full of books and got his first job at UP irrigation department.', details: 'Varanasi Hostel 4, batch of 1968. Guided by Prof. Shastri.' },
    { year: '1981', title: 'Marriage with Sushila', desc: 'Lucknow Wedding Ceremony', story: 'Married Sushila in Lucknow. Established home in Gomti Nagar, planting the mango tree which still yields sweet fruit today.', details: 'Wedding in Chowk Lucknow. Shehnai was played by Bismillah Khan student.' },
    { year: '1995', title: 'Family Home & Shimla Trip', desc: 'Summer holiday with Rohan', story: 'Traveled to Shimla with young Rohan. Rohan got selected in Bangalore software engineering college the same year.', details: 'Mall Road Ridge view, cold windy evenings with soft-serve cream.' },
    { year: '2001', title: 'Son Rohan Marriage', desc: 'Welcoming Priya into the Family', story: 'Son Rohan got married to Priya. Hosted a grand feast in Lucknow, inviting all local colony friends.', details: 'Grand celebration in Lucknow, sweets from Chowk.' },
    { year: '2018', title: 'Granddaughter Graduation', desc: 'Ananya Bachelor degree ceremony', story: 'Ananya graduated computer engineering top of her class in Mumbai. Ramesh traveled to Mumbai to crown her with flowers.', details: 'Celebrating at Mumbai central university grounds.' }
  ];

  // 3. PAGE INTERACTION STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMemory, setSelectedMemory] = useState<FamilyMemory | null>(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(1); // 1981 Wedding
  
  // Voice playlist states
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);

  // Sync activeVoiceId state with global audio playback
  useEffect(() => {
    if (globalIsPlaying && currentTrack) {
      const voiceIdMap: Record<string, string> = {
        '/audio/family/ananya_granddaughter.mp3': 'voice-1',
        '/audio/family/rohan_son.mp3': 'voice-2',
        '/audio/family/sushila_spouse.mp3': 'voice-3'
      };
      const matchingId = voiceIdMap[currentTrack.src];
      if (matchingId) {
        setActiveVoiceId(matchingId);
      } else {
        setActiveVoiceId(null);
      }
    } else {
      setActiveVoiceId(null);
    }
  }, [globalIsPlaying, currentTrack]);

  // Life story active tab state
  const [lifeStoryTab, setLifeStoryTab] = useState<'childhood' | 'career' | 'marriage' | 'retirement'>('childhood');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredMemories = initialMemories.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedTimeline = timelineData[activeTimelineIdx];

  // Voice playlist assets
  const voiceMessages = [
    { id: 'voice-1', sender: 'Ananya (Granddaughter)', duration: '0:35 mins', relation: 'Granddaughter', details: 'Thinking of you Dadu! Hope you had breakfast and medicine. Call me tonight!', date: 'Today, 10:00 AM' },
    { id: 'voice-2', sender: 'Rohan (Son)', duration: '1:10 mins', relation: 'Son', details: 'Dad, we shipped a sweet legacy letter to your Nostalgia corner. Reminding you of Lucknow Holi.', date: 'Yesterday' },
    { id: 'voice-3', sender: 'Sushila ji (Memory Archives)', duration: '0:45 mins', relation: 'Spouse', details: 'Archived voice greeting celebrating wedding anniversary 1981.', date: 'Historical Log' }
  ];

  return (
    <div className={`senior-nostalgia-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
      
      {/* ACCESSIBILITY HUB BAR */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.25rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '1.25rem',
          borderBottom: '4px solid var(--color-primary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>
          <Sparkles size={22} className="animate-pulse-soft" />
          <span>{lang === 'en' ? 'Nostalgia Corner & Reminiscence Therapy' : 'यादों का कोना एवं स्मृति थेरेपी'}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setLang('en')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'en' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: lang === 'en' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>English</button>
              <button onClick={() => setLang('hi')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'hi' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: lang === 'hi' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>हिंदी</button>
            </div>
          </div>

          {/* Text Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Text Size:' : 'अक्षरों का आकार:'}</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setTextSize('normal')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'normal' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'normal' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>A</button>
              <button onClick={() => setTextSize('large')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'large' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'large' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>A+</button>
              <button onClick={() => setTextSize('xlarge')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'xlarge' ? 'var(--color-primary)' : 'var(--bg-secondary)', color: textSize === 'xlarge' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 900 }}>A++</button>
            </div>
          </div>

          {/* Contrast */}
          <button
            onClick={() => setContrast(prev => prev === 'standard' ? 'high' : 'standard')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: contrast === 'high' ? 'var(--text-primary)' : 'var(--bg-secondary)', color: contrast === 'high' ? 'var(--bg-primary)' : 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            {contrast === 'high' ? (lang === 'en' ? 'Yellow/Black' : 'पीला/काला') : (lang === 'en' ? 'Standard Contrast' : 'साधारण रंग')}
          </button>

          {/* Motion */}
          <button
            onClick={() => setMotion(prev => prev === 'normal' ? 'reduced' : 'normal')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            {motion === 'reduced' ? (lang === 'en' ? 'Animations Off 🛑' : 'एनिमेशन बंद 🛑') : (lang === 'en' ? 'Animations On 🟢' : 'एनिमेशन चालू 🟢')}
          </button>
        </div>
      </div>

      {/* TOP PANELS: HERO FEATURED MEMORY & THERAPY METER */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* FEATURED MEMORY CARD (SPAN 2) */}
        <section className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left', borderLeft: '6px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary-dark)' }}>
                ⭐ {lang === 'en' ? 'Featured Memory' : 'आज की विशेष स्मृति'}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>
                {lang === 'en' ? 'Wedding Anniversary with Sushila' : 'सुशीला जी के साथ वैवाहिक वर्षगांठ'}
              </h3>
            </div>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>December 1981</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            {/* Fake photo placeholder */}
            <div style={{ flex: 1, minWidth: '220px', height: '180px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-primary)' }}>
              <span style={{ fontSize: '3rem' }}>👰🤵</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {lang === 'en' ? 'Ramesh & Sushila' : 'रमेश एवं सुशीला'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lucknow Chowk, 1981</span>
            </div>

            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>
                {lang === 'en' 
                  ? '“It was a cold Lucknow night, but the house was warm with the echoes of shehnai. Sushila looked radiant in her crimson silk saree, and all neighbors from Gomti Nagar joined the street celebration.”'
                  : '“वह लखनऊ की एक सर्द रात थी, लेकिन शहनाई की गूंज से घर गर्म था। सुशीला अपनी लाल रेशमी साड़ी में चमक रही थीं, और गोमती नगर के सभी पड़ोसी सड़क उत्सव में शामिल हुए थे।”'}
              </p>
              
              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>Uploaded by: <strong>Rohan (Son)</strong></span>
                <span>Category: <strong>Marriage Vault</strong></span>
              </div>

              <button 
                onClick={() => setSelectedMemory(initialMemories[0])}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <BookOpen size={16} /> {lang === 'en' ? 'View Details' : 'यादें पढ़ें'}
              </button>
            </div>
          </div>
        </section>

        {/* REMINISCENCE THERAPY METRICS PANEL */}
        <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            🧠 Reminiscence Therapy Panel
          </h3>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
            Revisiting old photo albums, audio notes, and diaries is clinically proven to reduce loneliness, stimulate cognitive function, and lower blood pressure spikes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                <span>😊 Mood Boost Index</span>
                <span style={{ color: 'var(--color-success)' }}>+15% (Excellent)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--color-success)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                <span>🎯 Memory Engagement Score</span>
                <span style={{ color: 'var(--color-primary-dark)' }}>96%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: '96%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', background: 'var(--bg-tertiary)', padding: '0.6rem 0.8rem', borderRadius: '6px' }}>
              <span>Total Interactions this week:</span>
              <strong>14 sessions</strong>
            </div>
          </div>
        </section>

      </div>

      {/* DYNAMIC STORY TIMELINE TRACKER */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            ⏳ Ramesh Kumar’s Life Journey Timeline
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Click on years to load historical narratives</span>
        </div>

        {/* Horizontal track of years */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '1rem 0', overflowX: 'auto', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          
          <div style={{ position: 'absolute', top: '2.5rem', left: '10px', right: '10px', height: '4px', backgroundColor: 'var(--border-color)', zIndex: 1 }}></div>

          {timelineData.map((node, idx) => {
            const isActive = activeTimelineIdx === idx;
            return (
              <button
                key={node.year}
                onClick={() => { setActiveTimelineIdx(idx); triggerToast(`Loaded timeline event: ${node.year}`); }}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '90px'
                }}
              >
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-secondary)', 
                  border: `4px solid ${isActive ? 'var(--color-primary-dark)' : 'var(--border-color)'}`,
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)'
                }}></div>
                <strong style={{ fontSize: '1.15rem', marginTop: '0.5rem', color: isActive ? 'var(--color-primary-dark)' : 'var(--text-primary)' }}>{node.year}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'capitalize' }}>{node.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Year Narrative details */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid var(--color-secondary)' }}>
          <div style={{ flex: 1, minWidth: '250px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-secondary-dark)' }}>
              Timeline event &bull; Year {selectedTimeline.year}
            </span>
            <h4 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>{selectedTimeline.title}</h4>
            <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>{selectedTimeline.story}</p>
          </div>
          
          <div style={{ flex: 1, minWidth: '250px', borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Historical Context Archive</span>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              "{selectedTimeline.details}"
            </p>
          </div>
        </div>
      </section>

      {/* FAMILY VOICE PLAYLIST & LIFE STORIES */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* VOICE MESSAGES (SPAN 2) */}
        <section className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              🎙 Family Voice Greetings Vault
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Listening to family voice notes induces relaxation and boosts connection</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {voiceMessages.map((v) => {
              const isPlaying = activeVoiceId === v.id;
              return (
                <div 
                  key={v.id} 
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    borderLeft: isPlaying ? '5px solid var(--color-primary)' : '1px solid var(--border-color)',
                    backgroundColor: isPlaying ? 'var(--color-primary-light)' : 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '1.05rem', display: 'block' }}>{v.sender} ({v.relation})</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.date} &bull; duration: {v.duration}</span>
                    </div>

                    <button
                      onClick={() => {
                        const voiceSrc = getVoiceGreetingSrc(v.id);
                        if (isPlaying) {
                          pauseTrack();
                          triggerToast('Audio paused');
                        } else {
                          playTrack({
                            src: voiceSrc,
                            title: v.sender,
                            artist: v.relation
                          });
                          triggerToast(`Streaming greeting from ${v.sender}`);
                        }
                      }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--color-primary)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '3px' }} />}
                    </button>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>"{v.details}"</p>

                  {/* Audio Waveform visualization */}
                  {isPlaying ? (
                    <div style={{ display: 'flex', gap: '3px', height: '28px', alignItems: 'center', width: '100%', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.5rem' }}>
                      {[15, 25, 10, 40, 30, 15, 20, 35, 10, 5, 25, 45, 15, 20, 35, 40, 10, 15, 25, 30, 15, 20, 40, 10, 25].map((h, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            flex: 1, 
                            backgroundColor: 'var(--color-secondary)', 
                            height: `${h}%`,
                            borderRadius: '10px',
                            animation: motion === 'reduced' ? 'none' : 'pulse-soft 1.5s infinite ease-in-out',
                            animationDelay: `${i * 0.05}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* ANNIVERSARIES & Smart reminders */}
        <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            📅 Anniversary Highlights
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 800, textTransform: 'uppercase' }}>Wedding Anniversary</span>
              <strong style={{ display: 'block', fontSize: '1rem', margin: '0.1rem 0' }}>Ramesh & Sushila Marriage</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>December 18 (185 days left)</span>
            </div>

            <div style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>Family Birthday</span>
              <strong style={{ display: 'block', fontSize: '1rem', margin: '0.1rem 0' }}>Granddaughter Ananya Birthday</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>October 12 (118 days left)</span>
            </div>

            <div style={{ borderLeft: '4px solid var(--color-secondary)', paddingLeft: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>Festival Event</span>
              <strong style={{ display: 'block', fontSize: '1rem', margin: '0.1rem 0' }}>Lucknow Diwali colors feast</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>November 09 (146 days left)</span>
            </div>
          </div>
        </section>

      </div>

      {/* LIFE STORY BIO GENERATOR COMPANION */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            📖 "My Life Journey" Biography companion
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Chronicles of Ramesh Kumar’s life milestones generated in collaboration with family notes</span>
        </div>

        <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', gap: '1rem', overflowX: 'auto', paddingBottom: '0.1rem' }}>
          {['childhood', 'career', 'marriage', 'retirement'].map((tab) => (
            <button
              key={tab}
              onClick={() => setLifeStoryTab(tab as any)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: lifeStoryTab === tab ? '4px solid var(--color-primary)' : '4px solid transparent',
                color: lifeStoryTab === tab ? 'var(--color-primary-dark)' : 'var(--text-muted)',
                padding: '0.5rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', borderLeft: '5px solid var(--color-primary)' }}>
          {lifeStoryTab === 'childhood' && (
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Childhood in Chowk, Lucknow (1954 - 1964)</strong>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Born in Chowk, old Lucknow. Spent summers flying paper kites from Chowk house rooftops and eating mangoes from the backyard trees. Daily routine involved walking to the local primary school and listening to classical shehnai recitations from nearby temples.
              </p>
            </div>
          )}

          {lifeStoryTab === 'career' && (
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>BHU College & Civil Engineering Career (1964 - 2012)</strong>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Graduated Civil Engineering from Banaras Hindu University (BHU) in 1968. Joined the state irrigation services. Led several reservoir design initiatives across Uttar Pradesh. Known for integrity and a deep interest in literature and writing.
              </p>
            </div>
          )}

          {lifeStoryTab === 'marriage' && (
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Establishment of Family with Sushila (1981 - 2020)</strong>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Married Sushila in Lucknow Chowk. Built the home in Gomti Nagar. Focused on educating son Rohan (who now leads software teams in Bangalore) and celebrating community festivals. Sushila was known for her culinary skills and peaceful, spiritual demeanor.
              </p>
            </div>
          )}

          {lifeStoryTab === 'retirement' && (
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.5rem' }}>Active Aging & SAATHI companion (2012 - Present)</strong>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Retired from public service. Devotes time to morning temple walks, walking clubs in Gomti Nagar, writing legacy letters for grandchildren, and engaging daily with SAATHI companion to discuss philosophy and memory stories.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAMILY PHOTO ALBUM ARCHIVE GRID WITH FILTERS */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              📸 Complete Family Memories Vault
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cherished photo albums categorized for cognitive stimulation</span>
          </div>

          {/* Filtering toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tag, title, uploader..."
                style={{ padding: '0.4rem 0.5rem 0.4rem 2rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem', width: '200px', outline: 'none' }}
              />
            </div>

            {/* Category selection */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
            >
              <option value="all">All Albums</option>
              <option value="marriage">Marriage</option>
              <option value="festivals">Festivals</option>
              <option value="travel">Travel</option>
              <option value="achievements">Achievements</option>
              <option value="family">Family</option>
              <option value="childhood">Childhood</option>
            </select>

          </div>
        </div>

        {/* Photo Cards Grid */}
        <div className="grid-container grid-3" style={{ gap: '1.5rem' }}>
          {filteredMemories.length === 0 ? (
            <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ImageIcon size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
              <strong style={{ display: 'block' }}>No memories matched search query.</strong>
            </div>
          ) : (
            filteredMemories.map((m) => (
              <div 
                key={m.id} 
                className="glass-card hover-card" 
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'left', borderBottom: '3px solid var(--color-primary)' }}
              >
                <img 
                  src={m.imageUrl} 
                  alt={m.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                />

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>{m.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.date}</span>
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0' }}>{m.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {m.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From: <strong>{m.uploader}</strong></span>
                    <button 
                      onClick={() => setSelectedMemory(m)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary-dark)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Open Detail &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* INTERACTIVE MEMORY VIEWER MODAL */}
      {selectedMemory && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '550px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>{selectedMemory.category} Album Details</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.1rem 0 0 0' }}>{selectedMemory.title}</h3>
              </div>
              <button onClick={() => setSelectedMemory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <img 
              src={selectedMemory.imageUrl} 
              alt={selectedMemory.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }} 
            />

            <div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--color-primary-dark)' }}>Memory Story Narration:</strong>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.45, color: 'var(--text-primary)' }}>
                "{selectedMemory.story}"
              </p>
            </div>

            {/* Audio Narration Playback Engine Interface */}
            {(() => {
              const memorySrc = getMemoryAudioSrc(selectedMemory.id);
              const isCurrentActive = currentTrack?.src === memorySrc;
              const activeIsPlaying = isCurrentActive && globalIsPlaying;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                      🔊 Audio Story Narration
                    </span>
                    {error && isCurrentActive && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-danger)' }}>
                        Audio unavailable
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeIsPlaying) {
                          pauseTrack();
                        } else {
                          playTrack({
                            src: memorySrc,
                            title: selectedMemory.title,
                            artist: 'Memory Narration'
                          });
                        }
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        backgroundColor: 'var(--color-primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      {activeIsPlaying ? <Pause size={14} /> : <Play size={14} />}
                      {activeIsPlaying ? 'Pause' : 'Play Narration'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (currentTrack?.src === memorySrc) {
                          replayTrack();
                        } else {
                          playTrack({
                            src: memorySrc,
                            title: selectedMemory.title,
                            artist: 'Memory Narration'
                          });
                        }
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      <RotateCcw size={14} />
                      Replay
                    </button>
                  </div>

                  {isCurrentActive && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={(e) => seekTrack(parseFloat(e.target.value))}
                        style={{
                          width: '100%',
                          height: '4px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--border-color)',
                          outline: 'none',
                          cursor: 'pointer',
                          accentColor: 'var(--color-primary)'
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Related tags linked:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedMemory.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>#{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => { setSelectedMemory(null); stopTrack(); triggerToast('Memory narration completed.'); }}
                style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
              >
                Close Memory
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Toast popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 220,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Sparkles size={18} />
          {toastMessage}
        </div>
      )}

    </div>
  );
};

export default SeniorNostalgia;
