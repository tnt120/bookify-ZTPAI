export interface ProgressDialogData {
  title: string;
  message: string;
  additionalMessage?: string;
  confirmText: string;
  type: 'page' | 'rating';
  value: number;
}
