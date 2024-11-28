export interface ReportMedia {
  file: File;
  type: 'image' | 'video';
  preview: string;
  serverFilename?: string;
}