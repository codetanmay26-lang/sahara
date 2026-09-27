import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  X, 
  Calendar, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  Download,
  FileText,
  Shield
} from 'lucide-react';

// Interfaces for structured data
interface CaregiverRecommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  category: string;
  description: string;
  actionLabel: string;
}

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  category: 'mood' | 'family' | 'activity' | 'alert';
}

interface WeeklyReportData {
  weekName: string;
  wellnessScore: number;
  emotionalHealthScore: number;
  lonelinessRiskScore: number;
  socialEngagementScore: number;
  activityConsistencyScore: number;
  moodSummary: string;
  activitySummary: string;
  familyInteractionSummary: string;
  riskAssessment: string;
  riskSeverity: 'low' | 'medium' | 'high';
  happinessValues: number[];
  calmnessValues: number[];
  lonelinessValues: number[];
  anxietyValues: number[];
  lonelinessTrend30d: 'Improving' | 'Stable' | 'Needs Attention';
  lonelinessTrend7d: 'Improving' | 'Stable' | 'Needs Attention';
  familyCalls: number;
  communityParticipation: number;
  memoryInteractions: number;
  saathiConversations: number;
  comparison: {
    mood: 'up' | 'down' | 'stable';
    activity: 'up' | 'down' | 'stable';
    engagement: 'up' | 'down' | 'stable';
    loneliness: 'up' | 'down' | 'stable';
    moodDetail: string;
    activityDetail: string;
    engagementDetail: string;
    lonelinessDetail: string;
  };
  recommendations: CaregiverRecommendation[];
  timeline: TimelineEvent[];
}

