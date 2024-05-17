"use client";

import {ReactElement} from "react";
import * as Form from "@radix-ui/react-form";
import {Box, Grid} from "@radix-ui/themes";

const fieldClasses: string =
    "box-border w-full bg-white shadow-[#5EFDD9] inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[18px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_cyan] focus:shadow-[0_0_0_2px_cyan] selection:color-lighCyan selection:bg-lighCyan";
const labelClasses: string =
    "text-[18px] font-medium leading-[35px] text-white";
const messageClasses: string = "text-[14px] text-cyan";
const textPattern: string = "[p{L}s]+";
const phonePattern: string = "0d{9}";

const CompleteProfilePage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="pt-12">
                <Form.Root className="w-[600px]">
                    <Grid
                        columns={{initial: "1", md: "2"}}
                        gap="3"
                        width="auto"
                    >
                        <Box height="64px">
                            <Form.Field
                                className="grid mb-[10px]"
                                name="firstName"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className={labelClasses}>
                                        First name
                                    </Form.Label>
                                    <Form.Message
                                        className={messageClasses}
                                        match="valueMissing"
                                    >
                                        First name can not be empty
                                    </Form.Message>
                                    <Form.Message
                                        className={messageClasses}
                                        match="patternMismatch"
                                    >
                                        First name should only contain letters
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        className={fieldClasses}
                                        pattern={textPattern}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Ex: Nguyễn Văn"
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>
                        </Box>
                        <Box height="64px">
                            {" "}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="lastName"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className={labelClasses}>
                                        Last name
                                    </Form.Label>
                                    <Form.Message
                                        className={messageClasses}
                                        match="valueMissing"
                                    >
                                        Last name can not be empty
                                    </Form.Message>
                                    <Form.Message
                                        className={messageClasses}
                                        match="patternMismatch"
                                    >
                                        Last name should only contain letters
                                    </Form.Message>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        className={fieldClasses}
                                        pattern={textPattern}
                                        autoComplete="off"
                                        type="text"
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>
                        </Box>
                    </Grid>
                    <Form.Field
                        className="grid mt-[20px] mb-[10px]"
                        name="lastName"
                    >
                        <div className="flex items-baseline justify-between">
                            <Form.Label className={labelClasses}>
                                You are ... ?
                            </Form.Label>
                        </div>
                        <Form.Control asChild>
                            <select
                                name="role"
                                defaultValue="placeholder"
                                className={fieldClasses}
                            >
                                <option
                                    className="hidden"
                                    value="placeholder"
                                    disabled
                                >
                                    Choose a role ...
                                </option>
                                <option value="teacher" className="">
                                    Teacher
                                </option>
                                <option value="parent" className="">
                                    Parent
                                </option>
                                <option value="student" className="">
                                    Student
                                </option>
                            </select>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="phone">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className={labelClasses}>
                                Phone number
                            </Form.Label>
                            <Form.Message
                                className={messageClasses}
                                match="patternMismatch"
                            >
                                Phone number should only contain numbers
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                className={fieldClasses}
                                pattern={phonePattern}
                                autoComplete="off"
                                type="text"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                        <button className="box-border w-full text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                            Post question
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </>
    );
};

export default CompleteProfilePage;
