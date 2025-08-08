"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = formatZodError;
function formatZodError(err, inputData) {
    const errors = {};
    const error = JSON.parse(err);
    error === null || error === void 0 ? void 0 : error.forEach((error) => {
        const field = error.path.join(".");
        errors[field] = {
            message: error.message,
            name: "ValidatorError",
            properties: Object.assign({ message: error.message, type: error.code }, (error.code === "too_small" && { min: 0 })),
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