export const CaregiverReports: React.FC = () => {
  // 1. REPORT DATA STORE (Weeks June 1 - 4)
  const reportDatabase: Record<string, WeeklyReportData> = {
    'June Week 4': {
      weekName: 'June Week 4 (June 22 - June 28)',
      wellnessScore: 82,
      emotionalHealthScore: 78,
      lonelinessRiskScore: 24,
      socialEngagementScore: 92,
      activityConsistencyScore: 76,
      moodSummary: 'Ramesh ji displayed a generally positive emotional state this week with occasional loneliness signals during evening hours.',
      activitySummary: 'Physical activity remained stable with an average of 4,100 daily steps. Step target achieved on 5 out of 7 days.',
      familyInteractionSummary: 'Three family interactions were recorded this week including one video call and two shared memories.',
      riskAssessment: 'Low risk. Daily conversations with SAATHI companion show high engagement. Continue current patterns.',
      riskSeverity: 'low',
      happinessValues: [65, 70, 50, 75, 80, 60, 85],
      calmnessValues: [75, 80, 65, 70, 75, 60, 80],
      lonelinessValues: [25, 20, 45, 30, 20, 40, 24],
      anxietyValues: [30, 25, 50, 35, 25, 45, 20],
      lonelinessTrend30d: 'Stable',
      lonelinessTrend7d: 'Improving',
      familyCalls: 4,
      communityParticipation: 2,
      memoryInteractions: 3,
      saathiConversations: 5,
      comparison: {
        mood: 'up',
        activity: 'up',
        engagement: 'up',
        loneliness: 'down',
        moodDetail: 'Calm and Happy levels increased by 6%',
        activityDetail: 'Average 4,100 steps vs 3,800 steps last week',
        engagementDetail: '4 calls/messages vs 2 last week',
        lonelinessDetail: 'Spikes decreased by 8% overall'
      },
      recommendations: [
        { id: 'rec-1', priority: 'high', category: 'Emotional Connection', description: 'Schedule a family video call. Ramesh ji has not spoken to Rohan since Saturday.', actionLabel: 'Schedule Video Call' },
        { id: 'rec-2', priority: 'high', category: 'Nostalgia Therapy', description: 'Share a childhood memory album. Spiking nostalgia during SAATHI chat suggests sharing old wedding images.', actionLabel: 'Share Family Memory' },
        { id: 'rec-3', priority: 'medium', category: 'Spiritual Wellness', description: 'Recommend devotional content. Ramesh ji expressed a desire to hear shehnai tracks.', actionLabel: 'Recommend Bhajan' },
        { id: 'rec-4', priority: 'medium', category: 'Social Activity', description: 'Encourage participation in Elder Circle community walking group this Wednesday.', actionLabel: 'Notify Caregiver' }
      ],
      timeline: [
        { id: 'time-1', time: 'Mon 09:00 AM', title: 'Happy Mood Check-In', description: 'Checked in feeling "Happy & Peaceful". Logged 4,200 steps.', category: 'mood' },
        { id: 'time-2', time: 'Wed 02:15 PM', title: 'Loneliness Spike Flagged', description: 'SAATHI logged sadness phrase: "No one calls in the afternoon". Risk index spiked to 45%.', category: 'alert' },
        { id: 'time-3', time: 'Thu 11:30 AM', title: 'Shared Memory Interaction', description: 'Viewed 1995 Shimla trip photo deck on senior portal for 15 mins.', category: 'family' },
        { id: 'time-4', time: 'Sat 06:00 PM', title: 'Completed Family Video Call', description: '22-minute video chat completed with son Rohan & granddaughter Ananya.', category: 'family' },
        { id: 'time-5', time: 'Sun 08:30 AM', title: 'Steps Milestone Achieved', description: 'Completed morning temple walk logging 5,100 steps total.', category: 'activity' }
      ]
    },
    'June Week 3': {
      weekName: 'June Week 3 (June 15 - June 21)',
      wellnessScore: 74,
      emotionalHealthScore: 68,
      lonelinessRiskScore: 42,
      socialEngagementScore: 80,
      activityConsistencyScore: 68,
      moodSummary: 'Slight elevation in loneliness indicators on Wednesday and Friday. Ramesh ji expressed nostalgia about Lucknow streets.',
      activitySummary: 'Steps averaged 3,800. Walk duration was slightly shorter due to Lucknow heat warnings.',
      familyInteractionSummary: 'Two calls logged from son Rohan. No granddaughter interaction recorded in the last 6 days.',
      riskAssessment: 'Moderate Risk. Elevated anxiety levels during night hours. Suggested family photo share.',
      riskSeverity: 'medium',
      happinessValues: [55, 60, 40, 65, 55, 50, 70],
      calmnessValues: [65, 70, 55, 60, 65, 50, 75],
      lonelinessValues: [35, 30, 55, 40, 45, 48, 42],
      anxietyValues: [40, 35, 60, 45, 50, 55, 30],
      lonelinessTrend30d: 'Needs Attention',
      lonelinessTrend7d: 'Stable',
      familyCalls: 2,
      communityParticipation: 1,
      memoryInteractions: 1,
      saathiConversations: 4,
      comparison: {
        mood: 'down',
        activity: 'down',
        engagement: 'down',
        loneliness: 'up',
        moodDetail: 'Sadness index rose slightly mid-week',
        activityDetail: 'Average 3,800 steps vs 4,200 steps',
        engagementDetail: '2 interactions vs 4 last week',
        lonelinessDetail: 'Risk index rose by 12%'
      },
      recommendations: [
        { id: 'rec-5', priority: 'critical', category: 'Nostalgia Therapy', description: 'Share a childhood memory album. Uploading family logs will help Ramesh ji reconnect.', actionLabel: 'Share Family Memory' },
        { id: 'rec-6', priority: 'high', category: 'Social Activity', description: 'Encourage participation in Elder Circle. Walking club meetups reduce isolation metrics.', actionLabel: 'Notify Caregiver' },
        { id: 'rec-7', priority: 'medium', category: 'Spiritual Wellness', description: 'Recommend devotional content. Queue new morning bhajans for evening calm.', actionLabel: 'Recommend Bhajan' }
      ],
      timeline: [
        { id: 'time-6', time: 'Tue 02:00 PM', title: 'Missed Medication Alert', description: 'Calcium tablet dosage flagged as missed on senior dashboard.', category: 'alert' },
        { id: 'time-7', time: 'Wed 01:10 PM', title: 'Low Activity Level', description: 'Ramesh ji remained inactive for 6 hours. Steps logged: 1,200 steps.', category: 'activity' },
        { id: 'time-8', time: 'Fri 08:30 PM', title: 'Chatted with SAATHI AI', description: 'Had an emotional chat about wedding anniversary shehnai music (18 mins).', category: 'mood' },
        { id: 'time-9', time: 'Sat 10:00 AM', title: 'Family Message Dispatched', description: 'Rohan sent message: "Thinking of you Dad, hope you had breakfast."', category: 'family' }
      ]
    },
    'June Week 2': {
      weekName: 'June Week 2 (June 08 - June 14)',
      wellnessScore: 88,
      emotionalHealthScore: 85,
      lonelinessRiskScore: 18,
      socialEngagementScore: 95,
      activityConsistencyScore: 88,
      moodSummary: 'Excellent weekly summary. Highly active social interactions. Ramesh ji was energetic, calm, and peaceful.',
      activitySummary: 'Physical activity was superb, averaging 4,500 daily steps. Joined community walking club twice.',
      familyInteractionSummary: 'Six total family logs, including daily messaging from granddaughter Ananya in Mumbai.',
      riskAssessment: 'Very Low Risk. High social connectedness and optimal physical routines. Maintain schedule.',
      riskSeverity: 'low',
      happinessValues: [80, 85, 75, 80, 90, 85, 80],
      calmnessValues: [85, 90, 80, 85, 90, 80, 85],
      lonelinessValues: [15, 10, 20, 15, 10, 15, 18],
      anxietyValues: [18, 15, 25, 20, 15, 20, 15],
      lonelinessTrend30d: 'Improving',
      lonelinessTrend7d: 'Improving',
      familyCalls: 6,
      communityParticipation: 3,
      memoryInteractions: 4,
      saathiConversations: 6,
      comparison: {
        mood: 'up',
        activity: 'up',
        engagement: 'up',
        loneliness: 'down',
        moodDetail: 'Consistent happiness levels above 80%',
        activityDetail: 'Average 4,500 steps vs 4,000 steps last week',
        engagementDetail: '6 interactions vs 3 last week',
        lonelinessDetail: 'Loneliness score lowest of the month (18%)'
      },
      recommendations: [
        { id: 'rec-8', priority: 'medium', category: 'Social Activity', description: 'Encourage participation in Elder Circle community walking group this Wednesday.', actionLabel: 'Notify Caregiver' },
        { id: 'rec-9', priority: 'medium', category: 'Spiritual Wellness', description: 'Recommend devotional content. Ramesh ji requested Shiv Dhun tracks.', actionLabel: 'Recommend Bhajan' }
      ],
      timeline: [
        { id: 'time-10', time: 'Mon 08:30 AM', title: 'Attended Community Circle', description: 'Joined elder neighborhood walking club at Hazratganj Park.', category: 'family' },
        { id: 'time-11', time: 'Thu 03:00 PM', title: 'Shared Photo Interaction', description: 'Viewed family graduation day photo folder and sent feedback to Ananya.', category: 'family' },
        { id: 'time-12', time: 'Fri 09:30 AM', title: 'Audio Greeting Received', description: 'Received and listened to a morning audio greeting from granddaughter Ananya.', category: 'family' },
        { id: 'time-13', time: 'Sat 06:00 PM', title: 'Family Video Call Completed', description: 'Completed a 30-minute family video call with Rohan, Priya, and Ananya.', category: 'family' }
      ]
    },
    'June Week 1': {
      weekName: 'June Week 1 (June 01 - June 07)',
      wellnessScore: 78,
      emotionalHealthScore: 72,
      lonelinessRiskScore: 30,
      socialEngagementScore: 84,
      activityConsistencyScore: 74,
      moodSummary: 'Stable weekly report. A few minor alerts regarding low steps on Tuesday, but corrected by Thursday.',
      activitySummary: 'Physical activity averaged 3,900 daily steps. Step targets achieved on 4 out of 7 days.',
      familyInteractionSummary: 'Three calls logged. Pushed 2 audio memory files successfully to Nostalgia corner.',
      riskAssessment: 'Low Risk. Stable baseline. Ramesh ji remains comfortable with current daily routines.',
      riskSeverity: 'low',
      happinessValues: [60, 50, 70, 75, 65, 70, 80],
      calmnessValues: [70, 60, 75, 80, 70, 75, 85],
      lonelinessValues: [30, 45, 25, 20, 35, 30, 20],
      anxietyValues: [35, 50, 30, 25, 40, 35, 25],
      lonelinessTrend30d: 'Stable',
      lonelinessTrend7d: 'Improving',
      familyCalls: 3,
      communityParticipation: 1,
      memoryInteractions: 2,
      saathiConversations: 4,
      comparison: {
        mood: 'stable',
        activity: 'stable',
        engagement: 'stable',
        loneliness: 'stable',
        moodDetail: 'Mood baseline remains consistent at 70-75%',
        activityDetail: 'Average 3,900 steps vs 3,850 steps',
        engagementDetail: '3 interactions vs 3 last week',
        lonelinessDetail: 'Average score remains around 30%'
      },
      recommendations: [
        { id: 'rec-10', priority: 'high', category: 'Emotional Connection', description: 'Schedule a family video call. Keep the communication lines active.', actionLabel: 'Schedule Video Call' },
        { id: 'rec-11', priority: 'medium', category: 'Spiritual Wellness', description: 'Recommend devotional content. Kabir Ke Dohe lectures requested.', actionLabel: 'Recommend Bhajan' }
      ],
      timeline: [
        { id: 'time-14', time: 'Tue 03:30 PM', title: 'Low Physical Steps Warning', description: 'Daily step count flagged as low. রমেশ জি recorded 2,100 steps.', category: 'alert' },
        { id: 'time-15', time: 'Thu 08:30 AM', title: 'Walk Milestone Reached', description: 'Completed walk cycle logging 5,200 steps total.', category: 'activity' },
        { id: 'time-16', time: 'Sat 11:30 AM', title: 'Family Phone Call Logged', description: 'Rohan phoned Ramesh ji from Bangalore (15 mins call time).', category: 'family' }
      ]
    }
  };

  // 2. STATE INITIALIZATION
  const [selectedWeek, setSelectedWeek] = useState<string>('June Week 4');
  const [selectedTrendPeriod, setSelectedTrendPeriod] = useState<'7d' | '30d'>('7d');
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active dataset pointer
  const report = reportDatabase[selectedWeek];

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Recommendation dispatcher handler
  const handleExecuteRecommendation = (action: string) => {
    triggerToast(`AI action dispatched: "${action}" successfully triggered.`);
  };

  // SVG Chart points calculations
  const getSvgPoints = (values: number[]) => {
    const points = values.map((val, idx) => {
      const x = 50 + idx * 75;
      const y = 180 - (val * 1.5);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="caregiver-reports-page sahaara-bg-watermark-direct" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.5rem', minHeight: '100vh' }}>
      
      {/* TOAST CONFIRMATION */}
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

      {/* HEADER ROW Cover Banner */}
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
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'left'
        }}
      >
        <div style={{ zIndex: 1 }}>
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
            Caregiver Reports Center
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '0.5rem 0 0.25rem 0', fontFamily: 'var(--font-heading)' }}>
            AI Wellness Reports & Logs
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.9, fontWeight: 500, margin: 0 }}>
            Detailed behavioral analysis summary and emotional risk trackers for <strong>Ramesh Kumar (Lucknow)</strong>.
          </p>
        </div>

        <div style={{ zIndex: 1, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveModal(true)}
            style={{ 
              backgroundColor: 'var(--color-secondary)', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.75rem 1.5rem', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 700, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Download size={16} /> Export Wellness Report
          </button>
          
          <Link 
            to="/caregiver/dashboard" 
            style={{
              textDecoration: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(5px)',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Shield size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* DASHBOARD GRID CONTENT */}
      <div className="grid-container grid-4" style={{ gap: '2rem', alignItems: 'stretch' }}>
        
        {/* LEFT ARCHIVE COL: SELECT WEEKLY LOG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', minHeight: '350px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 1rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
              Weekly Archives
            </h3>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Select a week to load historical behavioral reports.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.keys(reportDatabase).map((weekKey) => {
                const isActive = selectedWeek === weekKey;
                const wk = reportDatabase[weekKey];
                return (
                  <button 
                    key={weekKey}
                    onClick={() => { setSelectedWeek(weekKey); triggerToast(`Loaded report parameters for ${weekKey}`); }}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      borderLeft: isActive ? '5px solid var(--color-primary)' : '1px solid var(--border-color)',
                      backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--bg-secondary)',
                      color: isActive ? 'var(--color-primary-dark)' : 'var(--text-primary)',
                      fontWeight: isActive ? 800 : 600,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <span>{weekKey}</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      backgroundColor: wk.riskSeverity === 'low' ? 'var(--color-success-light)' : 'var(--color-secondary-light)',
                      color: wk.riskSeverity === 'low' ? 'var(--color-success)' : 'var(--color-secondary-dark)',
                      padding: '0.15rem 0.5rem', 
                      borderRadius: '50px',
                      fontWeight: 700 
                    }}>
                      Score: {wk.wellnessScore}%
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT METRICS AREA (SPAN 3) */}
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION 1 — WEEKLY REPORT OVERVIEW CORES */}
          <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'space-between' }}>
            
            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '140px', borderTop: '4px solid var(--color-primary)' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--color-primary)" strokeWidth="6" strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-report.wellnessScore/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{report.wellnessScore}%</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>Wellness Score</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '140px', borderTop: '4px solid var(--color-secondary)' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--color-secondary)" strokeWidth="6" strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-report.emotionalHealthScore/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{report.emotionalHealthScore}%</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>Emotional Health</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '140px', borderTop: '4px solid var(--color-danger)' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--color-danger)" strokeWidth="6" strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-report.lonelinessRiskScore/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{report.lonelinessRiskScore}%</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>Loneliness Risk</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '140px', borderTop: '4px solid var(--color-primary)' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--color-primary)" strokeWidth="6" strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-report.socialEngagementScore/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{report.socialEngagementScore}%</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>Social Engagement</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: '140px', borderTop: '4px solid var(--color-secondary)' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="transparent" stroke="var(--color-secondary)" strokeWidth="6" strokeDasharray={2*Math.PI*30} strokeDashoffset={2*Math.PI*30*(1-report.activityConsistencyScore/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '1.25rem' }}>{report.activityConsistencyScore}%</strong>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', color: 'var(--text-primary)' }}>Activity Consistency</span>
            </div>

          </section>

          {/* SECTION 2 — WEEKLY AI REPORT CARD */}
          <section className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={22} style={{ color: 'var(--color-secondary)' }} className="animate-pulse-soft" />
                  Weekly AI Wellness Insight Report
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>AI behavioral evaluation for {report.weekName}</span>
              </div>
              <span style={{ 
                backgroundColor: report.riskSeverity === 'low' ? 'var(--color-success-light)' : 'var(--color-secondary-light)',
                color: report.riskSeverity === 'low' ? 'var(--color-success)' : 'var(--color-secondary-dark)',
                fontWeight: 700, 
                fontSize: '0.8rem', 
                padding: '0.3rem 0.8rem', 
                borderRadius: '50px',
                textTransform: 'uppercase'
              }}>
                Assessment: {report.riskSeverity} Risk
              </span>
            </div>

            <div className="grid-container grid-2" style={{ gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '8px', color: 'var(--color-primary-dark)' }}>
                  <Activity size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Mood & Emotional Summary</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{report.moodSummary}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--color-secondary-light)', padding: '0.75rem', borderRadius: '8px', color: 'var(--color-secondary-dark)' }}>
                  <Heart size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Physical Activity Consistency</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{report.activitySummary}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: '8px', color: 'var(--color-primary-dark)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Family Interaction Summary</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{report.familyInteractionSummary}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--color-danger-light)', padding: '0.75rem', borderRadius: '8px', color: 'var(--color-danger)' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.25rem' }}>Eldercare Risk Evaluation</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{report.riskAssessment}</p>
                </div>
              </div>
            </div>

          </section>

          {/* SECTION 3 — ANALYTICS ROW: MOOD LINE CHART & EMOTIONAL MILESTONES */}
          <div className="grid-container grid-3" style={{ gap: '2rem' }}>
            
            {/* SVG MOOD CHART (SPAN 2) */}
            <div className="glass-card" style={{ gridColumn: 'span 2', padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
                Weekly Psychometric Mood Trends
              </h4>
              
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', gap: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', width: '40px', paddingBottom: '20px' }}>
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>

                <div style={{ flex: 1, position: 'relative', borderLeft: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)' }}>
                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((gridIndex) => (
                    <div key={gridIndex} style={{ position: 'absolute', left: 0, width: '100%', borderBottom: '1px dashed var(--border-color)', top: `${gridIndex * 40}px` }}></div>
                  ))}

                  <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    {/* Happiness line */}
                    <polyline fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={getSvgPoints(report.happinessValues)} />
                    {/* Calmness line */}
                    <polyline fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={getSvgPoints(report.calmnessValues)} strokeDasharray="5,3" />
                    {/* Loneliness line */}
                    <polyline fill="none" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={getSvgPoints(report.lonelinessValues)} />
                    {/* Anxiety line */}
                    <polyline fill="none" stroke="var(--color-danger)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={getSvgPoints(report.anxietyValues)} strokeDasharray="3,3" />

                    {/* Plot Points for Happiness */}
                    {report.happinessValues.map((val, idx) => (
                      <circle key={idx} cx={50 + idx * 75} cy={180 - (val * 1.5)} r="4" fill="var(--color-primary-dark)" stroke="#ffffff" strokeWidth="1.5" />
                    ))}

                    {/* Day text labels */}
                    {daysLabels.map((day, idx) => (
                      <text key={idx} x={50 + idx * 75} y="195" textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontWeight="bold">{day}</text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Chart Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.8rem', fontWeight: 700, justifyContent: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '12px', height: '3px', backgroundColor: 'var(--color-primary)', display: 'inline-block' }}></span> Happiness (खुश)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '12px', height: '3px', borderBottom: '2px dashed #3b82f6', display: 'inline-block' }}></span> Calmness (शांत)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '12px', height: '3px', backgroundColor: 'var(--color-secondary)', display: 'inline-block' }}></span> Loneliness (अकेलापन)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><span style={{ width: '12px', height: '3px', borderBottom: '2px dashed var(--color-danger)', display: 'inline-block' }}></span> Anxiety (चिंता)</span>
              </div>
            </div>

            {/* EMOTIONAL MILESTONES & FAMILY LOGS (SPAN 1) */}
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between', borderTop: '4px solid var(--color-primary)' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={20} style={{ color: 'var(--color-primary)' }} />
                  Emotional Milestones
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0' }}>
                  Family check-in stats & memory logs uploaded this week.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center' }}>
                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Check-in Consistency</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>{report.familyCalls * 25}%</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Ramesh ji has spoken with son Rohan {report.familyCalls} times this week.
                  </p>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-secondary-light)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Legacy Memory Shared</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-secondary-dark)' }}>{report.memoryInteractions} Photos</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Viewed 1995 Lucknow wedding memory frame for 18 mins.
                  </p>
                </div>

                <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>SAATHI Interaction</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-accent-dark)' }}>{report.saathiConversations} sessions</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Expressive sentiment index evaluated at 82% calm.
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundImage: 'url("https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=100&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Rohan Kumar</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Last contact: 2 hrs ago</span>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 4 — COMPARATIVE SUMMARY BLOCK, SOCIAL COUNTERS, & LONELINESS TREND */}
          <div className="grid-container grid-3" style={{ gap: '2rem' }}>
            
            {/* COMPARISON VIEW */}
            <section className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>This Week vs Last Week</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Comparing current performance ratios against past baseline logs</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block' }}>Mood State</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.comparison.moodDetail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800, color: report.comparison.mood === 'up' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {report.comparison.mood === 'up' ? <ArrowUp size={16} /> : report.comparison.mood === 'down' ? <ArrowDown size={16} /> : <Minus size={16} />}
                    <span style={{ fontSize: '0.9rem' }}>{report.comparison.mood === 'up' ? 'Improved' : report.comparison.mood === 'down' ? 'Declined' : 'Stable'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block' }}>Activity Consistency</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.comparison.activityDetail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800, color: report.comparison.activity === 'up' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {report.comparison.activity === 'up' ? <ArrowUp size={16} /> : report.comparison.activity === 'down' ? <ArrowDown size={16} /> : <Minus size={16} />}
                    <span style={{ fontSize: '0.9rem' }}>{report.comparison.activity === 'up' ? 'Improved' : report.comparison.activity === 'down' ? 'Declined' : 'Stable'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block' }}>Social Engagement</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.comparison.engagementDetail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800, color: report.comparison.engagement === 'up' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {report.comparison.engagement === 'up' ? <ArrowUp size={16} /> : report.comparison.engagement === 'down' ? <ArrowDown size={16} /> : <Minus size={16} />}
                    <span style={{ fontSize: '0.9rem' }}>{report.comparison.engagement === 'up' ? 'Improved' : report.comparison.engagement === 'down' ? 'Declined' : 'Stable'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block' }}>Loneliness Index</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{report.comparison.lonelinessDetail}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800, color: report.comparison.loneliness === 'down' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {report.comparison.loneliness === 'down' ? <ArrowDown size={16} /> : report.comparison.loneliness === 'up' ? <ArrowUp size={16} /> : <Minus size={16} />}
                    <span style={{ fontSize: '0.9rem' }}>{report.comparison.loneliness === 'down' ? 'Decreased' : report.comparison.loneliness === 'up' ? 'Increased' : 'Stable'}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* LONELINESS TREND WIDGET */}
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Loneliness Spikes</h4>
              
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px', padding: '0.2rem' }}>
                <button 
                  onClick={() => setSelectedTrendPeriod('7d')}
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '0.4rem',
                    borderRadius: '4px',
                    backgroundColor: selectedTrendPeriod === '7d' ? '#ffffff' : 'transparent',
                    color: selectedTrendPeriod === '7d' ? 'var(--color-primary-dark)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Last 7 Days
                </button>
                <button 
                  onClick={() => setSelectedTrendPeriod('30d')}
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '0.4rem',
                    borderRadius: '4px',
                    backgroundColor: selectedTrendPeriod === '30d' ? '#ffffff' : 'transparent',
                    color: selectedTrendPeriod === '30d' ? 'var(--color-primary-dark)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Last 30 Days
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Trend Direction</span>
                
                {selectedTrendPeriod === '7d' ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: 800, 
                      color: report.lonelinessTrend7d === 'Improving' ? 'var(--color-success)' : 'var(--color-secondary-dark)',
                      backgroundColor: report.lonelinessTrend7d === 'Improving' ? 'var(--color-success-light)' : 'var(--color-secondary-light)',
                      padding: '0.4rem 1rem', 
                      borderRadius: '50px',
                      display: 'inline-block' 
                    }}>
                      {report.lonelinessTrend7d === 'Improving' ? '🟢 Improving (घट रहा है)' : '🟡 Stable (स्थिर)'}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginInline: 'auto', maxWidth: '200px', lineHeight: 1.35 }}>
                      Loneliness spikes declined in evening slots compared to mid-week records.
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: 800, 
                      color: report.lonelinessTrend30d === 'Improving' ? 'var(--color-success)' : report.lonelinessTrend30d === 'Stable' ? 'var(--color-secondary-dark)' : 'var(--color-danger)',
                      backgroundColor: report.lonelinessTrend30d === 'Improving' ? 'var(--color-success-light)' : report.lonelinessTrend30d === 'Stable' ? 'var(--color-secondary-light)' : 'var(--color-danger-light)',
                      padding: '0.4rem 1rem', 
                      borderRadius: '50px',
                      display: 'inline-block' 
                    }}>
                      {report.lonelinessTrend30d === 'Improving' ? '🟢 Improving' : report.lonelinessTrend30d === 'Stable' ? '🟡 Stable' : '🔴 Needs Attention'}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginInline: 'auto', maxWidth: '200px', lineHeight: 1.35 }}>
                      Monthly parameters show stable response trends with higher engagement metrics.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* SOCIAL ENGAGEMENT DETAIL */}
            <section className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Social Engagement Metrics</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Activity logging distribution of communication logs</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>Family Phone/Video Calls</span>
                    <span>{report.familyCalls} calls</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(report.familyCalls / 6) * 100}%`, height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>Elder Circle Group walks</span>
                    <span>{report.communityParticipation} sessions</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(report.communityParticipation / 4) * 100}%`, height: '100%', backgroundColor: 'var(--color-secondary)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>Nostalgia Corner album loads</span>
                    <span>{report.memoryInteractions} interactions</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(report.memoryInteractions / 5) * 100}%`, height: '100%', backgroundColor: 'var(--color-primary-dark)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span>SAATHI Companion conversations</span>
                    <span>{report.saathiConversations} chats</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${(report.saathiConversations / 6) * 100}%`, height: '100%', backgroundColor: 'var(--color-secondary-dark)' }}></div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* SECTION 5 — CAREGIVER ACTIONS / RECOMMENDATIONS */}
          <section className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={22} style={{ color: 'var(--color-primary-dark)' }} />
                Suggested Caregiver Interventions
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Proactive intervention strategies generated based on psychometric logs</span>
            </div>

            <div className="grid-container grid-2" style={{ gap: '1.25rem' }}>
              {report.recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    borderLeft: `5px solid ${rec.priority === 'critical' ? 'var(--color-danger)' : rec.priority === 'high' ? 'var(--color-secondary-dark)' : 'var(--color-primary)'}`,
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{rec.category}</span>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        color: rec.priority === 'critical' ? 'var(--color-danger)' : rec.priority === 'high' ? 'var(--color-secondary-dark)' : 'var(--color-primary)',
                        backgroundColor: rec.priority === 'critical' ? 'var(--color-danger-light)' : rec.priority === 'high' ? 'var(--color-secondary-light)' : 'var(--color-primary-light)',
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {rec.priority}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{rec.description}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleExecuteRecommendation(rec.actionLabel)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.25rem',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <Sparkles size={14} />
                    {rec.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6 — VISUAL WELLNESS TIMELINE */}
          <section className="glass-card" style={{ padding: '2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Weekly Wellness Timeline Feed</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', borderLeft: '2px solid var(--border-color)', marginLeft: '1rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              {report.timeline.map((event) => (
                <div key={event.id} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-32px',
                    top: '2px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: event.category === 'alert' ? 'var(--color-danger)' : event.category === 'family' ? 'var(--color-primary)' : event.category === 'activity' ? 'var(--color-success)' : 'var(--color-secondary)',
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px var(--border-color)'
                  }}></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>{event.time}</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', display: 'block', marginTop: '0.1rem' }}>{event.title}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.15rem' }}>{event.description}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* PDF REPORT EXPORT PREVIEW MODAL */}
      {activeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '95%', maxWidth: '550px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--color-primary)' }} />
                PDF Report Preview
              </h3>
              <button onClick={() => setActiveModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            {/* Paper Sheet Preview Area */}
            <div style={{ 
              padding: '1.5rem', 
              border: '1px solid var(--border-color)', 
              backgroundColor: '#ffffff', 
              color: '#1F2937',
              borderRadius: '6px', 
              fontSize: '0.85rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              maxHeight: '340px', 
              overflowY: 'auto',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
            }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0D9488', paddingBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <strong style={{ fontSize: '1.1rem', color: '#0D9488' }}>SAHAARA ELDERCARE SYSTEMS</strong>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Cognitive Behavioral & Vitals PDF Analytics Summary</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                <span>Senior: <strong>Ramesh Kumar</strong></span>
                <span>Date Range: <strong>{selectedWeek} 2026</strong></span>
                <span>Primary Caregiver: <strong>Rohan Kumar (Son)</strong></span>
                <span>Risk Status: <strong style={{ color: report.riskSeverity === 'low' ? '#0d9488' : '#d97706' }}>{report.riskSeverity.toUpperCase()} RISK</strong></span>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0D9488', marginBottom: '0.25rem' }}>Weekly Metrics Summary:</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Wellness</span>
                    <strong style={{ fontSize: '1rem' }}>{report.wellnessScore}%</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Emotional</span>
                    <strong style={{ fontSize: '1rem' }}>{report.emotionalHealthScore}%</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Loneliness</span>
                    <strong style={{ fontSize: '1rem' }}>{report.lonelinessRiskScore}%</strong>
                  </div>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0D9488', marginBottom: '0.25rem' }}>AI Behavioral Synthesis:</strong>
                <p style={{ margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                  <strong>Mood:</strong> {report.moodSummary}
                </p>
                <p style={{ margin: 0, lineHeight: 1.35 }}>
                  <strong>Activity:</strong> {report.activitySummary}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: '#0D9488', marginBottom: '0.25rem' }}>Active Care Suggestions:</strong>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {report.recommendations.map((rec, i) => (
                    <li key={i}>{rec.category}: {rec.description}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Generated dynamically by SAHAARA Family Care Hub. Non-clinical decision helper only.
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => { setActiveModal(false); triggerToast('Eldercare PDF downloaded to local machine!'); }}
                style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
              >
                <Download size={14} /> Download PDF Document
              </button>
              <button 
                onClick={() => setActiveModal(false)}
                style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', fontWeight: 700, cursor: 'pointer' }}
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

export default CaregiverReports;
