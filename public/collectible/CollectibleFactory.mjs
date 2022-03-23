import Collectible from "../Collectible.mjs";
import calculateRandomPosition from "../lib/calculateRandomPosition.mjs";

import { nanoid } from 'nanoid'

export default class CollectibleFactory {
    /**
     * @param {number} value 
     * 
     * @returns {Collectible} Collectible
     */
    create(value = 10) {
        const id = nanoid(5)
        const { x, y } = calculateRandomPosition()

        return new Collectible({ x, y, value, id })
    }
}