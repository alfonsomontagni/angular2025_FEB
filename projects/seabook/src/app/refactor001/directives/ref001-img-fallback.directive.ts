import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appRef001ImgFallback]',
  standalone: true
})
export class Ref001ImgFallbackDirective {
  @Input() appRef001ImgFallback: string = 'assets/placeholder-cover.svg';
  @Input() fallbackUrl?: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error', ['$event'])
  onError(event: Event): void {
    const img = this.el.nativeElement;
    
    // Prova prima con fallbackUrl se disponibile
    if (this.fallbackUrl && img.src !== this.fallbackUrl) {
      img.src = this.fallbackUrl;
      return;
    }
    
    // Altrimenti usa il placeholder di default
    if (img.src !== this.appRef001ImgFallback) {
      img.src = this.appRef001ImgFallback;
    }
  }
}