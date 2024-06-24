import {db} from "@/lib/db";
import {generateRandomName, getRandomInt} from "@/lib/utils";
import {Parent, User} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

type TempParent = User & {
    parent: Parent;
};

interface Body {
    numOfParents: number;
}

export async function POST(req: NextRequest) {
    const {numOfParents} = (await req.json()) as Body;
    const parents: TempParent[] = [];

    for (let i: number = 1; i <= numOfParents; i++) {
        const firstName = generateRandomName();
        const lastName = generateRandomName();
        const gender = getRandomInt(0, 1) === 0 ? "MALE" : "FEMALE";
        const parent = (await db.user.create({
            data: {
                referId: String(i),
                firstName: firstName,
                lastName: lastName,
                email: `${firstName}${lastName}@gmail.com`,
                birthday: `1976-${getRandomInt(10, 12)}-${getRandomInt(10, 30)}T00:00:00z`,
                role: "PARENT",
                gender: gender,
                parent: {
                    create: {},
                },
            },
            include: {
                parent: true,
            },
        })) as TempParent;
        parents.push(parent);
    }

    return NextResponse.json(parents, {status: 200});
}
