import { twMerge } from "tailwind-merge";

type CardProps = {
    children: React.ReactNode;
};

export default function Card({
    children,
    className,
    ...props
}: CardProps & React.ComponentProps<"div">) {
    return (
        <div
            {...props}
            className={twMerge(
                "flex flex-col items-center gap-6 p-6 rounded-xl bg-background-2 border border-background-4",
                className
            )}
        >
            {children}
        </div>
    );
}

export { type CardProps };
