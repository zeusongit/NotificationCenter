import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NotificationsPanel from '@filipeop/notifications-panel';
import Timestamp from '@hig/timestamp';

function App(props) {
  let notificationData = [];

  const [NotificationURL, setNotificationURL] = useState(props.url);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    if(NotificationURL){
        axios.get(NotificationURL)
          .then((response) => {
            console.log("asd")
            setAPIData(response.data.notifications);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }, [NotificationURL]);

  for (let i = 0; i < APIData.length; i++) {
    var notificationItem = {
      id: APIData[i].id,
      featured: true,
      unread: true,
      image: <img width={40} src={APIData[i].thumbnail}></img>,
      message: APIData[i].title,
      href: APIData[i].linkTitle,
      timestamp: <Timestamp timestamp={APIData[i].created} />,
      content: <div>                
        <b>{APIData[i].title}</b>
        <p>{APIData[i].longDescription}</p>
        <a href={APIData[i].link} target="_blank">{APIData[i].linkTitle}</a>
      </div>
    };
    notificationData.push(notificationItem);
  }

  function cc(){
    let uu="https://d21acdehdx53uf.cloudfront.net/dynNotifications.json";
    setNotificationURL(uu);
  }

  return (
    <>
    <NotificationsPanel class="NotificationsFlyout"
      heading="Notifications"
      indicatorTitle="View application alerts"
      notifications={notificationData}>
    </NotificationsPanel>
    <button onClick={cc}>click</button>
    </>
  );
}

export default App;
