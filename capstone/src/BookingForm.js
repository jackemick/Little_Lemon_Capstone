import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

export default function BookingForm({
  availableTimes,
  onSubmit,
  onDateChange,
}) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "",
    name: "",
    email: "",
  });
  const [dateError, setDateError] = useState("");

  const occasionOptions = [
    "Birthday",
    "Anniversary",
    "Date Night",
    "Work Event",
    "Other",
  ];

  const getTodayString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - offset * 60 * 1000);
    return localToday.toISOString().split("T")[0];
  };

  const isPastDate = (value) => {
    if (!value) return false;

    const selectedDate = new Date(`${value}T00:00:00`);
    const todayDate = new Date(`${getTodayString()}T00:00:00`);

    return selectedDate < todayDate;
  };

  const validateGuests = (value) => {
    const guestCount = Number(value);

    if (
      value === "" ||
      Number.isNaN(guestCount) ||
      guestCount < 1 ||
      guestCount > 10
    ) {
      return {
        valid: false,
        message: "Please enter between 1 and 10 guests.",
      };
    }

    return {
      valid: true,
      message: "Guest count is valid.",
    };
  };

  const guestValidation = validateGuests(formData.guests);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const nextDate = e.target.value;

    if (nextDate && isPastDate(nextDate)) {
      setDateError("Please select today or a future date.");
      setFormData((prevData) => ({
        ...prevData,
        date: "",
        time: "",
      }));
      return;
    }

    setDateError("");
    setFormData((prevData) => ({
      ...prevData,
      date: nextDate,
      time: "",
    }));

    if (onDateChange && nextDate) {
      onDateChange(nextDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || isPastDate(formData.date)) {
      setDateError("Please select today or a future date.");
      return;
    }

    if (onSubmit) {
      const formDataToSubmit = {
        ...formData,
        guests: Number(formData.guests),
      };
      setFormData({
        date: "",
        time: "",
        guests: 1,
        occasion: "",
        name: "",
        email: "",
      });
      setDateError("");
      onSubmit(formDataToSubmit);
    }
  };

  const submitDisabled =
    !formData.occasion ||
    !formData.date ||
    !formData.time ||
    !formData.name ||
    !formData.email ||
    !validateGuests(formData.guests).valid;

  const inputField = document.getElementById("name");
  inputField && inputField.addEventListener("input", (event) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    const originalValue = event.target.value;
    const cleanValue = originalValue.replace(/\d/g, "");

    if (originalValue !== cleanValue) {
      event.target.value = cleanValue;

      event.target.setSelectionRange(start - 1, end - 1);
    }
  });

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <CustomSelect
        items={occasionOptions}
        selectedItem={formData.occasion || "Select an occasion"}
        onItemChange={(value) => handleSelectChange("occasion", value)}
        itemType="occasion"
        icon="🎉"
      />
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        name="guests"
        min="1"
        max="10"
        value={formData.guests}
        onChange={handleChange}
        aria-invalid={!guestValidation.valid}
        required
      />
      <div
        className={`guest-validation ${guestValidation.valid ? "valid" : "error"}`}
        aria-live="polite"
      >
        {guestValidation.message}
      </div>

      <label htmlFor="date">Choose date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        min={getTodayString()}
        onChange={handleDateChange}
        required
        aria-invalid={Boolean(dateError)}
      />
      {dateError && (
        <div className="guest-validation error" aria-live="polite">
          {dateError}
        </div>
      )}

      {formData.date && (
        <div className="time-picker">
          <span className="time-picker__label">Available times</span>
          <div
            className="time-tag-list"
            role="listbox"
            aria-label="Available times"
          >
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-tag ${formData.time === time ? "selected" : ""}`}
                onClick={() => handleSelectChange("time", time)}
                aria-pressed={formData.time === time}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        required
      />

      <button disabled={submitDisabled} type="submit">
        Make Your reservation
      </button>
    </form>
  );
}
