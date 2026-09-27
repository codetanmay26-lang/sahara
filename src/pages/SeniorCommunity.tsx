import React, { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { 
  Users, 
  Calendar, 
  Heart, 
  ThumbsUp, 
  Award, 
  Play, 
  Pause, 
  Sparkles, 
  Send
} from 'lucide-react';
import circleYogaImg from '../assets/circle_yoga.png';
import circleBhajanImg from '../assets/circle_bhajan.png';
import circleWalkImg from '../assets/circle_walk.png';
import circleGardeningImg from '../assets/circle_gardening.png';
import circleStorytellingImg from '../assets/circle_storytelling.png';
import circleTeachersImg from '../assets/circle_teachers.png';
import circleVeteransImg from '../assets/circle_veterans.png';
import meetupTeaImg from '../assets/meetup_tea.png';
import meetupMeditationImg from '../assets/meetup_meditation.png';
import meetupSeminarImg from '../assets/meetup_seminar.png';

interface CommunityGroup {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  members: number;
  activityLevel: 'High' | 'Medium' | 'Relaxed';
  activityLevelHi: string;
  isJoined: boolean;
  category: string;
  avatar: string;
  image?: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  titleHi: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  isRsvped: boolean;
  category: string;
  image?: string;
  tag?: string;
  tagHi?: string;
}

interface SocialPost {
  id: string;
  author: string;
  relation: string;
  avatar: string;
  timestamp: string;
  content: string;
  contentHi: string;
  image?: string;
  likes: number;
  hearts: number;
  applauds: number;
  hasLiked: boolean;
  hasHearted: boolean;
  hasApplauded: boolean;
  comments: { user: string; text: string; time: string }[];
}

interface FriendshipMatch {
  id: string;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  sharedInterests: string[];
  reason: string;
  reasonHi: string;
  avatar: string;
}

const SeniorCommunity: React.FC = () => {
  const { currentTrack, isPlaying: isPlayingAudio, playTrack, pauseTrack } = useAudio();

  const eventAudioSources: Record<string, string> = {
    'ev-1': '/audio/events/morning_walk_intro.wav',
    'ev-2': '/audio/events/bhajan_mandali_prayer.wav',
    'ev-3': '/audio/events/storytelling_intro.wav',
    'ev-4': '/audio/events/health_talk_intro.wav',
    'ev-5': '/audio/events/monsoon_feast_intro.wav'
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

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 2. STATE LOGIC - GROUPS
  const [groups, setGroups] = useState<CommunityGroup[]>([
    { id: 'g-1', name: 'Yoga Group', nameHi: 'योग मंडल', description: 'Morning breathing and flexibility drills in Gomti Nagar Central Park.', descriptionHi: 'गोमती नगर सेंट्रल पार्क में सुबह प्राणायाम और योग अभ्यास।', members: 14, activityLevel: 'High', activityLevelHi: 'अति सक्रिय', isJoined: true, category: 'health', avatar: '🧘‍♂️', image: circleYogaImg },
    { id: 'g-2', name: 'Bhajan Mandali', nameHi: 'भजन मंडली', description: 'Weekly devotional chants, tea discourse meetings, and harmonium sessions.', descriptionHi: 'साप्ताहिक कीर्तन, सत्संग एवं चाय चर्चा सभाएं।', members: 22, activityLevel: 'High', activityLevelHi: 'अति सक्रिय', isJoined: true, category: 'spiritual', avatar: '🎶', image: circleBhajanImg },
    { id: 'g-3', name: 'Morning Walk Club', nameHi: 'प्रभात सैर क्लब', description: 'Social walking along Gomti Riverfront every day at sunrise.', descriptionHi: 'गोमती रिवरफ्रंट पर प्रतिदिन सुबह-सुबह सामाजिक सैर।', members: 31, activityLevel: 'High', activityLevelHi: 'अति सक्रिय', isJoined: true, category: 'health', avatar: '🚶‍♂️', image: circleWalkImg },
    { id: 'g-4', name: 'Chess Club', nameHi: 'शतरंज संघ', description: 'Gentle cerebral matches at the Community Center on Tuesday afternoons.', descriptionHi: 'मंगलवार दोपहर कम्युनिटी सेंटर में दिमागी शतरंज मुकाबले।', members: 8, activityLevel: 'Relaxed', activityLevelHi: 'शांत', isJoined: false, category: 'hobby', avatar: '♟️', image: 'https://blog.maestriasydiplomados.tec.mx/hs-fs/hubfs/vitaly-gariev-7dvnANH_Gjo-unsplash%20(1).jpg?width=600&height=400&name=vitaly-gariev-7dvnANH_Gjo-unsplash%20(1).jpg' },
    { id: 'g-5', name: 'Retired Teachers', nameHi: 'सेवानिवृत्त शिक्षक संघ', description: 'Educators sharing career stories, reading, and volunteering for children.', descriptionHi: 'शिक्षकों की बैठकें, पठन-पाठन और बच्चों के लिए स्वयंसेवा।', members: 12, activityLevel: 'Medium', activityLevelHi: 'सक्रिय', isJoined: false, category: 'social', avatar: '🎓', image: circleTeachersImg },
    { id: 'g-6', name: 'Army Veterans Circle', nameHi: 'पूर्व सैनिक सर्कल', description: 'Retired defense officers sharing patriotic legacy letters and discipline chats.', descriptionHi: 'पूर्व सैनिक अधिकारियों की बातचीत और साझा यादें।', members: 6, activityLevel: 'Relaxed', activityLevelHi: 'शांत', isJoined: false, category: 'social', avatar: '🎖️', image: circleVeteransImg },
    { id: 'g-7', name: 'Gardening Club', nameHi: 'बागवानी क्लब', description: 'Organic terrace seed swaps and Lucknow mango cultivation techniques.', descriptionHi: 'छत पर जैविक खेती, बीज विनिमय और आम उगाने के गुर।', members: 19, activityLevel: 'Medium', activityLevelHi: 'सक्रिय', isJoined: true, category: 'hobby', avatar: '🏡', image: circleGardeningImg },
    { id: 'g-8', name: 'Storytelling Circle', nameHi: 'कहानी कारवां', description: 'Weekly gatherings recounting Lucknow heritage stories and history tales.', descriptionHi: 'लखनऊ की संस्कृति और इतिहास से जुड़े पुराने किस्से सुनाना।', members: 15, activityLevel: 'Medium', activityLevelHi: 'सक्रिय', isJoined: false, category: 'hobby', avatar: '📖', image: circleStorytellingImg }
  ]);

  // 3. STATE LOGIC - EVENTS
  const [events, setEvents] = useState<CommunityEvent[]>([
    { id: 'ev-1', title: 'Morning Park Meetup & Tea', titleHi: 'सुबह पार्क में सैर व चाय', date: 'Tomorrow', time: '07:00 AM - 08:30 AM', location: 'Gomti Nagar Central Park', participants: 9, isRsvped: true, category: 'health', image: meetupTeaImg, tag: 'Active Health', tagHi: 'स्वास्थ्य-सैर' },
    { id: 'ev-2', title: 'Online Evening Bhajan chants', titleHi: 'ऑनलाइन संध्या भजन संध्या', date: 'Thursday, June 18', time: '05:30 PM - 07:00 PM', location: 'Community Zoom Link', participants: 18, isRsvped: true, category: 'spiritual', image: meetupMeditationImg, tag: 'Spiritual Calm', tagHi: 'भजन संध्या' },
    { id: 'ev-3', title: 'Grandchildren Storytelling Hour', titleHi: 'बच्चों के लिए कहानी सत्र', date: 'Saturday, June 20', time: '11:00 AM - 12:30 PM', location: 'Gomti Community Hall', participants: 7, isRsvped: false, category: 'social', image: circleStorytellingImg, tag: 'Intergenerational', tagHi: 'अंतर-पीढ़ी' },
    { id: 'ev-4', title: 'Senior Heart Health Talk', titleHi: 'हृदय स्वास्थ्य जागरूकता वार्ता', date: 'Monday, June 22', time: '10:00 AM - 11:30 AM', location: 'Lucknow Wellness Center', participants: 25, isRsvped: false, category: 'health', image: meetupSeminarImg, tag: 'Wellness Talk', tagHi: 'स्वास्थ्य चर्चा' },
    { id: 'ev-5', title: 'Monsoon Tea & Samosa Feast', titleHi: 'सावन की चाय और समोसा उत्सव', date: 'July 05', time: '04:00 PM - 06:00 PM', location: 'Riverview Club Lawn', participants: 41, isRsvped: false, category: 'social', image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80', tag: 'Social Feast', tagHi: 'सामाजिक भोज' }
  ]);

  // 4. STATE LOGIC - SOCIAL FEED
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: 'p-1',
      author: 'Col. Hari Singh (Retd.)',
      relation: 'Army Vet Friend',
      avatar: '👨‍🦳',
      timestamp: '2 hours ago',
      content: 'Morning walk completed at the Riverfront today! The breeze was cool and crisp. Wishing everyone a healthy week ahead.',
      contentHi: 'आज रिवरफ्रंट पर सुबह की सैर पूरी की! हवा ठंडी और ताज़ा थी। सभी को स्वस्थ सप्ताह की शुभकामनाएं।',
      likes: 6,
      hearts: 4,
      applauds: 5,
      hasLiked: false,
      hasHearted: false,
      hasApplauded: false,
      comments: [
        { user: 'Mr. Jagdish Sharma', text: 'Stunning click Colonel sahib! I will join you day after tomorrow.', time: '1 hour ago' }
      ]
    },
    {
      id: 'p-2',
      author: 'Mrs. Nirmala Verma',
      relation: 'Gardening Advisor',
      avatar: '👵',
      timestamp: 'Yesterday',
      content: 'My terrace marigold seeds have sprouted! Special thanks to the Gardening Club for recommending organic Lucknow soil mixtures.',
      contentHi: 'मेरी छत पर गेंदे के पौधे उग आए हैं! जैविक मिट्टी के मिश्रण की सलाह देने के लिए बागवानी क्लब का विशेष धन्यवाद।',
      likes: 12,
      hearts: 9,
      applauds: 7,
      hasLiked: true,
      hasHearted: false,
      hasApplauded: true,
      comments: [
        { user: 'Ramesh Kumar (You)', text: 'They look beautiful, Nirmala ji. Saffron color is gorgeous!', time: 'Yesterday' }
      ]
    }
  ]);

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // 5. MOCK AI FRIENDSHIP RECOMMENDATIONS
  const friendMatches: FriendshipMatch[] = [
    {
      id: 'fm-1',
      name: 'Jagdish Sharma',
      age: 74,
      location: 'Gomti Nagar, Sector 4',
      compatibility: 94,
      sharedInterests: ['Gardening', 'Devotional Music', 'Hindi Poetry'],
      reason: 'You both like organic gardening, live 500m apart, and frequently attend Bhajan sessions.',
      reasonHi: 'आप दोनों को बागवानी पसंद है, आप केवल ५०० मीटर की दूरी पर रहते हैं, और दोनों भजन संध्या में जाते हैं।',
      avatar: '👴'
    },
    {
      id: 'fm-2',
      name: 'Mrs. Shanti Mishra',
      age: 71,
      location: 'Aliganj, Lucknow',
      compatibility: 87,
      sharedInterests: ['Morning Yoga', 'Chess', 'BHU Varanasi Alumni'],
      reason: 'She graduated from BHU Varanasi in 1974. You share college nostalgia and morning Yoga circles.',
      reasonHi: 'इन्होंने भी बीएचयू वाराणसी से शिक्षा पाई है। आप दोनों सुबह के योग समूह का हिस्सा हैं।',
      avatar: '👵'
    }
  ];

  // Voice player list
  const voiceNotes = [
    { id: 'vn-1', sender: 'Jagdish Sharma', duration: '0:18 mins', text: 'Good morning friends! Hope to see you all at the tea meet tomorrow.', date: 'Today, 8:15 AM', src: '/audio/family/jagdish_sharma.mp3' },
    { id: 'vn-2', sender: 'Mrs. Nirmala Verma', duration: '0:26 mins', text: 'Today’s yoga and meditation session was absolutely relaxing. Highly recommend to everyone.', date: 'Yesterday', src: '/audio/family/nirmala_verma.mp3' }
  ];

  // 6. TOGGLE HANDLERS
  const handleToggleGroup = (id: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        const nextState = !g.isJoined;
        triggerToast(nextState ? `Successfully joined ${g.name}!` : `Left ${g.name}.`);
        return { ...g, isJoined: nextState, members: nextState ? g.members + 1 : g.members - 1 };
      }
      return g;
    }));
  };

  const handleToggleEvent = (id: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === id) {
        const nextState = !e.isRsvped;
        triggerToast(nextState ? `RSVP confirmed for: ${e.title}` : `RSVP canceled for: ${e.title}`);
        return { ...e, isRsvped: nextState, participants: nextState ? e.participants + 1 : e.participants - 1 };
      }
      return e;
    }));
  };

  const handlePostReaction = (postId: string, type: 'likes' | 'hearts' | 'applauds') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const flagName = `has${type.charAt(0).toUpperCase() + type.slice(1, -1)}ed` as 'hasLiked' | 'hasHearted' | 'hasApplauded';
        const active = p[flagName];
        return {
          ...p,
          [type]: active ? p[type] - 1 : p[type] + 1,
          [flagName]: !active
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { user: 'Ramesh Kumar (You)', text, time: 'Just now' }]
        };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    triggerToast('Comment posted successfully!');
  };

  const handleSendMatchGreeting = (name: string) => {
    triggerToast(`Sent connection wave to ${name}! Rohan will be notified.`);
  };

  // Group counters
  const joinedGroupsCount = groups.filter(g => g.isJoined).length;
  const registeredEventsCount = events.filter(e => e.isRsvped).length;

  return (
    <div className={`senior-community-page text-scale-${textSize} contrast-${contrast} ${motion === 'reduced' ? 'motion-reduced' : ''} sahaara-bg-watermark-direct`} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 1.5rem', minHeight: '100vh' }}>
      
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
          <span>{lang === 'en' ? 'Elder Circle Community Hub' : 'वृद्ध मंडली सामुदायिक केंद्र'}</span>
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

      {/* HERO BANNER & ENGAGEMENT SCORE */}
      <section 
        className="glass-card premium-float" 
        style={{ 
          padding: '2.5rem', 
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.88) 35%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.2) 100%), url("${circleWalkImg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderLeft: '8px solid var(--color-primary)', 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-premium)',
          textAlign: 'left',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff'
        }}
      >
        <div style={{ flex: 2, minWidth: '300px' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 900, margin: 0, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
            {lang === 'en' ? 'Friendships Never Retire. 🤝' : 'मित्रता कभी सेवानिवृत्त नहीं होती। 🤝'}
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0 1.5rem 0', fontWeight: 600, fontStyle: 'italic' }}>
            {lang === 'en' 
              ? 'Welcome to Elder Circle. Friendship, conversations, and belonging at every stage of life.' 
              : 'वृद्ध मंडली में आपका स्वागत है। जीवन के हर पड़ाव पर दोस्ती, बातचीत और अपनेपन का अहसास।'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.25)', minWidth: '120px' }}>
              <span style={{ fontSize: '1.5rem', display: 'block' }}>👥</span>
              <strong style={{ fontSize: '1.2rem', display: 'block', color: '#ffffff' }}>{joinedGroupsCount} Joined</strong>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>Active Groups</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.25)', minWidth: '120px' }}>
              <span style={{ fontSize: '1.5rem', display: 'block' }}>📅</span>
              <strong style={{ fontSize: '1.2rem', display: 'block', color: '#ffffff' }}>{registeredEventsCount} RSVPs</strong>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>Registered Events</span>
            </div>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.25)', minWidth: '120px' }}>
              <span style={{ fontSize: '1.5rem', display: 'block' }}>📍</span>
              <strong style={{ fontSize: '1.2rem', display: 'block', color: '#ffffff' }}>8 Friends</strong>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>Within 1 km</span>
            </div>
          </div>
        </div>

        {/* Community Engagement Circular progress */}
        <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            🏆 Community Score
          </span>
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <svg width="100%" height="100%" viewBox="0 0 36 36">
              <path
                style={{ fill: 'none', stroke: 'var(--border-color)', strokeWidth: 3 }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                style={{ 
                  fill: 'none', 
                  stroke: 'var(--color-primary)', 
                  strokeWidth: 3, 
                  strokeDasharray: '88, 100', 
                  strokeLinecap: 'round',
                  transition: 'stroke-dasharray 0.5s ease' 
                }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 900 }}>88%</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 700 }}>Excellent</span>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.3 }}>
            Ramesh is in the **Top 12%** of active Gomti Nagar seniors this month!
          </span>
        </div>
      </section>

      {/* DUAL PANELS: GROUPS AND EVENTS */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* GROUPS LIST (SPAN 2) */}
        <section className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={24} style={{ color: 'var(--color-primary)' }} />
              {lang === 'en' ? 'Active Local Groups' : 'सक्रिय स्थानीय मंडल समूह'}
            </h3>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {lang === 'en' ? 'Find and join interest groups near Gomti Nagar, Lucknow' : 'गोमती नगर, लखनऊ के आस-पास रुचि समूहों में शामिल हों'}
            </span>
          </div>

          <div className="grid-container grid-2" style={{ gap: '1.5rem' }}>
            {groups.map((group) => (
              <div 
                key={group.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease',
                  borderTop: group.isJoined ? '4px solid var(--color-primary)' : '1px solid var(--border-color)'
                }}
              >
                <div>
                  {group.image && (
                    <div style={{ height: '120px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img src={group.image} alt={group.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {group.avatar} {group.category.toUpperCase()}
                      </div>
                    </div>
                  )}
                  
                  <div style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {lang === 'en' ? group.name : group.nameHi}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                      👥 {group.members} {lang === 'en' ? 'members active' : 'सक्रिय सदस्य'}
                    </span>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {lang === 'en' ? group.description : group.descriptionHi}
                    </p>
                    
                    {/* Overlapping member avatars stack */}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.75rem', gap: '0.35rem' }}>
                      <div style={{ display: 'flex', marginRight: '0.25rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--bg-secondary)', backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 3 }}>HS</div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--bg-secondary)', backgroundColor: 'var(--color-accent)', color: '#fff', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginLeft: '-8px', zIndex: 2 }}>NV</div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--bg-secondary)', backgroundColor: 'var(--color-secondary)', color: '#fff', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginLeft: '-8px', zIndex: 1 }}>JS</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {lang === 'en' ? 'Col. Hari & 8 others active' : 'कर्नल हरी और ८ अन्य सक्रिय हैं'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '0.85rem 1.25rem', backgroundColor: 'var(--bg-tertiary)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {lang === 'en' ? 'Activity:' : 'गतिविधि:'} <strong style={{ color: group.activityLevel === 'High' ? 'var(--color-success)' : 'var(--text-primary)' }}>{lang === 'en' ? group.activityLevel : group.activityLevelHi}</strong>
                  </span>

                  <button
                    onClick={() => handleToggleGroup(group.id)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '6px',
                      backgroundColor: group.isJoined ? 'var(--bg-secondary)' : 'var(--color-primary)',
                      color: group.isJoined ? 'var(--text-primary)' : '#ffffff',
                      border: group.isJoined ? '1px solid var(--border-color)' : 'none',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    {group.isJoined ? (lang === 'en' ? 'Joined ✓' : 'शामिल हैं ✓') : (lang === 'en' ? 'Join Circle' : 'शामिल हों')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EVENTS RSVP HUB */}
        <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={22} style={{ color: 'var(--color-secondary-dark)' }} />
              {lang === 'en' ? 'Upcoming Meetups' : 'आगामी कार्यक्रम'}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {lang === 'en' ? 'Confirm your attendance to notify the coordinators' : 'समन्वयक को सूचित करने के लिए अपनी उपस्थिति सुनिश्चित करें'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map((ev) => (
              <div 
                key={ev.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  borderLeft: ev.isRsvped ? '5px solid var(--color-primary)' : '1px solid var(--border-color)'
                }}
              >
                {ev.image && (
                  <div style={{ height: '130px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img src={ev.image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {ev.tag && (
                      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {lang === 'en' ? ev.tag : ev.tagHi || ev.tag}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-secondary-dark)', textTransform: 'uppercase', display: 'block' }}>
                      📅 {ev.date} &bull; ⏰ {ev.time}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.2rem 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span>{lang === 'en' ? ev.title : ev.titleHi}</span>
                      <button
                        onClick={() => {
                          const src = eventAudioSources[ev.id];
                          const isPlayingThis = currentTrack?.src === src && isPlayingAudio;
                          if (isPlayingThis) {
                            pauseTrack();
                          } else {
                            playTrack({
                              id: ev.id,
                              src,
                              title: ev.title,
                              category: 'events'
                            });
                            triggerToast(`Playing intro: ${ev.title}`);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--bg-tertiary)',
                          boxShadow: 'var(--shadow-xs)',
                          flexShrink: 0
                        }}
                        title={currentTrack?.src === eventAudioSources[ev.id] && isPlayingAudio ? "Pause" : "Play audio intro"}
                      >
                        {currentTrack?.src === eventAudioSources[ev.id] && isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 {ev.location}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      🙋‍♂️ {ev.participants} {lang === 'en' ? 'attending' : 'शामिल हो रहे हैं'}
                    </span>
                    
                    <button
                      onClick={() => handleToggleEvent(ev.id)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: ev.isRsvped ? 'var(--color-success)' : 'var(--color-primary-light)',
                        color: ev.isRsvped ? '#ffffff' : 'var(--color-primary-dark)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-xs)'
                      }}
                    >
                      {ev.isRsvped ? (lang === 'en' ? 'Going ✓' : 'जा रहे हैं ✓') : (lang === 'en' ? 'Join RSVP' : 'स्वीकार करें')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FEED, VOICE CARD AND MATCHMAKER ROW */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* SOCIAL DISCUSSION FEED (SPAN 2) */}
        <section className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              📢 {lang === 'en' ? 'Elder Circle Community Feed' : 'चर्चा मंच एवं पोस्ट फीड'}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Share updates, files, and chat with local Lucknow seniors
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {posts.map((post) => (
              <div 
                key={post.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* Author row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '2rem' }}>{post.avatar}</span>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '1.1rem', display: 'block' }}>{post.author}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>{post.relation}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.timestamp}</span>
                </div>

                {/* Content */}
                <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.45, color: 'var(--text-primary)' }}>
                  {lang === 'en' ? post.content : post.contentHi}
                </p>

                {/* Reaction buttons */}
                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '0.5rem 0' }}>
                  <button 
                    onClick={() => handlePostReaction(post.id, 'likes')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: post.hasLiked ? 'var(--color-primary-dark)' : 'var(--text-secondary)', fontWeight: 600 }}
                  >
                    <ThumbsUp size={16} /> Likes ({post.likes})
                  </button>
                  
                  <button 
                    onClick={() => handlePostReaction(post.id, 'hearts')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: post.hasHearted ? 'var(--color-accent-dark)' : 'var(--text-secondary)', fontWeight: 600 }}
                  >
                    <Heart size={16} fill={post.hasHearted ? "var(--color-accent)" : "none"} /> Hearts ({post.hearts})
                  </button>

                  <button 
                    onClick={() => handlePostReaction(post.id, 'applauds')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: post.hasApplauded ? 'var(--color-secondary-dark)' : 'var(--text-secondary)', fontWeight: 600 }}
                  >
                    <Award size={16} /> Applaud ({post.applauds})
                  </button>
                </div>

                {/* Comments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>Comments</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {post.comments.map((c, cIdx) => (
                      <div key={cIdx} style={{ fontSize: '0.85rem', textAlign: 'left' }}>
                        <strong>{c.user}: </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{c.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add comment */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input 
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder={lang === 'en' ? "Write a comment..." : "टिप्पणी लिखें..."}
                      style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      style={{ padding: '0.5rem', backgroundColor: 'var(--color-primary)', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* VOICE BOARD & MATCHMAKING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* VOICE GREETINGS CORNER */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎙️ {lang === 'en' ? 'Voice Boards' : 'आवाज संदेश पटल'}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Hear audio updates from fellow community seniors
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {voiceNotes.map(vn => {
                const isPlaying = currentTrack?.id === vn.id && isPlayingAudio;
                return (
                  <div 
                    key={vn.id}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: isPlaying ? 'var(--color-primary-light)' : 'var(--bg-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.95rem', display: 'block' }}>{vn.sender}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vn.date} &bull; {vn.duration}</span>
                      </div>

                      <button
                        onClick={() => {
                          if (isPlaying) {
                            pauseTrack();
                          } else {
                            playTrack({
                              id: vn.id,
                              src: vn.src,
                              title: `${vn.sender}'s Voice update`,
                              artist: vn.sender,
                              category: 'family'
                            });
                            triggerToast(`Playing voice card from ${vn.sender}`);
                          }
                        }}
                        style={{
                          width: '38px',
                          height: '38px',
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
                        {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>"{vn.text}"</p>

                    {isPlaying && (
                      <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '24px', justifyContent: 'center', marginTop: '0.25rem' }}>
                        {[...Array(15)].map((_, i) => (
                          <div 
                            key={i}
                            style={{
                              width: '3px',
                              height: '100%',
                              backgroundColor: 'var(--color-primary-dark)',
                              borderRadius: '2px',
                              transform: 'scaleY(0.3)',
                              animation: motion === 'reduced' ? 'none' : 'pulse-soft 1.5s infinite ease-in-out',
                              animationDelay: `${i * 0.07}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI FRIENDSHIP MATCHMAKER */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left', borderTop: '4px solid var(--color-secondary)' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} style={{ color: 'var(--color-secondary-dark)' }} />
                {lang === 'en' ? 'Friendship Matches' : 'स्मार्ट संगी-साथी सुझाव'}
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {lang === 'en' ? 'Mock AI compatibility matches based on similar hobbies' : 'समान रुचियों के आधार पर सुझाई गई मित्र संगीता'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {friendMatches.map(m => (
                <div 
                  key={m.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '2rem' }}>{m.avatar}</span>
                      <div>
                        <strong style={{ fontSize: '0.95rem', display: 'block' }}>{m.name} ({m.age})</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {m.location}</span>
                      </div>
                    </div>

                    <span 
                      style={{ 
                        fontSize: '0.8rem', 
                        backgroundColor: 'var(--color-secondary-light)', 
                        color: 'var(--color-secondary-dark)', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '4px',
                        fontWeight: 800 
                      }}
                    >
                      {m.compatibility}% Match
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <strong>Why? </strong>{lang === 'en' ? m.reason : m.reasonHi}
                  </p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {m.sharedInterests.map(interest => (
                      <span key={interest} style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}>#{interest}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSendMatchGreeting(m.name)}
                    style={{
                      padding: '0.45rem',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary-dark)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    👋 Send Greeting wave
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

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

export default SeniorCommunity;
