const AUTH_STORAGE_KEY = "nexbasket_auth";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const REMEMBER_ME_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface StoredAuthSession<TUser = unknown> {
  user: TUser;
  expiresAt: number;
}

export const saveAuthSession = <TUser>(user: TUser, rememberMe = false): void => {
  const ttl = rememberMe ? REMEMBER_ME_TTL_MS : SESSION_TTL_MS;
  const session: StoredAuthSession<TUser> = {
    user,
    expiresAt: Date.now() + ttl,
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const getAuthSession = <TUser = unknown>(): StoredAuthSession<TUser> | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as StoredAuthSession<TUser>;
    if (Date.now() >= session.expiresAt) {
      clearAuthSession();
      return null;
    }
    return session;
  } catch {
    clearAuthSession();
    return null;
  }
};

export const clearAuthSession = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isLoggedIn = (): boolean => getAuthSession() !== null;
