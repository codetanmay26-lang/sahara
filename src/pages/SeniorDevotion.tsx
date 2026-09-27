import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Play, 
  Pause,
  Award,
  Bell,
  Flame,
  Volume2,
  X
} from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { useAudio } from '../context/AudioContext';

interface BhajanTrack {
  id: string;
  title: string;
  titleHi: string;
  artist: string;
  artistHi: string;
  category: 'hanuman' | 'krishna' | 'shiva' | 'durga' | 'sai' | 'gurbani' | 'jain' | 'buddhist';
  categoryHi: string;
  src: string; // Will try local asset first, fallback to soundhelix URL
}

interface SpiritualStory {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  preview: string;
  previewHi: string;
  content: string;
  contentHi: string;
  lessons: string[];
  lessonsHi: string[];
}

interface FestivalDay {
  id: string;
  name: string;
  nameHi: string;
  date: string;
  significance: string;
  significanceHi: string;
  activities: string[];
  activitiesHi: string[];
  daysLeft: number;
}

export const SeniorDevotion: React.FC = () => {
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

  // Local storage save for accessibility
  useEffect(() => {
    localStorage.setItem('senior-text-size', textSize);
    localStorage.setItem('senior-contrast', contrast);
    localStorage.setItem('senior-motion', motion);
    localStorage.setItem('senior-lang', lang);
  }, [textSize, contrast, motion, lang]);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 2. MOCK TRACK DATA (Using local placeholders + fallback royalty free URL endpoints)
  const bhajanTracks: BhajanTrack[] = [
    { id: 't-1', title: 'Hanuman Chalisa', titleHi: 'हनुमान चालीसा', artist: 'Hariharan Mandali', artistHi: 'हरिहरन मंडली', category: 'hanuman', categoryHi: 'हनुमान', src: '/audio/devotion/hanuman_chalisa.mp3' },
    { id: 't-2', title: 'Gayatri Mantra', titleHi: 'गायत्री मंत्र', artist: 'Anup Jalota Chorus', artistHi: 'अनूप जलोटा कोरस', category: 'hanuman', categoryHi: 'आरती', src: '/audio/devotion/gayatri_mantra.mp3' },
    { id: 't-3', title: 'Shiv Bhajan', titleHi: 'शिव भजन', artist: 'Varanasi Chants', artistHi: 'वाराणसी चैंट्स', category: 'shiva', categoryHi: 'शिव', src: '/audio/devotion/shiv_bhajan.mp3' },
    { id: 't-4', title: 'Krishna Bhajan', titleHi: 'कृष्ण भजन', artist: 'Shreya Spirituals', artistHi: 'श्रेया स्पिरिचुअल्स', category: 'krishna', categoryHi: 'कृष्णा', src: '/audio/devotion/krishna_bhajan.mp3' },
    { id: 't-5', title: 'Ram Bhajan', titleHi: 'राम भजन', artist: 'Lata Spiritual Vault', artistHi: 'लता स्पिरिचुअल वॉल्ट', category: 'krishna', categoryHi: 'कृष्णा', src: '/audio/devotion/ram_bhajan.mp3' },
    { id: 't-6', title: 'Ganesh Aarti', titleHi: 'गणेश आरती', artist: 'Mumbai Ganesh Mandali', artistHi: 'मुंबई गणेश मंडली', category: 'hanuman', categoryHi: 'आरती', src: '/audio/devotion/ganesh_aarti.mp3' },
    { id: 't-7', title: 'Morning Prayers', titleHi: 'प्रातःकाल प्रार्थना', artist: 'Sanskrit Chorus', artistHi: 'संस्कृत कोरस', category: 'sai', categoryHi: 'साईं बाबा', src: '/audio/devotion/morning_prayers.mp3' },
    { id: 't-8', title: 'Evening Prayers', titleHi: 'सायंकाल प्रार्थना', artist: 'Sanskrit Chorus', artistHi: 'संस्कृत कोरस', category: 'sai', categoryHi: 'साईं बाबा', src: '/audio/devotion/evening_prayers.mp3' },
    { id: 't-9', title: 'Festival Special Bhajans', titleHi: 'विशेष त्यौहार भजन', artist: 'Lata Spiritual Vault', artistHi: 'लता स्पिरिचुअल वॉल्ट', category: 'durga', categoryHi: 'दुर्गा', src: '/audio/devotion/festival_bhajans.mp3' }
  ];

  // 3. PERSISTENT STATE MANAGEMENT USING LOCALSTORAGE
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('devotion-favorites');
    return saved ? JSON.parse(saved) : ['t-1', 't-3'];
  });

  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>(() => {
    const saved = localStorage.getItem('devotion-recent');
    return saved ? JSON.parse(saved) : ['t-2'];
  });

  const [reminders, setReminders] = useState<string[]>(() => {
    const saved = localStorage.getItem('devotion-reminders');
    return saved ? JSON.parse(saved) : [];
  });

  // Track playback state
  const [currentTrack, setCurrentTrack] = useState<BhajanTrack>(bhajanTracks[0]);
  const { currentTrack: globalTrack, isPlaying: globalIsPlaying, playTrack, pauseTrack } = useAudio();
  const isPlaying = globalTrack?.src === currentTrack.src && globalIsPlaying;

  // Sync state modifications to local storage
  useEffect(() => {
    localStorage.setItem('devotion-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('devotion-recent', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  useEffect(() => {
    localStorage.setItem('devotion-reminders', JSON.stringify(reminders));
  }, [reminders]);

  // 4. BHAJAN SEARCH AND CATEGORY FILTER STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 5. MOCK DATASETS - STORIES
  const spiritualStories: SpiritualStory[] = [
    {
      id: 'st-1',
      title: 'Ramayan: The Bridge of Loyalty (Setu Bandha)',
      titleHi: 'रामायण: सेतु बंध गाथा',
      category: 'Ramayan',
      categoryHi: 'रामायण',
      preview: 'How minor efforts of squirrels and monkey armies built the bridge to Lanka representing cooperation.',
      previewHi: 'कैसे गिलहरी और वानर सेना के छोटे-छोटे प्रयासों ने मिलकर लंका तक पुल का निर्माण कर दिखाया।',
      content: 'In the epic Ramayana, while building the floating bridge (Ram Setu) to Lanka, a small squirrel wanted to help. It dipped in the water, rolled in the sand, and shook it off between the large stones. The monkeys laughed, but Lord Rama praised the squirrel, stating that devotion and dedication are measured by intent, not size. Cooperation of all builds great monuments.',
      contentHi: 'रामायण महाकाव्य में, जब लंका जाने के लिए तैरते हुए राम सेतु का निर्माण किया जा रहा था, तब एक छोटी गिलहरी भी मदद करना चाहती थी। वह पानी में भीगती, धूल में लोटती और फिर पत्थरों के बीच जाकर रेत झाड़ देती। बंदर हँसे, लेकिन भगवान राम ने गिलहरी की सराहना की। उन्होंने कहा कि समर्पण का मूल्य आकार से नहीं, इरादे से होता है। सभी का सहयोग महान कार्यों को पूर्ण करता है।',
      lessons: ['Every small action counts', 'Intent is greater than capacity', 'Cooperation builds bridges'],
      lessonsHi: ['हर छोटा प्रयास मूल्यवान है', 'इरादा क्षमता से बड़ा होता है', 'आपसी सहयोग से बड़े काम संभव हैं']
    },
    {
      id: 'st-2',
      title: 'Mahabharat: Arjun’s Single-Minded Focus',
      titleHi: 'महाभारत: अर्जुन का एकाग्र लक्ष्य',
      category: 'Mahabharat',
      categoryHi: 'महाभारत',
      preview: 'The training lessons of Guru Drona highlighting mindfulness and absolute concentration.',
      previewHi: 'गुरु द्रोणाचार्य के सिखाए हुए ध्यान, संकल्प और पूर्ण एकाग्रता के सूत्र।',
      content: 'During weapon training, Guru Drona hung a wooden bird in a tree and asked his disciples to target its eye. Before shooting, he asked what they saw. Yudhisthir saw the branches, trees, and sky. Duryodhan saw the fruits and bird. Only Arjun replied: "I see only the eye of the wooden bird, Guru Dev. Nothing else." Absolute focus achieves the targets of life.',
      contentHi: 'अस्त्र विद्या अभ्यास के दौरान, गुरु द्रोणाचार्य ने पेड़ पर एक लकड़ी की चिड़िया टांग दी और शिष्यों से उसकी आँख पर निशाना लगाने को कहा। तीर चलाने से पहले, उन्होंने पूछा कि वे क्या देख रहे हैं। युधिष्ठिर को टहनियाँ, पेड़ और आसमान दिख रहा था। दुर्योधन को फल और चिड़िया। केवल अर्जुन ने उत्तर दिया: "मुझे केवल चिड़िया की आँख दिख रही है, गुरुदेव। और कुछ नहीं।" जीवन में पूर्ण एकाग्रता से ही लक्ष्य प्राप्त होता है।',
      lessons: ['Mindfulness removes distractions', 'Define a clear target', 'Patience breeds execution'],
      lessonsHi: ['सजगता भटकाव को दूर करती है', 'लक्ष्य स्पष्ट रखें', 'धैर्य से काम सिद्ध होता है']
    },
    {
      id: 'st-3',
      title: 'Swami Vivekananda: The Power of Fearlessness',
      titleHi: 'स्वामी विवेकानंद: निर्भयता का पाठ',
      category: 'Heritage',
      categoryHi: 'भारतीय धरोहर',
      preview: 'The Varanasi ghat lesson with monkeys teaching Ramesh ji how to face life struggles.',
      previewHi: 'वाराणसी के घाट पर बंदरों से सामना होने पर स्वामी जी द्वारा सीखी गई जीवन संघर्ष की सीख।',
      content: 'Once in Varanasi, young Swami Vivekananda was chased by a pack of aggressive monkeys. He started running. A sanyasi standing nearby called out: "Face the brutes! Do not run!" Swami ji turned back and stood firm. The monkeys stopped and fled. Vivekananda later taught: "If you want to achieve calmness, face the struggles of life, do not run away from fears."',
      contentHi: 'एक बार वाराणसी के घाट पर, युवा स्वामी विवेकानंद के पीछे बंदरों का एक झुंड पड़ गया। वे भागने लगे। पास खड़े एक संन्यासी ने चिल्लाकर कहा: "सामना करो! भागो मत!" स्वामी जी पलट गए और डटकर खड़े हो गए। बंदर रुक गए और भाग गए। स्वामी जी ने बाद में सिखाया: "यदि आप शांति पाना चाहते हैं, तो जीवन के संघर्षों का सामना करें, अपने डर से भागें नहीं।"',
      lessons: ['Facing fears dissolves them', 'Stand firm in adversity', 'Truth is powerful'],
      lessonsHi: ['भय का सामना करने से वह गायब हो जाता है', 'मुसीबत में डटकर खड़े रहें', 'सत्य ही शक्ति है']
    }
  ];

  const [selectedStory, setSelectedStory] = useState<SpiritualStory | null>(null);

  // 6. FESTIVALS DATA
  const festivals: FestivalDay[] = [
    { id: 'f-1', name: 'Krishna Janmashtami', nameHi: 'कृष्ण जन्माष्टमी', date: 'August 15, 2026', significance: 'Celebrates the birth of Lord Krishna representing joy and victory over evil.', significanceHi: 'भगवान कृष्ण के अवतरण का उत्सव, जो आनंद और धर्म की स्थापना का प्रतीक है।', activities: ['Observe light fast till midnight', 'Prepare saffron panjiri offering', 'Attend evening temple chants'], activitiesHi: ['अर्धरात्रि तक उपवास रखें', 'केसरिया पंजीरी का भोग बनाएं', 'संध्याकालीन कीर्तन में शामिल हों'], daysLeft: 61 },
    { id: 'f-2', name: 'Ganesh Chaturthi', nameHi: 'गणेश चतुर्थी', date: 'September 15, 2026', significance: 'Welcoming the Lord of Wisdom into the home to remove obstacles.', significanceHi: 'विघ्नहर्ता भगवान गणेश का घर में स्वागत और बुद्धि का आवाहन।', activities: ['Diya assembly and modak sweet making', 'Offer durva grass prayers', 'Chant Ganesha Atharvashirsha'], activitiesHi: ['दिए जलाना और मोदक बनाना', 'दूर्वा घास समर्पित करें', 'गणेश अथर्वशीर्ष का पाठ करें'], daysLeft: 92 },
    { id: 'f-3', name: 'Diwali (Festival of Lights)', nameHi: 'दीपावली (रोशनी का उत्सव)', date: 'November 09, 2026', significance: 'Lord Rama return to Ayodhya representing lights of consciousness defeating dark.', significanceHi: 'भगवान राम की अयोध्या वापसी, जो अज्ञानता पर ज्ञान की विजय का प्रतीक है।', activities: ['Light organic clay oil lamps', 'Exchange kaju sweets with Gomti neighbors', 'Evening Lakshmi Puja ceremonies'], activitiesHi: ['मिट्टी के पारंपरिक दीये जलाएं', 'पड़ोसियों को मिठाइयां बांटें', 'संध्याकाल में लक्ष्मी पूजन करें'], daysLeft: 147 }
  ];

  // 7. INTERACTION FUNCTIONS
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop card click from triggering audio player
    setFavorites(prev => {
      const active = prev.includes(id);
      triggerToast(active ? 'Removed from favorites' : 'Added to favorites!');
      return active ? prev.filter(fId => fId !== id) : [...prev, id];
    });
  };

  const handleToggleReminder = (id: string, name: string) => {
    setReminders(prev => {
      const active = prev.includes(id);
      triggerToast(active ? `Reminder canceled for ${name}` : `Reminder set for ${name}!`);
      return active ? prev.filter(rId => rId !== id) : [...prev, id];
    });
  };

  const handlePlayTrack = (track: BhajanTrack) => {
    if (globalTrack?.src === track.src) {
      if (globalIsPlaying) {
        pauseTrack();
        triggerToast('Paused');
      } else {
        playTrack({ src: track.src, title: track.title, artist: track.artist });
        triggerToast(`Playing: ${lang === 'en' ? track.title : track.titleHi}`);
      }
    } else {
      setCurrentTrack(track);
      playTrack({ src: track.src, title: track.title, artist: track.artist });
      triggerToast(`Playing: ${lang === 'en' ? track.title : track.titleHi}`);
      
      // Add to recently played list (avoid duplicates, cap at 5)
      setRecentlyPlayed(prev => {
        const filtered = prev.filter(tId => tId !== track.id);
        return [track.id, ...filtered].slice(0, 5);
      });
    }
  };

  // Filters logic
  const filteredBhajans = bhajanTracks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.titleHi.includes(searchQuery) ||
                          t.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.includes(t.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <div className={`senior-devotion-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''} sahaara-bg-watermark-direct`} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 1.5rem', minHeight: '100vh' }}>
      
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
          borderBottom: '4px solid var(--color-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary-dark)', fontWeight: 700 }}>
          <Flame size={22} className="animate-pulse-soft" style={{ color: 'var(--color-secondary)' }} />
          <span>{lang === 'en' ? 'Devotion & Spiritual Corner' : 'आध्यात्मिक एवं सांस्कृतिक केंद्र'}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setLang('en')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'en' ? 'var(--color-secondary)' : 'var(--bg-secondary)', color: lang === 'en' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>English</button>
              <button onClick={() => setLang('hi')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'hi' ? 'var(--color-secondary)' : 'var(--bg-secondary)', color: lang === 'hi' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>हिंदी</button>
            </div>
          </div>

          {/* Text Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Text Size:' : 'अक्षरों का आकार:'}</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setTextSize('normal')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'normal' ? 'var(--color-secondary)' : 'var(--bg-secondary)', color: textSize === 'normal' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>A</button>
              <button onClick={() => setTextSize('large')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'large' ? 'var(--color-secondary)' : 'var(--bg-secondary)', color: textSize === 'large' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>A+</button>
              <button onClick={() => setTextSize('xlarge')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'xlarge' ? 'var(--color-secondary)' : 'var(--bg-secondary)', color: textSize === 'xlarge' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 900 }}>A++</button>
            </div>
          </div>

          {/* Contrast */}
          <button
            onClick={() => setContrast(prev => prev === 'standard' ? 'high' : 'standard')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: contrast === 'high' ? 'var(--text-primary)' : 'var(--bg-secondary)', color: contrast === 'high' ? 'var(--bg-primary)' : 'var(--text-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            {contrast === 'high' ? (lang === 'en' ? 'Standard Contrast' : 'साधारण रंग') : (lang === 'en' ? 'Yellow/Black' : 'पीला/काला')}
          </button>

          {/* Motion */}
          <button
            onClick={() => setMotion(prev => prev === 'normal' ? 'reduced' : 'normal')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            {motion === 'reduced' ? (lang === 'en' ? 'Animations On 🟢' : 'एनिमेशन चालू 🟢') : (lang === 'en' ? 'Animations Off 🛑' : 'एनिमेशन बंद 🛑')}
          </button>
        </div>
      </div>

      {/* HERO GREETING SECTION */}
      <section 
        className="glass-card premium-float" 
        style={{ 
          padding: '2.5rem', 
          backgroundImage: 'linear-gradient(to right, rgba(230, 92, 0, 0.96) 35%, rgba(245, 158, 11, 0.82) 70%, rgba(245, 158, 11, 0.45) 100%), url("https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-premium)',
          borderLeft: '8px solid #b45309', 
          textAlign: 'left',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* CSS Temple Motif background watermark overlay */}
        <div style={{
          position: 'absolute',
          right: '5%',
          bottom: '-20px',
          width: '180px',
          height: '180px',
          opacity: 0.12,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23ffffff'%3E%3Cpath d='M50 5 L10 40 L90 40 Z M20 40 L20 80 L35 80 L35 55 L65 55 L65 80 L80 80 L80 40 Z M50 20 A6 6 0 1 0 50 32 A6 6 0 1 0 50 20'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none'
        }}></div>

        <div style={{ flex: 2, minWidth: '300px', zIndex: 1 }}>
          <span style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            color: '#ffffff', 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            padding: '0.25rem 0.75rem', 
            borderRadius: '50px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {lang === 'en' ? 'Spirituality, Peace, and Purpose' : 'आध्यात्मिकता, शांति और उद्देश्य'}
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.5rem 0 0 0', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            🙏 {lang === 'en' ? 'Namaste Ramesh Ji' : 'नमस्ते रमेश जी'}
          </h2>
          
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#ffe4e6', letterSpacing: '0.5px', display: 'block' }}>
              🌅 {lang === 'en' ? 'Today’s Blessing' : 'आज का शुभ आशीर्वाद'}
            </span>
            <p style={{ fontSize: '1.25rem', color: '#ffffff', margin: '0.25rem 0', fontWeight: 600, lineHeight: 1.4 }}>
              {lang === 'en'
                ? '“May your day be filled with peace (Shanti), positive energy, and mindfulness.”'
                : '“आपका दिन शांति, सकारात्मक ऊर्जा और मानसिक सजगता से परिपूर्ण हो।”'}
            </p>
          </div>

          <div style={{ borderLeft: '3px solid #ffe4e6', paddingLeft: '0.75rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#ffd1d5', fontWeight: 700 }}>Thought of the Day</span>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#ffffff', fontStyle: 'italic', opacity: 0.9 }}>
              “Peace is not the absence of trouble, but the presence of absolute calmness within.”
            </p>
          </div>
        </div>

        {/* Lucknow Weather & Fasting Snapshot */}
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Weather Card */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>☀️</span>
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block' }}>Lucknow, 32°C</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Favorable for Morning Walk</span>
            </div>
          </div>

          {/* Festival Countdown Card */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🪔</span>
            <div>
              <strong style={{ fontSize: '1.1rem', display: 'block' }}>Janmashtami</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 700 }}>61 Days Left</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SPATIAL SPLIT: PLAYBACK COMPONENT & LIBRARIES */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* BHAJANS LIBRARY & FILTERS (SPAN 2) */}
        <section className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Volume2 size={24} style={{ color: 'var(--color-secondary)' }} />
                {lang === 'en' ? 'Spiritual Bhajan & Chant Library' : 'भजन एवं आरती पुस्तकालय'}
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Select a track to stream real audio playback below
              </span>
            </div>

            {/* Favorite toggle filter */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              ❤️ {lang === 'en' ? 'Favorites Only' : 'केवल मनपसंद'}
            </label>
          </div>

          {/* Search bar & Category filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? "Search by song or singer..." : "भजन या गायक का नाम खोजें..."}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Categories */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All', labelHi: 'सभी' },
                { id: 'hanuman', label: 'Hanuman / Aarti', labelHi: 'हनुमान/आरती' },
                { id: 'krishna', label: 'Krishna', labelHi: 'कृष्ण' },
                { id: 'shiva', label: 'Shiva', labelHi: 'शिव' },
                { id: 'durga', label: 'Durga', labelHi: 'दुर्गा' },
                { id: 'sai', label: 'Sai Baba', labelHi: 'साईं बाबा' },
                { id: 'gurbani', label: 'Gurbani', labelHi: 'गुरबाणी' },
                { id: 'jain', label: 'Jain', labelHi: 'जैन' },
                { id: 'buddhist', label: 'Buddhist', labelHi: 'बौद्ध' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: selectedCategory === cat.id ? 'var(--color-secondary)' : 'var(--bg-secondary)',
                    color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'en' ? cat.label : cat.labelHi}
                </button>
              ))}
            </div>
          </div>

          {/* Bhajans grid list */}
          <div className="grid-container grid-2" style={{ gap: '1rem', marginTop: '0.5rem' }}>
            {filteredBhajans.map((track) => {
              const isSelected = currentTrack.id === track.id;
              const isFavorited = favorites.includes(track.id);
              return (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? 'var(--color-secondary-light)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderLeft: isSelected ? '5px solid var(--color-secondary)' : '1px solid var(--border-color)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', textAlign: 'left' }}>
                    <button
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isSelected && isPlaying ? 'var(--color-secondary)' : 'var(--color-secondary-light)',
                        color: isSelected && isPlaying ? '#ffffff' : 'var(--color-secondary-dark)',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isSelected && isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                    </button>
                    <div>
                      <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>
                        {lang === 'en' ? track.title : track.titleHi}
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {lang === 'en' ? track.artist : track.artistHi}
                      </span>
                    </div>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => handleToggleFavorite(track.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      color: isFavorited ? 'var(--color-accent)' : 'var(--text-muted)'
                    }}
                  >
                    <Heart size={20} fill={isFavorited ? 'var(--color-accent)' : 'none'} />
                  </button>
                </div>
              );
            })}
            {filteredBhajans.length === 0 && (
              <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <strong>No bhajan tracks match your query.</strong>
              </div>
            )}
          </div>

          {/* SACRED INSTRUMENT AUDIO PLAYER FRAME */}
          <div 
            className="temple-arch-bg fade-in-gentle"
            style={{ 
              marginTop: '1.5rem', 
              padding: '2rem 1.5rem',
              backgroundColor: '#fffbeb', 
              border: '6px double #d97706',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              color: '#451a03'
            }}
          >
            {/* Diya Glow Animated Fires */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              {/* Left Diya */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="diya-glow" style={{ width: '22px', height: '28px', background: 'radial-gradient(circle, #f97316 0%, #ef4444 80%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}></div>
                <div style={{ width: '40px', height: '12px', backgroundColor: '#d97706', borderRadius: '0 0 20px 20px', marginTop: '2px', border: '1px solid #b45309' }}></div>
              </div>

              <div style={{ textAlign: 'center', flex: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#b45309', letterSpacing: '2px', display: 'block' }}>
                  {lang === 'en' ? 'NOW PLAYING DEVOTIONAL CHANT' : 'सम्प्रति प्रसारित भजन'}
                </span>
              </div>

              {/* Right Diya */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="diya-glow" style={{ width: '22px', height: '28px', background: 'radial-gradient(circle, #f97316 0%, #ef4444 80%)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}></div>
                <div style={{ width: '40px', height: '12px', backgroundColor: '#d97706', borderRadius: '0 0 20px 20px', marginTop: '2px', border: '1px solid #b45309' }}></div>
              </div>
            </div>

            <AudioPlayer
              src={currentTrack.src}
              title={lang === 'en' ? currentTrack.title : currentTrack.titleHi}
              artist={lang === 'en' ? currentTrack.artist : currentTrack.artistHi}
              isPlaying={isPlaying}
              onPlayPauseToggle={(playing) => {
                if (playing) {
                  playTrack({ src: currentTrack.src, title: currentTrack.title, artist: currentTrack.artist });
                } else {
                  pauseTrack();
                }
              }}
            />
          </div>

        </section>

        {/* RIGHT COLUMN: RECENTLY PLAYED & WELLNESS GAUGES (SPAN 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* WELLNESS METRICS */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              🧘‍♀️ Spiritual Wellness Scores
            </h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
              {/* Calmness gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Calmness Index</span>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <path style={{ fill: 'none', stroke: 'var(--border-color)', strokeWidth: 3 }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path style={{ fill: 'none', stroke: 'var(--color-primary)', strokeWidth: 3, strokeDasharray: '85, 100' }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 800, fontSize: '1.1rem' }}>85%</span>
                </div>
              </div>

              {/* Positivity gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Positivity Index</span>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 36 36">
                    <path style={{ fill: 'none', stroke: 'var(--border-color)', strokeWidth: 3 }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path style={{ fill: 'none', stroke: 'var(--color-secondary)', strokeWidth: 3, strokeDasharray: '90, 100' }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 800, fontSize: '1.1rem' }}>90%</span>
                </div>
              </div>
            </div>

            {/* Streak widgets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifySelf: 'flex-start', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-dark)' }}>
                  <Flame size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block' }}>5-Day Prayer Streak</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last logged: Today morning</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifySelf: 'flex-start', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                  <Award size={16} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block' }}>120 Meditation Minutes</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Completed this week</span>
                </div>
              </div>
            </div>
          </section>

          {/* RECENTLY PLAYED */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              🕒 Recently Played
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentlyPlayed.map((tId) => {
                const track = bhajanTracks.find(t => t.id === tId);
                if (!track) return null;
                return (
                  <div 
                    key={tId}
                    onClick={() => handlePlayTrack(track)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🎶</span>
                    <div>
                      <strong style={{ fontSize: '0.95rem', display: 'block' }}>
                        {lang === 'en' ? track.title : track.titleHi}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {lang === 'en' ? track.artist : track.artistHi}
                      </span>
                    </div>
                  </div>
                );
              })}

              {recentlyPlayed.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recently played tracks.</span>
              )}
            </div>
          </section>

        </div>

      </div>

      {/* CULTURAL STORIES SECTION */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={22} style={{ color: 'var(--color-primary-dark)' }} />
            {lang === 'en' ? 'Indian Spiritual & Heritage Stories' : 'धार्मिक एवं ऐतिहासिक कथाएं'}
          </h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Expand your mind by reading historical events, epics, and moral stories
          </span>
        </div>

        <div className="grid-container grid-3" style={{ gap: '1.5rem' }}>
          {spiritualStories.map(story => (
            <div 
              key={story.id}
              className="glass-card hover-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                borderTop: '3px solid var(--color-primary)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lang === 'en' ? story.category : story.categoryHi}
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.25rem 0' }}>
                  {lang === 'en' ? story.title : story.titleHi}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {lang === 'en' ? story.preview : story.previewHi}
                </p>
              </div>

              <button
                onClick={() => setSelectedStory(story)}
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.45rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {lang === 'en' ? 'Read Story →' : 'कथा पढ़ें →'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FESTIVALS CENTER & CALENDAR */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={22} style={{ color: 'var(--color-secondary-dark)' }} />
            {lang === 'en' ? 'Festival Calendar & Reminders' : 'सांस्कृतिक पंचांग एवं अनुस्मारक'}
          </h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Stay updated with upcoming cultural events and plan activities
          </span>
        </div>

        <div className="grid-container grid-3" style={{ gap: '1.5rem' }}>
          {festivals.map(fest => {
            const hasReminder = reminders.includes(fest.id);
            return (
              <div 
                key={fest.id}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                      {lang === 'en' ? fest.name : fest.nameHi}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{fest.date}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--color-secondary-light)', color: 'var(--color-secondary-dark)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                    {fest.daysLeft} {lang === 'en' ? 'Days Left' : 'दिन शेष'}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {lang === 'en' ? fest.significance : fest.significanceHi}
                </p>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Suggested Tasks:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    {(lang === 'en' ? fest.activities : fest.activitiesHi).map((act, actIdx) => (
                      <span key={actIdx} style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>&bull; {act}</span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleToggleReminder(fest.id, fest.name)}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: hasReminder ? 'var(--color-success)' : 'var(--color-primary-light)',
                    color: hasReminder ? '#ffffff' : 'var(--color-primary-dark)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <Bell size={14} />
                  {hasReminder ? (lang === 'en' ? 'Reminder Set ✓' : 'अनुस्मारक सेट ✓') : (lang === 'en' ? 'Add Reminder' : 'अनुस्मारक जोड़ें')}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* STORY READING MODAL */}
      {selectedStory && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '600px', padding: '2.5rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lang === 'en' ? selectedStory.category : selectedStory.categoryHi} Chapter
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.1rem 0 0 0' }}>
                  {lang === 'en' ? selectedStory.title : selectedStory.titleHi}
                </h3>
              </div>
              <button onClick={() => setSelectedStory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.55, color: 'var(--text-primary)' }}>
                {lang === 'en' ? selectedStory.content : selectedStory.contentHi}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', fontWeight: 800, marginBottom: '0.25rem' }}>Core Lessons:</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {(lang === 'en' ? selectedStory.lessons : selectedStory.lessonsHi).map((les, lesIdx) => (
                  <span key={lesIdx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>🌟 {les}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setSelectedStory(null); triggerToast('Story reading complete.'); }}
              style={{ padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
            >
              Done Reading
            </button>
          </div>
        </div>
      )}

      {/* TOAST POPUP */}
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

export default SeniorDevotion;
