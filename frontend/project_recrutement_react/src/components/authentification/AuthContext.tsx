// import React, { createContext, useContext, useState } from 'react';
 
// // Define the types for the auth context
// type AuthContextType = {
//   isAuthenticated: boolean;
//   user: { name?: string } | null;
//   login: (username: string) => void;
//   logout: () => void;
// };
 
// // Create the context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
// // Create the provider component
// const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<{ name?: string } | null>(null);
 
//   const login = (username: string) => {
//     setIsAuthenticated(true);
//     setUser({ name: username });
//   };
 
//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };
 
//   const value: AuthContextType = {
//     isAuthenticated,
//     user,
//     login,
//     logout
//   };
 
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
 
// // Create a custom hook to use the auth context
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
 
// export { AuthProvider, useAuth };