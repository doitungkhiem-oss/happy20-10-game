// ───────── Cấu hình ─────────
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};
const game = new Phaser.Game(config);

// ───────── Khi load ─────────
window.onload = () => showIntroPopup();

function preload() {
  this.load.image("bg", "./assets/bg.jpg");
  this.load.image("player", "./assets/player.png"); // vẫn load nếu cần dùng icon
  this.load.image("rose", "./assets/rose.png");
  this.load.image("spark", "./assets/spark.png");
  this.load.audio("music", "./assets/music.mp3");
}

function create() {
  const scene = this;
  scene.playerName = "";
  scene.gameStarted = false;
  scene.selected = false;

  // 🌅 Nền
  scene.add.image(400, 300, "bg").setDisplaySize(800, 600);

  // 🌸 Hoa rơi nền trang trí
  const particles = scene.add.particles("rose");
  particles.createEmitter({
    x: { min: 0, max: 800 },
    y: 0,
    lifespan: 15000,
    speedY: { min: 30, max: 70 },
    scale: { start: 0.05, end: 0.01 },
    alpha: { start: 0.9, end: 0 },
    quantity: 2,
    frequency: 200,
    blendMode: "ADD"
  });

  // 🌹 Nhóm bông hoa có thể click
  scene.roses = scene.add.group();
  for (let i = 0; i < 30; i++) {
    const x = Phaser.Math.Between(80, 720);
    const y = Phaser.Math.Between(80, 520);
    const rose = scene.add.image(x, y, "rose").setScale(0.1).setInteractive({ useHandCursor: true });
    rose.wish = wishes[i % wishes.length];

    // 👇 Bắt sự kiện click
    rose.on("pointerdown", () => {
      if (!scene.gameStarted || scene.selected) return; // chỉ cho 1 lần
      scene.selected = true;
      rose.setVisible(false);
      collectRose(scene, rose);
    });

    scene.roses.add(rose);
  }

  // 🎵 Nhạc nền
  scene.bgMusic = scene.sound.add("music", { volume: 0.4, loop: true });

  console.log("🎮 Scene ready! Click 1 bông hoa để nhận lời chúc 💐");
}

function update() {
  // Không cần update di chuyển nữa
}

// ───────── Logic chọn lời chúc an toàn ─────────
const giftKeyword = "Và mình sẽ tặng cho bạn một món quà xinh. Nếu bạn nhận được thông báo này thì hãy tìm mình ở hòm thư";

let cachedGiftCount = null;

// 🔄 Hàm chọn lời chúc ngẫu nhiên nhưng tuân theo quy tắc giới hạn quà
async function getRandomWish() {
  const gitlabProjectId = "75449909";
  const token = "glpat-oxQgC4oWi6tOWREKnFnIiG86MQp1OmlpMjNhCw.01.121un4heh";
  const filePath = "data.json";
  const giftKeyword = "Và mình sẽ tặng cho bạn một món quà xinh";

  try {
    const res = await fetch(
      `https://gitlab.com/api/v4/projects/${gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}/raw?ref=main`,
      { headers: { "PRIVATE-TOKEN": token } }
    );
    const data = await res.json().catch(() => []);
    const giftCount = data.filter(item => item.wish?.includes(giftKeyword)).length;

    let available = wishes;
    if (giftCount >= 2) available = wishes.filter(w => !w.includes(giftKeyword));

    return available[Math.floor(Math.random() * available.length)];
  } catch (err) {
    console.warn("⚠️ Lỗi đọc data.json từ GitLab:", err);
    return wishes[Math.floor(Math.random() * wishes.length)];
  }
}


