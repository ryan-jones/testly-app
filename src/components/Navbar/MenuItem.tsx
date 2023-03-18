import { TextProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NextLink from 'next/link';

interface MenuItemProps extends TextProps {
  children: ReactNode;
  to: string;
  isLast?: boolean;
}
const MenuItem = ({ children, isLast, to = '/', ...rest }: MenuItemProps) => {
  return (
    <NextLink href={to} passHref>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </NextLink>
  );
};

export default MenuItem;
