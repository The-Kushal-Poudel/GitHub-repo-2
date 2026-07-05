import { useState } from "react";
import { apiUrl } from "../config/api.js";

const initialForm = {
  name: "",
  role: "",
  rating: 5,
  text: "",
};

// URL validation removed

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (form.rating < 1 || form.rating > 5) {
    errors.rating = "Please provide a rating between 1 and 5.";
  }

  if (!form.text.trim()) {
    errors.text = "Please write a review.";
  } else if (form.text.trim().length < 5) {
    errors.text = "Please write a little more.";
  }

  return errors;
}

export function useReviewForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "rating" ? parseInt(value) : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const setRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
    setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  const validateAndProceed = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (googleToken) => {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(apiUrl("/api/reviews"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          role: form.role.trim(),
          rating: form.rating,
          text: form.text.trim(),
          google_token: googleToken,
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
        throw new Error(data.message || "Failed to submit review. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your review has been submitted and is pending approval.",
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
    validateAndProceed,
    handleSubmit,
    setRating,
    isSubmitting,
    status,
  };
}
