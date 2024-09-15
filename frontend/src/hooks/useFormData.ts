import { useState } from "react";

const useFormData = (initialValues: { [key: string]: string }) => {
  // Step 1: Initialize state with the provided initial values
  const [formData, setFormData] = useState(initialValues);

  // Step 2: Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value, // Update the form data for the corresponding field
    });
  };

  function submitForm(formData: any) {
    // api
  }

  return { formData, handleInputChange, submitForm };
};

export default useFormData;
