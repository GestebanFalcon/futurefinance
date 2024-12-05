import { date, number, object, string } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required"),
});

export const registerSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required"),
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required")
});

//Will not include userId as it is accessed later through session after schema checking
//The rest of the fields are autofilled
export const createBankAccountSchema = object({
    name: string({ required_error: "Name is required" })
        .min(1, "Name is required"),
    type: string()
        .optional(),

});

//Will include bankAccountId as it is passed by the client before being verified against the user, before any database calls are made
export const createTransactionSchema = object({
    location: string()
        .optional(),
    category: string({ required_error: "Category is required" })
        .min(1, "Category is required"),
    bankAccountId: string({ required_error: "Bank account ID is required" })
        .min(36, "Must be valid UUID")
        .max(36, "Must be valid UUID"),
    date: date({ required_error: "Date is required" }),
    value: number({ required_error: "Value is required" })


})

export const editBankAccountSchema = object({

})

export const getTransactionsSchema = object({
    id: string({ required_error: "Id is required" })
        .min(36, "Must be a valid UUID")
        .max(36, "Must be a valid UUID")
})