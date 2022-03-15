// returns true if there is any overlap
// params: x,y,w,h of two rectangles
//
// https://stackoverflow.com/a/8018338/2989034

/**
 *
 * @param {*} x1
 * @param {*} y1
 * @param {*} w1
 * @param {*} h1
 * @param {*} x2
 * @param {*} y2
 * @param {*} w2
 * @param {*} h2
 *
 * @returns {boolean}
 */
export default function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (w2 !== Infinity && w1 !== Infinity) {
    w2 += x2;
    w1 += x1;
    if (isNaN(w1) || isNaN(w2) || x2 > w1 || x1 > w2) return false;
  }
  if (y2 !== Infinity && h1 !== Infinity) {
    h2 += y2;
    h1 += y1;
    if (isNaN(h1) || isNaN(y2) || y2 > h1 || y1 > h2) return false;
  }
  return true;
}
