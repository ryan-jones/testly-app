import { Page } from '@/types/pages';
import { Button, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps extends ButtonProps {
  href: Page;
  children: ReactNode;
}
const LinkButton = ({
  href,
  children,
  variant = 'outline',
  ...rest
}: LinkButtonProps) => (
  <NextLink href={href} passHref>
    <Button as="span" variant={variant} {...rest}>
      {children}
    </Button>
  </NextLink>
);

export default LinkButton;
