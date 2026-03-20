import { useEffect } from "react";

// 16x16 pixel art frames for a blinking robot face
// Each entry: [col, row, r, g, b]
// Colors used:
//   body:    #61afef (97, 175, 239)
//   outline: #1e2329 (30, 35, 41)
//   eye_on:  #e5c07b (229, 192, 123)
//   eye_off: #4b5263 (75, 82, 99)
//   mouth:   #98c379 (152, 195, 121)
//   glow:    #c678dd (198, 120, 221)

const B = [97, 175, 239];    // body blue
const O = [30, 35, 41];      // outline/dark
const Y = [229, 192, 123];   // eye yellow (open)
const D = [75, 82, 99];      // eye dim (closed/half)
const G = [152, 195, 121];   // mouth green
const P = [198, 120, 221];   // purple accent
const _ = null;               // transparent

// 16x16 grid, row by row
const FRAME_1 = [
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,O,_,_,_,_,_],
  [_,O,B,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,Y,Y,B,B,B,Y,Y,B,B,O,_,_,_],
  [O,B,B,Y,Y,B,B,B,Y,Y,B,B,O,_,_,_],
  [O,B,B,O,O,B,B,B,O,O,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,G,B,G,B,G,B,G,B,B,O,_,_,_],
  [O,B,B,B,G,B,G,B,G,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [_,O,B,P,B,B,B,B,B,B,P,B,O,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,P,_,P,_,_,_,P,_,P,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// Frame 2 — eyes half closed (blink)
const FRAME_2 = [
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,O,_,_,_,_,_],
  [_,O,B,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,D,D,B,B,B,D,D,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,G,B,G,B,G,B,G,B,B,O,_,_,_],
  [O,B,B,B,G,B,G,B,G,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [_,O,B,P,B,B,B,B,B,B,P,B,O,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,P,_,P,_,_,_,P,_,P,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// Frame 3 — eyes fully closed
const FRAME_3 = [
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,O,_,_,_,_,_],
  [_,O,B,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,O,O,O,B,B,O,O,O,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [O,B,B,G,B,G,B,G,B,G,B,B,O,_,_,_],
  [O,B,B,B,G,B,G,B,G,B,B,B,O,_,_,_],
  [O,B,B,B,B,B,B,B,B,B,B,B,O,_,_,_],
  [_,O,B,P,B,B,B,B,B,B,P,B,O,_,_,_],
  [_,_,O,B,B,B,B,B,B,B,B,O,_,_,_,_],
  [_,_,_,O,O,O,O,O,O,O,_,_,_,_,_,_],
  [_,_,P,_,P,_,_,_,P,_,P,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// Animation sequence: open → half → closed → half → open → long pause
const FRAMES     = [FRAME_1, FRAME_2, FRAME_3, FRAME_2, FRAME_1, FRAME_1];
const DELAYS_MS  = [800,     80,      80,      80,      80,      1200    ];

function drawFrame(ctx, grid, scale = 2) {
  ctx.clearRect(0, 0, 32, 32);
  grid.forEach((row, r) => {
    row.forEach((px, c) => {
      if (!px) return;
      ctx.fillStyle = `rgb(${px[0]},${px[1]},${px[2]})`;
      ctx.fillRect(c * scale, r * scale, scale, scale);
    });
  });
}

export function useFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // Find or create link tag
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }

    let frameIdx = 0;
    let timerId;

    function renderNext() {
      drawFrame(ctx, FRAMES[frameIdx], 2);
      link.href = canvas.toDataURL("image/png");

      const delay = DELAYS_MS[frameIdx];
      frameIdx = (frameIdx + 1) % FRAMES.length;
      timerId = setTimeout(renderNext, delay);
    }

    renderNext();
    return () => clearTimeout(timerId);
  }, []);
}
