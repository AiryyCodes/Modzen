import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
    "flex flex-row items-center rounded-xl text-white text-center transition-colors font-medium text-md flex flex-row gap-2 w-full",
    {
        variants: {
            variant: {
                default: "bg-blue-500 hover:bg-blue-400",
                plain: "bg-transparent hover:bg-white/15",
            },
            size: {
                default: "h-9 px-4 py-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonProps = {
    label: string;
    onClick?: () => void;

    startElement?: React.ReactNode;
    endElement?: React.ReactNode;

    className?: string;
} & React.ComponentProps<"button"> &
    VariantProps<typeof button>;

const Button = ({
    label,
    onClick,
    startElement,
    endElement,
    className,
    variant,
    size,
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={() => onClick && onClick()}
            className={twMerge(button({ variant, size, className }))}
            {...props}
        >
            {startElement}
            {label}
            {endElement}
        </button>
    );
};

export default Button;
