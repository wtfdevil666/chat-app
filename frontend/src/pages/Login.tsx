import { LoginForm } from "@/components/auth/login-form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex items-center h-screen justify-center ">
            <Card className="w-[400px]">
                <CardHeader className="flex items-center">
                    <CardTitle>Welcome Back!</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Link
                        to={"/register"}
                        className="hover:underline underline-offset-2"
                    >
                        Don't have an Account
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
