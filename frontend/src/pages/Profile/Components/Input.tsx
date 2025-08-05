interface InputProps {
  value: string | number;
  label: string;
  type: string;
  name: string;
  editable: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  label,
  type,
  name,
  editable,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor={name}>{label}</label>
      <input
        className={`max-lg:w-full bg-white px-3 py-1 focus-visible:outline-none rounded-xl text-black w-[400px] ${
          !editable && "text-gray-400"
        }`}
        type={type}
        value={value}
        name={name}
        id={name}
        disabled={!editable}
        onChange={editable ? onChange : undefined}
      />
    </div>
  );
};

export default Input;
