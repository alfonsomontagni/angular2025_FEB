import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refRelDatetime',
  standalone: true
})
export class Ref001RelDatetimePipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    if (!value) return 'N/A';
    
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Data non valida';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) return 'Ora';
    if (diffMinutes < 60) return `${diffMinutes} min fa`;
    if (diffHours < 24) return `${diffHours} ore fa`;
    if (diffDays < 7) return `${diffDays} giorni fa`;
    
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}