type FieldErrorProps = {
  message?: string;
};

export function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-[#9A4A3F]">{message}</p>;
}
