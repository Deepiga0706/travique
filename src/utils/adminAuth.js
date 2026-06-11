export function setAdminUser({ email, password, name }) {
  localStorage.setItem(
    'travique_admin_user',
    JSON.stringify({
      email: (email || '').toLowerCase(),
      password: password || '',
      name: name || 'Admin',
    })
  );
}

export function isValidAdmin(email, password) {
  const admin = safeParse('travique_admin_user');
  if (!admin) return false;
  return (
    admin.email === (email || '').trim().toLowerCase() &&
    admin.password === (password || '')
  );
}

function safeParse(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

