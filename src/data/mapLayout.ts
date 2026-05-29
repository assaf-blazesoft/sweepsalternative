// Tile-grid cartogram layout: [row, col] for every state + DC.
// Rows 0 (north) -> 7 (south); cols 0 (west) -> 10 (east).
// Geographic approximation, not to scale, standard data-journalism tile map.
export const GRID_ROWS = 8;
export const GRID_COLS = 11;

export const TILE_LAYOUT: Record<string, [number, number]> = {
  AK: [0, 0], ME: [0, 10],
  VT: [1, 9], NH: [1, 10],
  WA: [2, 0], ID: [2, 1], MT: [2, 2], ND: [2, 3], MN: [2, 4], WI: [2, 5], MI: [2, 7], NY: [2, 9], MA: [2, 10],
  OR: [3, 0], NV: [3, 1], WY: [3, 2], SD: [3, 3], IA: [3, 4], IL: [3, 5], IN: [3, 6], OH: [3, 7], PA: [3, 8], NJ: [3, 9], CT: [3, 10],
  CA: [4, 0], UT: [4, 1], CO: [4, 2], NE: [4, 3], MO: [4, 4], KY: [4, 5], WV: [4, 6], VA: [4, 7], MD: [4, 8], DE: [4, 9], RI: [4, 10],
  AZ: [5, 1], NM: [5, 2], KS: [5, 3], AR: [5, 4], TN: [5, 5], NC: [5, 6], SC: [5, 7], DC: [5, 8],
  HI: [6, 0], TX: [6, 2], OK: [6, 3], LA: [6, 4], MS: [6, 5], AL: [6, 6], GA: [6, 7],
  FL: [7, 8],
};
