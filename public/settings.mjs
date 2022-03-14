import { UPPER_GAP, PADDING } from "./drawer.mjs";

export default {
  height: 480,
  width: 640,

  collectible: {
    size: 15,
  },
  get playFieldSize() {
    return {
      width: this.width - PADDING,
      height: this.height - PADDING - UPPER_GAP,
    };
  },
};
