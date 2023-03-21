import { TestQuestion } from '@/types/tests';
import * as Yup from 'yup';

export const testFormSchema = Yup.object({
  testName: Yup.string().required('Test Name is required.'),
  testQuestions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required('A question is required.'),
        options: Yup.array()
          .of(
            Yup.object().shape({
              answer: Yup.string().required('Still need a valid answer here!'),
              points: Yup.number().required(),
            })
          )
          .min(2, 'Each question must have at least two options'),
      })
    )
    .min(1, 'A test must have at least one queston.'),
  testResults: Yup.array()
    .of(
      Yup.object().shape({
        header: Yup.string().required('Still needs a valid result header!'),
        body: Yup.string().required('Still needs a valid result body!'),
        score: Yup.number().required('Still needs a valid point range!'),
      })
    )
    .required()
    .min(2, 'Each test must have at least two results.')
    .test(
      'maxValue',
      'Last result score must equal max point value',
      function (results = []) {
        const { testQuestions, testResults } = this.parent;
        const totalMaxPoints = testQuestions.reduce(
          (sum: number, question: TestQuestion) => {
            return sum + question.options.length;
          },
          0
        );
        if (testResults.length) {
          return testResults[testResults.length - 1].score === totalMaxPoints;
        }
        return true;
      }
    ),
});
