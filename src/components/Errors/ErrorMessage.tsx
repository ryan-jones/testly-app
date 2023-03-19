import React, { useMemo, isValidElement } from 'react';
import { Text } from '@chakra-ui/react';
import { isObject, isString, isArray, isError } from '@/utils/validators';

type Props = {
  errors: Record<string, any> | string | any;
};

const parseErrors = (error: any, messages: string[], idx: number = 0) => {
  if (isString(error)) {
    messages.push(error);
    return;
  }
  if (isError(error)) {
    messages.push(error);
    return;
  }
  Object.values(error)
    .filter(Boolean)
    .forEach((err: any) => {
      if (isString(err)) {
        const pos = idx + 1;
        messages.push(`[${pos}] ${err}`);
        return;
      }
      if (isObject(err)) {
        Object.values(err).forEach((errMessage: any) =>
          parseErrors(errMessage, messages, idx++)
        );
        return;
      }
      if (isArray(err)) {
        err.forEach((e: any) => parseErrors(e, messages, idx++));
        return;
      }
    });
};

const ErrorMessage = ({ errors }: Props) => {
  const errorMessage = useMemo(() => {
    if (isString(errors) || isValidElement(errors)) {
      return errors;
    }
    let messages: string[] = [];
    parseErrors(errors, messages);
    return messages.join(' ');
  }, [errors]);

  return (
    <Text data-invalid color="red.600">
      {errorMessage}
    </Text>
  );
};

export default ErrorMessage;
