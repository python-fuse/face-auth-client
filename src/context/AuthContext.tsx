import React, { createContext, useContext, useReducer, useEffect } from "react";

// Types
interface User {
  id: string;
  name: string;
  admissionNumber: string;
  email: string;
  faceSample: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

// Actions
type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN"; payload: { token: string; user: User } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "INIT_AUTH"; payload: { token: string | null; user: User | null } };

// Initial state
const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "INIT_AUTH":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: !!action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("auth-token");
        const userData = localStorage.getItem("auth-user");
        const user = userData ? JSON.parse(userData) : null;

        dispatch({
          type: "INIT_AUTH",
          payload: { token, user },
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({
          type: "INIT_AUTH",
          payload: { token: null, user: null },
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (token: string, user: User) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("auth-user", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: { token, user },
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    dispatch({ type: "LOGOUT" });
  };

  // Update user function
  const updateUser = (user: User) => {
    localStorage.setItem("auth-user", JSON.stringify(user));
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { User, AuthState, AuthContextType };
