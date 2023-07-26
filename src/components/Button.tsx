import classNames from "classnames";

type ButtonProps = {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

const Button = ({ label, type, onClick, variant = "primary" }: ButtonProps) => {
  const buttonClass = classNames(
    "inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300",
    {
      "bg-blue-700": variant == "primary",
      "bg-green-600": variant == "secondary",
    }
  );
  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {label}
    </button>
  );
};

export default Button;
