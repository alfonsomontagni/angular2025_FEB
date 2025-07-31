import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cl4-hexagonal-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center gap-3 mb-6">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
            </svg>
            <h1 class="text-3xl font-bold text-gray-900">
              Generatore Mappa Esagonale
            </h1>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Specifiche Tecniche
              </h2>
              
              <div class="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div><strong>Tipo:</strong> Esagoni flat-top</div>
                <div><strong>Lato:</strong> 4,5 mm</div>
                <div><strong>Spaziatura H:</strong> 6,75 mm</div>
                <div><strong>Spaziatura V:</strong> ~7,794 mm</div>
                <div><strong>Colonne:</strong> 51 (01-51)</div>
                <div><strong>Righe dispari:</strong> 35</div>
                <div><strong>Righe pari:</strong> 34 (offset +½)</div>
                <div><strong>Font:</strong> Helvetica 5pt</div>
                <div><strong>Margini:</strong> 8 mm</div>
              </div>
              
              <div class="flex flex-col gap-3">
                <button
                  (click)="downloadPDF(1)"
                  class="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  [disabled]="isGenerating"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span *ngIf="!isGenerating">Scarica PDF 1 (Colonne 01-26)</span>
                  <span *ngIf="isGenerating">Generando...</span>
                </button>
                
                <button
                  (click)="downloadPDF(2)"
                  class="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  [disabled]="isGenerating"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span *ngIf="!isGenerating">Scarica PDF 2 (Colonne 27-51)</span>
                  <span *ngIf="isGenerating">Generando...</span>
                </button>
              </div>
              
              <div class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p class="text-sm text-yellow-800">
                  <strong>Nota:</strong> I file vengono scaricati in formato PNG ad alta risoluzione. 
                  Per ottenere PDF veri, stampare o convertire le immagini.
                </p>
              </div>
            </div>
            
            <div class="space-y-4">
              <h2 class="text-xl font-semibold text-gray-800">
                Anteprima (Prime 10 colonne)
              </h2>
              
              <div class="border border-gray-300 rounded-lg p-4 bg-white">
                <canvas
                  #previewCanvas
                  class="max-w-full h-auto border border-gray-200 rounded"
                  style="image-rendering: crisp-edges;"
                ></canvas>
              </div>
              
              <div class="text-sm text-gray-600 space-y-1">
                <p><strong>Numerazione:</strong> CCRR (Colonna + Riga)</p>
                <p><strong>Esempio:</strong> 0135 = Colonna 01, Riga 35</p>
                <p><strong>Crescita:</strong> Dall'alto verso il basso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  `]
})
export class HexagonalCl4MapComponent implements AfterViewInit {
  @ViewChild('previewCanvas', { static: true }) previewCanvas!: ElementRef<HTMLCanvasElement>;
  
  // Specifiche geometriche
  private readonly SIDE_LENGTH = 4.5; // mm
  private readonly HORIZONTAL_SPACING = 1.5 * this.SIDE_LENGTH; // 6.75 mm
  private readonly VERTICAL_SPACING = Math.sqrt(3) * this.SIDE_LENGTH; // ~7.794 mm
  private readonly TOTAL_COLUMNS = 51;
  private readonly ODD_ROWS = 35;
  private readonly EVEN_ROWS = 34;
  private readonly PAGE_MARGIN = 8; // mm
  private readonly FONT_SIZE = 5; // pt
  private readonly TEXT_OFFSET = 0.25 * this.SIDE_LENGTH; // offset verso l'alto
  
  // Conversione mm to pixels (assumendo 96 DPI)
  private readonly MM_TO_PX = 3.7795275591;
  
  // Dimensioni A4 in mm
  private readonly A4_WIDTH = 210;
  private readonly A4_HEIGHT = 297;
  
  // Proprietà calcolate
  private readonly sidePx = this.SIDE_LENGTH * this.MM_TO_PX;
  private readonly horizontalSpacingPx = this.HORIZONTAL_SPACING * this.MM_TO_PX;
  private readonly verticalSpacingPx = this.VERTICAL_SPACING * this.MM_TO_PX;
  private readonly marginPx = this.PAGE_MARGIN * this.MM_TO_PX;
  private readonly textOffsetPx = this.TEXT_OFFSET * this.MM_TO_PX;
  
  isGenerating = false;
  
  ngAfterViewInit(): void {
    this.showPreview();
  }
  
