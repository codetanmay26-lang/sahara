import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  Activity, 
  Moon, 
  CheckCircle2, 
  AlertTriangle, 
  Bell, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Clock,
  User,
  Users,
  Send,
  Video,
  Phone,
  Calendar,
  TrendingUp,
  Sparkles,
  X,
  Volume2,
  Shield
} from 'lucide-react';
import rameshProfileImg from '../assets/profile_ramesh_kumar.png';

// Interfaces
interface CaregiverAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'emergency' | 'health' | 'mood' | 'activity' | 'social';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'acknowledged' | 'resolved';
  recommendedAction: 'Call Senior' | 'Schedule Video Call' | 'Share Family Memory' | 'Play Devotional Content' | 'Contact Caregiver' | 'Emergency Escalation';
}

interface UploadedMemory {
  id: string;
  title: string;
  type: 'photo' | 'voice' | 'letter' | 'story';
  details: string;
  timestamp: string;
}

interface TimelineEvent {
  id: string;
  time: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'health' | 'social' | 'memory' | 'alert';
}

export const CaregiverDashboard: React.FC = () => {
  const { isDemo } = useAuth();
  // 1. STATE & DATA INITIALIZATION
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts'>('overview');

  const [alerts, setAlerts] = useState<CaregiverAlert[]>([
    {
      id: '1',
      severity: 'critical',
      category: 'emergency',
      title: 'Emergency SOS Triggered',
      description: 'Ramesh ji pressed the emergency SOS button on his home screen. Vitals and coordinates transmitted.',
      timestamp: 'Today, 02:15 PM',
      status: 'pending',
      recommendedAction: 'Emergency Escalation'
    },
    {
      id: '2',
      severity: 'high',
      category: 'mood',
      title: 'Emergency Phrase: "I feel helpless"',
      description: 'SAATHI voice engine flag: "No one cares about me / कोई मेरी चिंता नहीं करता" recorded during chat.',
      timestamp: 'Today, 01:10 PM',
      status: 'pending',
      recommendedAction: 'Call Senior'
    },
    {
      id: '3',
      severity: 'high',
      category: 'mood',
      title: 'High Loneliness Score Detected',
      description: 'Loneliness score spiked to 72% based on SAATHI conversation nostalgia engagement analysis.',
      timestamp: 'Today, 11:30 AM',
      status: 'pending',
      recommendedAction: 'Share Family Memory'
    },
    {
      id: '4',
      severity: 'medium',
      category: 'health',
      title: 'Missed Medication (Calcium)',
      description: '2:00 PM Calcium supplement remains pending on senior dashboard. No vocal confirmation received.',
      timestamp: 'Today, 02:05 PM',
      status: 'pending',
      recommendedAction: 'Call Senior'
    },
    {
      id: '5',
      severity: 'medium',
      category: 'activity',
      title: 'Low Activity Level warning',
      description: 'Ramesh ji has logged less than 1,000 steps today by mid-afternoon. Inactivity warning.',
      timestamp: 'Today, 01:45 PM',
      status: 'acknowledged',
      recommendedAction: 'Schedule Video Call'
    },
    {
      id: '6',
      severity: 'low',
      category: 'social',
      title: 'No Family Interaction Logged',
      description: 'No direct messages or video calls logged from family contacts Rohan or Ananya for the last 48 hours.',
      timestamp: 'Yesterday, 06:00 PM',
      status: 'acknowledged',
      recommendedAction: 'Schedule Video Call'
    },
    {
      id: '7',
      severity: 'low',
      category: 'social',
      title: 'Isolation Risk Flag',
      description: 'Elder circle meetup attendance flagged as absent. Ramesh ji did not join the walking club yesterday.',
      timestamp: 'Yesterday, 04:30 PM',
      status: 'resolved',
      recommendedAction: 'Contact Caregiver'
    },
    {
      id: '8',
      severity: 'critical',
      category: 'mood',
      title: 'Negative Emotional Trend',
      description: 'SAATHI logged elevated sadness and anxious risk indicators over 3 consecutive days.',
      timestamp: 'Yesterday, 02:00 PM',
      status: 'resolved',
      recommendedAction: 'Emergency Escalation'
    }
  ]);

  const [memories, setMemories] = useState<UploadedMemory[]>([
    { id: '1', title: 'Graduation Day Photo', type: 'photo', details: 'Ananya holding her engineering degree, Mumbai 2018', timestamp: '10 mins ago' },
    { id: '2', title: 'Morning Wishes Voice Greeting', type: 'voice', details: '0:35 audio clip from Rohan wishing Granddad well', timestamp: '2 hours ago' },
    { id: '3', title: 'Legacy Memory Narrative Letter', type: 'letter', details: 'Wedding anniversary memories archived for legacy vault', timestamp: 'Yesterday' }
  ]);

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    { id: '1', time: '02:15 PM', icon: <Activity size={16} />, title: 'Low Activity Detected', description: 'Steps logged: 3,840 steps (Target: 5,000 steps).', category: 'alert' },
    { id: '2', time: '02:00 PM', icon: <CheckCircle2 size={16} />, title: 'Calcium Tablet Dose Alert', description: 'Scheduled medication was flagged as pending on Ramesh ji\'s screen.', category: 'health' },
    { id: '3', time: '11:30 AM', icon: <Volume2 size={16} />, title: 'Talked with SAATHI AI', description: 'Had a 22-minute conversation about old Lucknow streets and Gomti temples.', category: 'social' },
    { id: '4', time: '10:00 AM', icon: <Send size={16} />, title: 'Family Message Received', description: 'Rohan sent a message: "Thinking of you, Dad! Hope you had a good breakfast."', category: 'social' },
    { id: '5', time: '09:00 AM', icon: <CheckCircle2 size={16} />, title: 'BP Medicine Taken', description: 'Morning medication checked off successfully via voice acknowledgement.', category: 'health' },
    { id: '6', time: '08:00 AM', icon: <Clock size={16} />, title: 'Mood Check-In: Happy', description: 'Checked in feeling "Happy & Peaceful" today.', category: 'social' }
  ]);

  // Filtering & Sorting State
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'newest' | 'oldest'>('priority');

  // Uploader Form States
  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryType, setMemoryType] = useState<'photo' | 'voice' | 'letter' | 'story'>('photo');
  const [memoryDetails, setMemoryDetails] = useState('');

  // Clear mock data if real user mode is active
  useEffect(() => {
    if (!isDemo) {
      setAlerts([]);
      setMemories([]);
      setTimelineEvents([]);
      setDialingContact('Senior');
    }
  }, [isDemo]);

  // Quick Action Modal States
  const [activeModal, setActiveModal] = useState<'none' | 'call' | 'schedule' | 'video' | 'bhajan' | 'share' | 'report' | 'message'>('none');
  const [dialingContact, setDialingContact] = useState('Ramesh Kumar');
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // Message Form State
  const [messageText, setMessageText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Schedule Visit States
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitNotes, setVisitNotes] = useState('');

  // Share Memory State
  const [shareTitle, setShareTitle] = useState('');
  const [shareContext, setShareContext] = useState('');

  // Bhajan Recommendation State
  const [selectedBhajan, setSelectedBhajan] = useState('Ganesh Aarti');

  // 2. METRICS CALCULATOR
  const activeAlerts = alerts.filter(a => a.status !== 'resolved');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');
  const pendingCriticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'pending');
  const resolutionRate = alerts.length ? Math.round((resolvedAlerts.length / alerts.length) * 100) : 0;

  // Emotional Risk Score Model (Section 10)
  const getEmotionalRiskDetails = () => {
    const activeCritical = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;
    const activeHigh = alerts.filter(a => a.severity === 'high' && a.status !== 'resolved').length;
    const activeMedium = alerts.filter(a => a.severity === 'medium' && a.status !== 'resolved').length;

    if (activeCritical > 0) {
      return { score: 95, label: 'Critical', color: 'var(--color-danger)', arrow: '↑', text: 'Critical signals detected (SOS or stress phrases). Caregiver check-in is urgent.' };
    } else if (activeHigh > 0) {
      return { score: 68, label: 'Elevated Risk', color: 'var(--color-secondary-dark)', arrow: '↗', text: 'Elevated loneliness scores or isolation risk. Recommend sharing old family memories.' };
    } else if (activeMedium > 0) {
      return { score: 40, label: 'Monitor', color: 'var(--color-secondary)', arrow: '→', text: 'Missed medications or low steps warning. Keep monitoring activity feed.' };
    } else {
      return { score: 12, label: 'Stable', color: 'var(--color-primary)', arrow: '↓', text: 'All emotional & physical indicators stable. Conversational logs normal.' };
    }
  };

  const emotionalRisk = getEmotionalRiskDetails();
  const seniorName = isDemo ? 'Ramesh Kumar' : 'My Senior';

  // Dialing timer
  useEffect(() => {
    let interval: any;
    if (callActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toast confirmation trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Acknowledge & Resolve Alert Handlers
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acknowledged' } : a));
    triggerToast('Alert marked as Acknowledged.');
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    
    // Add timeline log
    const resolvedItem = alerts.find(a => a.id === id);
    if (resolvedItem) {
      const newEvent: TimelineEvent = {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        icon: <CheckCircle2 size={16} />,
        title: `Resolved Alert: ${resolvedItem.title}`,
        description: `Marked resolved. Recommended Action taken: ${resolvedItem.recommendedAction}.`,
        category: 'alert'
      };
      setTimelineEvents([newEvent, ...timelineEvents]);
    }
    triggerToast('Alert resolved successfully. Logs updated.');
  };

  // recommended action executor mapping
  const handleExecuteRecommendedAction = (action: string, alertTitle: string) => {
    triggerToast(`Initiating recommended action: "${action}" for alert: "${alertTitle}"`);
    if (action === 'Call Senior') {
      setDialingContact('Ramesh Kumar');
      setActiveModal('call');
    } else if (action === 'Schedule Video Call') {
      setDialingContact('Ramesh Kumar');
      setActiveModal('video');
    } else if (action === 'Share Family Memory') {
      setActiveModal('share');
    } else if (action === 'Play Devotional Content') {
      setActiveModal('bhajan');
    } else if (action === 'Emergency Escalation') {
      triggerToast('Emergency escalation protocols active. Rohan and Priya notified via SMS. 🚨');
    } else {
      setActiveModal('schedule');
    }
  };

  // Uploader memory
  const handleUploadNewMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryTitle.trim() || !memoryDetails.trim()) return;

    const newMemory: UploadedMemory = {
      id: Date.now().toString(),
      title: memoryTitle,
      type: memoryType,
      details: memoryDetails,
      timestamp: 'Just now'
    };

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: <Upload size={16} />,
      title: `Uploaded ${memoryType} asset`,
      description: `Memory title: "${memoryTitle}"`,
      category: 'memory'
    };

    setMemories([newMemory, ...memories]);
    setTimelineEvents([newEvent, ...timelineEvents]);
    setMemoryTitle('');
    setMemoryDetails('');
    triggerToast('Asset uploaded successfully!');
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    triggerToast('Asset removed from elder portal.');
  };

  // Quick Action Modal handlers
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: <Send size={16} />,
      title: 'Family Message Dispatched',
      description: `Greeting: "${messageText}"`,
      category: 'social'
    };

    setTimelineEvents([newEvent, ...timelineEvents]);
    setMessageText('');
    setActiveModal('none');
    triggerToast('Message successfully delivered to Ramesh ji\'s terminal! 💬');
  };

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate || !visitTime) return;

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: <Calendar size={16} />,
      title: 'Caregiver Visit Scheduled',
      description: `Scheduled for ${visitDate} at ${visitTime}. Notes: ${visitNotes || 'None'}`,
      category: 'health'
    };

    setTimelineEvents([newEvent, ...timelineEvents]);
    setVisitDate('');
    setVisitTime('');
    setVisitNotes('');
    setActiveModal('none');
    triggerToast('Visit saved to calendar successfully. 📅');
  };

  const handleSendBhajanRecommendation = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: <Sparkles size={16} />,
      title: 'Bhajan Recommended',
      description: `Recommended classical track: "${selectedBhajan}"`,
      category: 'social'
    };

    setTimelineEvents([newEvent, ...timelineEvents]);
    setActiveModal('none');
    triggerToast(`"${selectedBhajan}" suggested to Ramesh ji\'s playlist. 🕉`);
  };

  const handleShareFamilyMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareTitle || !shareContext) return;

    const newMemory: UploadedMemory = {
      id: Date.now().toString(),
      title: shareTitle,
      type: 'story',
      details: shareContext,
      timestamp: 'Just now'
    };

    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: <ImageIcon size={16} />,
      title: 'Shared Family Memory',
      description: `Story uploaded: "${shareTitle}"`,
      category: 'memory'
    };

    setMemories([newMemory, ...memories]);
    setTimelineEvents([newEvent, ...timelineEvents]);
    setShareTitle('');
    setShareContext('');
    setActiveModal('none');
    triggerToast('Family memory pushed to Ramesh ji\'s dashboard. 🖼');
  };

  // Severity color maps
  const getSeverityColor = (severity: 'critical' | 'high' | 'medium' | 'low') => {
    if (severity === 'critical') return 'var(--color-danger)';
    if (severity === 'high') return 'var(--color-secondary-dark)';
    if (severity === 'medium') return 'var(--color-secondary)';
    return 'var(--color-primary)';
  };

  const getSeverityBgColor = (severity: 'critical' | 'high' | 'medium' | 'low') => {
    if (severity === 'critical') return 'var(--color-danger-light)';
    if (severity === 'high') return 'var(--color-secondary-light)';
    if (severity === 'medium') return 'var(--color-secondary-light)';
    return 'var(--color-primary-light)';
  };

  // Sort & Filter alerts calculation
  const getFilteredAlerts = () => {
    let list = [...alerts];

    // Filter by Tab/Status
    if (activeTab === 'alerts') {
      if (filterStatus === 'active') {
        list = list.filter(a => a.status !== 'resolved');
      } else if (filterStatus === 'resolved') {
        list = list.filter(a => a.status === 'resolved');
      }
    } else {
      // overview only shows unresolved
      list = list.filter(a => a.status !== 'resolved');
    }

    // Filter by Severity
    if (filterSeverity !== 'all') {
      list = list.filter(a => a.severity === filterSeverity);
    }

    // Sort list
    if (sortBy === 'newest') {
      list.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => a.id.localeCompare(b.id));
    } else {
      // priority sorting: critical -> high -> medium -> low
      const weights = { critical: 4, high: 3, medium: 2, low: 1 };
      list.sort((a, b) => weights[b.severity] - weights[a.severity]);
    }

    return list;
  };

  const filteredAlertList = getFilteredAlerts();

  return (
    <div className="sahaara-bg-watermark-direct" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.5rem', minHeight: '100vh' }}>
      
      {/* EMOTIONAL HERO BANNER */}
      <div 
        className="premium-float animate-slide-up"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(13, 148, 136, 0.95) 35%, rgba(13, 148, 136, 0.65) 75%, rgba(13, 148, 136, 0.2) 100%), url("https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-premium)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ zIndex: 1, textAlign: 'left' }}>
          <span style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.25)', 
            color: '#ffffff', 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            padding: '0.25rem 0.75rem', 
            borderRadius: '50px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Caregiver Portal Dashboard
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0 0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            Peace of Mind, Wherever You Are.
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, fontWeight: 500, margin: 0 }}>
            Real-time emotional wellness & physical safety monitoring for {seniorName}.
          </p>
        </div>
        <div style={{ zIndex: 1, fontSize: '3.5rem', opacity: 0.9 }}>🛡️</div>
      </div>

      {/* TOAST FEEDBACK NOTIFICATION */}
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
          gap: '0.5rem',
          animation: 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <Sparkles size={18} className="animate-pulse-soft" />
          {toastMessage}
        </div>
      )}

      {/* SECTION 6 — ACTIVE CRITICAL ALERT BANNER */}
      {pendingCriticalAlerts.length > 0 && (
        <div style={{
          backgroundColor: 'var(--color-danger)',
          color: '#ffffff',
          padding: '1.25rem 2rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          textAlign: 'left',
          animation: 'pulse-soft 3s infinite ease-in-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AlertTriangle size={26} className="animate-pulse-soft" />
            <div>
              <strong style={{ fontSize: '1.15rem', display: 'block' }}>⚠ Immediate Attention Required</strong>
              <span style={{ fontSize: '0.9rem' }}>
                {seniorName} has unresolved critical alerts. Caregiver intervention is recommended immediately.
              </span>
            </div>
          </div>
          <button 
            onClick={() => { setActiveTab('alerts'); setFilterStatus('active'); setFilterSeverity('critical'); }}
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--color-danger)',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.85rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            View Alert
          </button>
        </div>
      )}

      {/* CAREGIVER PROFILE & FAMILY LINKS (Hero Panel) */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--color-primary)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textAlign: 'left' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--color-primary-light)', 
            border: '3px solid var(--color-primary)',
            overflow: 'hidden'
          }}>
            <img 
              src={isDemo ? rameshProfileImg : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'} 
              alt={seniorName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{seniorName}</h2>
              <span style={{ 
                backgroundColor: 'var(--color-success-light)', 
                color: 'var(--color-success)', 
                fontWeight: 700, 
                fontSize: '0.8rem', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '50px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }}></span>
                {isDemo ? 'Active Today' : 'Profile Created'}
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0.5rem 0', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {isDemo ? 'Age 72 • Lucknow, Uttar Pradesh' : 'Senior Unassigned'}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>🕒 Last Check-in: <strong>{isDemo ? '08:00 AM Today' : '--'}</strong></span>
              <span>😊 Mood: <strong style={{ color: 'var(--color-primary-dark)' }}>{isDemo ? 'Calm & Grateful' : '--'}</strong></span>
              <span>💔 Loneliness Index: <strong>{isDemo ? '24% (Low)' : '--'}</strong></span>
              <span>🌟 Risk Status: <strong style={{ color: isDemo ? emotionalRisk.color : 'var(--text-muted)' }}>{isDemo ? emotionalRisk.label : '--'}</strong></span>
            </div>
          </div>
        </div>

        {/* Family relationship view widget */}
        <div style={{ textAlign: 'left', borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem', minWidth: '220px' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
            Family Links
          </h4>
        {isDemo ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <User size={14} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: 700 }}>Son:</span>
              <span style={{ color: 'var(--color-primary-dark)', fontWeight: 600 }}>Rohan (Bangalore)</span>
            </div>
            <div style={{ display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <User size={14} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: 700 }}>Daughter-in-law:</span>
              <span style={{ color: 'var(--color-primary-dark)', fontWeight: 600 }}>Priya (Bangalore)</span>
            </div>
            <div style={{ display: 'flex', justifyItems: 'center', gap: '0.5rem', alignItems: 'center' }}>
              <User size={14} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontWeight: 700 }}>Granddaughter:</span>
              <span style={{ color: 'var(--color-primary-dark)', fontWeight: 600 }}>Ananya (Mumbai)</span>
            </div>
          </div>
        ) : (
          <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No other caregivers linked yet.
          </div>
        )}
        </div>

      </section>

      {/* NAVIGATION TABS SELECTOR ROW */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border-color)', gap: '1.5rem', paddingBottom: '0.1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '4px solid var(--color-primary)' : '4px solid transparent',
              color: activeTab === 'overview' ? 'var(--color-primary-dark)' : 'var(--text-muted)',
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Activity size={18} />
            Daily Check-in Feed
          </button>
          <button 
            onClick={() => { setActiveTab('alerts'); setFilterSeverity('all'); setFilterStatus('active'); }}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'alerts' ? '4px solid var(--color-primary)' : '4px solid transparent',
              color: activeTab === 'alerts' ? 'var(--color-primary-dark)' : 'var(--text-muted)',
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Bell size={18} />
            Alerts Center
            {activeAlerts.length > 0 && (
              <span style={{ backgroundColor: 'var(--color-danger)', color: '#ffffff', fontSize: '0.75rem', fontWeight: 800, padding: '0.1rem 0.5rem', borderRadius: '10px' }}>
                {activeAlerts.length}
              </span>
            )}
          </button>
        </div>
        <Link 
          to="/caregiver/reports" 
          style={{
            textDecoration: 'none',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary-dark)',
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 800,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid var(--color-primary)',
            transition: 'var(--transition-smooth)',
            marginBottom: '0.5rem'
          }}
          className="hover-scale"
        >
          📊 View AI Wellness Reports &rarr;
        </Link>
      </section>

      {/* CONDITIONAL TAB RENDERING */}
      {activeTab === 'overview' ? (
        
        /* ==========================================
           TAB 1: COMMAND CENTER OVERVIEW
           ========================================== */
        <div className="grid-container grid-3" style={{ gap: '2.5rem' }}>
          
          {/* LEFT COLUMN (SPAN 2): SNAPSHOTS & MOOD LINE GRAPH */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* WELLNESS SNAPSHOT GRID */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>💝 {seniorName}'s Daily Comfort Log</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>A visual summary of emotional energy, health check-ins, and companion chats.</p>
              </div>

              <div className="grid-container grid-3" style={{ gap: '1.5rem' }}>
                
                {/* Heart rate snapshot card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-danger)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resting Heart Rhythm</span>
                    <Heart size={20} style={{ color: 'var(--color-danger)' }} className="animate-pulse-soft" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>72 bpm</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 700 }}>Stable rest state (Normal)</span>
                  
                  {/* Heart line visual wave illustration */}
                  <div style={{ display: 'flex', gap: '2px', height: '14px', alignItems: 'flex-end', marginTop: '1rem' }}>
                    {[4, 10, 4, 30, 4, 4, 15, 4, 4, 8, 4, 12, 4].map((h, i) => (
                      <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-danger)', opacity: 0.7, height: `${h}px`, borderRadius: '10px' }}></div>
                    ))}
                  </div>
                </div>

                {/* Steps walked snapshot card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Steps</span>
                    <Activity size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>3,840</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>/ 5,000</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>76.8% of daily goal</span>
                  
                  {/* Progress bar */}
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
                    <div style={{ width: '76.8%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                  </div>
                </div>

                {/* Sleep quality snapshot card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-secondary)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Night Sleep Comfort</span>
                    <Moon size={20} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>7.5 hrs</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>2.2 hrs Deep sleep (Optimal)</span>

                  {/* Progress bar */}
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
                  </div>
                </div>

                {/* Medication adherence snapshot card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-success)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Medication Care Check</span>
                    <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>3 / 4 taken</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 700 }}>Morning BP complete</span>

                  {/* Progress bar */}
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--color-success)' }}></div>
                  </div>
                </div>

                {/* Social engagement score card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Family Connection Status</span>
                    <Users size={20} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>92%</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 700 }}>Very Active Family link</span>

                  {/* Progress bar */}
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
                    <div style={{ width: '92%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                  </div>
                </div>

                {/* SAATHI talk hours card */}
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-secondary)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>SAATHI Companion Chats</span>
                    <Sparkles size={20} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800 }}>42 mins</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>+18% increase this week</span>

                  {/* Progress bar */}
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
                    <div style={{ width: '80%', height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
                  </div>
                </div>

              </div>
            </section>

            {/* MOOD TREND LINE CHART */}
            <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={22} style={{ color: 'var(--color-primary)' }} />
                    7-Day Emotional Journey
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Weekly emotional status tracking analytics</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontWeight: 700, 
                    fontSize: '0.85rem', 
                    backgroundColor: 'var(--color-primary-light)', 
                    color: 'var(--color-primary-dark)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '50px'
                  }}>
                    Trend: Stable / Needs Attention
                  </span>
                </div>
              </div>

              {/* SVG line chart plot */}
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', width: '60px', paddingBottom: '24px' }}>
                  <span>Happy (खुश)</span>
                  <span>Calm (शांत)</span>
                  <span>Lonely (अकेला)</span>
                  <span>Anxious (चिंतित)</span>
                  <span>Sad (उदास)</span>
                </div>

                <div style={{ flex: 1, position: 'relative', borderLeft: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)' }}>
                  {[0, 1, 2, 3, 4].map((grid, index) => (
                    <div key={grid} style={{ position: 'absolute', left: 0, width: '100%', borderBottom: '1px dashed var(--border-color)', top: `${index * 45}px` }}></div>
                  ))}

                  <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <path 
                      d="M 20 50 L 100 45 L 180 130 L 260 50 L 340 30 L 420 120 L 480 40" 
                      fill="none" 
                      stroke="var(--color-primary)" 
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M 20 50 L 100 45 L 180 130 L 260 50 L 340 30 L 420 120 L 480 40 L 480 180 L 20 180 Z" 
                      fill="url(#grad)" 
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="var(--bg-primary)" />
                      </linearGradient>
                    </defs>
                    {[
                      { x: 20, y: 50, day: 'Mon', mood: 'Calm' },
                      { x: 100, y: 45, day: 'Tue', mood: 'Calm' },
                      { x: 180, y: 130, day: 'Wed', mood: 'Lonely' },
                      { x: 260, y: 50, day: 'Thu', mood: 'Calm' },
                      { x: 340, y: 30, day: 'Fri', mood: 'Happy' },
                      { x: 420, y: 120, day: 'Sat', mood: 'Anxious' },
                      { x: 480, y: 40, day: 'Sun', mood: 'Happy' }
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <circle 
                          cx={pt.x} 
                          cy={pt.y} 
                          r="6" 
                          fill="var(--color-primary-dark)" 
                          stroke="#ffffff" 
                          strokeWidth="2.5" 
                        />
                        <text x={pt.x} y="195" textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontWeight="bold">{pt.day}</text>
                        <text x={pt.x} y={pt.y - 12} textAnchor="middle" fontSize="9" fill="var(--text-primary)" fontWeight="800">{pt.mood}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </section>

            {/* QUICK ACTIONS ROW */}
            <section style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <button 
                onClick={() => { setDialingContact('Ramesh Kumar'); setActiveModal('call'); setCallActive(false); }}
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-primary)', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Phone size={16} /> Call Senior
              </button>
              <button 
                onClick={() => { setDialingContact('Ramesh Kumar'); setActiveModal('video'); setCallActive(false); }}
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Video size={16} /> Video Call
              </button>
              <button 
                onClick={() => setActiveModal('message')}
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--color-primary)', color: 'var(--color-primary-dark)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Send size={16} /> Send Message
              </button>
              <button 
                onClick={() => setActiveModal('schedule')}
                style={{ flex: 1, minWidth: '150px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Calendar size={16} /> Schedule Visit
              </button>
            </section>

          </div>

          {/* RIGHT COLUMN (SPAN 1): NOSTALGIA CONTROL & TIMELINE FEED */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* NOSTALGIA VAULT TIMELINE CONTROL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ImageIcon size={20} style={{ color: 'var(--color-primary)' }} />
                  Nostalgia Corner Control
                </h3>
                <Link to="/caregiver/memories" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', textDecoration: 'none' }}>
                  Manage Album &rarr;
                </Link>
              </div>

              <form onSubmit={handleUploadNewMemory} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Upload New Memory Attachment</span>
                
                <input 
                  type="text" 
                  value={memoryTitle}
                  onChange={(e) => setMemoryTitle(e.target.value)}
                  placeholder="Memory Title (e.g. Diwali celebration 1999)"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required
                />

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={memoryType}
                    onChange={(e) => setMemoryType(e.target.value as any)}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option value="photo">📸 Photo</option>
                    <option value="voice">🎙 Voice</option>
                    <option value="letter">📝 Letter</option>
                    <option value="story">📖 Story</option>
                  </select>

                  <input 
                    type="text" 
                    value={memoryDetails}
                    onChange={(e) => setMemoryDetails(e.target.value)}
                    placeholder="Context details..."
                    style={{ flex: 2, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                    required
                  />
                </div>

                <button 
                  type="submit"
                  style={{ padding: '0.5rem', border: 'none', borderRadius: '4px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                >
                  <Upload size={14} /> Send to Ramesh ji
                </button>
              </form>

              {/* List active memories */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Active Nostalgia Assets</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {memories.map((m) => (
                    <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <div style={{ textAlign: 'left' }}>
                        <strong style={{ display: 'block', fontSize: '0.9rem' }}>
                          {m.type === 'photo' ? '📸' : m.type === 'voice' ? '🎙' : m.type === 'letter' ? '📝' : '📖'} {m.title}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.details} &bull; {m.timestamp}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteMemory(m.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.25rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </section>

            {/* ELDER CIRCLE COMMUNITY CONTROL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={20} style={{ color: 'var(--color-primary)' }} />
                  Elder Circle Control
                </h3>
                <Link to="/caregiver/community" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', textDecoration: 'none' }}>
                  Manage Portal &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Stats rows */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Groups</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)' }}>4 Active</strong>
                  </div>
                  <div style={{ flex: 1, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>RSVPs</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-secondary-dark)' }}>2 Weekly</strong>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Social Score</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-success)' }}>88%</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  &bull; Ramesh Kumar is active in **Yoga Group** and **Bhajan Mandali**.
                  <br />
                  &bull; Next meetup: **Morning Park Meetup** (Tomorrow, 7:00 AM).
                </div>
              </div>
            </section>

            {/* DIGITAL LEGACY VAULT CONTROL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={20} style={{ color: 'var(--color-accent)' }} />
                  Digital Legacy Control
                </h3>
                <Link to="/caregiver/legacy" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-accent-dark)', textDecoration: 'none' }}>
                  Manage Legacy &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Media Assets</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-accent-dark)' }}>12 Items</strong>
                  </div>
                  <div style={{ flex: 1, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Chapters</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)' }}>6 Stories</strong>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Milestones</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-success)' }}>5 Events</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  &bull; Family recently contributed: **1 Photo** and **1 Voice Note**.
                  <br />
                  &bull; Active preservation status: **100% Safe**.
                </div>
              </div>
            </section>

            {/* DEVOTION & CULTURAL CONTROL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Volume2 size={20} style={{ color: 'var(--color-secondary)' }} />
                  Devotion & Cultural Control
                </h3>
                <Link to="/caregiver/cultural" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-secondary-dark)', textDecoration: 'none' }}>
                  Manage Prefs &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '6px', textAlign: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Daily Streak</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-secondary-dark)' }}>5 Days 🔥</strong>
                  </div>
                  <div style={{ flex: 1, borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Meditation</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)' }}>120 Mins</strong>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Favorites</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-success)' }}>3 Tracks</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  &bull; Ramesh played **Hanuman Chalisa** today at 07:30 AM.
                  <br />
                  &bull; Cultural preference recommendations: **2 Active**.
                </div>
              </div>
            </section>

            {/* TIMELINE FEED */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                🕒 Hourly Activity Feed
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', borderLeft: '2px solid var(--border-color)', marginLeft: '0.75rem', paddingLeft: '1.25rem' }}>
                {timelineEvents.map((event) => (
                  <div key={event.id} style={{ position: 'relative', textAlign: 'left' }}>
                    <div style={{ 
                      position: 'absolute', 
                      left: '-28px', 
                      top: '2px', 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      backgroundColor: event.category === 'alert' ? 'var(--color-danger)' : event.category === 'health' ? 'var(--color-success)' : event.category === 'memory' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      border: '3px solid #ffffff',
                      boxShadow: '0 0 0 1px var(--border-color)'
                    }}></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>{event.time}</span>
                    <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--text-primary)' }}>{event.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.1rem' }}>{event.description}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>

      ) : (
        
        /* ==========================================
           TAB 2: PROACTIVE ALERTS CENTER
           ========================================== */
        <div className="grid-container grid-3" style={{ gap: '2.5rem' }}>
          
          {/* LEFT PANELS (SPAN 2): METRICS GAUGE, ACTIVE WARNING CARDS, HISTORIES */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* SECTION 2 — ALERT METRICS KPI ROW */}
            <div className="grid-container grid-4" style={{ gap: '1rem' }}>
              
              <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-primary)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Alerts</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0' }}>{alerts.length}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>System logs database</span>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-secondary)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Alerts</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--color-secondary-dark)' }}>{activeAlerts.length}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Unresolved warnings</span>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-success)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resolved Alerts</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--color-success)' }}>{resolvedAlerts.length}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>History database</span>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--color-danger)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resolution Rate</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.25rem 0', color: 'var(--color-primary-dark)' }}>{resolutionRate}%</h3>
                
                <div style={{ height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden', marginTop: '0.5rem' }}>
                  <div style={{ width: `${resolutionRate}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                </div>
              </div>

            </div>

            {/* ACTIVE ALERTS INTERVENTIONS CONTROLLER */}
            <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Active Alert Interventions</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real-time risk warnings requiring caregiver execution</span>
                </div>

                {/* Filtering Toolbar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                  
                  {/* Severity Filter */}
                  <select 
                    value={filterSeverity} 
                    onChange={(e) => setFilterSeverity(e.target.value as any)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <option value="all">All Severities</option>
                    <option value="critical">🔴 Critical only</option>
                    <option value="high">🟠 High only</option>
                    <option value="medium">🟡 Medium only</option>
                    <option value="low">🟢 Low only</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <option value="all">All Logs (incl. resolved)</option>
                    <option value="active">Active/Pending</option>
                    <option value="resolved">Resolved History</option>
                  </select>

                  {/* Sorting dropdown */}
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <option value="priority">Priority Order</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>

                </div>
              </div>

              {/* Active Cards Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredAlertList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={40} style={{ color: 'var(--color-success)', margin: '0 auto 0.75rem auto' }} />
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>No alerts matching the selected filters.</span>
                  </div>
                ) : (
                  filteredAlertList.map((alert) => {
                    const isResolved = alert.status === 'resolved';
                    const isAck = alert.status === 'acknowledged';

                    const borderLColor = getSeverityColor(alert.severity);
                    const bgC = getSeverityBgColor(alert.severity);

                    return (
                      <div 
                        key={alert.id}
                        style={{
                          padding: '1.5rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isResolved ? 'var(--bg-tertiary)' : bgC,
                          border: `1px solid ${isResolved ? 'var(--border-color)' : borderLColor}`,
                          borderLeft: `6px solid ${borderLColor}`,
                          opacity: isResolved ? 0.65 : 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              fontWeight: 800, 
                              backgroundColor: borderLColor, 
                              color: '#ffffff', 
                              padding: '0.2rem 0.6rem', 
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              {alert.severity}
                            </span>
                            <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{alert.title}</strong>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            🕒 {alert.timestamp} &bull; Category: <strong style={{ textTransform: 'capitalize' }}>{alert.category}</strong>
                          </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                          {alert.description}
                        </p>

                        {/* Intervention workflow buttons (Section 7) */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                          
                          {/* Recommended Action executor button */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Recommended Action:</span>
                            <button
                              onClick={() => handleExecuteRecommendedAction(alert.recommendedAction, alert.title)}
                              disabled={isResolved}
                              style={{
                                backgroundColor: isResolved ? 'var(--text-muted)' : 'var(--color-primary-dark)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.45rem 1rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: isResolved ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                transition: 'var(--transition-bounce)'
                              }}
                            >
                              <Sparkles size={14} />
                              {alert.recommendedAction}
                            </button>
                          </div>

                          {/* Resolution workflow buttons */}
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {!isResolved && !isAck && (
                              <button
                                onClick={() => handleAcknowledgeAlert(alert.id)}
                                style={{ padding: '0.45rem 1rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                Acknowledge
                              </button>
                            )}
                            
                            {!isResolved && (
                              <button
                                onClick={() => handleResolveAlert(alert.id)}
                                style={{ padding: '0.45rem 1.25rem', border: 'none', borderRadius: '4px', backgroundColor: 'var(--color-success)', color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                Resolve Alert
                              </button>
                            )}

                            {isResolved && (
                              <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                                <CheckCircle2 size={16} /> Resolved
                              </span>
                            )}
                          </div>

                        </div>

                      </div>
                    );
                  })
                )}
              </div>

            </section>

            {/* SECTION 8 — RESOLVED HISTORY TIMELINE */}
            <section className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                📜 Alert Resolution History Log
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {resolvedAlerts.length === 0 ? (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', display: 'block', padding: '1rem' }}>No alerts resolved in this session yet.</span>
                ) : (
                  resolvedAlerts.map((alert) => (
                    <div 
                      key={alert.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-tertiary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.9rem', display: 'block' }}>
                          ✅ {alert.title}
                        </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Severity: <strong style={{ color: getSeverityColor(alert.severity) }}>{alert.severity}</strong> &bull; Resolved via action: <strong>{alert.recommendedAction}</strong>
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Resolved today
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

          {/* RIGHT PANELS (SPAN 1): EMOTIONAL RISK & FAMILY INTERVENTIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* SECTION 10 — EMOTIONAL RISK PANEL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                🧠 Emotional Risk Panel
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                
                {/* SVG Risk Gauge Progress Ring */}
                <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                  <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                    <circle cx="45" cy="45" r="35" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                    <circle 
                      cx="45" 
                      cy="45" 
                      r="35" 
                      fill="transparent" 
                      stroke={emotionalRisk.color} 
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 35}
                      strokeDashoffset={2 * Math.PI * 35 * (1 - emotionalRisk.score / 100)}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{emotionalRisk.score}%</span>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Status: <span style={{ color: emotionalRisk.color }}>{emotionalRisk.label}</span>
                    <span style={{ fontSize: '1.2rem', color: emotionalRisk.color }}>{emotionalRisk.arrow}</span>
                  </h4>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                    {emotionalRisk.text}
                  </p>
                </div>

              </div>

            </section>

            {/* SECTION 9 — ALERT RESOLUTION ANALYTICS */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                📈 Caregiver Analytics
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Avg Resolution Time:</span>
                  <span style={{ fontWeight: 700 }}>14.2 mins</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Critical Alerts Weekly:</span>
                  <span style={{ fontWeight: 700 }}>2 active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Caregiver Response Score:</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>96% (Excellent)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Pending Warnings:</span>
                  <span style={{ fontWeight: 700 }}>{alerts.filter(a => a.status === 'pending').length} logs</span>
                </div>
              </div>
            </section>

            {/* SECTION 11 — FAMILY INTERVENTION PANEL */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                ❤️ Suggestion Interventions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                
                <button
                  onClick={() => handleExecuteRecommendedAction('Call Senior', 'family_tip')}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}
                >
                  📞 Call Ramesh ji today
                </button>

                <button
                  onClick={() => handleExecuteRecommendedAction('Share Family Memory', 'family_tip')}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}
                >
                  🖼 Share old wedding memories
                </button>

                <button
                  onClick={() => handleExecuteRecommendedAction('Schedule Video Call', 'family_tip')}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}
                >
                  🎥 Schedule family video call
                </button>

                <button
                  onClick={() => handleExecuteRecommendedAction('Play Devotional Content', 'family_tip')}
                  style={{ width: '100%', padding: '0.65rem 0.8rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}
                >
                  🕉 Recommend morning prayer bhajans
                </button>

              </div>
            </section>

          </div>

        </div>

      )}

      {/* ==========================================
         MODALS HUB (DIALERS, VISIT SCHEDULE, ETC)
         ========================================== */}
      
      {/* 1. CALL SENIOR DIALER MODAL */}
      {activeModal === 'call' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '400px', padding: '3rem 2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'center', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', fontSize: '3rem', lineHeight: '90px', margin: '0 auto', border: '3px solid var(--color-primary)' }}>👴</div>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>{dialingContact}</h3>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)', fontWeight: 700 }}>Caregiver Family Hotline Call</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {callActive ? formatTimer(callTimer) : 'Ringing...'}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {!callActive ? (
                <button 
                  onClick={() => setCallActive(true)}
                  style={{ flex: 1, backgroundColor: 'var(--color-success)', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Simulate Answer
                </button>
              ) : null}
              <button 
                onClick={() => { setCallActive(false); setActiveModal('none'); }}
                style={{ flex: 1, backgroundColor: 'var(--color-danger)', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
              >
                Hang Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIDEO CALL MODAL */}
      {activeModal === 'video' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '440px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'center', border: '2px solid var(--color-primary-dark)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: '#000000', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {callActive ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <div style={{ width: '100%', height: '100%', fontSize: '4.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e293b' }}>👴</div>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#ffffff' }}>Ramesh Kumar (Lucknow)</div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '80px', height: '100px', backgroundColor: '#334155', borderRadius: '4px', border: '2px solid #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👨</div>
                </div>
              ) : (
                <div style={{ color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ fontSize: '3rem' }}>🔔</div>
                  <span>Initiating video transmission...</span>
                </div>
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Video Link: Ramesh ji</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status: {callActive ? `Connected (${formatTimer(callTimer)})` : 'Ringing...'}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {!callActive ? (
                <button 
                  onClick={() => setCallActive(true)}
                  style={{ flex: 1, backgroundColor: 'var(--color-success)', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Answer
                </button>
              ) : null}
              <button 
                onClick={() => { setCallActive(false); setActiveModal('none'); }}
                style={{ flex: 1, backgroundColor: 'var(--color-danger)', color: '#ffffff', border: 'none', padding: '0.75rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SEND GREETING MESSAGE MODAL */}
      {activeModal === 'message' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '440px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Send Family Message</h3>
              <button onClick={() => setActiveModal('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Type Message Text:</label>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Rohan: 'Dad, how is your afternoon weather? Did you take your medicine? Thinking of you...'"
                rows={4}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.9rem', resize: 'none' }}
                required
              />
              <button 
                type="submit" 
                style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer' }}
              >
                Send Greeting
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. SCHEDULE VISIT MODAL */}
      {activeModal === 'schedule' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '440px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Schedule Caregiver Visit</h3>
              <button onClick={() => setActiveModal('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleScheduleVisit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Date:</label>
                  <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} required />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Time:</label>
                  <input type="time" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} required />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Companion Notes:</label>
                <input type="text" value={visitNotes} onChange={(e) => setVisitNotes(e.target.value)} placeholder="Bringing fruits, taking dad for walking checkup..." style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
                Save on Calendar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. CLASSICAL BHAJAN SELECTOR MODAL */}
      {activeModal === 'bhajan' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '420px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Recommend Bhajan/Prayers</h3>
              <button onClick={() => setActiveModal('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSendBhajanRecommendation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Choose classical track to queue on senior portal:</label>
              <select 
                value={selectedBhajan} 
                onChange={(e) => setSelectedBhajan(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontWeight: 600, cursor: 'pointer' }}
              >
                <option value="Ganesh Aarti">🕉 Ganesh Aarti (Sukhkarta Dukhharta)</option>
                <option value="Gayatri Mantra">☀️ Gayatri Mantra Chants</option>
                <option value="Hanuman Chalisa">🐒 Hanuman Chalisa (Hariharan Classical)</option>
                <option value="Shiv Dhun">🔱 Om Namah Shivaya Chant</option>
                <option value="Kabir Dohe">📖 Kabir Ke Dohe (Peaceful Lecture)</option>
              </select>
              <button type="submit" style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
                Recommend Bhajan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. SHARE FAMILY MEMORY MODAL */}
      {activeModal === 'share' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '440px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Share Family Memory Album</h3>
              <button onClick={() => setActiveModal('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleShareFamilyMemory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Memory Story Title:</label>
                <input type="text" value={shareTitle} onChange={(e) => setShareTitle(e.target.value)} placeholder="Summer trip to Shimla Mall Road 1995" style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }} required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Memory Description Details:</label>
                <textarea value={shareContext} onChange={(e) => setShareContext(e.target.value)} placeholder="Dad, remember that hot Sunday when we had cold ice cream..." rows={3} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', resize: 'none' }} required />
              </div>
              <button type="submit" style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' }}>
                Publish Story to Ramesh ji
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. PDF REPORT MODAL PREVIEW */}
      {activeModal === 'report' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '95%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>SAHAARA Wellness Report</h3>
              <button onClick={() => setActiveModal('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '1rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '320px', overflowY: 'auto' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1rem' }}>SAHAARA ELDERCARE SYSTEMS</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Weekly Health & Emotional Wellness Summary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Senior: <strong>Ramesh Kumar</strong></span>
                <span>Generated: <strong>June 15, 2026</strong></span>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', gap: '0.5rem' }}>
                <span>Age / Location: <strong>72 / Lucknow</strong></span>
                <span>Primary Caregiver: <strong>Rohan Kumar</strong></span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Vitals & Diagnostics metrics:</strong>
                <span>&bull; Average Resting Heart Rate: <strong>72 bpm (Normal)</strong></span><br />
                <span>&bull; Weekly Steps count: <strong>26,880 steps (Stable)</strong></span><br />
                <span>&bull; Sleep quality index: <strong>88% (Good restoration sleep)</strong></span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Emotional wellbeing logs (SAATHI AI):</strong>
                <span>&bull; Average loneliness score: <strong>24% (Low loneliness risk)</strong></span><br />
                <span>&bull; Conversation topics: <strong>Anniversary shehnai, Lucknow streets, Gomti temple, 1995 Shimla trip memories.</strong></span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', backgroundColor: 'var(--color-primary-light)', padding: '0.5rem', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--color-primary-dark)' }}>AI Wellness Recommendation:</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontStyle: 'italic', lineHeight: 1.3 }}>
                  "Ramesh ji shows robust physical metrics but registers minor loneliness flags on Wednesdays when family call interval is longer. Pushing old pictures to Nostalgia corner regularly helps sustain emotional levels."
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => { setActiveModal('none'); triggerToast('Wellness PDF successfully printed/saved!'); }}
                style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
              >
                Download PDF
              </button>
              <button 
                onClick={() => setActiveModal('none')}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CaregiverDashboard;
