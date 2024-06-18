import {InputType, ReturnType} from "./types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;
    const referAdminId = data.referAdminId;

    const url = `${protocol}://${domain}/api/admins/${referAdminId}/teachers/${teacherId}`;

    const bodyData = {
        baseSalary: data.baseSalary,
        monthlyPayments: data.monthlyPayments,
        status: data.status,
        acceptedAt: data.acceptedAt,
        deletedAt: data.deletedAt,
    };

    try {
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(bodyData),
        });

        const body = await res.json();
        console.log("Received: ", body);

        if (res.status !== 200) {
            return {error: body}; //TODO: fix later - body not string
        }

        return {data: body};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
