const KEY = "reelflix_user";
 
export function signup({ username, email, password }) {
  const user = { username, email, createdAt: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}
 
export function login({ identity, password }) {
  const stored = getUser();
  if (!stored) {
    const created = {
      username: identity && identity.includes("@") ? identity.split("@")[0] : (identity || "guest"),
      email: identity && identity.includes("@") ? identity : "",
      createdAt: Date.now()
    };
    localStorage.setItem(KEY, JSON.stringify(created));
    return created;
  }
  return stored;
}
 
export function logout() {
  localStorage.removeItem(KEY);
}
 
export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}
 
export function isLoggedIn() {
  return !!getUser();
}