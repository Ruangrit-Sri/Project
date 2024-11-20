// import "./sidebar.css";
// // import React from 'react';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { PersonIcon ,ArchiveIcon } from '@radix-ui/react-icons';


// const SidebarMain = () => {
 
//   return (
//       <NavigationMenu.Root className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
//         {/* <h2 className="text-2xl font-bold mb-6">My Sidebar</h2> */}
//         <NavigationMenu.List className="flex flex-col gap-4">


//           <NavigationMenu.Item>
//             <NavigationMenu.Link className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
//               <PersonIcon /> Member
//             </NavigationMenu.Link>
//           </NavigationMenu.Item>

//           <NavigationMenu.Item>
//             <NavigationMenu.Link className="flex items-center gap-2 p-2 rounded hover:bg-gray-700">
//               <ArchiveIcon /> Project
//             </NavigationMenu.Link>
//           </NavigationMenu.Item>

//         </NavigationMenu.List>
//       </NavigationMenu.Root>
//     );
// };

// export default SidebarMain;

import "./sidebar.css";
// import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { PersonIcon, ArchiveIcon } from '@radix-ui/react-icons';
import { Link } from "react-router-dom";

const SidebarMain = () => {
  return (
    <NavigationMenu.Root className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <NavigationMenu.List className="flex flex-col gap-4">
        
        <NavigationMenu.Item>
          {/* Link to AdminPage */}
          <Link 
            to="/admin" 
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
          >
            <PersonIcon /> Member
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          {/* Link to AdminProjectPage */}
          <Link 
            to="/adminproject" 
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
          >
            <ArchiveIcon /> Project
          </Link>
        </NavigationMenu.Item>

      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default SidebarMain;

