import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

interface InputProps<T extends FieldValues> {
  name: Path<T>; // Ensure the name is a valid path in T
  label?: string; // Optional label
  control: Control<T>; // Use Control<T> for proper typing
  defaultValue?: PathValue<T, Path<T>>; // Align defaultValue with the field's type
  rules?: object; // Validation rules
  [x: string]: unknown; // Additional props for respective input components
}

const DateInput = <T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  rules = {},
  ...props
}: InputProps<T>) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue as PathValue<T, Path<T>>}
    rules={rules}
    render={({ field, fieldState }) => (
      <DatePicker
        {...field}
        label={label}
        slotProps={{
          textField: {
            variant: 'outlined',
            error: !!fieldState.error,
            helperText: fieldState.error?.message || '',
            ...props,
          },
        }}
      />
    )}
  />
);

export default DateInput;
