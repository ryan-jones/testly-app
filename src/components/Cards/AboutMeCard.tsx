import { UserProfile } from '@/types/user';
import { EditIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';

interface AboutMeCardProps {
  userProfile: UserProfile;
  onClickEditProfile: () => void;
}
const AboutMeCard = ({ userProfile, onClickEditProfile }: AboutMeCardProps) => {
  return (
    <Card padding={4}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Heading size="md" maxWidth="75%" noOfLines={1}>
            {userProfile.username}
          </Heading>

          <IconButton
            onClick={onClickEditProfile}
            icon={<EditIcon />}
            aria-label="edit user profile"
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing={4}>
          <Text>{userProfile.email}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AboutMeCard;
