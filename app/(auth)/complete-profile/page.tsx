"use client";

import {ReactElement} from "react";
import * as Form from "@radix-ui/react-form";
import {Box, Flex, Grid} from "@radix-ui/themes";
import InputField from "./components/inputField";

const fieldClasses: string =
    "box-border w-full bg-white shadow-[#5EFDD9] inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[18px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_cyan] focus:shadow-[0_0_0_2px_cyan] selection:color-lighCyan selection:bg-lighCyan";
const labelClasses: string =
    "text-[18px] font-medium leading-[35px] text-white";
const messageClasses: string = "text-[14px] text-cyan";
const phonePattern: string = "[0-9]{10}";
// const CCCDPattern: string = "[0-9]{12}";

const CompleteProfilePage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="pt-12">
                <Form.Root className="w-[550px]">
                    <Grid
                        columns={{initial: "1", md: "2"}}
                        gap="3"
                        width="auto"
                    >
                        <Box height="64px">
                            <InputField
                                label="First name"
                                placeholder="Ex. Nguyễn Văn"
                                type="text"
                                hasPattern
                                isRequired
                                message=""
                            />
                        </Box>
                        <Box height="64px">
                            <InputField
                                label="Last name"
                                placeholder="Ex. Nam"
                                type="text"
                                hasPattern
                                isRequired
                                message=""
                            />
                        </Box>
                    </Grid>
                    <Form.Field
                        className="grid mt-[20px] mb-[10px]"
                        name="role"
                    >
                        <div className="flex items-baseline justify-between">
                            <Form.Label className={labelClasses}>
                                You are ... ?
                            </Form.Label>
                            <Form.Message
                                className={messageClasses}
                                match="valueMissing"
                            >
                                Role is required
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <select
                                name="role"
                                defaultValue=""
                                className={fieldClasses}
                                required
                            >
                                <option className="hidden" value="" disabled>
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
                                Phone number start with 0 and has ten characters
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                className={fieldClasses}
                                pattern={phonePattern}
                                placeholder="Ex. 0123 123 132"
                                autoComplete="off"
                                type="text"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="cccd">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className={labelClasses}>
                                CCCD
                            </Form.Label>
                            <Form.Message
                                className={messageClasses}
                                match="patternMismatch"
                            >
                                CCCD start with 0 and has twelve numbers
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                className={fieldClasses}
                                pattern={phonePattern}
                                placeholder="Ex. 0123 0123 0132"
                                autoComplete="off"
                                type="text"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Flex gap="3" justify={"center"}>
                        <Box width="200px" height="">
                            <Form.Submit asChild>
                                <button className="box-border w-full text-black shadow-lighCyan hover:bg-cyan inline-flex h-[40px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-lighCyan focus:outline-none mt-[10px]">
                                    Update profile
                                </button>
                            </Form.Submit>
                        </Box>
                    </Flex>
                </Form.Root>
            </div>
        </>
    );
};

export default CompleteProfilePage;
