type Option<T extends string | number> = {
  value: T;
  label: string;
};

type SelectProps<T extends string | number> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function Select<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1 mx-3 my-1">
      <label className="text-xl  text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) =>
          onChange(
            (typeof value === "number"
              ? Number(e.target.value)
              : e.target.value) as T,
          )
        }
        className="cursor-pointer border-white rounded-2xl text-lg bg-gray-800 px-3 py-2 text-white"
      >
        {options.map((option) => (
          <option value={`${option.value}`}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
