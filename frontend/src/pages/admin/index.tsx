// import { useEffect, useState } from "react";
// import { Card , Table, Text, Flex } from "@radix-ui/themes";
// import { getUser } from "@/services/user.service";
// import {TypeUserAll} from "@/types/response/response.user";
// import DialogAdd from "./components/dialogAddUser";
// import DialogEdit from "./components/dialogEditUser";
// import AlertDialogDelete from "./components/alertDialogDeletUser";

// export default function AdminPage(){
//     const [user, setUser] = useState<TypeUserAll[]>([]);

//     const getUserDate = () => {
//         getUser().then((res) => {
//             console.log(res);
            
//             setUser(res.responseObject);
//         })
//     }

//     useEffect (() => {
//         getUserDate();
//     }, []);

//     return (
//         // <div className="flex flex-col h-screen">
//         //     <div className="coutainer w-full pt-2 ">
//                 <Card variant="surface" >
//                 <Flex className="w-full" direction="row" gap="2">
//                     <Text as="div" size="4" weight="bold">
//                         Member
//                     </Text>
//                     <DialogAdd getUserData={getUserDate} />
//                 </Flex>
//                     <div className="w-full mt-2">
//                         <Table.Root variant="surface">
//                             <Table.Header>
//                                 <Table.Row>
//                                     <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
//                                     <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
//                                     <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
//                                     <Table.ColumnHeaderCell>Create</Table.ColumnHeaderCell>
//                                 </Table.Row>
//                             </Table.Header>
//                             <Table.Body>
//                                 {user && user.map((user: TypeUserAll) => (
//                                     <Table.Row key={user.user_id}>
//                                     <Table.RowHeaderCell>{user.user_id}</Table.RowHeaderCell>
//                                     <Table.Cell>{user.username}</Table.Cell>
//                                     <Table.Cell>
//                                         <DialogEdit
//                                             getUserData={getUserDate}
//                                             user_id={user.user_id}
//                                             username={user.username}
//                                         />
//                                         </Table.Cell>
//                                     <Table.Cell>
//                                         <AlertDialogDelete
//                                             getUserDate={getUserDate}
//                                             user_id={user.user_id}
//                                             username={user.username}
//                                         />
//                                     </Table.Cell>
//                                     </Table.Row>
//                                 ))}
//                             </Table.Body>
//                         </Table.Root>
//                     </div>
//                 </Card>
//         //     </div>
//         // </div>
//     );
// }

import { useEffect, useState } from "react";
import { Card, Table, Text, Flex } from "@radix-ui/themes";
import { getUser } from "@/services/user.service";
import { TypeUserAll } from "@/types/response/response.user";
import DialogAdd from "./components/dialogAddUser";
import DialogEdit from "./components/dialogEditUser";
import AlertDialogDelete from "./components/alertDialogDeletUser";

export default function AdminPage() {
    const [user, setUser] = useState<TypeUserAll[]>([]);

    const getUserData = () => {
        getUser().then((res) => {
            console.log(res);
            setUser(res.responseObject);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Card variant="surface">
            <Flex className="w-full" direction="row" gap="2">
                <Text as="div" size="4" weight="bold">
                    Member
                </Text>
                <DialogAdd getUserData={getUserData} />
            </Flex>
            <div className="w-full mt-2">
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {user &&
                            user.map((user: TypeUserAll) => (
                                <Table.Row key={user.user_id}>
                                    <Table.RowHeaderCell>{user.user_id}</Table.RowHeaderCell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.role}</Table.Cell>
                                    <Table.Cell>
                                        <Flex gap="2">
                                            <DialogEdit
                                                getUserData={getUserData}
                                                user_id={user.user_id}
                                                username={user.username}
                                                role={user.role} 
                                            />
                                            <AlertDialogDelete
                                                getUserDate={getUserData}
                                                user_id={user.user_id}
                                                username={user.username}
                                            />
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </Card>
    );
}
