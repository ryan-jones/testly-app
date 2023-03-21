import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Logo from './Logo';
import MenuList from './MenuList';
import MenuToggle from './MenuToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      width="100%"
      padding={8}
      background="white"
      color="blue.600"
      boxShadow="0 2px 2px -2px rgba(0,0,0,.2)"
    >
      <Logo />
      <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MenuList isOpen={isOpen} />
    </Flex>
  );
};

export default Navbar;
