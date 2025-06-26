"use client";
import React from "react";
import "./ContactUs.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const ContactUs = () => {
  const [form, setform] = React.useState({
    userName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [phone, setPhone] = React.useState();
  const [feedback, setFeedback] = React.useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(value);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: phone || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ type: "success", message: data.message });
        setform({ userName: "", email: "", subject: "", message: "" });
        setPhone("");
      } else {
        setFeedback({
          type: "error",
          message: data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to send message. Try again!",
      });
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      setFeedback({
        type: "error",
        message: "Please enter a valid phone number.",
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    setTimeout(() => {
      setFeedback(null);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-hidden">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mt-1 md:mt-7">
        {" "}
        Contact Us
      </div>

      <div className="desc mt-10 font-bold text-sm md:text-lg sm:text-md lg:text-xl text-center">
        {" "}
        <p>
          {" "}
          We'd love to hear from you! Reach out with your questions, feedback,
          or suggestions.
        </p>
      </div>
      <form className="flex flex-col" onSubmit={HandleSubmit}>
        <div className="w-full relative flex flex-col md:flex-row gap-5 mt-5 items-center justify-center">
          <div>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Your Name*"
              onChange={handleChange}
              value={form.userName}
              required
              className="bg-white rounded-lg p-2 font-semibold w-80 lg:w-100"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address*"
              onChange={handleChange}
              value={form.email}
              required
              className="bg-white rounded-lg p-2 font-semibold w-80 lg:w-100"
            />
          </div>
        </div>
        <div className="w-full relative flex flex-col md:flex-row gap-5 mt-5 items-center justify-center">
          <div>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              className="bg-white rounded-lg p-2 font-semibold w-80 lg:w-100 outline-none"
              onChange={setPhone}
              value={phone}
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="What's on your mind"
              onChange={handleChange}
              value={form.subject}
              required
              className="bg-white rounded-lg p-2 font-semibold w-80 lg:w-100"
            />
          </div>
        </div>
        <div className="relative">
          <textarea
            name="message"
            id="message"
            onChange={handleChange}
            value={form.message}
            placeholder="Lets talk about*"
            required
            className="bg-white mt-7 w-full h-30 rounded-lg p-2 font-semibold"
          ></textarea>
        </div>
        <div className="relative flex justify-center items-center">
          <button
            disabled={loading}
            type="submit"
            className={`bg-gradient-to-r from-pink-600 to-purple-800 p-2 w-[50%] mt-7 rounded-lg hover:from-pink-400 hover:to-purple-600 font-semibold hover:text-white text-xl transition-all duration-100 ease-in ${
              loading && "text-green-600"
            }`}
          >
            {loading ? "Sending Message..." : "Send Message"}
          </button>
        </div>
      </form>
      {feedback && (
        <div
          className={`flex items-center justify-center mt-4 ${
            feedback.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default ContactUs;
