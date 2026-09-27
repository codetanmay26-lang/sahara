import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft,
  Heart,
  Plus,
  Send,
  Trash2
} from 'lucide-react';

interface RecommendationItem {
  id: string;
  type: 'bhajan' | 'story' | 'festival';
  title: string;
  notes: string;
  timestamp: string;
}

const CaregiverCultural: React.FC = () => {
  // Recommendations state
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([
    { id: 'rec-1', type: 'bhajan', title: 'Shri Ram Chandra Kripalu', notes: 'Dad, this bhajan will help you relax in the afternoons. Played by Lata ji.', timestamp: 'Today, 2:15 PM' },
    { id: 'rec-2', type: 'story', title: 'Swami Vivekananda Lecture on Concentration', notes: 'Useful heritage audio for Ramesh ji to hear before meditation.', timestamp: 'Yesterday' }
  ]);

  const [recType, setRecType] = useState<'bhajan' | 'story' | 'festival'>('bhajan');
  const [recTitle, setRecTitle] = useState('');
  const [recNotes, setRecNotes] = useState('');

  const handleAddRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recTitle.trim()) return;

    const newItem: RecommendationItem = {
      id: `rec-${Date.now()}`,
      type: recType,
      title: recTitle,
      notes: recNotes,
      timestamp: 'Just now'
    };

    setRecommendations([newItem, ...recommendations]);
    setRecTitle('');
    setRecNotes('');
  };

  const handleDeleteRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== id));
  };

  // SVG Chart data
  const meditationMinutes = [
    { day: 'Mon', mins: 15 },
    { day: 'Tue', mins: 20 },
    { day: 'Wed', mins: 10 },
    { day: 'Thu', mins: 25 },
    { day: 'Fri', mins: 15 },
    { day: 'Sat', mins: 30 },
    { day: 'Sun', mins: 20 }
  ];

  return (
    <div className="caregiver-cultural-page sahaara-bg-watermark-direct" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', minHeight: '100vh', padding: '1.5rem' }}>
      
      {/* HEADER Cover Banner */}
      <section 
        className="glass-card animate-slide-up" 
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          minHeight: '160px',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          padding: '1.5rem 2rem', 
          borderRadius: 'var(--radius-lg)',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 75%, rgba(0, 0, 0, 0.15) 100%), url("https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80")',
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
            🕉️ Ramesh Kumar’s Cultural & Devotion Preferences
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
            Recommend spiritual bhajans, configure festival calendars, and monitor mental wellness engagement
          </p>
        </div>
      </section>

      {/* STATS OVERVIEW */}
      <div className="grid-container grid-4" style={{ gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-secondary)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Weekly Prayer Time</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>135 Mins</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 600 }}>Bhajans and Aartis streamed</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Prayer Streak</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>5 Days</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>Consecutive morning prayers</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-success)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Stories Read</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>4 Chapters</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Ramayan and Heritage lessons</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Average Calmness</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>85% Index</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600 }}>+12% Calmness spike during prayers</span>
        </div>
      </div>

      {/* ANALYTICS & RECOMMENDATION FORMS SPLIT */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* RECOMMENDATION FORM AND RECENT LIST (SPAN 2) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* FORM */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} style={{ color: 'var(--color-primary-dark)' }} />
              Recommend Devotional Assets
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '-0.75rem' }}>
              Suggest bhajans or stories. They will instantly appear on Ramesh’s devotion feed.
            </span>

            <form onSubmit={handleAddRecommendation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Asset Type</label>
                  <select
                    value={recType}
                    onChange={(e) => setRecType(e.target.value as any)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    <option value="bhajan">🎶 Bhajan Chant</option>
                    <option value="story">📖 Spiritual Story</option>
                    <option value="festival">📅 Festival Event</option>
                  </select>
                </div>

                <div style={{ flex: 2, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Recommendation Title</label>
                  <input 
                    type="text" 
                    value={recTitle}
                    onChange={(e) => setRecTitle(e.target.value)}
                    placeholder="e.g. Achyutam Keshavam or Ramayan Bridge Story"
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Message Notes / Context</label>
                <textarea 
                  value={recNotes}
                  onChange={(e) => setRecNotes(e.target.value)}
                  placeholder="e.g. Dad, listen to this relaxing bhajan in the morning."
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '60px', resize: 'vertical', outline: 'none', fontSize: '0.85rem' }}
                />
              </div>

              <button
                type="submit"
                style={{ alignSelf: 'flex-start', padding: '0.65rem 1.5rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}
              >
                <Send size={14} /> Send Recommendation
              </button>
            </form>
          </section>

          {/* ACTIVE QUEUE LIST */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} style={{ color: 'var(--color-accent-dark)' }} />
              Active Recommendations Sent
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  style={{
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', backgroundColor: rec.type === 'bhajan' ? 'var(--color-secondary-light)' : 'var(--color-primary-light)', color: rec.type === 'bhajan' ? 'var(--color-secondary-dark)' : 'var(--color-primary-dark)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {rec.type}
                      </span>
                      <strong style={{ fontSize: '1.05rem' }}>{rec.title}</strong>
                    </div>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      "{rec.notes}"
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sent: {rec.timestamp}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteRecommendation(rec.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.5rem' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: ANALYTICS GRAPHS (SPAN 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* DAILY MEDITATION MINS (SVG BARS) */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
              Daily Meditation Minutes
            </h4>

            <div style={{ height: '180px', width: '100%', position: 'relative', marginTop: '0.5rem' }}>
              <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }}>
                {/* Grid Lines */}
                <line x1="30" y1="20" x2="300" y2="20" stroke="rgba(0,0,0,0.05)" />
                <line x1="30" y1="70" x2="300" y2="70" stroke="rgba(0,0,0,0.05)" />
                <line x1="30" y1="120" x2="300" y2="120" stroke="rgba(0,0,0,0.05)" />

                {/* Bars */}
                {meditationMinutes.map((m, idx) => {
                  const barHeight = (m.mins / 35) * 100;
                  const xPos = 40 + idx * 36;
                  const yPos = 120 - barHeight;
                  return (
                    <g key={idx}>
                      <rect 
                        x={xPos} 
                        y={yPos} 
                        width="18" 
                        height={barHeight} 
                        fill="var(--color-primary)" 
                        rx="3" 
                      />
                      <text x={xPos + 9} y={yPos - 4} fontSize="9" fontWeight="bold" fill="var(--text-primary)" textAnchor="middle">{m.mins}</text>
                      <text x={xPos + 9} y="136" fontSize="10" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">{m.day}</text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1="32" y1="10" x2="32" y2="122" stroke="var(--border-color)" strokeWidth="1.5" />
                <line x1="32" y1="122" x2="300" y2="122" stroke="var(--border-color)" strokeWidth="1.5" />
              </svg>
            </div>
          </section>

          {/* CALMNESS INDEX HISTORY (SVG LINE) */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} style={{ color: 'var(--color-secondary-dark)' }} />
              Weekly Calmness Score Trend
            </h4>

            <div style={{ height: '180px', width: '100%', position: 'relative', marginTop: '0.5rem' }}>
              <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }}>
                {/* Grid lines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(0,0,0,0.05)" strokeDasharray="2" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(0,0,0,0.05)" strokeDasharray="2" />
                <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(0,0,0,0.05)" strokeDasharray="2" />

                {/* Score Line */}
                <path
                  d="M 20 115 L 70 110 L 120 95 L 170 90 L 220 82 L 270 75"
                  fill="none"
                  stroke="var(--color-secondary)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Circles */}
                {[[20, 115, '72%'], [70, 110, '74%'], [120, 95, '78%'], [170, 90, '80%'], [220, 82, '83%'], [270, 75, '85%']].map((pt, idx) => (
                  <g key={idx}>
                    <circle cx={pt[0]} cy={pt[1]} r="4.5" fill="var(--color-secondary-dark)" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={pt[0] as number - 8} y={pt[1] as number - 8} fontSize="9" fontWeight="bold" fill="var(--text-primary)">{pt[2]}</text>
                  </g>
                ))}

                {/* X labels */}
                {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'].map((lbl, idx) => (
                  <text key={idx} x={20 + idx * 50} y="142" fontSize="9" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">{lbl}</text>
                ))}
              </svg>
            </div>
          </section>

          {/* ENGAGEMENT INSIGHTS CARD */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--color-primary-light)', borderLeft: '4px solid var(--color-primary)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Sparkles size={16} /> Engagement Insight
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              Ramesh ji’s prayer streak is at **5 days**. He consistently plays the *Hanuman Chalisa* at 7:30 AM. Recommend adding *Shri Ram Chandra Kripalu* to diversify his routine.
            </p>
          </section>

        </div>

      </div>

    </div>
  );
};

export default CaregiverCultural;
