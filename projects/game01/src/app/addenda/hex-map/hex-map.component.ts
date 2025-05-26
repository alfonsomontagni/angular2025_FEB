import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/** lato dell’esagono in pixel */
const SIZE = 20;                    // cambia pure
const SQRT3 = Math.sqrt(3);
const COLS = 51;
const ROWS_EVEN = 35;
const ROWS_ODD  = 34;
const MARGIN = 10;

/* ---------- dati dei simboli ---------- */

interface Star { coord: string; name: string; }
const STARS: Star[] = [
  { coord: '0403', name: 'SOL'       },
  { coord: '0432', name: 'RIGEL'     },
  { coord: '2302', name: 'ORION'     },
  { coord: '2430', name: 'ARACHNAS'  },
  { coord: '4507', name: 'TANGRI'    },
  { coord: '4828', name: 'OPHIUCHI'  }
];

const DOTS = `0311,0709,1007,1306,0721,0723,0922,0628,0930,1229,
  0915,1413,1707,1710,1617,1520,1621,1722,1628,1819,
  1915,1925,2314,2318,2223,2328,2206,2609,2624,3606,
  4803,4205,4611,4715,4621,4524,4229,4125,4213,4416,
  4019,3916,4009,3712,3720,3531,3428,3228,3326,3024,
  2726,2828,3222,2920,2716,2813,2710,2804,3214,3405,3409`
  .replace(/\s+/g, '')
  .split(',')
  .filter(Boolean);   // array di stringhe CCRR

/* ---------- utilità grafiche ---------- */

function center(col: number, row: number) {
  const x = MARGIN + col * (1.5 * SIZE);
  const y = MARGIN +
            row * (SQRT3 * SIZE) +
            (col % 2 === 1 ? SQRT3 * SIZE / 2 : 0);
  return { x, y };
}

function hexPoints(cx: number, cy: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 180 * (60 * i);
    const px = cx + SIZE * Math.cos(angle);
    const py = cy + SIZE * Math.sin(angle);
    pts.push(`${px},${py}`);
  }
  return pts.join(' ');
}

function parseCoord(ccrr: string) {
  const col = Number(ccrr.slice(0, 2)) - 1;
  const row = Number(ccrr.slice(2))    - 1;
  return { col, row };
}

/* ---------- componente ---------- */

@Component({
  standalone: true,
  selector: 'app-hex-map',
  templateUrl: './hex-map.component.html',
  styleUrls: ['./hex-map.component.css'],
  imports: [CommonModule,]
})
export class HexMapComponent {

  /** griglia completa */
  hexes = Array.from({ length: COLS }, (_, c) => {
    const rows = c % 2 === 0 ? ROWS_EVEN : ROWS_ODD;
    return Array.from({ length: rows }, (_, r) => {
      const { x, y } = center(c, r);
      const coord = `${(c+1).toString().padStart(2,'0')}${(r+1).toString().padStart(2,'0')}`;
      return { c, r, coord, x, y };
    });
  }).flat();

  /** lookup rapido per puntini / stelle */
  dotSet  = new Set(DOTS);
  starMap = new Map(STARS.map(s => [s.coord, s.name]));

  /* dimensioni complessive per il viewBox */
  width  = MARGIN + (COLS - 1) * 1.5 * SIZE + 2 * SIZE + MARGIN;
  height = MARGIN + ROWS_EVEN * SQRT3 * SIZE + SQRT3 * SIZE / 2 + MARGIN;

  /* accessori per template */
  hexPoints = hexPoints.bind(null);
  isDot   = (c: string) => this.dotSet.has(c);
  isStar  = (c: string) => this.starMap.has(c);
  starName = (c: string) => this.starMap.get(c);


  zoom = 1;

zoomIn() {
  if (this.zoom < 3) this.zoom += 0.1;
}

zoomOut() {
  if (this.zoom > 0.3) this.zoom -= 0.1;
}

}
