import { useAuth } from '@/hooks/useAuth';
import { Page } from '@/types/pages';
import { Box, Button, Stack } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import LinkButton from '../LinkButton';

interface MenuListProps {
  isOpen: boolean;
}
const MenuList = ({ isOpen }: MenuListProps) => {
  const { user, logOut } = useAuth();

  const items = [
    { name: 'Home', path: Page.Home },
    { name: 'Tests', path: Page.Tests },
    ...(user.email ? [{ name: 'Dashboard', path: Page.Dashboard }] : []),
  ];
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {items.map((item) => (
          <MenuItem key={item.path} to={item.path}>
            {item.name}
          </MenuItem>
        ))}
        {user.email ? (
          <Button onClick={logOut}>Logout</Button>
        ) : (
          <LinkButton href={Page.Login}>Login</LinkButton>
        )}
      </Stack>
    </Box>
  );
};

export default MenuList;
