// import { Gender } from "@prisma/client";
// import { z } from "zod";

// const HasId = z.object({
//     userId: z.string({
//         required_error: "UserId is required",
//     }),
//     //role:,
// })

// const PatchUserSchema = z.object({
//     phoneNumber: z
//         .string({
//             invalid_type_error: "Phone number must be a string",
//             description: "Phone number of the teacher",
//         })
//         .min(9, "Phone number is too short"),
//     identifyCard: z.string({
//         invalid_type_error: "ID card must be a string",
//         description: "ID card of the teacher",
//     }),
//     birthday: z.coerce
//         .date({
//             invalid_type_error: "Birthday must be a date",
//             required_error: "Birthday is required",
//             description: "Birthday of user",
//         }),
//     gender: z
//         .nativeEnum(Gender, {
//             invalid_type_error: 'Gender must be "MALE" or "FEMALE"',
//             description: "Gender of user",
//         }),
//     createdAt: z.coerce
//         .date({
//             invalid_type_error: "CreatedAt must be a date",
//             description: "CreatedAt of user",
//         }),
//     updatedAt: z.coerce
//         .date({
//             invalid_type_error: "UpdatedAt must be a date",
//             description: "UpdatedAt of user",
//         })
// })
//     .partial()
//     .strict()
