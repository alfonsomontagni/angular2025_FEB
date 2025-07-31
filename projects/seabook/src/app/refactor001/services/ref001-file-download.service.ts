// ref001-file-download.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ref001FileDownloadService {
  
  private createTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
           `_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  downloadTextFile(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    this.downloadBlob(blob, fileName);
  }

  downloadJsonFile<T>(data: T, fileName: string): void {
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    this.downloadBlob(blob, fileName);
  }

  downloadCsvFile(data: any[], fileName: string): void {
    if (!data.length) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    this.downloadBlob(blob, fileName);
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  generateFileName(prefix: string, suffix = '', extension = 'txt'): string {
    const cleanPrefix = prefix.trim() || 'Lista';
    const timestamp = this.createTimestamp();
    const cleanSuffix = suffix ? `_${suffix}` : '';
    return `${cleanPrefix}_${timestamp}${cleanSuffix}.${extension}`;
  }
}
