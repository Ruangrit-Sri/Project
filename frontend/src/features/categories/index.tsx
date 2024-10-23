import { useEffect, useState } from "react";
import { Card , Table } from "@radix-ui/themes";
import { getCategories } from "@/services/category.service";
import {TypeCategoriesAll} from "@/types/response/response.category";

export default function CategoriesFeature(){
    const [categories, setCategories] = useState<TypeCategoriesAll[]>([]);

    const getCategoriesDate = () => {
        getCategories().then((res) => {
            console.log(res);
            
            setCategories(res.responseObject);
        })
    }

    useEffect (() => {
        getCategoriesDate();
    }, []);

    return (
        <div className="coutainer w-full pt-2 ">
            <Card variant="surface" className="w-600 m-auto">
                <div className="w-full mt-2">
                    <Table.Root variant="surface">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>category Name</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {categories && categories.map((category: TypeCategoriesAll) => (
                                <Table.Row key={category.id}>
                                <Table.RowHeaderCell>{category.id}</Table.RowHeaderCell>
                                <Table.Cell>{category.category_name}</Table.Cell>
                                <Table.Cell>edit</Table.Cell>
                                <Table.Cell>delete</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </Card>
        </div>
    );
}