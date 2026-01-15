
import { UserRole, Student, ExamResult, ScheduleItem, Notification } from './types';

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'PTA Meeting', message: 'Annual PTA meeting scheduled for next Saturday at 10:00 AM in the school hall.', date: '2024-05-15', type: 'INFO' },
  { id: '2', title: 'Mid-Term Results', message: 'Results for the 2nd Term Mid-term exams are now available for viewing.', date: '2024-05-10', type: 'SUCCESS' },
  { id: '3', title: 'Fee Payment Deadline', message: 'Final notice for outstanding 3rd term fee payment.', date: '2024-05-18', type: 'WARNING' },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { day: 'Monday', time: '08:30 AM', subject: 'Mathematics', teacher: 'Mr. Adewale' },
  { day: 'Monday', time: '10:00 AM', subject: 'English Language', teacher: 'Mrs. Olaniyi' },
  { day: 'Tuesday', time: '09:00 AM', subject: 'Civic Education', teacher: 'Mr. Balogun' },
  { day: 'Tuesday', time: '11:00 AM', subject: 'Yoruba Language', teacher: 'Mrs. Fadeke' },
  { day: 'Wednesday', time: '08:30 AM', subject: 'Basic Science', teacher: 'Dr. Ifeoma' },
];

export const MOCK_RESULTS: ExamResult[] = [
  { subject: 'Mathematics', score: 85, grade: 'A', term: '2nd Term', remarks: 'Excellent performance' },
  { subject: 'English Language', score: 78, grade: 'B', term: '2nd Term', remarks: 'Very good' },
  { subject: 'Yoruba Language', score: 92, grade: 'A', term: '2nd Term', remarks: 'Outstanding' },
  { subject: 'Civic Education', score: 65, grade: 'C', term: '2nd Term', remarks: 'Needs more focus' },
];

export const MOCK_STUDENT: Student = {
  id: 'STU-2024-001',
  name: 'Toluwani Adeyemi',
  class: 'JSS 3A',
  level: 'SECONDARY',
  attendance: 94,
  results: MOCK_RESULTS,
  schedule: MOCK_SCHEDULE,
};
