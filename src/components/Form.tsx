import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextInput,
  SelectInput,
  Button,
  DateInput,
  CheckboxInput,
} from "./index.ts";
import { useAppContext } from "../contexts/AppContext.tsx";

interface FormValues {
  username: string;
  gender: string;
  birthDate: Date | null;
  termsAccepted: boolean;
}

const MyForm = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const { count, increment, decrement } = useAppContext();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <TextInput<FormValues>
        name="username"
        label="Username"
        control={control}
        defaultValue=""
        rules={{ required: "Username is required" }}
      />
      <SelectInput<FormValues>
        name="gender"
        label="Gender"
        control={control}
        defaultValue=""
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        rules={{ required: "Gender is required" }}
      />
      <DateInput<FormValues>
        name="birthDate"
        label="Birth Date"
        control={control}
        defaultValue={null}
        rules={{ required: "Birth date is required" }}
      />
      <CheckboxInput<FormValues>
        name="termsAccepted"
        label="I accept the terms and conditions"
        control={control}
        defaultValue={false}
        rules={{ required: "You must accept the terms" }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
