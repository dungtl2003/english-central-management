import React from "react";
import * as Form from "@radix-ui/react-form";
import CapitalizeWord from "@/utilities/helper";

type InputProps = {
    label: string;
    placeholder: string;
    type: string;
    isRequired: boolean;
    hasPattern: boolean;
    message: string;
};

const fieldClasses: string =
    "box-border w-full bg-white shadow-[#5EFDD9] inline-flex h-[40px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[18px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_cyan] focus:shadow-[0_0_0_2px_cyan] selection:color-lighCyan selection:bg-lighCyan";
const labelClasses: string =
    "text-[18px] font-medium leading-[35px] text-white";
const messageClasses: string = "text-[14px] text-cyan";
const textPattern: string =
    "[a-zA-ZáàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ]+";

const inputField = (props: InputProps) => {
    return (
        <>
            <Form.Field
                className="grid mb-[10px]"
                name={CapitalizeWord(props.label)}
            >
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelClasses}>
                        {props.label}
                    </Form.Label>

                    {props.isRequired && (
                        <Form.Message
                            className={messageClasses}
                            match="valueMissing"
                        >
                            {`${props.label} is required`}
                        </Form.Message>
                    )}

                    {props.hasPattern && (
                        <Form.Message
                            className={messageClasses}
                            match="patternMismatch"
                        >
                            {"Invalid input"}
                        </Form.Message>
                    )}
                </div>

                <Form.Control asChild>
                    <input
                        className={fieldClasses}
                        {...(props.hasPattern
                            ? {
                                  pattern: textPattern,
                              }
                            : {})}
                        autoComplete="off"
                        type={props.type}
                        placeholder={props.placeholder}
                        {...(props.isRequired && {required: true})}
                    />
                </Form.Control>
            </Form.Field>
        </>
    );
};

export default inputField;