  /**
   * Disegna un esagono flat-top
   */
  private drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, sideLength: number): void {
    const height = Math.sqrt(3) * sideLength;
    const width = 2 * sideLength;
    
    ctx.beginPath();
    ctx.moveTo(x - width/2, y);
    ctx.lineTo(x - sideLength/2, y - height/2);
    ctx.lineTo(x + sideLength/2, y - height/2);
    ctx.lineTo(x + width/2, y);
    ctx.lineTo(x + sideLength/2, y + height/2);
    ctx.lineTo(x - sideLength/2, y + height/2);
    ctx.closePath();
    ctx.stroke();
  }
  
  /**
   * Disegna il testo centrato con offset
   */
  private drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, offsetY: number): void {
    ctx.fillStyle = 'black';
    ctx.font = `${this.FONT_SIZE * this.MM_TO_PX * 0.75}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y - offsetY);
  }
  
  /**
   * Genera una sezione della mappa
   */
  private generateMapSection(startCol: number, endCol: number, canvasWidth: number, canvasHeight: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d')!;
    
    // Sfondo bianco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.5;
    
    for (let col = startCol; col <= endCol; col++) {
      const isOddCol = col % 2 === 1;
      const maxRows = isOddCol ? this.ODD_ROWS : this.EVEN_ROWS;
      const verticalOffset = isOddCol ? 0 : this.verticalSpacingPx / 2;
      
      for (let row = 1; row <= maxRows; row++) {
        // Calcola posizione relativa alla sezione
        const relativeCol = col - startCol + 1;
        const x = this.marginPx + (relativeCol - 1) * this.horizontalSpacingPx + this.sidePx;
        const y = this.marginPx + (row - 1) * this.verticalSpacingPx + verticalOffset + this.sidePx * Math.sqrt(3) / 2;
        
        // Disegna esagono
        this.drawHexagon(ctx, x, y, this.sidePx);
        
        // Disegna numerazione CCRR
        const colStr = col.toString().padStart(2, '0');
        const rowStr = row.toString().padStart(2, '0');
        const label = `${colStr}${rowStr}`;
        
        this.drawText(ctx, label, x, y, this.textOffsetPx);
      }
    }
    
    return canvas;
  }
  
  /**
   * Scarica il PDF (come immagine PNG)
   */
  downloadPDF(pdfNumber: 1 | 2): void {
    if (this.isGenerating) return;
    
    this.isGenerating = true;
    
    // Usa setTimeout per permettere l'aggiornamento della UI
    setTimeout(() => {
      try {
        const startCol = pdfNumber === 1 ? 1 : 27;
        const endCol = pdfNumber === 1 ? 26 : 51;
        
        // Calcola dimensioni canvas in pixel (alta risoluzione per stampa)
        const scale = 3; // Fattore di scala per alta risoluzione
        const canvasWidth = (this.A4_WIDTH - 2 * this.PAGE_MARGIN) * this.MM_TO_PX * scale;
        const canvasHeight = (this.A4_HEIGHT - 2 * this.PAGE_MARGIN) * this.MM_TO_PX * scale;
        
        // Genera canvas temporaneo per l'alta risoluzione
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasWidth;
        tempCanvas.height = canvasHeight;
        const tempCtx = tempCanvas.getContext('2d')!;
        tempCtx.scale(scale, scale);
        
        // Genera la sezione ridimensionata
        const originalCanvas = this.generateMapSection(
          startCol, 
          endCol, 
          canvasWidth / scale, 
          canvasHeight / scale
        );
        
        tempCtx.drawImage(originalCanvas, 0, 0);
        
        // Converti in blob e scarica
        tempCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mappa-esagonale-${pdfNumber === 1 ? 'colonne-01-26' : 'colonne-27-51'}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
          this.isGenerating = false;
        }, 'image/png', 1.0);
        
      } catch (error) {
        console.error('Errore durante la generazione:', error);
        this.isGenerating = false;
      }
    }, 100);
  }
  
  /**
   * Mostra l'anteprima
   */
  private showPreview(): void {
    const canvas = this.previewCanvas.nativeElement;
    if (!canvas) return;
    
    // Anteprima del primo PDF con scala ridotta
    const previewScale = 0.25;
    const baseWidth = (this.A4_WIDTH - 2 * this.PAGE_MARGIN) * this.MM_TO_PX;
    const baseHeight = (this.A4_HEIGHT - 2 * this.PAGE_MARGIN) * this.MM_TO_PX;
    
    canvas.width = baseWidth * previewScale;
    canvas.height = baseHeight * previewScale;
    
    const ctx = canvas.getContext('2d')!;
    ctx.scale(previewScale, previewScale);
    
    // Genera anteprima delle prime 10 colonne per performance
    const previewCanvas = this.generateMapSection(1, 10, baseWidth, baseHeight);
    ctx.drawImage(previewCanvas, 0, 0);
  }
}