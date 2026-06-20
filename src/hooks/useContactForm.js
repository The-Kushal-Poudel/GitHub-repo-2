import { useState } from "react";
import { apiUrl } from "../config/api.js";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Please add a little more detail.";
  }

  return errors;
}

export function useContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before sending.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(apiUrl("/api/messages"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Validation errors returned from Laravel
        if (data.errors) {
          const formErrors = {};
          Object.keys(data.errors).forEach((key) => {
            formErrors[key] = data.errors[key][0];
          });
          setErrors(formErrors);
          throw new Error(data.message || "Validation failed.");
        }
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    errors,
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    status,
  };
}
