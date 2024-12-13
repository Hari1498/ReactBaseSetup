import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';
import {  Checkbox, FormControlLabel } from '@mui/material';

interface InputProps<T extends FieldValues> {
  name: Path<T>; // Ensure the name is a valid path in T
  label?: string; // Optional label
  control: Control<T>; // Use Control<T> for proper typing
  defaultValue?: PathValue<T, Path<T>>; // Align defaultValue with the field's type
  rules?: object; // Validation rules
  [x: string]: unknown; // Additional props for respective input components
}

const CheckboxInput = <T extends FieldValues>({
    name,
    label,
    control,
    defaultValue = false as PathValue<T, Path<T>>, // Default to false for checkboxes
    rules = {},
    ...props
  }: InputProps<T>) => (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>} // Explicitly cast
      rules={rules}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={!!field.value} {...props} />} // Ensure checked is a boolean
          label={label || ''}
        />
      )}
    />
  );
  
  export default CheckboxInput;
  
  