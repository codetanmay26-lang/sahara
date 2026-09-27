import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Play, 
  Pause, 
  Calendar, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Volume2, 
  TrendingUp,
  X,
  Heart
} from 'lucide-react';
import type { LegacyMemory, TimelineEvent, LegacyContribution } from '../types';

export const CaregiverLegacy: React.FC = () => {
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State matching localStorage
  const [memories, setMemories] = useState<LegacyMemory[]>(() => {
    const saved = localStorage.getItem('legacy-memories');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'mem-1',
        title: 'Wedding Day in Varanasi',
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        dateAdded: '1981-11-20',
        description: 'With Sushila on our wedding day. A beautiful cold winter evening in Benaras.',
        isPinned: true,
        category: 'celebrations',
        contributor: 'senior'
      },
      {
        id: 'mem-3',
        title: 'Good Morning Dadu greeting',
        type: 'voice',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        dateAdded: '2026-06-12',
        description: 'A morning voicemail message sent by Rohan from Bangalore checking in.',
        isPinned: true,
        category: 'family',
        contributor: 'family'
      }
    ];
  });

  const [milestones, setMilestones] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('legacy-milestones');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'mile-1', year: '1954', title: 'Born in Allahabad', description: 'Born on a quiet autumn morning to Shri Ramshankar ji.' },
      { id: 'mile-2', year: '1978', title: 'Joined BSNL', description: 'Appointed as Junior Engineer in Uttar Pradesh circle.' }
    ];
  });

  // Sync back to local storage so senior page reflects updates immediately
  useEffect(() => {
    localStorage.setItem('legacy-memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('legacy-milestones', JSON.stringify(milestones));
  }, [milestones]);

  // Family Contributions Log
  const [contributions, setContributions] = useState<LegacyContribution[]>([
    { id: 'cnt-1', contributor: 'Rohan (Son)', relation: 'Son', type: 'photo', title: 'Anniversary Dinner 2025', timestamp: 'Today, 10:15 AM' },
    { id: 'cnt-2', contributor: 'Priya (Daughter)', relation: 'Daughter', type: 'voice', title: 'Good Morning Dadu voice greeting', timestamp: 'Yesterday' },
    { id: 'cnt-3', contributor: 'Rohan (Son)', relation: 'Son', type: 'milestone', title: 'Added: 2018 Granddaughter Graduated', timestamp: '3 days ago' }
  ]);

  // Uploader triggers
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const voiceInputRef = useRef<HTMLInputElement>(null);

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'family' | 'celebrations' | 'travel' | 'spiritual'>('family');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video' | 'voice') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMemory: LegacyMemory = {
        id: `mem-${Date.now()}`,
        title: uploadTitle.trim() || file.name.split('.')[0] || `Uploaded ${type}`,
        type,
        url: reader.result as string, // base64 preview
        dateAdded: new Date().toISOString().split('T')[0],
        description: uploadDesc.trim() || `Contributed by family: ${file.name}`,
        isPinned: false,
        category: uploadCategory,
        contributor: 'family'
      };

      setMemories(prev => [newMemory, ...prev]);

      // Add to contributions audit list
      const newContrib: LegacyContribution = {
        id: `cnt-${Date.now()}`,
        contributor: 'Rohan (Son)',
        relation: 'Son',
        type,
        title: newMemory.title,
        timestamp: 'Just now'
      };
      setContributions(prev => [newContrib, ...prev]);

      setUploadTitle('');
      setUploadDesc('');
      triggerToast(`Successfully uploaded family ${type}!`);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    triggerToast('Memory deleted from shared archive.');
  };

  // Milestone Form States
  const [showMileForm, setShowMileForm] = useState(false);
  const [mileYear, setMileYear] = useState('');
  const [mileTitle, setMileTitle] = useState('');
  const [mileDesc, setMileDesc] = useState('');
  const [editingMileId, setEditingMileId] = useState<string | null>(null);

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mileYear.trim() || !mileTitle.trim()) return;

    if (editingMileId) {
      setMilestones(prev => prev.map(m => m.id === editingMileId ? {
        ...m,
        year: mileYear,
        title: mileTitle,
        description: mileDesc
      } : m));
      triggerToast('Milestone updated.');
    } else {
      const newMile: TimelineEvent = {
        id: `mile-${Date.now()}`,
        year: mileYear,
        title: mileTitle,
        description: mileDesc
      };
      setMilestones(prev => [...prev, newMile].sort((a, b) => parseInt(a.year) - parseInt(b.year)));

      // Add to contributions
      const newContrib: LegacyContribution = {
        id: `cnt-${Date.now()}`,
        contributor: 'Rohan (Son)',
        relation: 'Son',
        type: 'milestone',
        title: `Added milestone: ${mileYear}`,
        timestamp: 'Just now'
      };
      setContributions(prev => [newContrib, ...prev]);
      triggerToast('Added milestone to Ramesh’s life timeline.');
    }

    setMileYear('');
    setMileTitle('');
    setMileDesc('');
    setEditingMileId(null);
    setShowMileForm(false);
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
    triggerToast('Milestone deleted.');
  };

  const handleEditMilestone = (m: TimelineEvent) => {
    setEditingMileId(m.id);
    setMileYear(m.year);
    setMileTitle(m.title);
    setMileDesc(m.description);
    setShowMileForm(true);
  };

  // Voice playback controller
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = (m: LegacyMemory) => {
    if (playingAudioId === m.id) {
      if (isAudioPlaying) {
        audioElRef.current?.pause();
        setIsAudioPlaying(false);
      } else {
        audioElRef.current?.play().catch(err => console.warn(err));
        setIsAudioPlaying(true);
      }
    } else {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
      setPlayingAudioId(m.id);
      setIsAudioPlaying(true);
      setTimeout(() => {
        if (audioElRef.current) {
          audioElRef.current.src = m.url;
          audioElRef.current.play().catch(err => {
            console.warn(err);
            setIsAudioPlaying(false);
          });
        }
      }, 50);
    }
  };

  return (
    <div className="caregiver-legacy-page sahaara-bg-watermark-direct" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left', minHeight: '100vh', padding: '1.5rem' }}>
      
      {/* HTML Audio element */}
      <audio 
        ref={audioElRef} 
        onEnded={() => setIsAudioPlaying(false)} 
        style={{ display: 'none' }}
      />

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
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 75%, rgba(0, 0, 0, 0.15) 100%), url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80")',
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
            👵 Ramesh Kumar’s Shared Legacy Vault
          </h2>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
            Contribute family photographs, voice greetings, and verify the preserved milestones of Ramesh Kumar
          </p>
        </div>
      </section>

      {/* OVERVIEW STATS */}
      <div className="grid-container grid-4" style={{ gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Shared Media Files</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>{memories.length} Items</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-dark)', fontWeight: 600 }}>Photos, videos, voice messages</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-primary)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Preserved Milestones</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>{milestones.length} Events</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-dark)', fontWeight: 600 }}>Life timeline records verified</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-success)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Vault Safety Status</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>100% Secure</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Encrypted locally in browser</span>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-secondary-dark)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Family Contributors</span>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.25rem 0' }}>3 Active</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 600 }}>Rohan, Priya & Ananya</span>
        </div>
      </div>

      {/* CORE COLUMNS: UPLOADER & SHARED WALL */}
      <div className="grid-container grid-3" style={{ gap: '2rem' }}>
        
        {/* LEFT TWO COLUMNS: UPLOADER FORM & SHARED MEMORY WALL (SPAN 2) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* UPLOADER */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={20} style={{ color: 'var(--color-accent)' }} />
              Upload to Father's Legacy Vault
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginTop: '-0.75rem' }}>
              Any photograph, greeting message, or video you upload here will immediately sync to Ramesh ji's Senior Portal.
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Title</label>
                  <input 
                    type="text" 
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Wedding anniversary dinner 1981"
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option value="family">Family Roots</option>
                    <option value="celebrations">Celebrations</option>
                    <option value="travel">Travel</option>
                    <option value="spiritual">Spiritual</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Description</label>
                <textarea 
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="e.g. Dad, this is a scanned photo of our Varanasi family gathering."
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '60px', resize: 'vertical', outline: 'none', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button
                  onClick={() => photoInputRef.current?.click()}
                  style={{ padding: '0.55rem 1.25rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                >
                  <ImageIcon size={14} /> Upload Photo
                </button>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  style={{ padding: '0.55rem 1.25rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-secondary-dark)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                >
                  <Video size={14} /> Upload Video
                </button>
                <button
                  onClick={() => voiceInputRef.current?.click()}
                  style={{ padding: '0.55rem 1.25rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-accent)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}
                >
                  <Volume2 size={14} /> Upload Greeting
                </button>
              </div>

              {/* Native input references */}
              <input type="file" ref={photoInputRef} accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'photo')} />
              <input type="file" ref={videoInputRef} accept="video/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'video')} />
              <input type="file" ref={voiceInputRef} accept="audio/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'voice')} />
            </div>
          </section>

          {/* SHARED MEMORY WALL */}
          <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
              📸 Shared Legacy Memory Wall
            </h3>

            <div className="grid-container grid-2" style={{ gap: '1.25rem' }}>
              {memories.map((m) => {
                const isWeddingMemory = m.id === 'mem-1';
                return (
                  <div 
                    key={m.id}
                    style={{
                      border: isWeddingMemory ? '6px double #d4af37' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isWeddingMemory ? '0 10px 25px rgba(212, 175, 55, 0.25)' : 'var(--shadow-sm)'
                    }}
                  >
                  {/* Media Wrapper */}
                  <div style={{ backgroundColor: '#000', width: '100%', height: '140px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {m.type === 'photo' && (
                      <img src={m.url} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    {m.type === 'video' && (
                      <video src={m.url} controls style={{ width: '100%', height: '100%' }} />
                    )}
                    {m.type === 'voice' && (
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                        <Volume2 size={36} className={playingAudioId === m.id && isAudioPlaying ? 'animate-pulse-soft' : ''} style={{ color: 'var(--color-accent)' }} />
                        <button
                          onClick={() => handlePlayAudio(m)}
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: 'var(--color-accent)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {playingAudioId === m.id && isAudioPlaying ? <Pause size={10} /> : <Play size={10} />} Play greeting
                        </button>
                      </div>
                    )}

                    <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.85)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-accent-dark)' }}>
                      {m.contributor === 'family' ? 'Family Add' : 'Ramesh (Self)'}
                    </div>
                  </div>

                  {/* Body description */}
                  <div style={{ padding: '0.85rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{m.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.category}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {m.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Added: {m.dateAdded}</span>
                      <button 
                        onClick={() => handleDeleteMemory(m.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: FAMILY MILESTONES & ANALYTICS (SPAN 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* MILESTONES CRUD PANEL */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
                Verify Timeline Milestones
              </h3>
              <button 
                onClick={() => { setEditingMileId(null); setShowMileForm(true); }}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-dark)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                + New
              </button>
            </div>

            {/* Timeline Events list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {milestones.map((m) => (
                <div 
                  key={m.id}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-secondary)',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>{m.year} — {m.title}</strong>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button onClick={() => handleEditMilestone(m)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem' }}>Edit</button>
                      <button onClick={() => handleDeleteMilestone(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', fontSize: '0.75rem' }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CONTRIBUTION ANALYTICS */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} style={{ color: 'var(--color-secondary-dark)' }} />
              Preservation Activity Levels
            </h4>

            {/* SVG Visualizations of contributions */}
            <div style={{ height: '160px', width: '100%', position: 'relative', marginTop: '0.5rem' }}>
              <svg viewBox="0 0 300 140" style={{ width: '100%', height: '100%' }}>
                {/* Grid guidelines */}
                <line x1="30" y1="20" x2="280" y2="20" stroke="rgba(0,0,0,0.05)" />
                <line x1="30" y1="65" x2="280" y2="65" stroke="rgba(0,0,0,0.05)" />
                <line x1="30" y1="110" x2="280" y2="110" stroke="rgba(0,0,0,0.05)" />

                {/* Bars - Weeks */}
                {[
                  { label: 'Photos', val: 8, color: 'var(--color-accent)' },
                  { label: 'Voices', val: 5, color: 'var(--color-secondary)' },
                  { label: 'Stories', val: 6, color: 'var(--color-primary)' },
                  { label: 'Milestones', val: 4, color: 'var(--color-success)' }
                ].map((item, idx) => {
                  const barHeight = (item.val / 10) * 90;
                  const x = 50 + idx * 60;
                  const y = 110 - barHeight;
                  return (
                    <g key={idx}>
                      <rect x={x} y={y} width="22" height={barHeight} fill={item.color} rx="3" />
                      <text x={x + 11} y={y - 4} fontSize="8" fontWeight="bold" fill="var(--text-primary)" textAnchor="middle">{item.val}</text>
                      <text x={x + 11} y="123" fontSize="8.5" fontWeight="700" fill="var(--text-muted)" textAnchor="middle">{item.label}</text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1="30" y1="10" x2="30" y2="111" stroke="var(--border-color)" strokeWidth="1" />
                <line x1="30" y1="111" x2="280" y2="111" stroke="var(--border-color)" strokeWidth="1" />
              </svg>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              &bull; **23 total items** preserved in Father's vault.
              <br />
              &bull; High activity: **Varanasi Celebrations** album.
            </div>
          </section>

          {/* AUDIT LOG */}
          <section className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--color-accent-light)', borderLeft: '4px solid var(--color-accent)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--color-accent-dark)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Heart size={16} fill="var(--color-accent-dark)" /> Family Activity Log
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {contributions.map((c) => (
                <div key={c.id} style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  <strong>{c.contributor}</strong> added {c.type === 'photo' ? '📸' : c.type === 'voice' ? '🎙️' : '📅'} **{c.title}** ({c.timestamp})
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* MILESTONE FORM MODAL */}
      {showMileForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <form onSubmit={handleSaveMilestone} className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '450px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>
                {editingMileId ? 'Edit Family Milestone' : 'Add Family Milestone'}
              </h3>
              <button type="button" onClick={() => setShowMileForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Year</label>
                <input 
                  type="number" 
                  value={mileYear}
                  onChange={(e) => setMileYear(e.target.value)}
                  placeholder="e.g. 2018"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Milestone Title</label>
                <input 
                  type="text" 
                  value={mileTitle}
                  onChange={(e) => setMileTitle(e.target.value)}
                  placeholder="e.g. Granddaughter Graduated"
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Context Details</label>
              <textarea 
                value={mileDesc}
                onChange={(e) => setMileDesc(e.target.value)}
                placeholder="Details about the graduation ceremony at Delhi University..."
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', minHeight: '80px', resize: 'vertical', fontSize: '0.9rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}
            >
              Save Milestone
            </button>
          </form>
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

export default CaregiverLegacy;
