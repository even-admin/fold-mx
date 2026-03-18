const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Dark background
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0, 0, width, height);

// Draw halftone sphere - parse circles from SVG
const svgContent = fs.readFileSync('/home/user/workspace/fold-mx/logo-mark.svg', 'utf8');
const circleRegex = /cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g;
let match;

// Scale and center the sphere
const scale = 2.8;
const offsetX = (width / 2) - (50 * scale); // center horizontally
const offsetY = (height / 2) - (50 * scale) - 30; // slightly above center

ctx.fillStyle = '#e5e5e5'; // light gray dots
while ((match = circleRegex.exec(svgContent)) !== null) {
  const cx = parseFloat(match[1]) * scale + offsetX;
  const cy = parseFloat(match[2]) * scale + offsetY;
  const r = parseFloat(match[3]) * scale;
  
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

// Draw "fold" text below the sphere
ctx.fillStyle = '#ffffff';
ctx.font = '600 56px "Helvetica Neue", Helvetica, Arial, sans-serif';
ctx.textAlign = 'center';
ctx.letterSpacing = '4px';
ctx.fillText('fold', width / 2, height - 80);

// Subtle tagline
ctx.fillStyle = '#737373';
ctx.font = '300 18px "Helvetica Neue", Helvetica, Arial, sans-serif';
ctx.fillText('AI · Tecnología · Yucatán', width / 2, height - 48);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('/home/user/workspace/fold-mx/og-image.png', buffer);
console.log('OG image generated: og-image.png');
