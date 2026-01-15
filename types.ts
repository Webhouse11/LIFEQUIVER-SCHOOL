
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export interface User {
  id: string;
  email: string;
  phone?: string; // Added phone field
  name: string;
  role: UserRole;
  avatar?: string;
  studentId?: string; // For parents/students linking
  children?: string[]; // IDs of children for Parent role
}

export interface Student {
  id: string;
  name: string;
  class: string;
  level: 'PRIMARY' | 'SECONDARY';
  attendance: number;
  results: ExamResult[];
  schedule: ScheduleItem[];
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  deadline: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface ExamResult {
  subject: string;
  score: number;
  grade: string;
  term: string;
  remarks: string;
}

export interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  teacher: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS';
}
