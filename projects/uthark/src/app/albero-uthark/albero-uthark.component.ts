import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RUNIC_SETS } from './uthark-model';

type RuneNode = {
  id: number;
  x: number;
  y: number;
  r: number;
  rune: string;
  testo?: string;
};

type Edge = {
  from: number; // id del nodo sorgente
  to: number;   // id del nodo destinazione
  ru?: string
};

@Component({
  selector: 'app-albero-uthark',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './albero-uthark.component.html',
  styleUrls: ['./albero-uthark.component.css']
})
export class AlberoUtharkComponent {


  trackByNode = (_: number, node: RuneNode) => node.id;
trackByEdge = (_: number, edge: Edge) => `${edge.from}-${edge.to}`;

  // ----- NODI (default: replica immagine) -----
  nodes = signal<RuneNode[]>([
    { id: 2, x: 150, y:  40, r: 31, rune: RUNIC_SETS.utharkAlf[15],testo: RUNIC_SETS.utharkAlf[15] }, // 0
    { id: 6, x: 150, y: 120, r: 31, rune:  RUNIC_SETS.utharkAlf[6],testo: RUNIC_SETS.utharkAlf[6] }, // Gebo
    { id: 8, x:  70, y: 200, r: 31, rune:  RUNIC_SETS.utharkAlf[23],testo: RUNIC_SETS.utharkAlf[23] }, // 2
    { id: 4, x: 230, y: 200, r: 31, rune:  RUNIC_SETS.utharkAlf[21],testo: RUNIC_SETS.utharkAlf[21] }, // 3
    { id: 10, x: 150, y: 280, r: 31, rune:  RUNIC_SETS.utharkAlf[11],testo: RUNIC_SETS.utharkAlf[11] }, // 4
    { id: 5, x:  70, y: 360, r: 31, rune:  RUNIC_SETS.utharkAlf[9],testo: RUNIC_SETS.utharkAlf[9] }, // 5
    { id: 7, x: 230, y: 360, r: 31, rune:  RUNIC_SETS.utharkAlf[13],testo: RUNIC_SETS.utharkAlf[13] }, // 6 Eihwaz
    { id: 9, x: 150, y: 440, r: 31, rune:  RUNIC_SETS.utharkAlf[8],testo: RUNIC_SETS.utharkAlf[8] }, // 7 Hagalaz
    { id: 3, x: 150, y: 520, r: 31, rune:  RUNIC_SETS.utharkAlf[10],testo: RUNIC_SETS.utharkAlf[10] }, // 8 Isa
  ]);

    // ----- ARCHI -----
  edges = signal<Edge[]>([
    // asse verticale
    { from: 2, to: 6 , ru: RUNIC_SETS.utharkB[3]}, 
    { from: 6, to: 10  , ru: RUNIC_SETS.utharkB[6]}, 
    { from: 10, to: 9 , ru: RUNIC_SETS.utharkB[9]},
     { from: 9, to: 3 , ru: RUNIC_SETS.utharkB[1]},
    // contorno
    { from: 2, to: 8 , ru: RUNIC_SETS.utharkB[5]}, 
    { from: 2, to: 4 , ru: RUNIC_SETS.utharkB[7]}, 
    { from: 8, to: 5 , ru: RUNIC_SETS.utharkB[12]},
     { from: 4, to: 7 , ru: RUNIC_SETS.utharkB[13]},
    { from: 5, to: 3 , ru: RUNIC_SETS.utharkB[2]}, 
    { from: 7, to: 3 , ru: RUNIC_SETS.utharkB[4]},
    // orizzontali
    { from: 8, to: 4 , ru: RUNIC_SETS.utharkB[15]}, 
    { from: 5, to: 7 , ru: RUNIC_SETS.utharkB[10]},
    // diagonali interne
    { from: 8, to: 10 , ru: RUNIC_SETS.utharkB[23]}, 
    { from: 4, to: 10 , ru: RUNIC_SETS.utharkB[17]}, 
    { from: 5, to: 10 , ru: RUNIC_SETS.utharkB[22]}, 
    { from: 7, to: 10 , ru: RUNIC_SETS.utharkB[19]},
    { from: 8, to: 6 , ru: RUNIC_SETS.utharkB[14]}, 
    { from: 4, to: 6, ru: RUNIC_SETS.utharkB[11] },
    { from: 5, to: 9 , ru: RUNIC_SETS.utharkB[9] },
     { from: 7, to: 9 , ru: RUNIC_SETS.utharkB[16]},
    //
     { from: 5, to: 6 , ru: RUNIC_SETS.utharkB[18]},
     { from: 6, to: 7 , ru: RUNIC_SETS.utharkB[24]},
     { from: 4, to: 9 , ru: RUNIC_SETS.utharkB[21]},
     { from: 8, to: 9 , ru: RUNIC_SETS.utharkB[20]},
  ]);

/*  
  nodes = signal<RuneNode[]>([
    { id: 0, x: 150, y:  40, r: 28, rune: RUNIC_SETS.uthark[15] }, // 
    { id: 1, x: 150, y: 120, r: 28, rune:  RUNIC_SETS.uthark[6] }, // Gebo
    { id: 2, x:  70, y: 200, r: 28, rune:  RUNIC_SETS.uthark[23] }, // 
    { id: 3, x: 230, y: 200, r: 28, rune:  RUNIC_SETS.uthark[21] }, // 
    { id: 4, x: 150, y: 280, r: 28, rune:  RUNIC_SETS.uthark[11] }, // 
    { id: 5, x:  70, y: 360, r: 28, rune:  RUNIC_SETS.uthark[9] }, // 
    { id: 6, x: 230, y: 360, r: 28, rune:  RUNIC_SETS.uthark[13] }, // Eihwaz
    { id: 7, x: 150, y: 440, r: 28, rune:  RUNIC_SETS.uthark[8] }, // Hagalaz
    { id: 8, x: 150, y: 520, r: 28, rune:  RUNIC_SETS.uthark[10] }, // Isa
  ]);
  // ----- ARCHI -----
  edges = signal<Edge[]>([
    // asse verticale
    { from: 0, to: 1 }, { from: 1, to: 4 }, { from: 4, to: 7 }, { from: 7, to: 8 },
    // contorno
    { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 2, to: 5 }, { from: 3, to: 6 },
    { from: 5, to: 8 }, { from: 6, to: 8 },
    // orizzontali
    { from: 2, to: 3 }, { from: 5, to: 6 },
    // diagonali interne
    { from: 2, to: 4 }, { from: 3, to: 4 }, { from: 5, to: 4 }, { from: 6, to: 4 },
    { from: 2, to: 6 }, { from: 3, to: 5 },
    { from: 5, to: 7 }, { from: 6, to: 7 }
  ]);

*/
  // ----- DERIVATI -----
  // comodo lookup by id
  nodeById = computed(() => {
    const map = new Map<number, RuneNode>();
    this.nodes().forEach(n => map.set(n.id, n));
    return map;
  });

