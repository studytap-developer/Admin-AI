export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  branch: string;
  totalQuestions: number;
  lastActive: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export interface University {
  id: string;
  name: string;
  code: string;
  totalBranches: number;
  totalSubjects: number;
  totalQuestions: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  universityId: string;
  totalSubjects: number;
  totalPdfs: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  branchId: string;
  totalPdfs: number;
  lastUpdated: string;
}

export interface PdfFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  subjectId: string;
}

export type Screen = 'login' | 'dashboard' | 'users' | 'syllabus';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}