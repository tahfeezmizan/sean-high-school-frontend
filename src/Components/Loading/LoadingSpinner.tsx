"use client"

export default function LoadingSpinner({
    size = "md",
    color = "primary",
}: {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "white" | "gray";
    

}) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-12 w-12 border-[3px]",
        lg: "h-20 w-20 border-5"
    };

    const colorClasses = {
        primary: "border-t-blue-500 border-blue-200",
        white: "border-t-white border-white/30",
        gray: "border-t-gray-400 border-gray-200"
    };

    return (
        <div className={`flex items-center justify-center`}>
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} 
        animate-spin rounded-full`}
            />
        </div>
    );
}