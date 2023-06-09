import { Card, CardProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TestCardProps extends CardProps {
  children: ReactNode;
}
const TestCard = ({ children, bgGradient, ...rest }: TestCardProps) => {
  return (
    <Card
      {...rest}
      height="30vh"
      padding={4}
      bgGradient={bgGradient || 'linear(to-bl, green.200, blue.600)'}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Card>
  );
};

export default TestCard;
