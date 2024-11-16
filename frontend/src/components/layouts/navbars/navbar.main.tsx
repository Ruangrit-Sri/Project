// import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { PersonIcon } from '@radix-ui/react-icons';

const NavbarMain = () => {
  return (
    <NavigationMenu.Root className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h2 className="text-xl font-bold">RipRee Construction</h2>
      <NavigationMenu.List className="flex gap-6">
        
        <NavigationMenu.Item>
          <NavigationMenu.Link className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded">
            <PersonIcon /> Myuser
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavbarMain;
