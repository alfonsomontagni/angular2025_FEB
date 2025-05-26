import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface HexInfo {
  coord: string;      // "CCRR"
  label: string;      // "●" per punto nero o nome stella
  dist?: number;      // distanza calcolata
}

@Component({
  selector: 'app-hex-distance',
  templateUrl: './hex-distance.component.html',
  styleUrls: ['./hex-distance.component.css'],
  imports: [CommonModule,FormsModule]
})
export class HexDistanceComponent {

  /** elenco dei punti neri + stelle con nome */
hexes: HexInfo[] = [
  // --- stelle con nome ---
  { coord: '0403', label: 'SOL' },
  { coord: '0432', label: 'RIGEL' },
  { coord: '2302', label: 'ORION' },
  { coord: '2430', label: 'ARACHNAS' },
  { coord: '4507', label: 'TANGRI' },
  { coord: '4828', label: 'OPHIUCHI' },

  // --- punti neri ---
  ...'0311,0709,1007,1306,0721,0723,0922,0628,0930,1229,0915,1413,1707,1710,1617,1520,1621,1722,1628,1819,1915,1925,2314,2318,2223,2328,2206,2609,2624,3606,4803,4205,4611,4715,4621,4524,4229,4125,4213,4416,4019,3916,4009,3712,3720,3531,3428,3228,3326,3024,2726,2828,3222,2920,2716,2813,2710,2804,3214,3405,3409'
      .split(',')
      .map(c => ({ coord: c.trim(), label: '●' }))
];

  /** input utente */
  coordinate = '';

  /** risultati da visualizzare */
  results: HexInfo[] = [];

  /** Calcola distanze e ordina la lista */
  calcDistances(): void {
    const origin = this.parseCoord(this.coordinate);
    if (!origin) {
      alert('Coord. non valida (formato CCRR, es. 2609)');
      return;
    }
    this.results = this.hexes.map(h => ({
        ...h,
        dist: this.hexDistance(origin, this.parseCoord(h.coord)!)
      }))
      .sort((a, b) => a.dist! - b.dist!);
  }

  // ---------- utilità esagonali ----------

  /** converte coord "CCRR" in offset (col, row) */
  private parseCoord(str: string): { col: number; row: number } | null {
    if (!/^\d{4}$/.test(str)) return null;
    return { col: +str.slice(0, 2), row: +str.slice(2, 4) };
  }

  /**
   * converte offset (even-q, flat-top) → cube coords
   * formula:  x = q, z = r - (q + (q&1))/2, y = -x - z
   */
  private toCube(col: number, row: number) {
    const x = col;
    const z = row - (col + (col & 1)) / 2;
    const y = -x - z;
    return { x, y, z };
  }

  /** distanza esagonale cube = (|dx|+|dy|+|dz|)/2 */
  private hexDistance(a: { col: number; row: number },
                      b: { col: number; row: number }): number {
    const ac = this.toCube(a.col, a.row);
    const bc = this.toCube(b.col, b.row);
    return Math.max(
      Math.abs(ac.x - bc.x),
      Math.abs(ac.y - bc.y),
      Math.abs(ac.z - bc.z)
    );
  }
}
