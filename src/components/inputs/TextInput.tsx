import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  name: Path<T>; // Ensure the name is a valid path in T
  label: string;
  control: Control<T>; // Use Control<T> for proper typing
  defaultValue?: PathValue<T, Path<T>>; // Align defaultValue with the field's type
  rules?: object; // Validation rules
  [x: string]: unknown; // Additional props for TextField
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  rules = {},
  ...props
}: TextInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue as PathValue<T, Path<T>>}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        error={!!fieldState.error}
        helperText={fieldState.error?.message || ''}
        {...props}
      />
    )}
  />
);

export default TextInput;
