import '@/globals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import DevLogProvider from '@/utilities/DevLogProvider';

import '@/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DevLogProvider>
      <RouterProvider router={router} />
    </DevLogProvider>
  </React.StrictMode>
);
