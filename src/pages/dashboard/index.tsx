import BaseLayout from '@/components/Layouts/BaseLayout';
import { Stack, useDisclosure } from '@chakra-ui/react';

import { Survey } from '@/types/surveys';

import nookies from 'nookies';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getAllSurveysById, getUserProfileById } from '../../../firebaseClient';
import firebaseAdmin from '../../../firebaseAdmin';
import { Page } from '@/types/pages';
import { UserProfile } from '@/types/user';

import CreatedSurveysCard from '@/components/Cards/CreatedSurveysCard';
import CompletedSurveysCard from '@/components/Cards/CompletedSurveysCard';
import AboutMeCard from '@/components/Cards/AboutMeCard';
import EditUserModal from '@/components/Dashboard/EditUserModal';

const UserDashboardPage = ({
  surveys,
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
            <CreatedSurveysCard surveys={surveys} />
            <CompletedSurveysCard
              completedSurveys={userProfile.completedSurveys}
            />
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
  surveys: Survey[];
  userProfile: UserProfile;
}> = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.firebaseToken);

    const surveys: Survey[] = await getAllSurveysById(token.uid);

    const userProfile = await getUserProfileById(token.uid);

    return {
      props: {
        surveys,
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
