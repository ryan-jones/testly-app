export interface TestOption {
  answer: string;
  points: number;
}

export interface TestQuestion {
  question: string;
  options: TestOption[];
}

export interface TestResult {
  header: string;
  body: string;
  score: number;
}

export interface Test {
  id: string;
  testName: string;
  testQuestions: TestQuestion[];
  testResults: TestResult[];
}

export interface TestFormValues {
  id: string;
  createdBy: string;
  testName: string;
  testQuestions: TestQuestion[];
  testResults: TestResult[];
}
