// export default function Planning() {

//   return (
//                 <div className="relative">
//             {/* Header */}
//             <div className="grid grid-cols-6 gap-4 border-b pb-2">
//                 <div>Task</div>
//                 <div>Start</div>
//                 <div>End</div>
//                 <div className="col-span-3">Timeline</div>
//             </div>
//             {/* Rows */}
//             <div className="space-y-2">
//                 <div className="grid grid-cols-6 gap-4 items-center">
//                 <div>Task 1</div>
//                 <div>2024-12-01</div>
//                 <div>2024-12-10</div>
//                 <div className="col-span-3 relative">
//                     {/* Gantt bar */}
//                     <div className="absolute left-[20%] w-[30%] bg-blue-500 h-4 rounded"></div>
//                 </div>
//                 </div>
//                 <div className="grid grid-cols-6 gap-4 items-center">
//                 <div>Task 2</div>
//                 <div>2024-12-05</div>
//                 <div>2024-12-15</div>
//                 <div className="col-span-3 relative">
//                     {/* Gantt bar */}
//                     <div className="absolute left-[50%] w-[40%] bg-green-500 h-4 rounded"></div>
//                 </div>
//                 </div>
//             </div>
//             </div>       
//   );
// }



// import { useState } from "react";
// import { Card, Table, Text, Flex, Button } from "@radix-ui/themes";
// import DialogAddTask from "./components/DialogAddTask";

// const months = ["August", "September", "October"];
// const weeks = ["week1", "week2", "week3", "week4"];

// export default function Planning() {
//     const [tasks, setTasks] = useState([]);

//     const addTask = (task) => {
//         setTasks([...tasks, task]);
//     };

//     return (
//         <Card className="p-4">
//             <Flex justify="between" align="center" className="mb-4">
//                 <Text size="5" weight="bold">Project Planning</Text>
//                 <DialogAddTask addTask={addTask} />
//             </Flex>
//             <Table.Root>
//                 <Table.Header>
//                     <Table.Row>
//                         <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
//                         {months.map((month) => (
//                             <Table.ColumnHeaderCell colSpan={4} key={month}>
//                                 {month}
//                             </Table.ColumnHeaderCell>
//                         ))}
//                     </Table.Row>
//                     <Table.Row>
//                         <Table.ColumnHeaderCell />
//                         {months.map((month) =>
//                             weeks.map((week) => (
//                                 <Table.ColumnHeaderCell key={`${month}-${week}`}>
//                                     {week}
//                                 </Table.ColumnHeaderCell>
//                             ))
//                         )}
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                     {tasks.map((task, index) => (
//                         <Table.Row key={index}>
//                             <Table.RowHeaderCell>{task.name}</Table.RowHeaderCell>
//                             {months.flatMap(() => weeks).map((_, weekIndex) => (
//                                 <Table.Cell key={weekIndex}>
//                                     {task.startWeek <= weekIndex && task.endWeek >= weekIndex && (
//                                         <div className="bg-blue-500 h-2 rounded"></div>
//                                     )}
//                                 </Table.Cell>
//                             ))}
//                         </Table.Row>
//                     ))}
//                 </Table.Body>
//             </Table.Root>
//         </Card>
//     );
// }

// import { useState } from "react";
// import { Card, Table, Text, Flex } from "@radix-ui/themes";
// import DialogAddTask from "./components/DialogAddTask";
// import ProgressBar from "./components/ProgressBar";

// export default function AdminTaskPage() {
//     const [tasks, setTasks] = useState([]);

//     const addTask = (task) => {
//         setTasks([...tasks, task]);
//     };

//     return (
//         <Card variant="surface">
//             <Flex className="w-full" direction="row" justify="between" align="center" gap="2">
//                 <Text size="4" weight="bold">
//                     Project Planning
//                 </Text>
//             </Flex>
            
//             <DialogAddTask addTask={addTask} />
//             <div className="w-full mt-4">
//                 <Table.Root>
//                     <Table.Header>
//                         <Table.Row>
//                             <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Budget</Table.ColumnHeaderCell>
//                             <Table.ColumnHeaderCell>Progress</Table.ColumnHeaderCell>
//                         </Table.Row>
//                     </Table.Header>
//                     <Table.Body>
//                         {tasks.map((task, index) => (
//                             <Table.Row key={index}>
//                                 <Table.RowHeaderCell>{task.name}</Table.RowHeaderCell>
//                                 <Table.Cell>{task.budget}</Table.Cell>
//                                 <Table.Cell>
//                                     <ProgressBar startDate={task.startDate} endDate={task.endDate} />
//                                 </Table.Cell>
//                             </Table.Row>
//                         ))}
//                     </Table.Body>
//                 </Table.Root>
//             </div>
//         </Card>
//     );
// }

import { useEffect, useState } from "react";
import { Card, Table, Text, Flex, Button } from "@radix-ui/themes";
import DialogAddTask from "./components/DialogAddTask";
import ProgressBar from "./components/ProgressBar";
import { getRole, postRole } from "@/services/task.service";
import { TypeTask } from "@/types/response/response.task";
import { PayloadCreateTask } from "@/types/requests/request.task";

const months = ["August", "September", "October"];
const weeks = ["week1", "week2", "week3", "week4"];

export default function Planning() {
    const [tasks, setTasks] = useState<TypeTask[]>([]);

    // ดึงข้อมูล Task เมื่อ Component โหลด
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getRole();
                setTasks(response.responseObject); // สมมติว่า API คืนค่าเป็น Array
            } catch (error) {
                console.error("ไม่สามารถดึงข้อมูล Task ได้:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (task: PayloadCreateTask) => {
        try {
            const response = await postRole(task);
            setTasks((prev) => [...prev, response.responseObject]);
        } catch (error) {
            console.error("ไม่สามารถเพิ่ม Task ได้:", error);
        }
    };

    return (
        <Card className="p-4">
            <Flex justify="between" align="center" className="mb-4">
                <Text size="5" weight="bold">Project Planning</Text>
                <DialogAddTask addTask={addTask} />
            </Flex>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell> Task Name</Table.ColumnHeaderCell>
                        {months.map((month) => (
                            <Table.ColumnHeaderCell colSpan={4} key={month}>
                                {month}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                    <Table.Row>
                        <Table.ColumnHeaderCell />
                        {months.map((month) =>
                            weeks.map((week) => (
                                <Table.ColumnHeaderCell key={`${month}-${week}`}>
                                    {week}
                                </Table.ColumnHeaderCell>
                            ))
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tasks.map((task) => (
                        <Table.Row key={task.task_id}>
                            <Table.RowHeaderCell>
                                {task.task_name}
                                <ProgressBar
                                    startDate={task.start_date || ""}
                                    endDate={task.end_date || ""}
                                />
                            </Table.RowHeaderCell>
                            {months.flatMap(() => weeks).map((_, weekIndex) => (
                                <Table.Cell key={weekIndex}>
                                    {/* การจัดรูปแบบเงื่อนไขของสัปดาห์ */}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
}
