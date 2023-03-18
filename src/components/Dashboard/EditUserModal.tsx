import { UserProfile } from '@/types/user';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup';
import { updateUserProfile } from '../../../firebaseClient';

interface UserProfileFormValues {
  username: string;
}

const userProfileSchema = Yup.object({
  username: Yup.string().required(),
});

interface EditUserModalProps {
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}
const EditUserModal = ({
  isOpen,
  onClose,
  userProfile,
}: EditUserModalProps) => {
  const initialRef = useRef(null);
  const formRef = useRef<FormikProps<UserProfileFormValues>>(null);

  const updateUser = async (formData: UserProfileFormValues) => {
    try {
      const newUser = {
        ...userProfile,
        username: formData.username,
      };
      await updateUserProfile(newUser);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = { username: userProfile.username };
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={userProfileSchema}
      onSubmit={updateUser}
    >
      {({ isSubmitting, submitForm, values, handleChange }) => (
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit your profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
                onClick={submitForm}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};

export default EditUserModal;
