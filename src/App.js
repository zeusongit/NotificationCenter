import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@filipeop/notifications-panel';
import Timestamp from '@hig/timestamp';

let notificationData = []; 
function App() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    window.RequestNotifications = RequestNotifications;
    window.RequestNotificationCount = RequestNotificationCount;
  }, [APIData]);
 
  const RequestNotifications = (url) => {
    notificationData = []; 
    axios.get(url)
    .then((response) => {
      const notifications = response.data.notifications;
      //let notificationData = [];
      for (let i = 0; i < notifications.length; i++) {
        var notificationItem = buildNotification(notifications[i]);
        notificationData.push(notificationItem);
      }
      setAPIData(notificationData);
    });
  }

  const RequestNotificationCount = () => {
    return notificationData.length;
  }

  function buildNotification(n){
    return {
      id: n.id,
      featured: true,
      unread: true,
      image: <img width={40} src={n.thumbnail}></img>,
      message: n.title,
      href: n.linkTitle,
      timestamp: <Timestamp timestamp={n.created} />,
      content: <div>
        <b>{n.title}</b>
        <p>{n.longDescription}</p>
        <a href={n.link}>{n.linkTitle}</a>
      </div>
    };
  }

  return APIData ?
  <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      notifications={APIData}>
  </NotificationsPanel>
  : null;
}
export default App;