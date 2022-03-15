import { UPPER_GAP, PADDING } from "../drawer/BoardDrawer.mjs";
import { PLAYER_SIZE } from "../drawer/PlayerDrawer.mjs";

import settings from "../settings.mjs";

export default function calculateRandomPosition() {
  const { width, height } = settings.playFieldSize;

  const oneSidePadding = PADDING / 2;
  const random = Math.random() * 2;

  const centerX = width / 2 - PLAYER_SIZE / 2;
  const x = oneSidePadding + centerX * random;

  const centerY = height / 2 - PLAYER_SIZE / 2;
  const y = oneSidePadding + UPPER_GAP + centerY * random;

  return { x, y };
}
