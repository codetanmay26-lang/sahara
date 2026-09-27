import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft,
  Activity,
  Shield
} from 'lucide-react';

interface ParticipationLog {
  id: string;
  time: string;
  category: 'yoga' | 'bhajan' | 'walk' | 'match' | 'post';
  title: string;
  description: string;
}

const CaregiverCommunity: React.FC = () => {
  // Mock participation records
  const participationLogs: ParticipationLog[] = [
    { id: 'l-1', time: 'Today, 08:30 AM', category: 'yoga', title: 'Attended Morning Yoga Circle', description: 'Participated in breathing exercises at Gomti Central Park with 4 friends.' },
    { id: 'l-2', time: 'Yesterday, 10:45 AM', category: 'post', title: 'Shared Photo to Community Feed', description: 'Posted an update regarding his terrace marigold seed sprouts.' },
    { id: 'l-3', time: 'Yesterday, 09:15 AM', category: 'match', title: 'Sent Greeting to Mr. Jagdish Sharma', description: 'Initiated a connection wave with a recommended peer sharing gardening interests.' },
    { id: 'l-4', time: 'June 14, 05:00 PM', category: 'walk', title: 'Evening Walk Club Session', description: 'Walked 3,400 steps along Gomti Riverfront with the Senior Walking club.' },
    { id: 'l-5', time: 'June 13, 06:00 PM', category: 'bhajan', title: 'Attended Bhajan Mandali Chants', description: 'Participated in weekly devotional harmonies and hosted neighborhood tea discourse.' }
  ];

  // SVG Chart data
  const attendanceMonthly = [
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 5 },
    { label: 'May', value: 7 },
    { label: 'Jun', value: 11 }
  ];

  return (
    <div className="caregiver-community-page sahaara-bg-watermark-direct" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', minHeight: '100vh', padding: '1.5rem' }}>
      
      {/* HEADER ROW Cover Banner */}
      <section 
        className="glass-card animate-slide-up" 
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
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.88) 35%, rgba(0, 0, 0, 0.45) 75%, rgba(0, 0, 0, 0.15) 100%), url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          border: 'none',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ zIndex: 2, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
          <Link to="/caregiver/dashboard" style={{ display: 'inline-flex', alignItems: 'center', color: '#ffe4e6', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} style={{ marginRight: '4px' }} /> Back to Dashboard
          </Link>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
            👥 Ramesh Kumar’s Social & Community Analytics
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
            Elder Circle Community participation tracker & friendship matching insights (Gomti Nagar, Lucknow)
          </p>
        </div>

        <div style={{ zIndex: 2, display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', fontWeight: 700, fontSize: '0.9rem' }}>
          <Shield size={16} style={{ alignSelf: 'center' }} />
          <span>Active Guardian Mode</span>
        </div>
      </section>

      {/* KPI ROW */}
      <div className="grid-container grid-4" style={{ gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Active Group Circles</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>4 Circles</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>Yoga, Walk, Bhajan, Gardening</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-secondary)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>RSVPs Attended</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>11 Meetups</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 600 }}>This month (June 2026)</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-success)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>New Connections</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>3 Friends</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Jagdish Sharma, Nirmala Verma, Shanti Mishra</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Social Engagement</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>88% Score</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600 }}>Top 12% among Lucknow Elders</span>
        </div>
      </div>

      {/* CORE GRID: ANALYTICS & TIMELINE FEED */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* LEFT COLUMN: CHARTS GRID (SPAN 2) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* CHARTS CONTAINER */}
          <div className="grid-container grid-2" style={{ gap: '1.5rem' }}>
            
            {/* SVG Line Chart: Social Engagement trend */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} style={{ color: 'var(--color-primary)' }} />
                Social Score Trend (6 Weeks)
              </h4>
              
              <div style={{ height: '160px', width: '100%', position: 'relative', marginTop: '0.5rem' }}>
                {/* SVG Line */}
                <svg viewBox="0 0 500 150" style={{ width: '100%', height: '100%' }}>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(0,0,0,0.05)" strokeDasharray="3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(0,0,0,0.05)" strokeDasharray="3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(0,0,0,0.05)" strokeDasharray="3" />

                  {/* Gradient Area under line */}
                  <defs>
                    <linearGradient id="score-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M 20 120 L 100 116 L 180 102 L 260 98 L 340 85 L 420 78 C 420 78, 420 150, 420 150 Z"
                    fill="url(#score-grad)"
                  />

                  {/* The actual line plot */}
                  <path
                    d="M 20 120 L 100 116 L 180 102 L 260 98 L 340 85 L 420 78"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Data Point Circles */}
                  {[[20, 120, '70%'], [100, 116, '72%'], [180, 102, '78%'], [260, 98, '80%'], [340, 85, '85%'], [420, 78, '88%']].map((pt, idx) => (
                    <g key={idx}>
                      <circle cx={pt[0]} cy={pt[1]} r="5" fill="var(--color-primary-dark)" stroke="#ffffff" strokeWidth="2" />
                      <text x={pt[0] as number - 10} y={pt[1] as number - 10} fontSize="10" fontWeight="bold" fill="var(--text-primary)">{pt[2]}</text>
                    </g>
                  ))}
                  
                  {/* X Axis Labels */}
                  {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'].map((lbl, idx) => (
                    <text key={idx} x={20 + idx * 80} y="145" fontSize="10" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">{lbl}</text>
                  ))}
                </svg>
              </div>
            </section>

            {/* SVG Bar Chart: Monthly Event Attendance */}
            <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} style={{ color: 'var(--color-secondary-dark)' }} />
                Monthly Event Attendance Counts
              </h4>

              <div style={{ height: '160px', width: '100%', position: 'relative', marginTop: '0.5rem' }}>
                <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }}>
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="300" y2="20" stroke="rgba(0,0,0,0.05)" />
                  <line x1="30" y1="70" x2="300" y2="70" stroke="rgba(0,0,0,0.05)" />
                  <line x1="30" y1="120" x2="300" y2="120" stroke="rgba(0,0,0,0.05)" />

                  {/* Monthly bars */}
                  {attendanceMonthly.map((m, idx) => {
                    const barHeight = (m.value / 12) * 100;
                    const xPos = 55 + idx * 60;
                    const yPos = 120 - barHeight;
                    return (
                      <g key={idx}>
                        {/* Rounded top rect simulation */}
                        <rect 
                          x={xPos} 
                          y={yPos} 
                          width="24" 
                          height={barHeight} 
                          fill="var(--color-secondary)" 
                          rx="4"
                          style={{ transition: 'all 0.5s ease' }} 
                        />
                        <text x={xPos + 12} y={yPos - 6} fontSize="10" fontWeight="bold" fill="var(--text-primary)" textAnchor="middle">{m.value} Ev</text>
                        <text x={xPos + 12} y="138" fontSize="11" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">{m.label}</text>
                      </g>
                    );
                  })}
                  
                  {/* Y Axis line */}
                  <line x1="35" y1="10" x2="35" y2="122" stroke="var(--border-color)" strokeWidth="1.5" />
                  <line x1="35" y1="122" x2="300" y2="122" stroke="var(--border-color)" strokeWidth="1.5" />
                </svg>
              </div>
            </section>

          </div>

          {/* COMMUNITY ENGAGEMENT INSIGHTS BLOCK */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} style={{ color: 'var(--color-primary)' }} />
              Social Wellness & Isolation Risk Assessment
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{ backgroundColor: 'var(--color-success-light)', border: '1px solid var(--color-success)', padding: '1.25rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--color-success)', fontSize: '1rem', display: 'block', marginBottom: '0.25rem' }}>
                  😊 Emotional Boost Positive
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                  Ramesh’s participation in the morning yoga group correlates with stable morning blood pressure logs. Social interactions are successfully acting as a cardiovascular cushion.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-primary)', padding: '1.25rem', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--color-primary-dark)', fontSize: '1rem', display: 'block', marginBottom: '0.25rem' }}>
                  🤝 Matchmaking Success Rate
                </strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                  Sent greeting wave to gardening companion **Mr. Jagdish Sharma** yesterday. High compatibility indicates low-barrier transition into offline mango cultivation workshops next week.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Activity size={18} style={{ color: 'var(--color-primary)' }} />
              <span>
                Caregiver recommendation: **Ensure event attendance on Thursday** (Online Bhajan chants) to mitigate midweek isolation risks.
              </span>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: CHRONOLOGICAL ACTIVITY LOG (SPAN 1) */}
        <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              🕒 Community Activity Feed
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Real-time audit log of Ramesh's community interactions
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', borderLeft: '2px solid var(--border-color)', marginLeft: '0.5rem', paddingLeft: '1.25rem', textAlign: 'left' }}>
            {participationLogs.map((log) => {
              // Icon selector
              const categoryColor = log.category === 'yoga' ? 'var(--color-primary)' : log.category === 'bhajan' ? 'var(--color-secondary)' : log.category === 'walk' ? 'var(--color-accent-dark)' : log.category === 'match' ? 'var(--color-success)' : 'var(--color-primary-dark)';
              
              return (
                <div key={log.id} style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-27px', 
                    top: '2px', 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    backgroundColor: categoryColor,
                    border: '3px solid #ffffff',
                    boxShadow: '0 0 0 1px var(--border-color)'
                  }}></div>
                  
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>{log.time}</span>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-primary)', marginTop: '0.1rem' }}>{log.title}</strong>
                  <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{log.description}</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>

    </div>
  );
};

export default CaregiverCommunity;
