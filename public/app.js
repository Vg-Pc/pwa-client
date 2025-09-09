// Cấu hình Firebase client
const firebaseConfig = {
  apiKey: "AIzaSyArG19gMAFqKFeIBX6Zr-5GbVZ57BAEb_4",
  authDomain: "gaspwa-notification-app.firebaseapp.com",
  projectId: "gaspwa-notification-app",
  storageBucket: "gaspwa-notification-app.firebasestorage.app",
  messagingSenderId: "947061723618",
  appId: "1:947061723618:web:000adf404d65886804a9bb"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Đăng ký Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("firebase-messaging-sw.js")
    .then(reg => {
      console.log("Service Worker registered:", reg);
    });
}

// Lấy token thiết bị
document.getElementById("btnGetToken").addEventListener("click", async () => {
  try {
    const token = await messaging.getToken({
      vapidKey: "BIx_zy2RTkqSqlSFcTVSehGv5bjyBzbGSF6fNmpTChLG5l_Ish93ab5dzaU0xE9Eu34XlE977ShilkDYLlxcJV0"
    });
    document.getElementById("tokenDisplay").innerText = token;
    console.log("FCM Token:", token);
    // ✅ Gửi token về Google Apps Script
    const payload = {
      token: token,
      name: "Usertest",
      topic: "topicTest"
    } 
    await fetch("https://script.google.com/macros/s/AKfycbwAir3E6RMCd3-PNgqFcBmYYouf9DHb3wvdjTAIYYAggyU3IFCy062XpbKnyfFmEjUYDA/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      // .then(res => res.json())
      // .then(data => console.log("Server response:", data))
      // .catch(err => console.error("Error sending token:", err));
  } catch (err) {
    console.error("Error getting token:", err);
  }
});
