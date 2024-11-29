import React, { createContext, useReducer, useContext } from "react";

/**
 * @typedef {Object} LoginAction
 * @property {'LOGIN'} type - Action type for login
 * @property {any} payload - User object
 */

/**
 * @typedef {Object} LogoutAction
 * @property {'LOGOUT'} type - Action type for logout
 */

/**
 * @typedef {LoginAction | LogoutAction } AuthAction
 */

/**
 * @typedef {Object} AuthActions
 * @property {(user: any) => LoginAction} login - Action creator for login
 * @property {() => LogoutAction} logout - Action creator for logout
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated - Whether user is logged in
 * @property {any|null} user - Current user object
 */

/**
 * Initial authentication state
 * @type {AuthState}
 */
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Define actions
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/**
 * Reducer function for authentication state
 * @param {AuthState} state - Current state
 * @param {AuthAction} action - Dispatched action
 * @returns {AuthState} New state
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create a context
const AuthContext = createContext();

/**
 * AuthProvider component to wrap the app with authentication context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Provider component
 */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext
 * @returns {{
 *   state: AuthState,
 *   dispatch: React.Dispatch<AuthAction>
 * }} Auth context with state and dispatch
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


/**
 * Action creators for authentication actions
 * @type {AuthActions}
 */
export const authActions = {
  /**
   * Action for login process
   * @param {any} user - User object
   * @returns {LoginAction} Login action
   */
  login: (user) => ({ type: LOGIN, payload: user }),

  /**
   * Action to logout user
   * @returns {LogoutAction} Logout action
   */
  logout: () => ({ type: LOGOUT }),
};
