import { Dialog, Button, Flex } from "@radix-ui/themes";
import { deleteResource } from "@/services/resource.service";

interface AlertDialogDeleteResourceProps {
    getResourceData: () => void;
    resource_id: string;
}

const AlertDialogDeleteResource: React.FC<AlertDialogDeleteResourceProps> = ({ getResourceData, resource_id }) => {
    const handleDelete = async () => {
        await deleteResource({ resource_id });
        getResourceData();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color="red" variant="soft" className=" cursor-pointer">Delete</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Delete Resource</Dialog.Title>
                <Flex>
                    <Button variant="soft" onClick={handleDelete} color="red">Confirm</Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AlertDialogDeleteResource;