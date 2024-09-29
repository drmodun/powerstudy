import * as React from 'react';

interface ContextTypes {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  mathImage: string | null;
  setMathImage: React.Dispatch<React.SetStateAction<string>>;
}

export const Cntx = React.createContext<ContextTypes | null>(null);
