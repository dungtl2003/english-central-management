import React from "react";
import * as Form from "@radix-ui/react-form";

type InputProps = {
    label: string;
    isRequired: boolean;
    hasPattern: boolean;
};

const fieldClasses: string =
    "box-border w-full bg-white shadow-[#5EFDD9] inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[18px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_cyan] focus:shadow-[0_0_0_2px_cyan] selection:color-lighCyan selection:bg-lighCyan";
const labelClasses: string =
    "text-[18px] font-medium leading-[35px] text-white";
const messageClasses: string = "text-[14px] text-cyan";
const textPattern: string = "[p{L}s]+";

const inputField = (props: InputProps) => {
    return (
        <>
            <Form.Field className="grid mb-[10px]" name="firstName">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelClasses}>
                        {props.label}
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
        </>
    );
};

export default inputField;
