import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validations, setValidations] = useState({
    name: true,
    email: true,
    phone: true,
    subject: true,
    message: true,
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      let formattedValue = "";
      if (numericValue.length <= 3) {
        formattedValue = numericValue;
      } else if (numericValue.length <= 7) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      } else {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          7
        )}-${numericValue.slice(7)}`;
      }

      setFormData({ ...formData, [name]: formattedValue });
      setValidations((prev) => ({
        ...prev,
        phone: /^\d{3}-\d{4}-\d{4}$/.test(formattedValue),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
      setValidations((prev) => ({
        ...prev,
        [name]: value.trim() !== "",
      }));
    }
  };

  const validateForm = () => {
    const newValidations = {
      name: formData.name.trim() !== "",
      email: /^\S+@\S+\.\S+$/.test(formData.email),
      phone: /^\d{3}-\d{4}-\d{4}$/.test(formData.phone),
      subject: formData.subject.trim() !== "",
      message: formData.message.trim() !== "",
    };
    setValidations(newValidations);
    return Object.values(newValidations).every((isValid) => isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError("");
    setIsLoading(true);

    if (!validateForm()) {
      setError("입력값을 확인해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/contact/send`,
        formData
      );

      console.log("성공:", response.data);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("오류:", error.response?.data || error.message);
      setError("문의 전송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="contact-form-container contact-form row" onSubmit={handleSubmit}>
      {isLoading && (
        <div className="alert alert-info">문의사항 전송에는 잠시의 시간이 소요되니, 성공 메시지가 나오는 것을 기다려주세요.</div>
      )}
      {isSubmitted && !error && (
        <div className="alert alert-success">문의가 성공적으로 전송되었습니다!</div>
      )}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input
            type="text"
            className={`form-control form-control-lg light-300 ${
              !validations.name ? "is-invalid" : ""
            }`}
            id="floatingname"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="floatingname" className="light-300">
            성함
          </label>
          {!validations.name && (
            <div className="invalid-feedback">이름을 입력해주세요.</div>
          )}
        </div>
      </div>
      <div className="col-lg-6 mb-4">
  <div className="form-floating">
    <input
      type="text" // type을 text로 변경
      className={`form-control form-control-lg light-300 ${
        !validations.email ? "is-invalid" : ""
      }`}
      id="floatingemail"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />
    <label htmlFor="floatingemail" className="light-300">
      이메일
    </label>
    {!validations.email && (
      <div className="invalid-feedback">
        유효한 이메일 주소를 입력해주세요.
      </div>
    )}
  </div>
</div>

      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input
            type="text"
            className={`form-control form-control-lg light-300 ${
              !validations.phone ? "is-invalid" : ""
            }`}
            id="floatingphone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="floatingphone" className="light-300">
            전화번호
          </label>
          {!validations.phone && (
            <div className="invalid-feedback">
              전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input
            type="text"
            className={`form-control form-control-lg light-300 ${
              !validations.subject ? "is-invalid" : ""
            }`}
            id="floatingsubject"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <label htmlFor="floatingsubject" className="light-300">
            문의제목
          </label>
          {!validations.subject && (
            <div className="invalid-feedback">문의 제목을 입력해주세요.</div>
          )}
        </div>
      </div>
      <div className="col-12">
        <div className="form-floating mb-3">
          <textarea
            className={`form-control light-300 ${
              !validations.message ? "is-invalid" : ""
            }`}
            rows="8"
            placeholder="Message"
            id="floatingtextarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <label htmlFor="floatingtextarea" className="light-300">
            문의내용
          </label>
          {!validations.message && (
            <div className="invalid-feedback">문의 내용을 입력해주세요.</div>
          )}
        </div>
      </div>
      <div className="col-md-12 col-12 m-auto text-end">
        <button
          type="submit"
          className="contact-button btn-secondary rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
          disabled={isLoading}
        >
          문의하기
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
