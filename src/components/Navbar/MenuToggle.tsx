import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}
const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box as="button" display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

export default MenuToggle;
