importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyArG19gMAFqKFeIBX6Zr-5GbVZ57BAEb_4",
  authDomain: "gaspwa-notification-app.firebaseapp.com",
  projectId: "gaspwa-notification-app",
  storageBucket: "gaspwa-notification-app.firebasestorage.app",
  messagingSenderId: "947061723618",
  appId: "1:947061723618:web:000adf404d65886804a9bb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/evnnpcIcon.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
