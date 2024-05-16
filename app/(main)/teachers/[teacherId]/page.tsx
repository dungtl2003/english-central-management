"use client";

import {usePathname} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";

const TeacherPage: React.FC = (): ReactNode => {
    const pathname = usePathname();
    const id: string = pathname.substring(pathname.lastIndexOf("/") + 1);
    const [data, setData] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/teachers/${id}`);
            const body = await response.json();
            setData(body);
        }
        fetchData();
    }, []);

    return (
        <>
            <div>This is teacher with ID {id}</div>
            <div>{JSON.stringify(data)}</div>
        </>
    );
};

export default TeacherPage;
