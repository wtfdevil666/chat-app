import { RegisterForm } from "@/components/auth/register-form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="flex items-center h-screen justify-center ">
            <Card className="w-[400px]">
                <CardHeader className="flex items-center">
                    <CardTitle>Welcome Back!</CardTitle>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    <Link
                        to={"/login"}
                        className="hover:underline underline-offset-2"
                    >
                        Already have an Account
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
