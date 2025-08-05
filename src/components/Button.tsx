import Link from "next/link";
import React, { FC } from "react";

type Props = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLink?: boolean;
  href?: string;
  variant?: "default" | "black";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: FC<Props> = ({
  title,
  onClick,
  isLink,
  href,
  variant = "default",
  className: classNameProp = "",
  type = "button",
}) => {
  const baseClasses = `cursor-pointer px-8 py-3 text-white font-bold rounded-full transition-colors duration-300 ${classNameProp}`;

  const variantClasses =
    variant === "black"
      ? "bg-black hover:bg-gray-800"
      : "bg-pink-700 hover:bg-pink-800";

  const className = `${baseClasses} ${variantClasses}`;

  if (isLink && href) {
    return (
      <Link href={href} className={className}>
        {title}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} type={type}>
      {title}
    </button>
  );
};

export default Button;
