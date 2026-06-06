import { STAGES, PHASES } from '../stages.js';

const PRIORITY_COLOR = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#2563eb',
  Low: '#16a34a',
};

export default function Sidebar({ roles, selectedId, onSelect, onAdd }) {
  return (
    <aside style={sidebar}>
      {/* Logo / Brand */}
      <div style={brand}>
        <div style={logo}>HIQ</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Hiring Pipeline</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>QNB Resource Tracker</div>
        </div>
      </div>

      {/* Add Role */}
      <button style={addBtn} onClick={onAdd}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Role
      </button>

      {/* Role list */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {roles.length === 0 && (
          <div style={{ padding: '24px 16px', color: '#64748b', fontSize: 13, textAlign: 'center' }}>
            No roles yet.<br />Click <strong>+ New Role</strong> to get started.
          </div>
        )}
        {roles.map(role => {
          const stage = STAGES[role.currentStage - 1];
          const phase = PHASES[stage.phase];
          const active = role.id === selectedId;
          return (
            <div
              key={role.id}
              onClick={() => onSelect(role.id)}
              style={{
                ...roleCard,
                background: active ? '#1e3a5f' : 'transparent',
                borderLeft: active ? `3px solid ${phase.border}` : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3 }}>
                  {role.title}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                  background: PRIORITY_COLOR[role.priority] + '22',
                  color: PRIORITY_COLOR[role.priority],
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {role.priority}
                </span>
              </div>

              {role.department && (
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{role.department}</div>
              )}

              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: phase.border, flexShrink: 0,
                }} />
                <span style={{ fontSize: 11, color: '#cbd5e1' }}>
                  Stage {role.currentStage}/10 · {stage.title}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 6, height: 3, background: '#334155', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(role.currentStage / 10) * 100}%`,
                  background: phase.border,
                  borderRadius: 2,
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={footer}>
        {roles.length} role{roles.length !== 1 ? 's' : ''} tracked
      </div>
    </aside>
  );
}

const sidebar = {
  width: 270, flexShrink: 0, background: '#0f172a',
  display: 'flex', flexDirection: 'column', height: '100vh',
  borderRight: '1px solid #1e293b',
};
const brand = {
  padding: '20px 16px 16px', display: 'flex', alignItems: 'center', gap: 12,
  borderBottom: '1px solid #1e293b',
};
const logo = {
  width: 36, height: 36, borderRadius: 8, background: '#185FA5',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0,
};
const addBtn = {
  margin: '12px 12px 8px', padding: '10px 16px', borderRadius: 8,
  background: '#185FA5', border: 'none', color: '#fff', cursor: 'pointer',
  fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center',
  gap: 6, fontFamily: 'inherit',
};
const roleCard = {
  padding: '12px 14px', cursor: 'pointer', borderRadius: 6, margin: '2px 6px',
  transition: 'background 0.15s',
};
const footer = {
  padding: '12px 16px', fontSize: 11, color: '#475569',
  borderTop: '1px solid #1e293b', textAlign: 'center',
};
