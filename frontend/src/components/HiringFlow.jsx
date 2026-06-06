import { useState } from 'react';
import { STAGES, PHASES } from '../stages.js';

const PHASE_GROUPS = [
  { phase: 'intake', label: 'Intake', stages: [1] },
  { phase: 'sourcing', label: 'Sourcing', stages: [2, 3, 4] },
  { phase: 'selection', label: 'Selection', stages: [5, 6] },
  { phase: 'deployment', label: 'Deployment', stages: [7, 8] },
  { phase: 'management', label: 'Management', stages: [9, 10] },
];

export default function HiringFlow({ role, onUpdate, onDelete }) {
  const [expandedStage, setExpandedStage] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [candidateDraft, setCandidateDraft] = useState(role.candidateName || '');
  const [saving, setSaving] = useState(false);

  const currentStage = role.currentStage;

  function toggleStage(id) {
    if (expandedStage === id) {
      setExpandedStage(null);
    } else {
      setExpandedStage(id);
      setNoteText(role.stageNotes?.[id] || '');
    }
  }

  async function setStage(stageId) {
    setSaving(true);
    await onUpdate({ currentStage: stageId });
    setSaving(false);
  }

  async function saveNote(stageId) {
    const notes = { ...(role.stageNotes || {}), [stageId]: noteText };
    await onUpdate({ stageNotes: notes });
  }

  async function saveCandidate() {
    await onUpdate({ candidateName: candidateDraft });
  }

  const phase = PHASES[STAGES[currentStage - 1].phase];

  return (
    <div style={container}>
      {/* Role header */}
      <div style={roleHeader}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0f172a' }}>
            {role.title}
          </h1>
          <div style={{ marginTop: 4, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {role.department && <Tag>{role.department}</Tag>}
            {role.level && <Tag>{role.level}</Tag>}
            <Tag color={phase.border} bg={phase.bg}>{phase.label} phase</Tag>
            <Tag color="#dc2626" bg="#fee2e2">{role.priority} priority</Tag>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#64748b' }}>Current stage</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: phase.border }}>{currentStage}<span style={{ fontSize: 14, color: '#94a3b8' }}>/10</span></div>
          </div>
          <button style={deleteBtn} onClick={onDelete} title="Remove role">✕</button>
        </div>
      </div>

      {/* Candidate tracker */}
      <div style={candidateBar}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>Candidate on file:</span>
        <input
          style={candidateInput}
          placeholder="Enter candidate name…"
          value={candidateDraft}
          onChange={e => setCandidateDraft(e.target.value)}
          onBlur={saveCandidate}
          onKeyDown={e => e.key === 'Enter' && saveCandidate()}
        />
        {candidateDraft !== role.candidateName && (
          <button style={saveCandBtn} onClick={saveCandidate}>Save</button>
        )}
      </div>

      {/* Phase bar */}
      <div style={phaseBar}>
        {PHASE_GROUPS.map(g => {
          const ph = PHASES[g.phase];
          const active = STAGES[currentStage - 1].phase === g.phase;
          const done = g.stages[g.stages.length - 1] < currentStage;
          return (
            <div key={g.phase} style={{
              ...phaseChip,
              background: active ? ph.bg : done ? '#f0fdf4' : '#f8fafc',
              borderColor: active ? ph.border : done ? '#86efac' : '#e2e8f0',
              color: active ? ph.color : done ? '#16a34a' : '#94a3b8',
              fontWeight: active ? 700 : 500,
            }}>
              {done && <span style={{ marginRight: 4 }}>✓</span>}{g.label}
            </div>
          );
        })}
      </div>

      {/* Flow stages */}
      <div style={stagesContainer}>
        {STAGES.map((stage, idx) => {
          const ph = PHASES[stage.phase];
          const isCurrent = stage.id === currentStage;
          const isDone = stage.id < currentStage;
          const isFuture = stage.id > currentStage;
          const isExpanded = expandedStage === stage.id;

          return (
            <div key={stage.id}>
              {/* Connector arrow */}
              {idx > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                  <div style={{
                    width: 2, height: 16,
                    background: isDone ? ph.border : '#e2e8f0',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', bottom: -5, left: '50%',
                      transform: 'translateX(-50%)',
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: `6px solid ${isDone ? ph.border : '#e2e8f0'}`,
                    }} />
                  </div>
                </div>
              )}

              {/* Stage card */}
              <div
                className={isCurrent ? 'stage-current' : ''}
                style={{
                  ...stageCard,
                  background: isCurrent ? ph.bg : isDone ? '#f8fafc' : '#fff',
                  border: `2px solid ${isCurrent ? ph.border : isDone ? '#86efac' : '#e2e8f0'}`,
                  opacity: isFuture ? 0.6 : 1,
                  boxShadow: isCurrent ? `0 0 0 4px ${ph.border}22` : 'none',
                }}
                onClick={() => toggleStage(stage.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Status icon */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: isCurrent ? ph.border : isDone ? '#16a34a' : '#e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: isCurrent || isDone ? '#fff' : '#94a3b8',
                  }}>
                    {isDone ? '✓' : stage.id}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? ph.color : isDone ? '#374151' : '#64748b',
                    }}>
                      {stage.title}
                    </div>
                    <div style={{ fontSize: 12, color: isCurrent ? ph.border : '#94a3b8', marginTop: 1 }}>
                      {stage.subtitle}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isCurrent && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 20, background: ph.border, color: '#fff',
                      }}>
                        CURRENT
                      </span>
                    )}
                    {(role.stageNotes?.[stage.id]) && (
                      <span style={{ fontSize: 14 }} title="Has notes">📝</span>
                    )}
                    <span style={{ color: '#94a3b8', fontSize: 12 }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${ph.border}33` }}
                    onClick={e => e.stopPropagation()}>
                    <p style={{ margin: '0 0 12px', fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                      {stage.detail}
                    </p>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
                      <strong>SLA:</strong> {stage.sla}
                    </div>

                    {/* Notes */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                        Stage notes
                      </div>
                      <textarea
                        style={noteArea}
                        rows={3}
                        placeholder="Add notes for this stage…"
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                      />
                      <button
                        style={{ ...saveCandBtn, marginTop: 6 }}
                        onClick={() => saveNote(stage.id)}
                      >
                        Save note
                      </button>
                    </div>

                    {/* Stage actions */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {!isCurrent && (
                        <button
                          style={{
                            ...actionBtn,
                            background: ph.bg, color: ph.color,
                            border: `1.5px solid ${ph.border}`,
                          }}
                          onClick={() => setStage(stage.id)}
                          disabled={saving}
                        >
                          {saving ? 'Moving…' : `Set as current stage`}
                        </button>
                      )}
                      {isCurrent && stage.id < 10 && (
                        <button
                          style={{
                            ...actionBtn,
                            background: ph.border, color: '#fff', border: 'none',
                          }}
                          onClick={() => setStage(stage.id + 1)}
                          disabled={saving}
                        >
                          {saving ? 'Advancing…' : `Advance to stage ${stage.id + 1} →`}
                        </button>
                      )}
                      {isCurrent && stage.id === 10 && (
                        <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                          ✓ All stages complete
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tag({ children, color = '#475569', bg = '#f1f5f9' }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
      background: bg, color,
    }}>
      {children}
    </span>
  );
}

const container = {
  flex: 1, overflowY: 'auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 20,
};
const roleHeader = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
};
const deleteBtn = {
  padding: '8px 10px', borderRadius: 8, border: '1.5px solid #fecaca',
  background: '#fff5f5', color: '#dc2626', cursor: 'pointer', fontSize: 14,
  fontFamily: 'inherit', flexShrink: 0,
};
const candidateBar = {
  display: 'flex', alignItems: 'center', gap: 10,
  background: '#f8fafc', padding: '10px 14px', borderRadius: 8,
  border: '1px solid #e2e8f0',
};
const candidateInput = {
  flex: 1, padding: '6px 10px', borderRadius: 6, border: '1.5px solid #e2e8f0',
  fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff',
};
const saveCandBtn = {
  padding: '6px 14px', borderRadius: 6, border: 'none',
  background: '#185FA5', color: '#fff', cursor: 'pointer',
  fontSize: 12, fontFamily: 'inherit', fontWeight: 600,
};
const phaseBar = {
  display: 'flex', gap: 8, flexWrap: 'wrap',
};
const phaseChip = {
  padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
  border: '1.5px solid', display: 'flex', alignItems: 'center',
};
const stagesContainer = {
  display: 'flex', flexDirection: 'column', maxWidth: 680,
};
const stageCard = {
  padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
  transition: 'all 0.2s ease',
};
const noteArea = {
  width: '100%', padding: '8px 10px', borderRadius: 6, border: '1.5px solid #e2e8f0',
  fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none',
  boxSizing: 'border-box',
};
const actionBtn = {
  padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
  fontSize: 13, fontFamily: 'inherit', fontWeight: 600,
};
