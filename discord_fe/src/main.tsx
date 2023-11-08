import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { SignedOut, RedirectToSignIn, SignedIn, ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import CreateServerModal from './components/modals/CreateServerModal.tsx';

import { ApolloProvider } from '@apollo/client'
import client from './apolloClient.ts';
import CreateChannelModal from './components/modals/CreateChannelModal.tsx';
import ChannelLayout from './layouts/ChannelLayout.tsx';
import ChannelPage from './pages/ChannelPage.tsx';
import InviteModal from './components/modals/server/InviteModal.tsx';
import UpdateServerModal from './components/modals/server/UpdateServerModal.tsx';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}


const RouterComponent = () => {
  const navigate = useNavigate();

  //servers/:serverId/channel/:channelType/:channelId
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}>
      <Routes>
        <Route path='' element={<RootLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateServerModal />
                <HomePage />
              </ProtectedRoute>
            } />
        </Route>
            
        <Route path="servers/:serverId/" element={<ChannelLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateChannelModal />
                <ChannelPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="servers/:serverId/channels/:channelType/:channelId"
          element={<ChannelLayout />}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateChannelModal />
                <ChannelPage />
                <UpdateServerModal/>
                <InviteModal/>
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>

    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
