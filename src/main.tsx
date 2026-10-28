import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/fira-sans-extra-condensed/500.css';
import '@fontsource/fira-sans-extra-condensed/700.css';
import '@fontsource/fira-sans-extra-condensed/800.css';
import '@fontsource/literata/400.css';
import '@fontsource/literata/400-italic.css';
import '@fontsource/literata/600.css';
import './styles.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
