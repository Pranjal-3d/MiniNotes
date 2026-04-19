'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Loader2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      if (data.success) {
        setNotes(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Open modal for create
  const handleCreateNew = () => {
    setEditNoteId(null);
    setFormData({ title: '', description: '' });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleEdit = (note: Note) => {
    setEditNoteId(note._id);
    setFormData({ title: note.title, description: note.description });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    setDeletingNoteId(id);
    
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error('Failed to delete');
      }
      
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete note');
    } finally {
      setDeletingNoteId(null);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);
    
    try {
      const url = editNoteId ? `/api/notes/${editNoteId}` : '/api/notes';
      const method = editNoteId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsModalOpen(false);
        fetchNotes(); // Refresh list to get proper dates and exact DB record
      } else {
        alert(data.error || 'Failed to save note');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter notes based on search
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Notes<span className={styles.dot}>.</span>
        </motion.h1>
        
        <div className={styles.controls}>
          <motion.div 
            className={styles.searchContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search notes..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
          
          <motion.button 
            className={styles.createBtn}
            onClick={handleCreateNew}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            New Note
          </motion.button>
        </div>
      </header>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Loader2 size={40} className={styles.spinner} />
          <p>Loading your notes...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          <AnimatePresence>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  className={styles.card}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{note.title}</h3>
                      <div className={styles.cardDate}>
                        {new Date(note.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.actionBtn} 
                        onClick={() => handleEdit(note)}
                        aria-label="Edit note"
                        disabled={deletingNoteId === note._id}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDelete(note._id)}
                        aria-label="Delete note"
                        disabled={deletingNoteId === note._id}
                      >
                        {deletingNoteId === note._id ? (
                          <Loader2 size={16} className={styles.spinner} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className={styles.cardDescription}>{note.description}</p>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ gridColumn: '1 / -1' }}
              >
                <FileText size={48} style={{ opacity: 0.5, margin: '0 auto' }} />
                <h3>No notes found</h3>
                <p>Create a new note to get started.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Modal for Create/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modal}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {editNoteId ? 'Edit Note' : 'Create Note'}
                </h2>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter note title..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    autoFocus
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="What's on your mind?"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className={styles.modalFooter}>
                  <button 
                    type="button" 
                    className={styles.cancelBtn}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                  >
                    {isSubmitting && <Loader2 size={16} className={styles.spinner} />}
                    {isSubmitting ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
