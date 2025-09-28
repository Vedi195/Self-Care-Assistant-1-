import React, { useState, useEffect } from 'react';
import './Reminders.css';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'general',
    repeat: 'none'
  });
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  const categories = [
    { value: 'general', label: 'General', icon: '📝', color: '#6c757d' },
    { value: 'health', label: 'Health', icon: '🏥', color: '#28a745' },
    { value: 'beauty', label: 'Beauty', icon: '💄', color: '#e83e8c' },
    { value: 'exercise', label: 'Exercise', icon: '💪', color: '#fd7e14' },
    { value: 'wellness', label: 'Wellness', icon: '🧘‍♀️', color: '#20c997' },
    { value: 'medication', label: 'Medication', icon: '💊', color: '#dc3545' },
    { value: 'selfcare', label: 'Self-Care', icon: '🌸', color: '#6f42c1' }
  ];

  const repeatOptions = [
    { value: 'none', label: 'No Repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  useEffect(() => {
    // Load reminders from localStorage
    const savedReminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    setReminders(savedReminders);

    // Check for due reminders every minute
    const interval = setInterval(checkDueReminders, 60000);
    checkDueReminders(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  const saveRemindersToStorage = (remindersList) => {
    localStorage.setItem('reminders', JSON.stringify(remindersList));
  };

  const checkDueReminders = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    const currentDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format

    reminders.forEach(reminder => {
      if (reminder.date === currentDate && reminder.time === currentTime && !reminder.notified) {
        showNotification(reminder);
        // Mark as notified
        const updatedReminders = reminders.map(r => 
          r.id === reminder.id ? { ...r, notified: true } : r
        );
        setReminders(updatedReminders);
        saveRemindersToStorage(updatedReminders);
      }
    });
  };

  const showNotification = (reminder) => {
    // Browser notification
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: ${reminder.title}`, {
        body: reminder.description,
        icon: '⏰'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(`Reminder: ${reminder.title}`, {
            body: reminder.description,
            icon: '⏰'
          });
        }
      });
    }
  };

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.date && newReminder.time) {
      const reminder = {
        id: Date.now(),
        ...newReminder,
        title: newReminder.title.trim(),
        description: newReminder.description.trim(),
        createdAt: new Date().toISOString(),
        notified: false,
        completed: false
      };
      
      const updatedReminders = [...reminders, reminder];
      setReminders(updatedReminders);
      saveRemindersToStorage(updatedReminders);
      
      // Reset form
      setNewReminder({
        title: '',
        description: '',
        date: '',
        time: '',
        category: 'general',
        repeat: 'none'
      });
      setShowAddForm(false);
    }
  };

  const deleteReminder = (id) => {
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    saveRemindersToStorage(updatedReminders);
  };

  const toggleComplete = (id) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    );
    setReminders(updatedReminders);
    saveRemindersToStorage(updatedReminders);
  };

  const updateReminder = (id, updatedData) => {
    const updatedReminders = reminders.map(reminder =>
      reminder.id === id ? { ...reminder, ...updatedData } : reminder
    );
    setReminders(updatedReminders);
    saveRemindersToStorage(updatedReminders);
    setEditingId(null);
  };

  const filteredReminders = reminders.filter(reminder => {
    const now = new Date();
    const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
    
    switch (filter) {
      case 'today':
        return reminder.date === now.toISOString().slice(0, 10);
      case 'upcoming':
        return reminderDateTime > now && !reminder.completed;
      case 'completed':
        return reminder.completed;
      case 'overdue':
        return reminderDateTime < now && !reminder.completed;
      default:
        return true;
    }
  });

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    const now = new Date();
    const diffInDays = Math.ceil((dateObj - now) / (1000 * 60 * 60 * 24));
    
    let dateText = dateObj.toLocaleDateString();
    if (diffInDays === 0) dateText = 'Today';
    else if (diffInDays === 1) dateText = 'Tomorrow';
    else if (diffInDays === -1) dateText = 'Yesterday';
    
    return `${dateText} at ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM format
  };

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const stats = {
    total: reminders.length,
    today: reminders.filter(r => r.date === new Date().toISOString().slice(0, 10)).length,
    upcoming: reminders.filter(r => {
      const reminderDate = new Date(`${r.date}T${r.time}`);
      return reminderDate > new Date() && !r.completed;
    }).length,
    completed: reminders.filter(r => r.completed).length
  };

  return (
    <div className="reminders">
      <div className="reminders-header">
        <h1>⏰ Reminders</h1>
        <p>Never forget your self-care routines and important tasks</p>
      </div>

      {/* Stats */}
      <div className="reminders-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.today}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.upcoming}</div>
          <div className="stat-label">Upcoming</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      {/* Add Reminder Button */}
      <div className="add-reminder-section">
        <button 
          className="add-reminder-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '❌ Cancel' : '➕ Add New Reminder'}
        </button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="add-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                placeholder="Reminder title..."
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                value={newReminder.category}
                onChange={(e) => setNewReminder({ ...newReminder, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={newReminder.date}
                onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                min={new Date().toISOString().slice(0, 10)}
              />
            </div>
            
            <div className="form-group">
              <label>Time *</label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>
            
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                placeholder="Additional details..."
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label>Repeat</label>
              <select
                value={newReminder.repeat}
                onChange={(e) => setNewReminder({ ...newReminder, repeat: e.target.value })}
              >
                {repeatOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button onClick={addReminder} className="save-btn">
              ✅ Save Reminder
            </button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={filter === 'today' ? 'active' : ''}
            onClick={() => setFilter('today')}
          >
            Today ({stats.today})
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming ({stats.upcoming})
          </button>
          <button 
            className={filter === 'overdue' ? 'active' : ''}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="reminders-list">
        {filteredReminders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⏰</div>
            <h3>No reminders found</h3>
            <p>
              {filter === 'all' 
                ? 'Create your first reminder to get started!'
                : `No ${filter} reminders at the moment.`
              }
            </p>
          </div>
        ) : (
          filteredReminders
            .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
            .map(reminder => {
              const categoryInfo = getCategoryInfo(reminder.category);
              const isOverdue = new Date(`${reminder.date}T${reminder.time}`) < new Date() && !reminder.completed;
              
              return (
                <div 
                  key={reminder.id} 
                  className={`reminder-item ${reminder.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
                >
                  <div className="reminder-content">
                    <div className="reminder-header">
                      <div className="category-badge" style={{ backgroundColor: categoryInfo.color }}>
                        {categoryInfo.icon} {categoryInfo.label}
                      </div>
                      <div className="reminder-time">
                        {formatDateTime(reminder.date, reminder.time)}
                      </div>
                    </div>
                    
                    <h4 className="reminder-title">{reminder.title}</h4>
                    
                    {reminder.description && (
                      <p className="reminder-description">{reminder.description}</p>
                    )}
                    
                    {reminder.repeat !== 'none' && (
                      <div className="repeat-info">
                        🔄 Repeats {reminder.repeat}
                      </div>
                    )}
                  </div>
                  
                  <div className="reminder-actions">
                    <button
                      onClick={() => toggleComplete(reminder.id)}
                      className={`complete-btn ${reminder.completed ? 'completed' : ''}`}
                    >
                      {reminder.completed ? '✅' : '⭕'}
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default Reminders;