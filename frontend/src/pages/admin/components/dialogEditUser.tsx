import {Text, Dialog, Button, Flex, TextField,Strong} from "@radix-ui/themes";
import { patchUser } from "@/services/user.service";
import { useState } from "react";
// import { error } from "console";
// import { eventNames } from "process";

type DialogUserProps = {
    getUserData: Function;
    user_id: string;
    username: string;
    role: string;

}
const DialogEdit = ({getUserData ,user_id ,username, role} : DialogUserProps) => {
    const [patchUserName, setpatchUserName] = useState("");

    const handleUpdateUser = async () => {
        if (!patchUserName) {
        alert("Please enter a username.");
        return;
        }

        patchUser({
             user_id: user_id,
             username: patchUserName, 
             role : role,
            })

            .then((response) => {
                if (response.statusCode === 200){
                    setpatchUserName("");
                    getUserData();
                } else if (response.statusCode === 400) {
                    alert( response.message);
                } else {
                    alert("Unexpected error:" + response.message);
                }
            })
            .catch((error) => {
                console.error("Error updating user", error.response?.date || error.message);
                alert ("Failed to update user. Please try again.");
            });
    };

    return (
        <Dialog.Root>
        <Dialog.Trigger>
            <Button size="1" color="orange" variant="soft">Edit</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Edit User</Dialog.Title>
            <Flex direction="column" gap="3">
                <label>
                    <Text size="2"><Strong>Id : </Strong>{user_id}</Text>
                </label>
                <label>
                    <Text size="2"><Strong>Current Username : </Strong>{username}</Text>
                </label>
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                    New Username
                </Text>
                <TextField.Root
                    defaultValue=""
                    placeholder="Enter your category name"
                    onChange={(event) => setpatchUserName (event.target.value)}
                />
            </label>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button onClick={handleUpdateUser}>Edit</Button>
                </Dialog.Close>.
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    )
};


export default DialogEdit