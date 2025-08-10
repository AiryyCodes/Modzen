"use client";

import { Form } from "@/components/Form/Form";
import { FormButton } from "@/components/Form/FormButton";
import { FormInput } from "@/components/Form/FormInput";
import { FormValidation } from "@/components/Form/FormValidation";
import { useUser } from "@/context/UserContext";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";
import Card from "@/components/Card";

const schema = z.object({
    email: z
        .string({ required_error: "Email or username is required" })
        .min(3, { message: "Email or username must be at least 3 characters" })
        .max(36, {
            message: "Email or username must be at most 36 characters",
        }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(255, { message: "Password must be at most 255 characters" }),
});

type LoginForm = z.infer<typeof schema>;

const LoginPage = () => {
    const { user, setUser } = useUser();

    if (user) {
        console.log("User exists.");
        redirect("/");
    }

    const onSubmit = async (
        data: LoginForm,
        methods: UseFormReturn<LoginForm>
    ) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });

        if (!res.ok) {
            const errorResponse = await res.json();
            methods.setError("root", {
                type: "manual",
                message: errorResponse.error || "Invalid email or password",
            });
            return;
        }

        const responseData = await res.json();

        setUser(responseData.user);
    };

    return (
        <Card>
            <h1 className="text-xl font-medium">Sign in</h1>
            <Form
                schema={schema}
                onSubmit={onSubmit}
                className="w-full sm:w-72 max-w-full mx-auto gap-4"
            >
                <FormValidation for="all" />
                <FormInput name="email" label="Email or username" />
                <FormInput name="password" label="Password" type="password" />
                <FormButton>Sign in</FormButton>
                <a href="/auth/register" className="text-white/59 w-fit">
                    Create an account
                </a>
            </Form>
        </Card>
    );
};

export default LoginPage;
