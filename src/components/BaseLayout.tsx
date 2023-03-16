import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';

const siteTitle = 'Personality Test';

interface BaseLayoutProps {
  children: ReactNode;
  title: string;
}
const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  return (
    <Box>
      <Head>
        <title>{title}</title>

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover if you're an introvert or an extrovert"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </Box>
  );
};

export default BaseLayout;
