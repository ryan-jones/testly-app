import { TestResult } from './tests';

export interface UserType {
  email: string | null;
  uid: string | null;
}

export interface CompletedTest {
  testName: string;
  testResult: TestResult;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  completedTests: CompletedTest[];
}
