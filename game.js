const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let kills = 0;

const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  w: 40,
  h: 40
};

const bullets = [];
const enemies = [];

document.addEventListener("mousemove", e => {
  player.x = e.clientX;
  player.y = e.clientY;
});

document.addEventListener("click", () => {
  bullets.push({ x: player.x, y: player.y, r: 4 });
});

function spawnEnemy() {
  enemies.push({
    x: Math.random() * canvas.width,
    y: -40,
    w: 40,
    h: 40,
    speed: 2
  });
}

setInterval(spawnEnemy, 1000);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x - 20, player.y - 20, 40, 40);

  // Bullets
  bullets.forEach((b, i) => {
    b.y -= 8;
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    if (b.y < 0) bullets.splice(i, 1);
  });

  // Enemies
  enemies.forEach((e, ei) => {
    e.y += e.speed;
    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y, e.w, e.h);

    bullets.forEach((b, bi) => {
      if (
        b.x > e.x &&
        b.x < e.x + e.w &&
        b.y > e.y &&
        b.y < e.y + e.h
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });
  });

  requestAnimationFrame(update);
}

update();
