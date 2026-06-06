const BASE = '/api';

export async function fetchRoles() {
  const res = await fetch(`${BASE}/roles`);
  if (!res.ok) throw new Error('Failed to fetch roles');
  return res.json();
}

export async function createRole(data) {
  const res = await fetch(`${BASE}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create role');
  return res.json();
}

export async function updateRole(id, data) {
  const res = await fetch(`${BASE}/roles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update role');
  return res.json();
}

export async function deleteRole(id) {
  const res = await fetch(`${BASE}/roles/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete role');
}
