import { hsvToHSL } from "solid-tiny-color";

// gpt
function hexToHsv(hex) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else {
      h = 60 * ((r - g) / delta + 4);
    }
  }

  if (h < 0) h += 360;

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return [h, s, v];
}

function stringToHSV(s) {
  return s.split(",").map(f => parseFloat(f))
}

export function hsvToString(hsv) {
  console.log(hsv)
  return hsv.join(",")
}

function colorType(c) {
  if (c.includes("#")) {
    return 'hex'
  } else if (c.includes(",")) {
    return 'hsv'
  }
}

export function formatColor(c) {
  if (colorType(c) == 'hsv') {
    let hsl = hsvToHSL(stringToHSV(c))
    let  r = `hsl(${hsl[0]}, ${hsl[1] * 100}%, ${hsl[2] * 100}%)`  

    return r
  }
  
  return c
}

export function getHSV(s) {
  if (colorType(s) == 'hex') return hexToHsv(s)
  else return stringToHSV(s)
}