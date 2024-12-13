import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { TextField, MenuItem, } from '@mui/material';

interface InputProps<T extends FieldValues> {
  name: Path<T>; // Ensure the name is a valid path in T
  label?: string; // Optional label
  control: Control<T>; // Use Control<T> for proper typing
  defaultValue?: PathValue<T, Path<T>>; // Align defaultValue with the field's type
  rules?: object; // Validation rules
  [x: string]: unknown; // Additional props for respective input components
}


const SelectInput = <T extends FieldValues>({
    name,
    label,
    control,
    defaultValue,
    rules = {},
    options,
    ...props
  }: InputProps<T> & { options: { value: string | number; label: string }[] }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message || ''}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
  
  export default SelectInput;
  