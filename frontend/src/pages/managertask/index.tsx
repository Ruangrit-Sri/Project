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

import React, { useState, useEffect } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import DialogAddTask from "./components/DialogAddTask";
import ProgressBar from "./components/ProgressBar";
import { getTask, postTask } from "@/services/task.service"; // Replace with your API calls

export default function Planning() {
    const [schedulerData] = useState(new SchedulerData("2025-01-01", ViewTypes.Week));
    const [tasks, setTasks] = useState([]);

    // Fetch existing tasks from the API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTask();
                setTasks(response.responseObject); // Assuming API returns an array of tasks
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await postTask(task);
            setTasks((prev) => [...prev, response.responseObject]);
            schedulerData.addEvent({
                id: response.responseObject.task_id,
                start: task.start_date,
                end: task.end_date,
                title: task.task_name,
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Project Planning</h1>
                <DialogAddTask addTask={addTask} />
            </div>
            <div className="border rounded-lg overflow-hidden">
                <Scheduler
                    schedulerData={schedulerData}
                    events={tasks.map((task) => ({
                        id: task.task_id,
                        start: task.start_date,
                        end: task.end_date,
                        title: task.task_name,
                    }))}
                    eventItemClick={(event) => alert(`Clicked: ${event.title}`)}
                    slotClickedFunc={(slot) => console.log(`Slot clicked: ${slot}`)}
                />
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Task Progress</h2>
                {tasks.map((task) => (
                    <div key={task.task_id} className="mb-4">
                        <h3 className="font-medium">{task.task_name}</h3>
                        <ProgressBar startDate={task.start_date} endDate={task.end_date} />
                    </div>
                ))}
            </div>
        </div>
    );
}
