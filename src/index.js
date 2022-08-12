require('file-loader?name=[name].[ext]!./index.html');
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let notificationURL = "http://demo9540080.mockable.io/notifications" || process.env.NOTIFICATION_URL;
export function updateNotificationURL(url) {
  notificationURL = url;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App url={notificationURL}/>
  </React.StrictMode>
);
