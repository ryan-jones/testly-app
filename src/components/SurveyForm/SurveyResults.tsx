import { SurveyResult } from '@/types/surveys';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  Stack,
  IconButton,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { InputControl, TextareaControl } from 'formik-chakra-ui';

interface SurveyResultsProps {
  surveyResults: SurveyResult[];
}
const SurveyResults = ({ surveyResults }: SurveyResultsProps) => {
  return (
    <FieldArray
      name="surveyResults"
      render={(arrayHelpers: FieldArrayRenderProps) => (
        <Stack spacing={8}>
          <Accordion allowToggle>
            {surveyResults.map((sr: any, srIndex: number) => (
              <AccordionItem key={srIndex}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {srIndex + 1}: {sr.title}
                  </Box>

                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Stack>
                    <InputControl
                      label="Result Header"
                      name={`surveyResults[${srIndex}.header]`}
                    />
                    <TextareaControl
                      label="Result Body"
                      name={`surveyResults[${srIndex}.body]`}
                    />
                    <IconButton
                      aria-label="Delete result"
                      alignSelf="flex-end"
                      onClick={() => arrayHelpers.remove(srIndex)}
                      icon={<DeleteIcon />}
                    />
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <Button
            colorScheme="blue"
            onClick={() =>
              arrayHelpers.push({
                header: '',
                body: '',
              })
            }
          >
            Add a result
          </Button>
        </Stack>
      )}
    />
  );
};

export default SurveyResults;
