type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-deep-brown">
        {label}
      </span>
      {children}
    </label>
  );
}
