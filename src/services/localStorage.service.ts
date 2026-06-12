import { JProject, AuthUser } from '../types';

const STORAGE_KEYS = {
  PROJECT: 'jira_clone_project',
  AUTH: 'jira_clone_auth',
} as const;

export const localStorageService = {
  // ────────────── Project ──────────────
  getProject(): JProject | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECT);
      return raw ? (JSON.parse(raw) as JProject) : null;
    } catch {
      return null;
    }
  },

  setProject(project: JProject): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECT, JSON.stringify(project));
    } catch {
      console.error('Failed to save project to localStorage');
    }
  },

  updateProject(partial: Partial<JProject>): JProject | null {
    const current = this.getProject();
    if (!current) return null;
    const updated = { ...current, ...partial, updatedAt: new Date().toISOString() };
    this.setProject(updated);
    return updated;
  },

  // ────────────── Auth ──────────────
  getAuth(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  setAuth(user: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    } catch {
      console.error('Failed to save auth to localStorage');
    }
  },

  // ────────────── Clear ──────────────
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.PROJECT);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
};
