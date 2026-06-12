import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from '../../types';
import { localStorageService } from '../../services/localStorage.service';
import authData from '../../data/auth.json';

type AuthState = AuthUser | null;

const initialState: AuthState = (() => {
  const stored = localStorageService.getAuth();
  if (stored) return stored;
  const user = authData as AuthUser;
  localStorageService.setAuth(user);
  return user;
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setAuth(_state, action: PayloadAction<AuthUser>) {
      localStorageService.setAuth(action.payload);
      return action.payload;
    },
    clearAuth() {
      localStorageService.clearAll();
      return null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
