import * as React from 'react';

import { Cntx } from './context';

export const AppContext = ({ children }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [id, setId] = React.useState('');

  return (
    <Cntx.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        profilePicture,
        setProfilePicture,
        id,
        setId,
      }}
    >
      {children}
    </Cntx.Provider>
  );
};

export const useCntx = () => {
  const context = React.useContext(Cntx);
  if (!context) {
    throw new Error('Needs to be used inside the Cntx');
  }
  return context;
};

export const clearContext = (context) => {
  context.setUsername('');
  context.setEmail('');
  context.setProfilePicture('');
  context.setId('');
};
