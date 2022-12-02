import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <DndProvider backend={HTML5Backend}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DndProvider>
);