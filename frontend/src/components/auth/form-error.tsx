import { FiAlertTriangle } from "react-icons/fi";

export const FormError = ({ children }: { children: React.ReactNode }) => {
    if (!children) {
        return null;
    }

    return (
        <div className="bg-red-100 w-full h-auto rounded-md flex flex-row items-center text-red-800 space-x-2">
            <div className="p-1">
                <FiAlertTriangle className="w-[25px] h-[25px]" />
            </div>
            <div>{children}</div>
        </div>
    );
};
