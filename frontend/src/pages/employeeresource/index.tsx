// import { useEffect, useState, Fragment } from "react"; // ✅ เพิ่ม Fragment
// import { Card, Table, Text, Flex } from "@radix-ui/themes";
// import { getResource } from "@/services/resource.service";
// import { TypeResourceAll } from "@/types/response/response.resource";
// import DialogAddResource from "./components/DialogAddResource";
// import DialogEditResource from "./components/DialogEditResource";
// import AlertDialogDeleteResource from "./components/alertDialogDeleteResource";

// export default function ResourcePage() {
//     const [groupedResources, setGroupedResources] = useState<{ [task_id: string]: TypeResourceAll[] }>({});
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     const getResourceData = async () => {
//         setIsLoading(true);
//         try {
//             const res = await getResource();
//             if (res.success) {
//                 const resourceList: TypeResourceAll[] = res.responseObject;

//                 // ✅ กำหนด type ให้ `acc` และ `resource`
//                 const grouped = resourceList.reduce<{ [task_id: string]: TypeResourceAll[] }>((acc, resource) => {
//                     if (!acc[resource.task_id]) {
//                         acc[resource.task_id] = [];
//                     }
//                     acc[resource.task_id].push(resource);
//                     return acc;
//                 }, {});

//                 setGroupedResources(grouped);
//             } else {
//                 console.error("Failed to fetch resources");
//             }
//         } catch (error) {
//             console.error("Error fetching resources:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         getResourceData();
//     }, []);

//     return (
//         // <Card variant="surface">
//         //     <Text size="4" weight="bold">Resources</Text>
//         //     {isLoading ? (
//         //         <Flex justify="center" align="center" style={{ height: "200px" }}>
//         //             <Spinner size="3" />
//         //         </Flex>
//         //     ) : (
//         <Card variant="surface">
//                 <Flex className="w-full" direction="row" gap="2">
//                     <Text as="div" size="4" weight="bold" mb="2">
//                     Resources
//                     </Text>
//                 </Flex>
//                 <Table.Root variant="surface">
//                     <Table.Header>
//                         <Table.Row>
//                             <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Resource Name</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Resource Type</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
//                         </Table.Row>
//                     </Table.Header>
//                     <Table.Body>
//                         {Object.entries(groupedResources).map(([task_id, taskResources]) => (
//                             <Fragment key={task_id}> {/* ✅ แก้ไข Key Fragment */}
//                                 {taskResources.map((resource, index) => (
//                                     <Table.Row key={resource.resource_id}>
//                                         {index === 0 && (
//                                             <Table.Cell rowSpan={taskResources.length}>
//                                                 <Flex direction="row" align="center" gap="2">
//                                                     <Text>{resource.tasks.task_name}</Text> 
//                                                     <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
//                                                 </Flex>
//                                             </Table.Cell>
//                                         )}
//                                         <Table.Cell>{resource.resource_name}</Table.Cell>
//                                         <Table.Cell>{resource.resource_type}</Table.Cell>
//                                         <Table.Cell>{new Intl.NumberFormat("en-US").format(resource.cost)}</Table.Cell>
//                                         <Table.Cell>{new Intl.NumberFormat("en-US").format(resource.quantity)}</Table.Cell>
//                                         <Table.Cell>{new Intl.NumberFormat("en-US").format(resource.total)}</Table.Cell>
//                                         <Table.Cell>
//                                             <Flex gap="2">
//                                                 <DialogEditResource getResourceData={getResourceData} resource={resource} />
//                                                 <AlertDialogDeleteResource getResourceData={getResourceData} resource_id={resource.resource_id} />
//                                             </Flex>
//                                         </Table.Cell>
//                                     </Table.Row>
//                                 ))}
//                             </Fragment>
//                         ))}
//                     </Table.Body>
//                 </Table.Root>
//         </Card>
//     );
// }

import { useEffect, useState, Fragment } from "react";
import { Card, Table, Text, Flex, Spinner } from "@radix-ui/themes";
import { getResource } from "@/services/resource.service"; // Assuming getAllTasks is available
import { getTask } from "@/services/task.service";
import { TypeTask } from "@/types/response/response.task";
import { TypeResourceAll } from "@/types/response/response.resource";
import DialogAddResource from "./components/DialogAddResource";
import DialogEditResource from "./components/DialogEditResource";
import AlertDialogDeleteResource from "./components/alertDialogDeleteResource";

export default function ResourcePage() {
    const [groupedResources, setGroupedResources] = useState<{ [task_id: string]: TypeResourceAll[] }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getResourceData = async () => {
        setIsLoading(true);
        try {
            const [resTasks, resResources] = await Promise.all([getTask(), getResource()]);

            if (resTasks.success && resResources.success) {
                const tasks: TypeTask[] = resTasks.responseObject;
                const resourceList: TypeResourceAll[] = resResources.responseObject;

                const grouped = tasks.reduce<{ [task_id: string]: TypeResourceAll[] }>((acc, task) => {
                    acc[task.task_id] = resourceList.filter(resource => resource.task_id === task.task_id);
                    return acc;
                }, {});

                setGroupedResources(grouped);
            } else {
                console.error("Failed to fetch tasks or resources");
            }
        } catch (error) {
            console.error("Error fetching tasks or resources:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getResourceData();
    }, []);

    return (
        <Card variant="surface">
            <Text size="4" weight="bold">Resources</Text>
            {isLoading ? (
                <Flex justify="center" align="center" style={{ height: "200px" }}>
                    <Spinner size="3" />
                </Flex>
            ) : (
                <Table.Root variant="surface" >
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Resource Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Resource Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Object.entries(groupedResources).map(([task_id, taskResources]) => (
                            <Fragment key={task_id}>
                                {taskResources.length > 0 ? (
                                    taskResources.map((resource, index) => (
                                        <Table.Row key={resource.resource_id}>
                                            {index === 0 && (
                                                <Table.Cell rowSpan={taskResources.length}>
                                                    <Flex direction="row" align="center" gap="2">
                                                        <Text>{resource.tasks.task_name}</Text> 
                                                        <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
                                                    </Flex>
                                                </Table.Cell>
                                            )}
                                            <Table.Cell>{resource.resource_name}</Table.Cell>
                                            <Table.Cell>{resource.resource_type}</Table.Cell>
                                            <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.cost)}</Table.Cell>
                                            <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.quantity)}</Table.Cell>
                                            <Table.Cell className="align-left">{new Intl.NumberFormat("en-US").format(resource.total)}</Table.Cell>
                                            <Table.Cell>
                                                <Flex gap="2">
                                                    <DialogEditResource getResourceData={getResourceData} resource={resource} />
                                                    <AlertDialogDeleteResource getResourceData={getResourceData} resource_id={resource.resource_id} />
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell>
                                            <Flex direction="row" align="center" gap="2">
                                                <Text>{task_id}</Text> {/* Replace with task name if available */}
                                                <DialogAddResource getResourceData={getResourceData} task_id={task_id} />
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell colSpan={6}>No resources</Table.Cell>
                                    </Table.Row>
                                )}
                            </Fragment>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </Card>
    );
}


