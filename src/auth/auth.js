export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function getRole() {
  return getUser()?.role || "GUEST";
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}