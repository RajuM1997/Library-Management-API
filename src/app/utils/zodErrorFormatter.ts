import { ZodError } from "zod";

export function formatZodError(err: any, inputData: any) {
  const errors: Record<string, any> = {};
  const error = JSON.parse(err);

  error?.forEach((error: any) => {
    const field = error.path.join(".");
    errors[field] = {
      message: error.message,
      name: "ValidatorError",
      properties: {
        message: error.message,
        type: error.code,
        ...(error.code === "too_small" && { min: 0 }),
      },
      kind: error.code,
      path: field,
      value: inputData[field],
    };
  });

  return {
    message: "Validation failed",
    success: false,
    error: {
      name: "ValidationError",
      errors,
    },
  };
}
