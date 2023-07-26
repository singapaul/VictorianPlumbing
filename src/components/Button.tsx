type ButtonProps = {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
};

const Button = ({ label, type, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    >
      {label}
    </button>
  );
};

export default Button;
