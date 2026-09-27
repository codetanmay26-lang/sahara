import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Sparkles, 
  Upload, 
  X, 
  Search, 
  FileText,
  Shield
} from 'lucide-react';

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

export const CaregiverMemories: React.FC = () => {
  // 1. STATE & MOCK DATA INITIALIZATION
  const [memories, setMemories] = useState<FamilyMemory[]>([
    {
      id: 'mem-1',
      title: 'Anniversary 1981',
      date: 'December 18, 1981',
      category: 'marriage',
      description: 'Ramesh and Sushila Wedding anniversary in Lucknow. Traditional shehnai music and grand family feast.',
      imageUrl: '',
      uploader: 'Rohan (Son)',
      story: 'It was a cold Lucknow night, but the house was warm with the echoes of shehnai. Sushila looked radiant in her crimson silk saree, and all neighbors from Gomti Nagar joined the street celebration.',
      tags: ['Sushila', 'Wedding', 'Lucknow']
    },
    {
      id: 'mem-2',
      title: 'Shimla Family Trip 1995',
      date: 'June 1995',
      category: 'travel',
      description: 'Summer holidays walking along Shimla Mall Road with Rohan and Priya.',
      imageUrl: '',
      uploader: 'Rohan (Son)',
      story: 'We escaped the Lucknow summer heat to visit Shimla. Rohan was only a teenager, running around taking photos with a Kodak film camera. We ate soft-serve ice cream in the breezy evenings at the Ridge.',
      tags: ['Shimla', 'Rohan', 'Summer']
    },
    {
      id: 'mem-3',
      title: 'Graduation Day 2018',
      date: 'May 12, 2018',
      category: 'achievements',
      description: 'Granddaughter Ananya holding her engineering degree with Dadu in Mumbai.',
      imageUrl: '',
      uploader: 'Ananya (Granddaughter)',
      story: 'A proud grandfather moment. Ananya was the top scorer in her computer engineering batch. Ramesh ji traveled all the way to Mumbai by train, carrying Lucknow pedas for all her hostel friends.',
      tags: ['Ananya', 'Graduation', 'Mumbai']
    },
    {
      id: 'mem-4',
      title: 'Lucknow Holi Festival 2005',
      date: 'March 2005',
      category: 'festivals',
      description: 'Gomti Nagar colony colors assembly and gujiya exchange with neighbors.',
      imageUrl: '',
      uploader: 'Priya (Daughter-in-law)',
      story: 'Traditional organic colours and buckets of cold water. Ramesh ji lead the bhajan mandali song, followed by distribution of homemade mathri and saffron gujiya made by Sushila.',
      tags: ['Holi', 'Colors', 'Gujiya']
    }
  ]);

  // Form states for adding memory
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'marriage' | 'festivals' | 'travel' | 'achievements' | 'family' | 'childhood'>('family');
  const [newUploader, setNewUploader] = useState('Rohan (Son)');
  const [newDesc, setNewDesc] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newTagsString, setNewTagsString] = useState('');

  // Editing memory states
  const [editingMemory, setEditingMemory] = useState<FamilyMemory | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState<'marriage' | 'festivals' | 'travel' | 'achievements' | 'family' | 'childhood'>('family');
  const [editUploader, setEditUploader] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStory, setEditStory] = useState('');
  const [editTagsString, setEditTagsString] = useState('');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Memory Handler
  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const tagsArray = newTagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    const newMemory: FamilyMemory = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      date: newDate || 'Unknown Date',
      category: newCategory,
      description: newDesc,
      imageUrl: '',
      uploader: newUploader,
      story: newStory || newDesc,
      tags: tagsArray.length > 0 ? tagsArray : ['Family']
    };

    setMemories([newMemory, ...memories]);
    setNewTitle('');
    setNewDate('');
    setNewCategory('family');
    setNewUploader('Rohan (Son)');
    setNewDesc('');
    setNewStory('');
    setNewTagsString('');

    triggerToast('New family memory pushed to Ramesh ji’s portal!');
  };

  // Edit Memory handlers
  const openEditModal = (m: FamilyMemory) => {
    setEditingMemory(m);
    setEditTitle(m.title);
    setEditDate(m.date);
    setEditCategory(m.category);
    setEditUploader(m.uploader);
    setEditDesc(m.description);
    setEditStory(m.story);
    setEditTagsString(m.tags.join(', '));
  };

  const handleUpdateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory) return;

    const tagsArray = editTagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    setMemories(prev => prev.map(m => {
      if (m.id === editingMemory.id) {
        return {
          ...m,
          title: editTitle,
          date: editDate,
          category: editCategory,
          uploader: editUploader,
          description: editDesc,
          story: editStory,
          tags: tagsArray
        };
      }
      return m;
    }));

    setEditingMemory(null);
    triggerToast('Memory details updated successfully!');
  };

  // Delete Memory Handler
  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    triggerToast('Memory asset removed from database.');
  };

  const filteredMemories = memories.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.uploader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
      
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

      {/* HEADER SECTION */}
      <section className="glass-card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--color-primary)' }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Nostalgia Vault Control Manager</h2>
            <span style={{ 
              backgroundColor: 'var(--color-primary-light)', 
              color: 'var(--color-primary-dark)', 
              fontWeight: 700, 
              fontSize: '0.8rem', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '50px'
            }}>
              Caregiver View
            </span>
          </div>
          <p style={{ margin: '0.4rem 0 0 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}>
            Collaborative storytelling portal. Upload and organize memories for <strong>Ramesh Kumar (Lucknow)</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/caregiver/dashboard" 
            style={{
              textDecoration: 'none',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Shield size={16} /> Back to Dashboard
          </Link>
        </div>
      </section>

      {/* GRID CONTENT */}
      <div className="grid-container grid-3" style={{ gap: '2rem', alignItems: 'stretch' }}>
        
        {/* LEFT FORM: ADD MEMORY (SPAN 1) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1rem 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <PlusCircle size={18} style={{ color: 'var(--color-primary)' }} />
              Push New Memory
            </h3>

            <form onSubmit={handleAddMemory} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Memory Title:</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g. Chowk House Mango Feast" 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Date/Year:</label>
                  <input 
                    type="text" 
                    value={newDate} 
                    onChange={(e) => setNewDate(e.target.value)} 
                    placeholder="e.g. June 1989" 
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Category:</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value as any)} 
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option value="marriage">Marriage</option>
                    <option value="festivals">Festivals</option>
                    <option value="travel">Travel</option>
                    <option value="achievements">Achievements</option>
                    <option value="family">Family</option>
                    <option value="childhood">Childhood</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Family Author:</label>
                  <select 
                    value={newUploader} 
                    onChange={(e) => setNewUploader(e.target.value)} 
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option value="Rohan (Son)">Rohan (Son)</option>
                    <option value="Priya (Daughter-in-law)">Priya (D-in-law)</option>
                    <option value="Ananya (Granddaughter)">Ananya (Granddaughter)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Short Description (1 sentence):</label>
                <input 
                  type="text" 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  placeholder="e.g. Ramesh ji sitting under mango tree eating dessert." 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Detailed Narrative (Reminiscence prompt):</label>
                <textarea 
                  value={newStory} 
                  onChange={(e) => setNewStory(e.target.value)} 
                  placeholder="Provide context triggers... 'Dad, remember how the tree branch bent under the weight of Dussehri mangoes...'" 
                  rows={4}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Comma Separated Tags:</label>
                <input 
                  type="text" 
                  value={newTagsString} 
                  onChange={(e) => setNewTagsString(e.target.value)} 
                  placeholder="Lucknow, Mangoes, Summers" 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  marginTop: '0.5rem'
                }}
              >
                <Upload size={14} /> Send to Ramesh’s Portal
              </button>
            </form>
          </section>
        </div>

        {/* RIGHT VAULT WORKSPACE: MEMORIES LIST & SEARCH (SPAN 2) */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SEARCH & CATEGORY BAR */}
          <section className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories narrative, title, uploader..."
                style={{ padding: '0.4rem 0.5rem 0.4rem 2.2rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.9rem', width: '100%', outline: 'none' }}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', fontWeight: 600, fontSize: '0.9rem' }}
            >
              <option value="all">All Categories</option>
              <option value="marriage">Marriage</option>
              <option value="festivals">Festivals</option>
              <option value="travel">Travel</option>
              <option value="achievements">Achievements</option>
              <option value="family">Family</option>
              <option value="childhood">Childhood</option>
            </select>
          </section>

          {/* ACTIVE MEMORIES GRID LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredMemories.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <ImageIcon size={44} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
                <strong>No memories found matching the filters.</strong>
              </div>
            ) : (
              filteredMemories.map((m) => (
                <div 
                  key={m.id}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderLeft: '5px solid var(--color-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        backgroundColor: 'var(--color-primary-light)', 
                        color: 'var(--color-primary-dark)', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {m.category}
                      </span>
                      <strong style={{ fontSize: '1.15rem' }}>{m.title}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => openEditModal(m)}
                        style={{ padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700 }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteMemory(m.id)}
                        style={{ padding: '0.3rem 0.6rem', border: 'none', borderRadius: '4px', backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700 }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {m.description}
                  </p>
                  
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.45, backgroundColor: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '4px' }}>
                    "{m.story}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.5rem' }}>
                    <span>Date: <strong>{m.date}</strong> &bull; Author: <strong>{m.uploader}</strong></span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {m.tags.map(t => (
                        <span key={t} style={{ fontSize: '0.75rem', backgroundColor: 'var(--color-primary-light)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SECTION 4 — CHERISHED ANLYTICS & FAVORITE MEMBERS */}
          <div className="grid-container grid-2" style={{ gap: '2rem' }}>
            
            {/* SVG VISUAL CHART: TOP CHERISHED MEMORIES */}
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Cherished Memories Interaction Logs</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Log counts of Ramesh ji opening specific memory assets</span>

              <div style={{ width: '100%', height: '140px', display: 'flex', alignItems: 'flex-end', gap: '1.25rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                {[
                  { label: 'Wedd 81', count: 32, color: 'var(--color-primary)' },
                  { label: 'Shimla 95', count: 24, color: 'var(--color-secondary)' },
                  { label: 'Grad 18', count: 45, color: 'var(--color-accent)' },
                  { label: 'Holi 05', count: 18, color: 'var(--color-primary-dark)' }
                ].map((bar, idx) => (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{bar.count}</span>
                    <div style={{ width: '100%', height: `${bar.count * 2}px`, backgroundColor: bar.color, borderRadius: '4px 4px 0 0' }}></div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginTop: '0.2rem', whiteSpace: 'nowrap' }}>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FREQUENT INTERACTORS */}
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Memory Interactivity Rankings</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                  <span>Favorite Family Member:</span>
                  <strong>Ananya (Granddaughter)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                  <span>Frequently Revisited Event:</span>
                  <strong>Anniversary 1981</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Memory interactions today:</span>
                  <strong style={{ color: 'var(--color-primary-dark)' }}>4 sessions logs</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* EDIT MEMORY VAULT MODAL */}
      {editingMemory && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', zIndex: 200, justifyContent: 'center' }}>
          <div className="glass-card animate-slide-up" style={{ width: '90%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--bg-secondary)', textAlign: 'left', border: '2px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FileText size={18} style={{ color: 'var(--color-primary)' }} />
                Edit Memory Details
              </h3>
              <button onClick={() => setEditingMemory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdateMemory} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Memory Title:</label>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Date/Year:</label>
                  <input 
                    type="text" 
                    value={editDate} 
                    onChange={(e) => setEditDate(e.target.value)} 
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Category:</label>
                  <select 
                    value={editCategory} 
                    onChange={(e) => setEditCategory(e.target.value as any)} 
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <option value="marriage">Marriage</option>
                    <option value="festivals">Festivals</option>
                    <option value="travel">Travel</option>
                    <option value="achievements">Achievements</option>
                    <option value="family">Family</option>
                    <option value="childhood">Childhood</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Author Uploader:</label>
                <input 
                  type="text" 
                  value={editUploader} 
                  onChange={(e) => setEditUploader(e.target.value)} 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Short Description:</label>
                <input 
                  type="text" 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)} 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                  required 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Detailed Story prompt:</label>
                <textarea 
                  value={editStory} 
                  onChange={(e) => setEditStory(e.target.value)} 
                  rows={3}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Tags (comma-separated):</label>
                <input 
                  type="text" 
                  value={editTagsString} 
                  onChange={(e) => setEditTagsString(e.target.value)} 
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
                  Update Memory
                </button>
                <button type="button" onClick={() => setEditingMemory(null)} style={{ flex: 1, padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default CaregiverMemories;
