// import {Text, Dialog, Button, Flex, TextField, Select} from "@radix-ui/themes";
// import { postUser } from "@/services/user.service";
// import { useState } from "react";

// type DialogUserProps = {
//     getUserData: Function;
// }
// const DialogAdd = ({getUserData} : DialogUserProps) => {
//     const [postUserName, setPostUserName] = useState("");
//     const [postPassword, setPostPassword] = useState("");
//     const [postRole, setPostRole] = useState("");

//     const handleCreateUser = async () => {
//         if (!postUserName || !postPassword || !postRole) {
//         alert("Please enter all required fields (username, password, and role).");
//         return;
//         }
//         postUser({ username: postUserName, password: postPassword, role: postRole })
//         .then((response) => {
//             if (response.statusCode === 200){
//                 setPostUserName("");
//                 setPostPassword("");
//                 setPostRole("");
//                 getUserData();
//             } else if (response.statusCode === 400) {
//                 alert( response.message);
//             } else {
//                 alert("Unexpected error:" + response.message);
//             }
//         })
//         .catch((error) => {
//             console.error("Error creating category", error.response?.date || error.message);
//             alert ("Failed to create user. Please try again.");
//         });
//     };

//     return (
//         <Dialog.Root>
//         <Dialog.Trigger>
//             <Button size="1">Create</Button>
//         </Dialog.Trigger>
//         <Dialog.Content maxWidth="450px">
//             <Dialog.Title>Create User</Dialog.Title>
//             <Flex direction="column" gap="3">
//             <label>
//                 <Text as="div" size="2" mb="1" weight="bold">
//                     Username
//                 </Text>
//                 <TextField.Root
//                     defaultValue=""
//                     placeholder="Enter username"
//                     onChange={(event) => setPostUserName (event.target.value)}
//                 />
//             </label>
//             <label>
//                 <Text as="div" size="2" mb="1" weight="bold">
//                     Password
//                 </Text>
//                 <TextField.Root
//                     defaultValue=""
//                     placeholder="Enter password"
//                     type="password"
//                     onChange={(event) => setPostPassword(event.target.value)}
//                 />
//             </label>
//             <label>
//                 <Text as="div" size="2" mb="1" weight="bold">
//                      Role
//                 </Text>
//                 <Select.Root size="2" defaultValue="ceo">
//                     <Select.Trigger />
//                     <Select.Content>
//                         <Select.Item value="ceo">CEO</Select.Item>
//                         <Select.Item value="admin">ADMIN</Select.Item>
//                     </Select.Content>
//                 </Select.Root>               
//             </label>
//             <label>
//                 <Text as="div" size="2" mb="1" weight="bold">
//                      Project
//                 </Text>
//                 <Select.Root size="2" defaultValue="project1">
//                     <Select.Trigger />
//                     <Select.Content>
//                         <Select.Item value="project1">PROJECT1</Select.Item>
//                         <Select.Item value="project2">PROJECT2</Select.Item>
//                     </Select.Content>
//                 </Select.Root>               
//             </label>

//             </Flex>
//             <Flex gap="3" mt="4" justify="end">
//                 <Dialog.Close>
//                     <Button variant="soft" color="gray">
//                     Cancel
//                     </Button>
//                 </Dialog.Close>
//                 <Dialog.Close>
//                     <Button onClick={handleCreateUser}>Save</Button>
//                 </Dialog.Close>.
//             </Flex>
//         </Dialog.Content>
//     </Dialog.Root>
//     )
// };


// export default DialogAdd

import { Text, Dialog, Button, Flex, TextField, Select } from "@radix-ui/themes";
import { postUser } from "@/services/user.service";
import { getRole } from "@/services/role.service";
import { getProject } from "@/services/project.service";
import { useEffect, useState } from "react";

type DialogUserProps = {
  getUserData: Function;
};

const DialogAdd = ({ getUserData }: DialogUserProps) => {
  const [postUserName, setPostUserName] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [postRole, setPostRole] = useState("");
  const [postProject, setPostProject] = useState("");
  const [roles, setRoles] = useState<{ role_id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ project_id: string; project_name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch roles on component load
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const response = await getRole();
        console.log("Roles:", response.responseObject); // Debugging roles
        if (response.success) {
          setRoles(response.responseObject);
        } else {
          alert("Failed to fetch roles: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Error fetching roles. Please try again.");
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Fetch projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await getProject();
        console.log("Projects:", response.responseObject); // Debugging projects
        if (response.success) {
          setProjects(response.responseObject);
        } else {
          alert("Failed to fetch projects: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Error fetching projects. Please try again.");
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateUser = async () => {
    if (!postUserName || !postPassword || !postRole || !postProject) {
      alert("Please enter all required fields (username, password, role, and project).");
      return;
    }
    try {
      const response = await postUser({
        username: postUserName,
        password: postPassword,
        role: postRole,
        project: postProject,
      });
      if (response.statusCode === 200) {
        setPostUserName("");
        setPostPassword("");
        setPostRole("");
        setPostProject("");
        getUserData(); // Refresh user data
        alert("User created successfully!");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1">Create</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create User</Dialog.Title>
        <Flex direction="column" gap="3">
          {/* Username */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              value={postUserName}
              placeholder="Enter username"
              onChange={(event) => setPostUserName(event.target.value)}
            />
          </label>
          {/* Password */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={postPassword}
              placeholder="Enter password"
              type="password"
              onChange={(event) => setPostPassword(event.target.value)}
            />
          </label>
          {/* Role */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            {loadingRoles ? (
              <Text>Loading roles...</Text>
            ) : (
              <Select.Root
                size="2"
                value={postRole}
                onValueChange={(value) => setPostRole(value)}
              >
                <Select.Trigger>
                  {roles.find((role) => role.role_id === postRole)?.name || "Select a role"}
                </Select.Trigger>
                <Select.Content>
                  {roles.map((role) => (
                    <Select.Item key={role.role_id} value={role.role_id}>
                      {role.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
          
          {/* Project */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Project
            </Text>
            {loadingProjects ? (
              <Text>Loading projects...</Text>
            ) : (
              <Select.Root
                size="2"
                value={postProject}
                onValueChange={(value) => setPostProject(value)}
              >
                <Select.Trigger>
                  {projects.find((project) => project.project_id === postProject)?.project_name ||
                    "Select a project"}
                </Select.Trigger>
                <Select.Content>
                  {projects.map((project) => (
                    <Select.Item key={project.project_id} value={project.project_id}>
                      {project.project_name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleCreateUser}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogAdd;




  