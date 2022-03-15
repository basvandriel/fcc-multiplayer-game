/**
 * Abstract drawer class
 */
export default class Drawer {
  /**
   * @type {CanvasRenderingContext2D | undefined}
   */
  context;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  constructor(context) {
    if (this.constructor == Drawer) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.context = context;
  }

  /**
   * Draws on the canvas
   */
  draw() {
    throw new Error("Draw abstraction should be implemented!");
  }
}
