import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import HiringFlow from './components/HiringFlow.jsx';
import AddRoleModal from './components/AddRoleModal.jsx';
import { fetchRoles, createRole, updateRole, deleteRole } from './api.js';

export default function App() {
  const [roles, setRoles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles()
      .then(data => {
        setRoles(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setError('Cannot connect to HIQ API — make sure the backend is running on port 3001.'));
  }, []);

  const selectedRole = roles.find(r => r.id === selectedId) || null;

  async function handleAdd(formData) {
    const role = await createRole(formData);
    setRoles(prev => [...prev, role]);
    setSelectedId(role.id);
  }

  async function handleUpdate(patch) {
    if (!selectedId) return;
    const updated = await updateRole(selectedId, patch);
    setRoles(prev => prev.map(r => r.id === selectedId ? updated : r));
  }

  async function handleDelete() {
    if (!selectedId) return;
    if (!window.confirm(`Remove "${selectedRole.title}"?`)) return;
    await deleteRole(selectedId);
    const remaining = roles.filter(r => r.id !== selectedId);
    setRoles(remaining);
    setSelectedId(remaining[0]?.id || null);
  }

  return (
    <div className="app-layout">
      <Sidebar
        roles={roles}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={() => setShowModal(true)}
      />

      <main className="main-content">
        {error && (
          <div style={{
            margin: 24, padding: '14px 18px', borderRadius: 10,
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#b91c1c', fontSize: 14,
          }}>
            ⚠️ {error}
          </div>
        )}

        {!error && !selectedRole && (
          <div className="empty-state">
            <div style={{ fontSize: 48 }}>📋</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#334155' }}>
              No role selected
            </div>
            <div style={{ fontSize: 14 }}>
              Select a role from the sidebar or add a new one to track its hiring pipeline.
            </div>
            <button
              style={{
                marginTop: 8, padding: '10px 24px', borderRadius: 8,
                background: '#185FA5', border: 'none', color: '#fff',
                cursor: 'pointer', fontSize: 14, fontWeight: 600,
                fontFamily: 'inherit',
              }}
              onClick={() => setShowModal(true)}
            >
              + Add First Role
            </button>
          </div>
        )}

        {selectedRole && (
          <HiringFlow
            key={selectedRole.id}
            role={selectedRole}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>

      {showModal && (
        <AddRoleModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
