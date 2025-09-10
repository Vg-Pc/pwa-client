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
  navigator.serviceWorker.register("/firebase-messaging-sw.js")
    .then(reg => console.log("✅ Service Worker registered:", reg))
    .catch(err => console.error("❌ SW register error:", err));
}

// Hàm xin quyền + lấy token
async function getFcmToken() {
  try {
    // Xin quyền
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Bạn chưa cấp quyền thông báo!");
      return;
    }

    // Lấy token
    const token = await messaging.getToken({
      vapidKey: "BIx_zy2RTkqSqlSFcTVSehGv5bjyBzbGSF6fNmpTChLG5l_Ish93ab5dzaU0xE9Eu34XlE977ShilkDYLlxcJV0"
    });

    if (!token) {
      console.warn("⚠️ Không lấy được token.");
      return;
    }

    // Hiển thị token
    document.getElementById("tokenDisplay").innerText = token;
    console.log("🔑 FCM Token:", token);

    // Payload gửi lên Google Apps Script
    const payload = {
      token: token,
      name: "UserTest",
      topic: "topicTest"
    };

    // Gửi token về server GAS
    const response = await fetch("https://script.google.com/macros/s/AKfycbwAir3E6RMCd3-PNgqFcBmYYouf9DHb3wvdjTAIYYAggyU3IFCy062XpbKnyfFmEjUYDA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Nếu GAS trả JSON → log ra
    try {
      const data = await response.json();
      console.log("✅ Server response:", data);
    } catch {
      console.log("✅ Token đã gửi (không parse JSON được do GAS no-cors).");
    }

  } catch (err) {
    console.error("❌ Lỗi khi lấy token:", err);
  }
}

// Gắn vào nút bấm
document.getElementById("btnGetToken").addEventListener("click", getFcmToken);
