// import { useState } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Button } from "@radix-ui/themes";

// export default function DialogAddTask({ addTask }) {
//     const [name, setName] = useState("");
//     const [startWeek, setStartWeek] = useState(0);
//     const [endWeek, setEndWeek] = useState(0);

//     const handleSave = () => {
//         addTask({ name, startWeek, endWeek });
//         setName("");
//         setStartWeek(0);
//         setEndWeek(0);
//     };

//     return (
//         <Dialog.Root>
//             <Dialog.Trigger asChild>
//                 <Button>New Task</Button>
//             </Dialog.Trigger>
//             <Dialog.Portal>
//                 <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
//                 <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <Dialog.Title>Add New Task</Dialog.Title>
//                     <form onSubmit={(e) => e.preventDefault()}>
//                         <div className="mb-4">
//                             <label>Task Name</label>
//                             <input
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="border p-2 w-full"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label>Start Week</label>
//                             <input
//                                 type="number"
//                                 value={startWeek}
//                                 onChange={(e) => setStartWeek(Number(e.target.value))}
//                                 className="border p-2 w-full"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label>End Week</label>
//                             <input
//                                 type="number"
//                                 value={endWeek}
//                                 onChange={(e) => setEndWeek(Number(e.target.value))}
//                                 className="border p-2 w-full"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             onClick={handleSave}
//                             className="bg-green-500 text-white px-4 py-2 rounded"
//                         >
//                             Save
//                         </button>
//                     </form>
//                 </Dialog.Content>
//             </Dialog.Portal>
//         </Dialog.Root>
//     );
// }

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { PayloadCreateTask } from "@/types/requests/request.task";

export default function DialogAddTask({ addTask }: { addTask: (task: PayloadCreateTask) => void }) {
    const [task, setTask] = useState<PayloadCreateTask>({
        task_name: "",
        description: "",
        budget: undefined,
        start_date: "",
        end_date: "",
        status: false,
    });

    const handleSave = () => {
        if (task.task_name) {
            addTask(task);
            setTask({ task_name: "", description: "", budget: undefined, start_date: "", end_date: "", status: false });
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>เพิ่ม Task ใหม่</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Title>เพิ่ม Task ใหม่</Dialog.Title>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label>ชื่อ Task</label>
                            <input
                                type="text"
                                value={task.task_name}
                                onChange={(e) => setTask({ ...task, task_name: e.target.value })}
                                className="border p-2 w-full"
                            />
                        </div>
                        {/* เพิ่ม input สำหรับ start_date, end_date ฯลฯ */}
                        <button
                            type="submit"
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            บันทึก
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