// ───────── Khi click hoa ─────────
async function collectRose(scene, rose) {
  const wish = rose.wish || await getRandomWish();
  const popup = document.getElementById("popup");

  // 🌹 Hiệu ứng nở ra rồi tan biến cho bông hoa
  scene.tweens.add({
    targets: rose,
    scale: { from: 0.1, to: 0.5 },
    alpha: { from: 1, to: 0 },
    angle: { from: 0, to: Phaser.Math.Between(-30, 30) },
    duration: 800,
    ease: "Sine.easeOut",
    onComplete: () => {
      rose.destroy(); // Xóa hoa sau khi hiệu ứng xong

      // 💾 Lưu dữ liệu ngay sau khi chọn hoa
      saveResult(scene.playerName, wish);

      // 🔥 Xóa nội dung popup cũ
      popup.innerHTML = "";

      // 💐 Tạo giao diện lời chúc với hiệu ứng fade-in
      popup.innerHTML = `
        <div id="popup-text" style="
          text-align:center;
          color:#fff;
          line-height:1.6;
          font-weight:500;
          opacity:0;
          transform:scale(0.95);
          transition:opacity 1s ease, transform 1s ease;
        ">
          <div style="font-size:1.4em; margin-bottom:8px;">
            💐 <b style="color:#ffb6c1; font-size:1.5em;">${scene.playerName}</b>
          </div>
          <div style="font-size:1.1em; color:#fff; font-weight:600;">
            Lời chúc đặc biệt dành riêng cho bạn 💖
          </div>
          <div style="
            margin-top:15px;
            font-size:1.6em;
            font-weight:700;
            background: linear-gradient(90deg, #ff9a9e, #fad0c4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 10px rgba(255,182,193,0.7);
          ">
            “${wish}”
          </div>
          <br>
          <button id="endBtn"
            style="padding:10px 28px;
            background:#ff69b4;
            border:none;
            border-radius:10px;
            color:white;
            font-size:1em;
            font-weight:bold;
            cursor:pointer;
            box-shadow:0 0 10px rgba(255,105,180,0.6);
            transition:0.3s;">
            Kết thúc
          </button>
        </div>`;

      popup.style.display = "flex";

      // ✨ Fade-in nhẹ cho popup
      setTimeout(() => {
        const popupText = document.getElementById("popup-text");
        popupText.style.opacity = "1";
        popupText.style.transform = "scale(1)";
      }, 50);

      // 🎆 Pháo hoa
      showFireworks(scene);

      // 🖱️ Nút kết thúc
      document.getElementById("endBtn").onclick = () => {
        popup.style.display = "none";
        showEndMessage();
      };
    }
  });
}

// ✨ Pháo hoa
function showFireworks(scene) {
  const emitter = scene.add.particles("spark").createEmitter({
    x: { min: 100, max: 700 },
    y: 600,
    lifespan: 2000,
    speedY: { min: -450, max: -250 },
    scale: { start: 0.2, end: 0 },
    alpha: { start: 1, end: 0 },
    gravityY: 400,
    blendMode: "ADD",
    quantity: 4,
    frequency: 150
  });
  setTimeout(() => emitter.stop(), 6000);
}

// ───────── Popup mở đầu ─────────
function showIntroPopup() {
  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div id="popup-text" style="color:#fff;">
      🌸 Mỗi người con gái là một bông hoa tuyệt đẹp.<br/>
      Hôm nay, hãy cùng chọn một đóa hoa dành riêng cho bạn nhé 💖
    </div>
    <button id="nextBtn">Tiếp tục</button>`;
  popup.style.display = "flex";

  document.getElementById("nextBtn").onclick = () => {
    if (game.scene.scenes.length > 0) {
      const scene = game.scene.scenes[0];
      if (scene.bgMusic && !scene.bgMusic.isPlaying) scene.bgMusic.play();
    }
    popup.style.display = "none";
    showGuidePopup();
  };
}

// ───────── Hướng dẫn mini game ─────────
function showGuidePopup() {
  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div id="popup-text" style="color:#fff; text-align:center; line-height:1.6;">
      💡 <b>Hướng dẫn mini game:</b><br><br>
      🌷 Bạn hãy nhập <b>tên của mình</b> vào ô trống.<br>
      🌺 Sau đó nhấn <b>"Bắt đầu"</b>.<br>
      🌸 Và cuối cùng, hãy chọn cho mình một <b>bông hoa xinh xắn</b> để nhận lời chúc đặc biệt 💖
    </div>
    <button id="guideNextBtn" style="
      margin-top:20px;
      padding:8px 24px;
      background:#ff69b4;
      border:none;
      border-radius:10px;
      color:white;
      font-size:1em;
      font-weight:bold;
      cursor:pointer;
      box-shadow:0 0 10px rgba(255,105,180,0.6);
      transition:0.3s;">
      Hiểu rồi 💕
    </button>
  `;
  popup.style.display = "flex";

  document.getElementById("guideNextBtn").onclick = () => {
    popup.style.display = "none";
    showNamePopup(); // 👉 Chuyển sang nhập tên
  };
}

// ───────── Nhập tên ─────────
async function showNamePopup() {
  const popup = document.getElementById("popup");
  popup.innerHTML = `
    <div id="popup-text">
      💖 Nhập tên của bạn để bắt đầu:<br><br>
      <input id="nameInput" placeholder="Ví dụ: Nguyễn Mai"
        style="padding:8px;border-radius:8px;border:none;text-align:center;font-size:1em;width:240px;">
    </div>
    <button id="startBtn">Bắt đầu</button>`;
  popup.style.display = "flex";

  const input = document.getElementById("nameInput");
  input.addEventListener("keydown", e => {
    if (e.code === "Space") e.stopPropagation();
  });
  input.focus();

  document.getElementById("startBtn").onclick = async () => {
    const name = input.value.trim();
    if (!validateVietnameseName(name)) {
     showCustomAlert("⚠️ Vui lòng nhập tên hợp lệ có dấu tiếng Việt (vd: Nguyễn Mai).");
      return;
    }
    if (await checkDuplicateName(name)) {
      showCustomAlert("🌸 Bạn đã nhận lời chúc rồi!");
      return;
    }

    const sc = game.scene.scenes[0];
    sc.playerName = name;
    sc.gameStarted = true;
    popup.style.display = "none";

    console.log("✅ Bắt đầu chọn hoa! Chạm vào 1 bông hoa để nhận lời chúc.");
  };
}

