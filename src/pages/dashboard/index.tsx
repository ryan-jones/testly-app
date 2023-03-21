import BaseLayout from '@/components/Layouts/BaseLayout';
import { Stack, useDisclosure } from '@chakra-ui/react';

import { Test } from '@/types/tests';

import nookies from 'nookies';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getAllTestsById, getUserProfileById } from '../../../firebaseClient';
import firebaseAdmin from '../../../firebaseAdmin';
import { Page } from '@/types/pages';
import { UserProfile } from '@/types/user';

import CreatedTestsCard from '@/components/Cards/CreatedTestsCard';
import CompletedTestsCard from '@/components/Cards/CompletedTestsCard';
import AboutMeCard from '@/components/Cards/AboutMeCard';
import EditUserModal from '@/components/Dashboard/EditUserModal';

const UserDashboardPage = ({
  tests,
  userProfile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <BaseLayout title="Dashboard">
      <Stack
        id="container"
        minHeight="100vh"
        padding={{ base: 4, md: 12 }}
        bgGradient="radial(blackAlpha.50, blackAlpha.200)"
      >
        <Stack id="stuff" direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Stack spacing={8} flex={1} id="card-wrapper">
            <AboutMeCard
              userProfile={userProfile}
              onClickEditProfile={onOpen}
            />
          </Stack>
          <Stack spacing={8} width={{ base: '100%', md: '75%' }}>
            <CreatedTestsCard tests={tests} />
            <CompletedTestsCard completedTests={userProfile.completedTests} />
          </Stack>
        </Stack>
      </Stack>
      <EditUserModal
        isOpen={isOpen}
        onClose={onClose}
        userProfile={userProfile}
      />
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  tests: Test[];
  userProfile: UserProfile;
}> = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.firebaseToken);

    const tests: Test[] = await getAllTestsById(token.uid);

    const userProfile = await getUserProfileById(token.uid);

    return {
      props: {
        tests,
        userProfile,
      },
    };
  } catch (error) {
    console.log('ERROR WHILE AUTHENTICATING USER', error);
    return {
      redirect: {
        destination: Page.Login,
        permanent: false,
      },
    };
  }
};
export default UserDashboardPage;
