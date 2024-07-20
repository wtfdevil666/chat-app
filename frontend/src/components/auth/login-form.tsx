import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { FormSuccess } from "./form-success";
import { useState } from "react";
import { FormError } from "./form-error";

const URL = import.meta.env.VITE_BACKEND_URL;
export const LoginForm = () => {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        await axios
            .post(`${URL}/user/login`, {
                email: values.email,
                password: values.password,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setSuccess(res.data.success);
                    setError(null);
                }
                localStorage.setItem("token", res.data.token);
            })
            .catch((err) => {
                setError(err.response.data.error);
                console.log(err.response.data.error);
            });
    };
    return (
        <div>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johndoe@mail.com"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="******"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSuccess>{success}</FormSuccess>
                    <FormError>{error}</FormError>
                    <Button className="w-full">Login</Button>
                </form>
            </Form>
        </div>
    );
};