// ───────── Kiểm tra tên tiếng Việt ─────────
function validateVietnameseName(name) {
  if (name.split(" ").length < 2) return false;
  const regex = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
  return regex.test(name);
}

// ───────── Check trùng tên ─────────
async function checkDuplicateName(name) {
  const gitlabProjectId = "75449909";
  const token = "glpat-Q-3y8jR5p6r2DjlmKD1MQG86MQp1OmlpMjNhCw.01.120s8pkay";
  const filePath = "data.json";

  try {
    const res = await fetch(
      `https://gitlab.com/api/v4/projects/${gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}/raw?ref=main`,
      { headers: { "PRIVATE-TOKEN": token } }
    );
    const list = await res.json().catch(() => []);
    return list.some(item => item.name?.toLowerCase() === name.toLowerCase());
  } catch (err) {
    console.error("❌ Lỗi khi đọc data.json từ GitLab:", err);
    return false;
  }
}

// ───────── Lưu kết quả ─────────
async function saveResult(name, wish) {
  if (!name || !wish) return;
  const record = { name, wish, time: new Date().toISOString() };

  const gitlabProjectId = "75449909";
  const token = "glpat-Q-3y8jR5p6r2DjlmKD1MQG86MQp1OmlpMjNhCw.01.120s8pkay";
  const filePath = "data.json";

  try {
    // Lấy file hiện tại
    const resOld = await fetch(
      `https://gitlab.com/api/v4/projects/${gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}/raw?ref=main`,
      { headers: { "PRIVATE-TOKEN": token } }
    );
    let oldData = [];
    if (resOld.ok) oldData = await resOld.json().catch(() => []);

    oldData.push(record);
    const newContent = JSON.stringify(oldData, null, 2);

    // Cập nhật file
    const res = await fetch(
      `https://gitlab.com/api/v4/projects/${gitlabProjectId}/repository/files/${encodeURIComponent(filePath)}`,
      {
        method: "PUT",
        headers: { "PRIVATE-TOKEN": token, "Content-Type": "application/json" },
        body: JSON.stringify({
          branch: "main",
          content: newContent,
          commit_message: `New wish from ${name}`
        })
      }
    );

    console.log(res.ok ? "✅ Lưu GitLab thành công" : "❌ Lỗi GitLab", await res.text());
  } catch (err) {
    console.error("❌ Lỗi lưu GitLab:", err);
  }
}


// ───────── Popup thông báo tùy chỉnh ─────────
function showCustomAlert(message) {
  // Xóa popup cũ nếu có
  const oldAlert = document.getElementById("custom-alert");
  if (oldAlert) oldAlert.remove();

  const div = document.createElement("div");
  div.id = "custom-alert";
  div.innerHTML = `
    <div style="
      position:fixed;
      top:0; left:0; width:100%; height:100%;
      background:rgba(0,0,0,0.4);
      display:flex; align-items:center; justify-content:center;
      z-index:9999;
      animation:fadeIn 0.3s ease;">
      <div style="
        background:#fff;
        border-radius:15px;
        padding:25px 45px;
        text-align:center;
        box-shadow:0 0 25px rgba(255,105,180,0.5);
        font-family:'Segoe UI',sans-serif;
        max-width:400px;
        animation:popupIn 0.4s ease;">
        <h2 style="color:#ff69b4; margin:0 0 12px;">Tùng Khiêm Thông Báo</h2>
        <p style="color:#333; font-size:1em; line-height:1.5;">${message}</p>
        <button id="closeAlert" style="
          margin-top:18px;
          background:#ff69b4;
          color:white;
          border:none;
          padding:8px 22px;
          border-radius:8px;
          cursor:pointer;
          font-weight:600;
          transition:0.3s;
          box-shadow:0 0 8px rgba(255,105,180,0.6);">
          OK
        </button>
      </div>
    </div>

    <style>
      @keyframes fadeIn {
        from { opacity:0; } to { opacity:1; }
      }
      @keyframes popupIn {
        from { transform:scale(0.9); opacity:0; }
        to { transform:scale(1); opacity:1; }
      }
      #closeAlert:hover { background:#ff85c1; }
    </style>
  `;

  document.body.appendChild(div);
  document.getElementById("closeAlert").onclick = () => div.remove();
}

// ───────── Kết thúc ─────────
function showEndMessage() {
  const popup = document.getElementById("popup");
  popup.innerHTML = `<div id="popup-text" style="color:#fff;">
    🎉 Trò chơi đã kết thúc!<br><br>Cảm ơn bạn đã tham gia và nhận lời chúc 20/10 💖
  </div>`;
  popup.style.display = "flex";
}
