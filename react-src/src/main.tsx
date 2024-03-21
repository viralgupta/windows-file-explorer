import './index.css';

import { init, window as neuWindow } from '@neutralinojs/lib';

import { App } from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

if (import.meta.env.DEV) {
  try {
    // method 1
    const storedToken = sessionStorage.getItem('NL_TOKEN');
    if (storedToken) window.NL_TOKEN = storedToken;
    // method 2
    let authInfo;
    try {
      // @ts-ignore
      authInfo = require('../../.tmp/auth_info.json');
    } catch (error) {
      authInfo = await import('../../.tmp/auth_info.json');
    }
    finally{
      const { nlToken, nlPort } = authInfo;
      window.NL_PORT = nlPort;
      window.NL_TOKEN = nlToken;
      window.NL_ARGS = [
        'bin\\neutralino-win_x64.exe',
        '',
        '--load-dir-res',
        '--path=.',
        '--export-auth-info',
        '--neu-dev-extension',
        '--neu-dev-auto-reload',
        '--window-enable-inspector',
      ];
    }
  } catch(e) {
    console.error(
      'Auth file not found, native API calls will not work.'
    );
  }
}

init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);


neuWindow.focus();
