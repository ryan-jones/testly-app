import { SurveyQuestion } from '@/types/surveys';
import * as Yup from 'yup';

export const surveyFormSchema = Yup.object({
  surveyName: Yup.string().required('Survey Name is required.'),
  surveyQuestions: Yup.array()
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
    .min(1, 'A survey must have at least one queston.'),
  surveyResults: Yup.array()
    .of(
      Yup.object().shape({
        header: Yup.string().required('Still needs a valid result header!'),
        body: Yup.string().required('Still needs a valid result body!'),
        score: Yup.number().required('Still needs a valid point range!'),
      })
    )
    .required()
    .min(2, 'Each survey must have at least two results.')
    .test(
      'maxValue',
      'Last result score must equal max point value',
      function (results = []) {
        const { surveyQuestions, surveyResults } = this.parent;
        const totalMaxPoints = surveyQuestions.reduce(
          (sum: number, question: SurveyQuestion) => {
            return sum + question.options.length;
          },
          0
        );
        if (surveyResults.length) {
          return (
            surveyResults[surveyResults.length - 1].score === totalMaxPoints
          );
        }
        return true;
      }
    ),
});
