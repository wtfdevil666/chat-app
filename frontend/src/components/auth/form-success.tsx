import { CiCircleCheck } from "react-icons/ci";

export const FormSuccess = ({ children }: { children: React.ReactNode }) => {
    if (!children) {
        return null;
    }

    return (
        <div className="bg-emerald-100 w-full h-auto rounded-md flex flex-row items-center text-emerald-800 space-x-2">
            <div className="p-1">
                <CiCircleCheck className="w-[25px] h-[25px]" />
            </div>
            <div>{children}</div>
        </div>
    );
};
