import {ActionState, FieldErrors} from "@/lib/create-safe-action";
import {useCallback, useState} from "react";

type Action<TInput, TOutput> = (
    data: TInput
) => Promise<ActionState<TInput, TOutput>>;

export interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {}
) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [fieldErrors, setFieldErrors] = useState<
        FieldErrors<TInput> | undefined
    >(undefined);

    const execute = useCallback(
        async (data: TInput) => {
            setIsLoading(true);
            try {
                const result = await action(data);

                if (result.error) {
                    setError(result.error);
                    options.onError?.(result.error);
                }

                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors);
                }

                if (result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsLoading(false);
                options.onComplete?.();
            }
        },
        [action, options]
    );

    return {
        isLoading,
        error,
        fieldErrors,
        data,
        execute,
    };
};
