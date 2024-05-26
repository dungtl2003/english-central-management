import {z} from "zod";
import {RequestSchema} from "./schema";
import {Class, Student, StudentsInClasses, User} from "@prisma/client";
import {ActionState} from "@/lib/create-safe-action";

// async function getStudentsInClass(classId:string){
//     const students = await db.studentsInClasses.findMany({
//         where:{
//             classId:classId,
//         },
//         include:{
//             student:{
//                 include:{
//                     user:true,
//                     parents:true
//                 }
//             },

//         }
//     })

//     const aClass = await db.class.findFirst({
//         where:{
//             id:"classId",
//         },
//         include:{
//             students:{
//                 include:{
//                     student:{
//                         include:{
//                             user:true
//                         }
//                     }
//                 }
//             }
//         }
//     })
// }

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfStudentsInClass = Class & {
    students: (StudentsInClasses & {
        student: Student & User;
    })[];
}; //students
//type OutputTypeOfStudentsInClass2 = StudentsInClasses & {student:Student & User}[];//aClass
export type ReturnType = ActionState<InputType, OutputTypeOfStudentsInClass>;