  // edges con coordinate risolte
  drawableEdges = computed(() =>
    this.edges().map(e => {
      const from = this.nodeById().get(e.from)!;
      const to   = this.nodeById().get(e.to)!;
      return {
        ...e,
        x1: from.x, y1: from.y,
        x2: to.x,   y2: to.y
      };
    })
  );

  // calcola automaticamente il viewBox
  viewBox = computed(() => {
    const ns = this.nodes();
    const xs = ns.map(n => n.x);
    const ys = ns.map(n => n.y);
    const minX = Math.min(...xs) - 60;
    const maxX = Math.max(...xs) + 60;
    const minY = Math.min(...ys) - 60;
    const maxY = Math.max(...ys) + 60;
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  });

  // ----- API DI MODIFICA -----
  updateNode(id: number, patch: Partial<RuneNode>) {
    this.nodes.update(list =>
      list.map(n => n.id === id ? { ...n, ...patch } : n)
    );
  }

  addNode() {
    const id = Math.max(...this.nodes().map(n => n.id)) + 1;
    this.nodes.update(list => [
      ...list,
      { id, x: 150, y: 300, r: 28, rune: 'ᛁ' }
    ]);
  }

  removeNode(id: number) {
    this.nodes.update(list => list.filter(n => n.id !== id));
    this.edges.update(list => list.filter(e => e.from !== id && e.to !== id));
  }

  addEdge(from: number, to: number) {
    if (from === to) return;
    const exists = this.edges().some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from));
    if (!exists) {
      this.edges.update(list => [...list, { from, to }]);
    }
  }

  removeEdge(edgeIndex: number) {
    this.edges.update(list => list.filter((_, i) => i !== edgeIndex));
  }

  // tool helper: parse int safely
  toNumber(v: string): number {
    return Number(v);
  }



  /* ----------------------------------------------------------------
   * TOOLTIP STATE (Signal)
   * ---------------------------------------------------------------- */
  tooltip = signal<{ show: boolean; x: number; y: number; text: string }>({
    show: false,
    x: 0,
    y: 0,
    text: ''
  });

  showTooltip(evt: MouseEvent, text: string) {
    if (!text) return;
    const { clientX, clientY } = evt;
    this.tooltip.set({ show: true, x: clientX + 12, y: clientY + 12, text });
  }

  moveTooltip(evt: MouseEvent) {
    if (!this.tooltip().show) return;
    const { clientX, clientY } = evt;
    this.tooltip.update(t => ({ ...t, x: clientX + 12, y: clientY + 12 }));
  }

  hideTooltip() {
    this.tooltip.update(t => ({ ...t, show: false }));
  }
}
