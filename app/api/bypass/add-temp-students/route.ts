import {db} from "@/lib/db";
import {generateRandomName, getRandomInt} from "@/lib/utils";
import {Parent, Prisma, Student, User, UserRole} from "@prisma/client";
import {randomUUID} from "crypto";
import {NextRequest, NextResponse} from "next/server";

type TempStudent = {
    student:
        | (Student & {
              parents: {
                  parent: {
                      user: User;
                  } & Parent;
              }[];
          })
        | null;
} & User;

interface Body {
    numOfStudents: number;
    withParent: boolean;
}

export async function POST(req: NextRequest) {
    const {numOfStudents} = (await req.json()) as Body;
    const students: TempStudent[] = await createManyStudents(
        numOfStudents,
        true
    );

    return NextResponse.json(students, {status: 200});
}

async function createManyStudents(
    numOfStudents: number,
    withParents: boolean
): Promise<TempStudent[]> {
    const students: TempStudent[] = [];
    for (let i = 1; i <= numOfStudents; i++) {
        const parents = withParents
            ? await createManyParents(getRandomInt(1, 3))
            : null;
        const s = await db.user.create({
            data: createStudentData(parents),
            include: {
                student: {
                    include: {
                        parents: {
                            include: {
                                parent: {
                                    include: {
                                        user: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        students.push(s);
    }

    return students;
}

async function createManyParents(
    numOfParents: number
): Promise<Prisma.ChildrenParentsCreateManyChildInputEnvelope> {
    const parents: Prisma.ChildrenParentsCreateManyChildInput[] = [];
    for (let i = 1; i <= numOfParents; i++) {
        const p = await db.user.create({
            data: createParentData(),
            include: {
                parent: true,
            },
        });

        parents.push({
            parentId: p.parent!.id,
        });
    }

    return {
        data: parents,
        skipDuplicates: true,
    } as Prisma.ChildrenParentsCreateManyChildInputEnvelope;
}

function createParentData() {
    return {
        ...genBaseData("PARENT", 1976),
        parent: {
            create: {},
        },
    } as Prisma.UserCreateInput;
}

function createStudentData(
    parents: Prisma.ChildrenParentsCreateManyChildInputEnvelope | null
) {
    return {
        ...genBaseData("STUDENT", 2007),
        student: {
            create: {
                discount: getRandomInt(0, 50),
                parents: {
                    createMany: parents,
                },
            },
        },
    } as Prisma.UserCreateInput;
}

function genBaseData(
    role: UserRole,
    birthYear: number
): Prisma.UserCreateInput {
    const firstName = generateRandomName();
    const lastName = generateRandomName();
    const gender = getRandomInt(0, 1) === 0 ? "MALE" : "FEMALE";

    return {
        referId: randomUUID(),
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}${lastName}@gmail.com`,
        birthday: `${birthYear}-${getRandomInt(10, 12)}-${getRandomInt(10, 30)}T00:00:00z`,
        role: role,
        gender: gender,
    } as Prisma.UserCreateInput;
}
