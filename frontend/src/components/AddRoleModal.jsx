import { useState } from 'react';

export default function AddRoleModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    department: '',
    level: '',
    priority: 'Medium',
  });
  const [saving, setSaving] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    await onAdd(form);
    setSaving(false);
    onClose();
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <div style={modalHeader}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Add Open Role</span>
          <button style={closeBtn} onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="Role Title *">
            <input
              style={input}
              placeholder="e.g. Senior Network Engineer"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              autoFocus
              required
            />
          </Field>

          <Field label="Department">
            <input
              style={input}
              placeholder="e.g. IT Infrastructure"
              value={form.department}
              onChange={e => set('department', e.target.value)}
            />
          </Field>

          <Field label="Level / Grade">
            <input
              style={input}
              placeholder="e.g. L3, Senior, Principal"
              value={form.level}
              onChange={e => set('level', e.target.value)}
            />
          </Field>

          <Field label="Priority">
            <select style={input} value={form.priority} onChange={e => set('priority', e.target.value)}>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </Field>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" style={cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={submitBtn} disabled={saving || !form.title.trim()}>
              {saving ? 'Adding…' : 'Add Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
};
const modal = {
  background: '#fff', borderRadius: 12, padding: 28, width: 420,
  boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  display: 'flex', flexDirection: 'column', gap: 20,
};
const modalHeader = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
};
const closeBtn = {
  background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', color: '#888',
  padding: '4px 6px', borderRadius: 4,
};
const input = {
  width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #ddd',
  fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  background: '#fafafa',
};
const cancelBtn = {
  padding: '9px 20px', borderRadius: 8, border: '1.5px solid #ddd',
  background: 'transparent', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
};
const submitBtn = {
  padding: '9px 20px', borderRadius: 8, border: 'none',
  background: '#185FA5', color: '#fff', cursor: 'pointer', fontSize: 14,
  fontFamily: 'inherit', fontWeight: 600,
};
