
const USERS_KEY = "rf_users";
const CURRENT_KEY = "rf_current";
 
function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("auth.getUsers parse error:", e);
    return [];
  }
}
 
function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users || []));
  } catch (e) {
    console.error("auth.saveUsers error:", e);
  }
}
 
function getCurrent() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("auth.getCurrent parse error:", e);
    return null;
  }
}
 
function setCurrent(user) {
  try {
    if (user == null) localStorage.removeItem(CURRENT_KEY);
    else localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("auth.setCurrent error:", e);
  }
}
 
// create a demo user if none exists so you can log in immediately
function ensureDemoUser() {
  const users = getUsers();
  const demoEmail = "demo@reelflix.local";
  const found = users.find((u) => (u.email && u.email.toLowerCase() === demoEmail) || (u.username && u.username.toLowerCase() === "demo"));
  if (!found) {
    users.push({
      username: "demo",
      email: demoEmail,
      password: "demo1234", // demo password
    });
    saveUsers(users);
    console.info("Demo user created: demo / demo1234");
  }
}
ensureDemoUser();
 
// ------------------------- SIGNUP -------------------------
export function signup({ username, email, password }) {
  if (!username || !email || !password) {
    throw new Error("Missing signup fields");
  }
 
  const users = getUsers();
 
  const exists = users.find(
    (u) =>
      (u.email && u.email.toLowerCase() === email.toLowerCase()) ||
      (u.username && u.username.toLowerCase() === username.toLowerCase())
  );
  if (exists) {
    throw new Error("User already exists with this email or username.");
  }
 
  const newUser = {
    username,
    email,
    password, // plain-text for demo only
  };
 
  users.push(newUser);
  saveUsers(users);
 
  // set as current user (auto-login after signup)
  const publicUser = { username: newUser.username, email: newUser.email };
  setCurrent(publicUser);
 
  return publicUser;
}
 
// ------------------------- LOGIN -------------------------
export function login({ identity, password }) {
  if (!identity || !password) {
    throw new Error("Please provide identity and password");
  }
 
  const users = getUsers();
 
  // match by email or username (case-insensitive)
  const user = users.find(
    (u) =>
      (u.email && u.email.toLowerCase() === identity.toLowerCase()) ||
      (u.username && u.username.toLowerCase() === identity.toLowerCase())
  );
 
  if (!user) {
    throw new Error("User not found");
  }
 
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
 
  const publicUser = { username: user.username, email: user.email };
  setCurrent(publicUser);
  return publicUser;
}
 
// ------------------------- LOGOUT -------------------------
export function logout() {
  setCurrent(null);
}
 
// ------------------------- GET CURRENT USER -------------------------
export function getUser() {
  return getCurrent();
}
 
// ------------------------- DEV HELPERS -------------------------
export function clearUsersForDev() {
  try {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(CURRENT_KEY);
  } catch (e) {
    console.error("auth.clearUsersForDev error:", e);
  }
}
 
