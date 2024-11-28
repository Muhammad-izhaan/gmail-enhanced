export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  labels: string[];
  avatar?: string;
  attachments?: number;
  important?: boolean;
}