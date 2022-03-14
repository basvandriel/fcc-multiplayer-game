/**
 * The default size of a collectible
 */
export const DEFAULT_SIZE = 10;

class Collectible {
  constructor({ x, y, value, id }) {
    this.id = id;
    this.value = value;
    this.x = x;
    this.y = y;
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
try {
  module.exports = Collectible;
} catch (e) {}

export default Collectible;
