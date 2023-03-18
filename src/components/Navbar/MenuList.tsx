import { Page } from '@/types/pages';
import { Box, Stack } from '@chakra-ui/react';
import MenuItem from './MenuItem';

interface MenuListProps {
  isOpen: boolean;
}
const MenuList = ({ isOpen }: MenuListProps) => {
  const items = [
    { name: 'Home', path: Page.Home },
    { name: 'Admin', path: Page.Admin },
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
      </Stack>
    </Box>
  );
};

export default MenuList;
