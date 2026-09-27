import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Search, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Play, 
  Pause,
  X,
  Upload,
  Trash2,
  Plus,
  Edit2,
  Shield
} from 'lucide-react';
import type { LegacyMemory, LifeStory, TimelineEvent, FutureMessage } from '../types';
import { useAudio } from '../context/AudioContext';

export const SeniorLegacy: React.FC = () => {
  const {
    currentTrack,
    isPlaying: globalIsPlaying,
    playTrack,
    pauseTrack
  } = useAudio();

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

  useEffect(() => {
    localStorage.setItem('senior-text-size', textSize);
    localStorage.setItem('senior-contrast', contrast);
    localStorage.setItem('senior-motion', motion);
    localStorage.setItem('senior-lang', lang);
  }, [textSize, contrast, motion, lang]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 2. STATE DATABASE (Initialized with realistic mock items, saved in LocalStorage)
  const [memories, setMemories] = useState<LegacyMemory[]>(() => {
    const saved = localStorage.getItem('legacy-memories');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'mem-1',
        title: 'Wedding Day in Varanasi',
        titleHi: 'वाराणसी में विवाह समारोह',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80',
        dateAdded: '1981-11-20',
        description: 'With Sushila on our wedding day. A beautiful cold winter evening in Benaras.',
        descriptionHi: 'सुशीला के साथ हमारे विवाह के दिन। बनारस में एक सुंदर ठंडी सर्दियों की शाम।',
        isPinned: true,
        category: 'celebrations',
        contributor: 'senior'
      },
      {
        id: 'mem-2',
        title: 'Graduation Day Speech at BHU',
        titleHi: 'बीएचयू में दीक्षांत भाषण',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80',
        dateAdded: '1968-06-15',
        description: 'Receiving my degree from the Vice Chancellor. A proud moment for my parents.',
        descriptionHi: 'कुलपति से अपनी डिग्री प्राप्त करते हुए। मेरे माता-पिता के लिए एक गर्व का क्षण।',
        isPinned: false,
        category: 'education',
        contributor: 'senior'
      },
      {
        id: 'mem-3',
        title: 'First audio greeting from Rohan',
        titleHi: 'रोहन का पहला ऑडियो संदेश',
        type: 'voice',
        url: '/audio/family/rohan_son.mp3',
        dateAdded: '2026-06-12',
        description: 'A morning voicemail message sent by Rohan from Bangalore checking in.',
        descriptionHi: 'बैंगलोर से रोहन द्वारा भेजा गया एक सुबह का वॉयस मेल संदेश।',
        isPinned: true,
        category: 'family',
        contributor: 'family'
      }
    ];
  });

  const [stories, setStories] = useState<LifeStory[]>(() => {
    const saved = localStorage.getItem('legacy-stories');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'story-1',
        title: 'My Early Days in Allahabad',
        titleHi: 'इलाहाबाद में मेरे शुरुआती दिन',
        category: 'Childhood',
        categoryHi: 'बचपन',
        content: 'I grew up near the Sangam. Life was simple then; we would swim in the Ganges, play gilli-danda under the neem trees, and listen to radio programs on winter afternoons. My father was a school teacher and taught me the value of hard work.',
        contentHi: 'मैं संगम के पास पला-बढ़ा। उस समय जीवन सरल था; हम गंगा में तैरते थे, नीम के पेड़ों के नीचे गिल्ली-डंडा खेलते थे और सर्दियों की दोपहर में रेडियो कार्यक्रम सुनते थे। मेरे पिता एक स्कूल शिक्षक थे और उन्होंने मुझे कड़ी मेहनत का मूल्य सिखाया।',
        dateCreated: '2026-05-10'
      },
      {
        id: 'story-2',
        title: 'Joining my First Job at BSNL',
        titleHi: 'बीएसएनएल में मेरी पहली नौकरी',
        category: 'Career',
        categoryHi: 'करियर',
        content: 'In 1978, I was appointed as a junior engineer. The excitement of receiving my first salary of Rs 450 was unmatched. I bought a saree for my mother and sweets for the entire colony.',
        contentHi: '1978 में, मुझे जूनियर इंजीनियर के रूप में नियुक्त किया गया था। 450 रुपये का पहला वेतन प्राप्त करने का उत्साह बेजोड़ था। मैंने अपनी माँ के लिए एक साड़ी और पूरी कॉलोनी के लिए मिठाइयाँ खरीदीं।',
        dateCreated: '2026-05-18'
      }
    ];
  });

  const [milestones, setMilestones] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('legacy-milestones');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'mile-1', year: '1954', title: 'Born in Allahabad', titleHi: 'इलाहाबाद में जन्म', description: 'Born on a quiet autumn morning to Shri Ramshankar ji.', descriptionHi: 'श्री रामशंकर जी के घर एक शांत शरद ऋतु की सुबह जन्म।' },
      { id: 'mile-2', year: '1978', title: 'Joined BSNL', titleHi: 'बीएसएनएल ज्वाइन किया', description: 'Appointed as Junior Engineer in Uttar Pradesh circle.', descriptionHi: 'उत्तर प्रदेश सर्कल में जूनियर इंजीनियर के रूप में नियुक्त।' },
      { id: 'mile-3', year: '1981', title: 'Married Sushila', titleHi: 'सुशीला से विवाह', description: 'Tied the knot in Benaras with family blessings.', descriptionHi: 'पारिवारिक आशीर्वाद के साथ बनारस में परिणय सूत्र में बंधे।' },
      { id: 'mile-4', year: '1985', title: 'Son Rohan Born', titleHi: 'पुत्र रोहन का जन्म', description: 'Welcomed our first son in Lucknow BSNL hospital.', descriptionHi: 'लखनऊ के बीएसएनएल अस्पताल में हमारे पहले बेटे का स्वागत किया।' }
    ];
  });

  const [messages, setMessages] = useState<FutureMessage[]>(() => {
    const saved = localStorage.getItem('legacy-messages');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'msg-1',
        category: 'advice',
        categoryHi: 'जीवन की सीख',
        title: 'On Patience & Resilience',
        titleHi: 'धैर्य और सहनशीलता पर सीख',
        content: 'My dear children, in times of difficulty, remember that rivers do not flow in straight lines. Life will have twists, but patience is your anchor. Keep your integrity intact.',
        contentHi: 'मेरे प्यारे बच्चों, कठिनाई के समय में याद रखें कि नदियाँ कभी सीधी रेखा में नहीं बहतीं। जीवन में मोड़ आएंगे, लेकिन धैर्य आपका सहारा है। अपनी ईमानदारी को बनाए रखें।',
        dateAdded: '2026-06-05'
      },
      {
        id: 'msg-2',
        category: 'values',
        categoryHi: 'पारिवारिक मूल्य',
        title: 'Core Family Values',
        titleHi: 'पारिवारिक संस्कार',
        content: 'Always stay connected with each other. No matter where life takes you, remember your roots in Lucknow and the values of respect, truthfulness, and sharing.',
        contentHi: 'हमेशा एक-दूसरे से जुड़े रहें। जीवन आपको चाहे कहीं भी ले जाए, लखनऊ में अपनी जड़ों और सम्मान, सच्चाई और मिल-बांटकर रहने के मूल्यों को याद रखें।',
        dateAdded: '2026-06-11'
      }
    ];
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('legacy-memories', JSON.stringify(memories));
  }, [memories]);
  useEffect(() => {
    localStorage.setItem('legacy-stories', JSON.stringify(stories));
  }, [stories]);
  useEffect(() => {
    localStorage.setItem('legacy-milestones', JSON.stringify(milestones));
  }, [milestones]);
  useEffect(() => {
    localStorage.setItem('legacy-messages', JSON.stringify(messages));
  }, [messages]);

  // 3. SEARCH & CATEGORY STATES
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'voice'>('photos');

  // 4. MEMORY CRUD UPLOADS
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video' | 'voice') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMemory: LegacyMemory = {
        id: `mem-${Date.now()}`,
        title: file.name.split('.')[0] || `Uploaded ${type}`,
        titleHi: file.name.split('.')[0] || `अपलोड ${type}`,
        type,
        url: reader.result as string, // base64 preview string
        dateAdded: new Date().toISOString().split('T')[0],
        description: `Uploaded file: ${file.name}`,
        descriptionHi: `अपलोड की गई फ़ाइल: ${file.name}`,
        isPinned: false,
        category: 'family',
        contributor: 'senior'
      };
      setMemories(prev => [newMemory, ...prev]);
      triggerToast(`${type.toUpperCase()} saved successfully to your Vault!`);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    triggerToast('Memory deleted from vault.');
  };

  const handleTogglePinMemory = (id: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, isPinned: !m.isPinned } : m));
    const memory = memories.find(m => m.id === id);
    if (memory) {
      triggerToast(memory.isPinned ? 'Unpinned memory' : 'Pinned memory to top!');
    }
  };

  // 5. STORY CRUD STATES & FORMS
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyTitleEn, setStoryTitleEn] = useState('');
  const [storyTitleHi, setStoryTitleHi] = useState('');
  const [storyCategoryEn, setStoryCategoryEn] = useState('Childhood');
  const [storyCategoryHi, setStoryCategoryHi] = useState('बचपन');
  const [storyContentEn, setStoryContentEn] = useState('');
  const [storyContentHi, setStoryContentHi] = useState('');
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitleEn.trim() || !storyContentEn.trim()) return;

    if (editingStoryId) {
      // Update
      setStories(prev => prev.map(s => s.id === editingStoryId ? {
        ...s,
        title: storyTitleEn,
        titleHi: storyTitleHi || storyTitleEn,
        category: storyCategoryEn,
        categoryHi: storyCategoryHi || storyCategoryEn,
        content: storyContentEn,
        contentHi: storyContentHi || storyContentEn
      } : s));
      triggerToast('Chapter updated successfully.');
    } else {
      // Add
      const newStory: LifeStory = {
        id: `story-${Date.now()}`,
        title: storyTitleEn,
        titleHi: storyTitleHi || storyTitleEn,
        category: storyCategoryEn,
        categoryHi: storyCategoryHi || storyCategoryEn,
        content: storyContentEn,
        contentHi: storyContentHi || storyContentEn,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setStories(prev => [newStory, ...prev]);
      triggerToast('New story chapter preserved!');
    }

    // Reset Form
    setStoryTitleEn('');
    setStoryTitleHi('');
    setStoryCategoryEn('Childhood');
    setStoryCategoryHi('बचपन');
    setStoryContentEn('');
    setStoryContentHi('');
    setEditingStoryId(null);
    setShowStoryModal(false);
  };

  const handleEditStory = (story: LifeStory) => {
    setEditingStoryId(story.id);
    setStoryTitleEn(story.title);
    setStoryTitleHi(story.titleHi || '');
    setStoryCategoryEn(story.category);
    setStoryCategoryHi(story.categoryHi || '');
    setStoryContentEn(story.content);
    setStoryContentHi(story.contentHi || '');
    setShowStoryModal(true);
  };

  const handleDeleteStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
    triggerToast('Story chapter deleted.');
  };

  // 6. TIMELINE CRUD STATES & FORMS
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [mileYear, setMileYear] = useState('');
  const [mileTitleEn, setMileTitleEn] = useState('');
  const [mileTitleHi, setMileTitleHi] = useState('');
  const [mileDescEn, setMileDescEn] = useState('');
  const [mileDescHi, setMileDescHi] = useState('');

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mileYear.trim() || !mileTitleEn.trim()) return;

    if (editingMilestoneId) {
      setMilestones(prev => prev.map(m => m.id === editingMilestoneId ? {
        ...m,
        year: mileYear,
        title: mileTitleEn,
        titleHi: mileTitleHi || mileTitleEn,
        description: mileDescEn,
        descriptionHi: mileDescHi || mileDescEn
      } : m));
      triggerToast('Milestone updated.');
    } else {
      const newMilestone: TimelineEvent = {
        id: `mile-${Date.now()}`,
        year: mileYear,
        title: mileTitleEn,
        titleHi: mileTitleHi || mileTitleEn,
        description: mileDescEn,
        descriptionHi: mileDescHi || mileDescEn
      };
      setMilestones(prev => [...prev, newMilestone].sort((a, b) => parseInt(a.year) - parseInt(b.year)));
      triggerToast('Milestone added to timeline.');
    }

    setMileYear('');
    setMileTitleEn('');
    setMileTitleHi('');
    setMileDescEn('');
    setMileDescHi('');
    setEditingMilestoneId(null);
    setShowMilestoneModal(false);
  };

  const handleEditMilestone = (m: TimelineEvent) => {
    setEditingMilestoneId(m.id);
    setMileYear(m.year);
    setMileTitleEn(m.title);
    setMileTitleHi(m.titleHi || '');
    setMileDescEn(m.description);
    setMileDescHi(m.descriptionHi || '');
    setShowMilestoneModal(true);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
    triggerToast('Milestone deleted.');
  };

  // 7. FUTURE MESSAGES CRUD STATES & FORMS
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgCategory, setMsgCategory] = useState<'advice' | 'values' | 'blessings' | 'wishes' | 'letters'>('advice');
  const [msgCategoryHi, setMsgCategoryHi] = useState('जीवन की सीख');
  const [msgTitleEn, setMsgTitleEn] = useState('');
  const [msgTitleHi, setMsgTitleHi] = useState('');
  const [msgContentEn, setMsgContentEn] = useState('');
  const [msgContentHi, setMsgContentHi] = useState('');

  const handleSaveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgTitleEn.trim() || !msgContentEn.trim()) return;

    const newMsg: FutureMessage = {
      id: `msg-${Date.now()}`,
      category: msgCategory,
      categoryHi: msgCategoryHi,
      title: msgTitleEn,
      titleHi: msgTitleHi || msgTitleEn,
      content: msgContentEn,
      contentHi: msgContentHi || msgContentEn,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setMessages(prev => [newMsg, ...prev]);
    triggerToast('Letter preserved for your family.');

    // reset
    setMsgTitleEn('');
    setMsgTitleHi('');
    setMsgContentEn('');
    setMsgContentHi('');
    setShowMsgModal(false);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    triggerToast('Message removed.');
  };

  // 8. VOICE PLAYER CONTROLLER FOR PLAYBACK
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handlePlayAudio = (m: LegacyMemory) => {
    const isCurrentActive = currentTrack?.src === m.url;
    if (isCurrentActive && globalIsPlaying) {
      pauseTrack();
    } else {
      playTrack({
        src: m.url,
        title: m.title,
        artist: m.contributor === 'family' ? 'Family Voice Record' : 'My Voice Note'
      });
    }
  };

  useEffect(() => {
    if (globalIsPlaying && currentTrack) {
      const matchedMemory = memories.find(m => m.url === currentTrack.src);
      if (matchedMemory) {
        setPlayingAudioId(matchedMemory.id);
        setIsAudioPlaying(true);
      } else {
        setPlayingAudioId(null);
        setIsAudioPlaying(false);
      }
    } else {
      setPlayingAudioId(null);
      setIsAudioPlaying(false);
    }
  }, [globalIsPlaying, currentTrack, memories]);

  // 9. INSTANT SEARCH & FILTER INDEXING
  const filteredMemories = memories.filter(m => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = m.title.toLowerCase().includes(term) || 
                          (m.titleHi && m.titleHi.includes(term)) ||
                          m.description.toLowerCase().includes(term) || 
                          (m.descriptionHi && m.descriptionHi.includes(term));
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredStories = stories.filter(s => {
    const term = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(term) || 
           (s.titleHi && s.titleHi.includes(term)) ||
           s.content.toLowerCase().includes(term) || 
           (s.contentHi && s.contentHi.includes(term));
  });

  const filteredMilestones = milestones.filter(m => {
    const term = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(term) || 
           (m.titleHi && m.titleHi.includes(term)) ||
           m.description.toLowerCase().includes(term) || 
           (m.descriptionHi && m.descriptionHi.includes(term)) ||
           m.year.includes(term);
  });

  const filteredMessages = messages.filter(m => {
    const term = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(term) || 
           (m.titleHi && m.titleHi.includes(term)) ||
           m.content.toLowerCase().includes(term) || 
           (m.contentHi && m.contentHi.includes(term));
  });

  // Split calculations
  const pinnedMemoriesList = memories.filter(m => m.isPinned);

  return (
    <div className={`senior-legacy-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''} sahaara-bg-watermark-direct`} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 1.5rem', minHeight: '100vh' }}>
      
      {/* ACCESSIBILITY BAR */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.25rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '1.25rem',
          borderBottom: '4px solid var(--color-accent)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>
          <Shield size={22} style={{ color: 'var(--color-accent)' }} />
          <span>{lang === 'en' ? 'Digital Legacy Vault' : 'डिजिटल विरासत तिजोरी'}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language:</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setLang('en')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'en' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: lang === 'en' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>English</button>
              <button onClick={() => setLang('hi')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: lang === 'hi' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: lang === 'hi' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>हिंदी</button>
            </div>
          </div>

          {/* Text Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang === 'en' ? 'Text Size:' : 'अक्षरों का आकार:'}</span>
            <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <button onClick={() => setTextSize('normal')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'normal' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: textSize === 'normal' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 600 }}>A</button>
              <button onClick={() => setTextSize('large')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'large' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: textSize === 'large' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}>A+</button>
              <button onClick={() => setTextSize('xlarge')} style={{ padding: '0.4rem 0.8rem', border: 'none', backgroundColor: textSize === 'xlarge' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: textSize === 'xlarge' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 900 }}>A++</button>
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

      {/* HERO SECTION */}
      <section 
        className="glass-card premium-float" 
        style={{ 
          padding: '2.5rem', 
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.9) 35%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.25) 100%), url("https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderLeft: '8px solid var(--color-accent)', 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-premium)',
          textAlign: 'left',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff'
        }}
      >
        <div style={{ flex: '2 1 450px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            👴 Ramesh Kumar's Life Chronicle
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0.5rem 0', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            {lang === 'en' ? 'Your Story Deserves To Be Remembered.' : 'आपकी कहानी याद रखने योग्य है।'}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
            {lang === 'en'
              ? 'Preserve your life journey, milestones, and family wisdom for future generations to cherish.'
              : 'अपने अनुभवों, मील के पत्थरों और पारिवारिक ज्ञान को आने वाली पीढ़ियों के लिए संजोएं।'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => setShowStoryModal(true)}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Plus size={18} />
              {lang === 'en' ? 'Write New Chapter' : 'नया अध्याय लिखें'}
            </button>
            <button
              onClick={() => setShowMilestoneModal(true)}
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary-dark)',
                border: '1px solid var(--color-primary)',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Calendar size={18} />
              {lang === 'en' ? 'Add Life Milestone' : 'मील का पत्थर जोड़ें'}
            </button>
          </div>
        </div>

        {/* Lucknow Elder Illustration & Family Tree Artwork */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid var(--color-accent)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" 
                alt="Ramesh Kumar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-5px', right: '10px', backgroundColor: 'var(--color-accent)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>
              BSNL Retd.
            </div>
          </div>

          {/* Simple Family Tree Artwork SVG */}
          <div style={{ width: '220px', height: '90px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Family Tree Nodes</span>
            <svg viewBox="0 0 160 50" style={{ width: '100%', height: '100%' }}>
              {/* Lines */}
              <line x1="80" y1="12" x2="80" y2="28" stroke="var(--color-accent)" strokeWidth="1.5" />
              <line x1="40" y1="28" x2="120" y2="28" stroke="var(--color-accent)" strokeWidth="1.5" />
              <line x1="40" y1="28" x2="40" y2="40" stroke="var(--color-accent)" strokeWidth="1.5" />
              <line x1="120" y1="28" x2="120" y2="40" stroke="var(--color-accent)" strokeWidth="1.5" />

              {/* Parents Node */}
              <rect x="62" y="4" width="36" height="12" rx="3" fill="var(--color-accent)" />
              <text x="80" y="12" fontSize="7" fontWeight="bold" fill="#ffffff" textAnchor="middle">Ramesh & Sushila</text>

              {/* Children Nodes */}
              <rect x="22" y="36" width="36" height="12" rx="3" fill="var(--color-primary)" />
              <text x="40" y="44" fontSize="7" fontWeight="bold" fill="#ffffff" textAnchor="middle">Rohan (Son)</text>

              <rect x="102" y="36" width="36" height="12" rx="3" fill="var(--color-primary)" />
              <text x="120" y="44" fontSize="7" fontWeight="bold" fill="#ffffff" textAnchor="middle">Priya (Daughter)</text>
            </svg>
          </div>
        </div>
      </section>

      {/* SEARCH ENGINE & CATEGORIES */}
      <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? "Search stories, photos, voice notes, and milestones..." : "कहानियों, फोटो, आवाज और इतिहास में खोजें..."}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>{lang === 'en' ? 'Filter by Category:' : 'श्रेणी चुनें:'}</span>
          {[
            { id: 'all', label: 'All Categories', labelHi: 'सभी श्रेणियां' },
            { id: 'family', label: 'Family & Roots', labelHi: 'परिवार एवं जड़ें' },
            { id: 'celebrations', label: 'Celebrations', labelHi: 'उत्सव' },
            { id: 'education', label: 'Education', labelHi: 'शिक्षा' },
            { id: 'career', label: 'Career', labelHi: 'करियर' },
            { id: 'travel', label: 'Travel', labelHi: 'यात्रा' },
            { id: 'spiritual', label: 'Spiritual', labelHi: 'अध्यात्म' },
            { id: 'life_lessons', label: 'Life Lessons', labelHi: 'जीवन की सीख' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                backgroundColor: selectedCategory === cat.id ? 'var(--color-accent)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {lang === 'en' ? cat.label : cat.labelHi}
            </button>
          ))}
        </div>
      </section>

      {/* LEGACY STATS OVERVIEW */}
      <div className="grid-container grid-5" style={{ gap: '1.25rem' }}>
        {[
          { label: 'Photos Saved', labelHi: 'सुरक्षित फोटो', count: memories.filter(m => m.type === 'photo').length, icon: '📸', color: 'var(--color-accent)' },
          { label: 'Voice Memories', labelHi: 'ऑडियो यादें', count: memories.filter(m => m.type === 'voice').length, icon: '🎙️', color: 'var(--color-secondary-dark)' },
          { label: 'Life Stories', labelHi: 'जीवन की कहानियां', count: stories.length, icon: '📖', color: 'var(--color-primary-dark)' },
          { label: 'Family Milestones', labelHi: 'मील के पत्थर', count: milestones.length, icon: '📅', color: 'var(--color-success)' },
          { label: 'Shared Memories', labelHi: 'साझा यादें', count: memories.filter(m => m.contributor === 'family').length, icon: '❤️', color: 'var(--color-accent)' }
        ].map((item, index) => (
          <div 
            key={index}
            className="glass-card animate-pulse-soft"
            style={{ 
              padding: '1.25rem', 
              textAlign: 'center', 
              borderTop: `4px solid ${item.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
            <strong style={{ fontSize: '1.8rem', display: 'block', color: 'var(--text-primary)' }}>{item.count}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
              {lang === 'en' ? item.label : item.labelHi}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* LEFT TWO COLUMNS: MEMORY UPLOADER & STORY JOURNAL (SPAN 2) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* MEMORY UPLOADER VAULT */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  📂 {lang === 'en' ? 'My Memory Vault' : 'मेरी यादों की तिजोरी'}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Upload photographs, home videos, and greetings directly into your digital archive
                </span>
              </div>

              {/* Upload Tab Selector */}
              <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                <button onClick={() => setActiveTab('photos')} style={{ padding: '0.45rem 1rem', border: 'none', backgroundColor: activeTab === 'photos' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: activeTab === 'photos' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>📸 Photos</button>
                <button onClick={() => setActiveTab('videos')} style={{ padding: '0.45rem 1rem', border: 'none', backgroundColor: activeTab === 'videos' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: activeTab === 'videos' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>🎥 Videos</button>
                <button onClick={() => setActiveTab('voice')} style={{ padding: '0.45rem 1rem', border: 'none', backgroundColor: activeTab === 'voice' ? 'var(--color-accent)' : 'var(--bg-secondary)', color: activeTab === 'voice' ? '#ffffff' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>🎙️ Audios</button>
              </div>
            </div>

            {/* Uploader Box Area */}
            <div 
              style={{ 
                border: '2px dashed var(--color-accent)', 
                borderRadius: '8px', 
                padding: '2rem', 
                textAlign: 'center',
                backgroundColor: 'var(--bg-tertiary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (activeTab === 'photos') photoInputRef.current?.click();
                if (activeTab === 'videos') videoInputRef.current?.click();
                if (activeTab === 'voice') voiceInputRef.current?.click();
              }}
            >
              <Upload size={40} style={{ color: 'var(--color-accent)' }} />
              <div>
                <strong style={{ fontSize: '1.2rem', display: 'block' }}>
                  {lang === 'en' ? `Click to upload a ${activeTab.slice(0, -1)}` : `फ़ाइल अपलोड करने के लिए क्लिक करें`}
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Supports JPEG, PNG, MP4, and MP3 files
                </span>
              </div>
              
              {/* Native File Inputs */}
              <input 
                type="file" 
                ref={photoInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'photo')}
              />
              <input 
                type="file" 
                ref={videoInputRef}
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'video')}
              />
              <input 
                type="file" 
                ref={voiceInputRef}
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'voice')}
              />
            </div>

            {/* Media Gallery Grid */}
            <div className="grid-container grid-2" style={{ gap: '2rem', marginTop: '1.5rem' }}>
              {filteredMemories.map((m, index) => {
                const isWeddingMemory = m.id === 'mem-1';
                return (
                  <div 
                    key={m.id}
                    className="polaroid-card"
                    style={{
                      transform: index % 3 === 0 ? 'rotate(-1.5deg)' : index % 3 === 1 ? 'rotate(1deg)' : 'rotate(-0.5deg)',
                      margin: '0.5rem',
                      position: 'relative',
                      border: isWeddingMemory ? '6px double #d4af37' : '1px solid rgba(0,0,0,0.06)',
                      boxShadow: isWeddingMemory ? '0 10px 25px rgba(212, 175, 55, 0.25)' : '0 8px 20px rgba(0,0,0,0.06)'
                    }}
                  >
                  {m.type === 'photo' && (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', backgroundColor: 'var(--bg-tertiary)' }}>
                      <img src={m.url} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  {m.type === 'video' && (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', backgroundColor: '#000000' }}>
                      <video src={m.url} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  {m.type === 'voice' && (
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '2px', backgroundColor: 'var(--color-primary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', boxSizing: 'border-box' }}>
                      <div 
                        style={{ 
                          width: '56px', 
                          height: '56px', 
                          borderRadius: '50%', 
                          backgroundColor: 'var(--color-accent)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer', 
                          color: '#ffffff', 
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                        }} 
                        onClick={() => handlePlayAudio(m)}
                      >
                        {playingAudioId === m.id && isAudioPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '4px' }} />}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 700, marginTop: '0.75rem', textAlign: 'center' }}>
                        {playingAudioId === m.id && isAudioPlaying ? 'Playing Recording...' : 'Click to Play Voice'}
                      </span>
                    </div>
                  )}

                  <div className="polaroid-caption">
                    {lang === 'en' ? m.title : m.titleHi || m.title}
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'cursive, sans-serif', marginTop: '4px' }}>
                    {m.dateAdded} &bull; {m.category} &bull; {m.contributor === 'family' ? 'Shared by Family' : 'Added by Me'}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', borderTop: '1px dashed #e2e8f0', paddingTop: '0.5rem' }}>
                    <button 
                      onClick={() => handleTogglePinMemory(m.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: m.isPinned ? '#ef4444' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      <Heart size={14} fill={m.isPinned ? '#ef4444' : 'none'} />
                      {m.isPinned ? 'Pinned' : 'Pin'}
                    </button>
                    <button 
                      onClick={() => handleDeleteMemory(m.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              )})}

              {filteredMemories.length === 0 && (
                <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No memories found matching the filters.
                </div>
              )}
            </div>
          </section>

          {/* MY LIFE STORY JOURNAL */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  📖 {lang === 'en' ? 'My Life Story Journal' : 'मेरी जीवन यात्रा डायरी'}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Write down the chapters of your life, childhood memories, and career struggles
                </span>
              </div>
              <button 
                onClick={() => { setEditingStoryId(null); setShowStoryModal(true); }}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={16} /> {lang === 'en' ? 'Write Chapter' : 'अध्याय लिखें'}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredStories.map((s) => (
                <div key={s.id} style={{ position: 'relative', padding: '1.5rem 1.5rem 1.5rem 3.5rem', backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {/* Binder Rings */}
                  <div style={{ position: 'absolute', left: '15px', top: '1rem', bottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                    {[1, 2, 3, 4, 5].map(ring => (
                      <div key={ring} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '1px solid #94a3b8' }}></div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {lang === 'en' ? s.category : s.categoryHi || s.category}
                      </span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 850, margin: '0.4rem 0 0 0', color: 'var(--text-primary)' }}>
                        {lang === 'en' ? s.title : s.titleHi || s.title}
                      </h4>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEditStory(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit2 size={14} /></button>
                      <button onClick={() => handleDeleteStory(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={14} /></button>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {expandedStoryId === s.id 
                      ? (lang === 'en' ? s.content : s.contentHi || s.content)
                      : (lang === 'en' ? s.content.substring(0, 150) + '...' : (s.contentHi || s.content).substring(0, 150) + '...')}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created on: {s.dateCreated}</span>
                    <button 
                      onClick={() => setExpandedStoryId(expandedStoryId === s.id ? null : s.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-accent-dark)', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <BookOpen size={14} />
                      {expandedStoryId === s.id ? (lang === 'en' ? 'Close Diary' : 'डायरी बंद करें') : (lang === 'en' ? 'Read Diary Page' : 'डायरी पेज पढ़ें')}
                    </button>
                  </div>
                </div>
              ))}

              {filteredStories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <strong>No life story chapters written yet. Start writing your first chapter.</strong>
                </div>
              )}
            </div>
          </section>

          {/* FUTURE GENERATIONS LETTER VAULT */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                  ✉️ {lang === 'en' ? 'Messages for My Family' : 'परिवार के लिए अमूल्य संदेश'}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Leave life advice, moral values, blessings, and letters for your grandchildren
                </span>
              </div>
              <button 
                onClick={() => setShowMsgModal(true)}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={16} /> {lang === 'en' ? 'Leave Message' : 'संदेश लिखें'}
              </button>
            </div>

            {/* Letters Grid */}
            <div className="grid-container grid-2" style={{ gap: '1.25rem' }}>
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className="glass-card"
                  style={{ 
                    padding: '1.5rem', 
                    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    boxShadow: 'var(--shadow-sm)',
                    borderLeft: '4px solid var(--color-accent)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {msg.category}
                      </span>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer' }}
                        title="Remove message"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 850, margin: '0.5rem 0 0.25rem 0' }}>
                      {lang === 'en' ? msg.title : msg.titleHi || msg.title}
                    </h4>

                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                      "{lang === 'en' ? msg.content : msg.contentHi || msg.content}"
                    </p>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Preserved on: {msg.dateAdded}
                  </span>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <strong>No advice letters logged yet. Leave a blessing for Rohan or Ananya.</strong>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: PINNED MEMORIES & TIMELINE (SPAN 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* PINNED MEMORIES SECTION */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              📌 {lang === 'en' ? 'Pinned Memories' : 'पसंदीदा यादें'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pinnedMemoriesList.map((m) => (
                <div 
                  key={m.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {m.type === 'photo' ? (
                      <img src={m.url} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : m.type === 'video' ? (
                      <span>🎥</span>
                    ) : (
                      <span>🎙️</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: '0.95rem', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {lang === 'en' ? m.title : m.titleHi || m.title}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.category} &bull; {m.type}</span>
                  </div>
                </div>
              ))}

              {pinnedMemoriesList.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No memories pinned. Mark hearts on gallery cards to pin.</span>
              )}
            </div>
          </section>

          {/* INTERACTIVE FAMILY TIMELINE */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                📅 {lang === 'en' ? 'Family Timeline' : 'पारिवारिक इतिहास कालक्रम'}
              </h3>
              <button 
                onClick={() => { setEditingMilestoneId(null); setShowMilestoneModal(true); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-accent-dark)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                + Add
              </button>
            </div>

            {/* Timeline Tree Vertical */}
            <div style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.75rem' }}>
              {/* Vertical line helper */}
              <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', backgroundColor: 'var(--color-accent-light)' }}></div>

              {filteredMilestones.map((mile) => (
                <div key={mile.id} style={{ position: 'relative', textAlign: 'left' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: '-1.85rem', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', border: '2px solid #ffffff' }}></div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--color-accent-dark)', display: 'block' }}>{mile.year}</span>
                      <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-primary)' }}>
                        {lang === 'en' ? mile.title : mile.titleHi || mile.title}
                      </strong>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button onClick={() => handleEditMilestone(mile)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit2 size={11} /></button>
                      <button onClick={() => handleDeleteMilestone(mile.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={11} /></button>
                    </div>
                  </div>

                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {lang === 'en' ? mile.description : mile.descriptionHi || mile.description}
                  </p>
                </div>
              ))}

              {filteredMilestones.length === 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No milestones matching timeline query.</span>
              )}
            </div>
          </section>

        </div>

      </div>

      {/* STORY ADD/EDIT MODAL */}
      {showStoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <form onSubmit={handleSaveStory} className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '550px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-accent)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
                {editingStoryId ? 'Edit Story Chapter' : 'Add Story Chapter'}
              </h3>
              <button type="button" onClick={() => setShowStoryModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Title (English)</label>
                <input 
                  type="text" 
                  value={storyTitleEn}
                  onChange={(e) => setStoryTitleEn(e.target.value)}
                  placeholder="e.g. My College Days at BHU"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>शीर्षक (हिंदी)</label>
                <input 
                  type="text" 
                  value={storyTitleHi}
                  onChange={(e) => setStoryTitleHi(e.target.value)}
                  placeholder="उदा. बीएचयू में कॉलेज के दिन"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Category (English)</label>
                <input 
                  type="text" 
                  value={storyCategoryEn}
                  onChange={(e) => setStoryCategoryEn(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>श्रेणी (हिंदी)</label>
                <input 
                  type="text" 
                  value={storyCategoryHi}
                  onChange={(e) => setStoryCategoryHi(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Content (English)</label>
              <textarea 
                value={storyContentEn}
                onChange={(e) => setStoryContentEn(e.target.value)}
                placeholder="Write the full narrative of your memory..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '120px', resize: 'vertical', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>सामग्री (हिंदी)</label>
              <textarea 
                value={storyContentHi}
                onChange={(e) => setStoryContentHi(e.target.value)}
                placeholder="अपनी याद का पूरा विवरण लिखें..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '120px', resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
            >
              Preserve Chapter
            </button>
          </form>
        </div>
      )}

      {/* MILESTONE ADD/EDIT MODAL */}
      {showMilestoneModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <form onSubmit={handleSaveMilestone} className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-accent)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
                {editingMilestoneId ? 'Edit Milestone' : 'Add Milestone'}
              </h3>
              <button type="button" onClick={() => setShowMilestoneModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Year (वर्ष)</label>
                <input 
                  type="number" 
                  value={mileYear}
                  onChange={(e) => setMileYear(e.target.value)}
                  placeholder="e.g. 1985"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Milestone Title (English)</label>
                <input 
                  type="text" 
                  value={mileTitleEn}
                  onChange={(e) => setMileTitleEn(e.target.value)}
                  placeholder="e.g. Son Born"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>शीर्षक (हिंदी)</label>
              <input 
                type="text" 
                value={mileTitleHi}
                onChange={(e) => setMileTitleHi(e.target.value)}
                placeholder="उदा. पुत्र का जन्म"
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Description (English)</label>
              <input 
                type="text" 
                value={mileDescEn}
                onChange={(e) => setMileDescEn(e.target.value)}
                placeholder="Brief context of the event..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>विवरण (हिंदी)</label>
              <input 
                type="text" 
                value={mileDescHi}
                onChange={(e) => setMileDescHi(e.target.value)}
                placeholder="इतिहास की संक्षिप्त जानकारी..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
            >
              Add Milestone
            </button>
          </form>
        </div>
      )}

      {/* FUTURE MESSAGE ADD MODAL */}
      {showMsgModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <form onSubmit={handleSaveMessage} className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-accent)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>
                Write Advice or Family Letter
              </h3>
              <button type="button" onClick={() => setShowMsgModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Category</label>
                <select
                  value={msgCategory}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setMsgCategory(val);
                    const mapping: Record<string, string> = {
                      advice: 'जीवन की सीख',
                      values: 'पारिवारिक मूल्य',
                      blessings: 'आशीर्वाद',
                      wishes: 'शुभकामनाएं',
                      letters: 'बच्चों को पत्र'
                    };
                    setMsgCategoryHi(mapping[val] || 'सीख');
                  }}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  <option value="advice">Advice</option>
                  <option value="values">Family Values</option>
                  <option value="blessings">Blessings</option>
                  <option value="wishes">Future Wishes</option>
                  <option value="letters">Letters to Children</option>
                </select>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Title (English)</label>
                <input 
                  type="text" 
                  value={msgTitleEn}
                  onChange={(e) => setMsgTitleEn(e.target.value)}
                  placeholder="e.g. Always respect neighbors"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>शीर्षक (हिंदी)</label>
              <input 
                type="text" 
                value={msgTitleHi}
                onChange={(e) => setMsgTitleHi(e.target.value)}
                placeholder="उदा. हमेशा दूसरों का सम्मान करें"
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Message Content (English)</label>
              <textarea 
                value={msgContentEn}
                onChange={(e) => setMsgContentEn(e.target.value)}
                placeholder="Write your advice or words..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '90px', resize: 'vertical', fontSize: '0.9rem' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>संदेश विवरण (हिंदी)</label>
              <textarea 
                value={msgContentHi}
                onChange={(e) => setMsgContentHi(e.target.value)}
                placeholder="अपनी सीख या संदेश हिंदी में लिखें..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '90px', resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
            >
              Save Advice
            </button>
          </form>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--color-accent-dark)',
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

export default SeniorLegacy;
