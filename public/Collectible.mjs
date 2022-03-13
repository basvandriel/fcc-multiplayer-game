import { nanoid } from "nanoid";

class Collectible {
  constructor({ x, y, value, id }) {
    self.id = id;
    self.value = value;
    self.x = x;
    self.y = y;
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
