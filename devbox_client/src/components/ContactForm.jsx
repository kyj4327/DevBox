import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_u399tuc';  // EmailJS에서 제공하는 서비스 ID
    const templateID = 'template_rne728b';  // EmailJS에서 제공하는 템플릿 ID
    const userID = 'YS3dcD42PIGwJsmda';  // EmailJS에서 제공하는 Public Key (User ID)

    emailjs.send(serviceID, templateID, {
      to_name: formData.name,        // 문의자 이름
      from_email: formData.email,    // 문의자 이메일
      from_phone: formData.phone,    // 문의자 전화번호
      subject: formData.subject,     // 이메일 주제
      message: formData.message      // 메시지 내용
    }, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
        setError('');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setError('Error sending email. Please try again later.');
      });
  };

  return (
    <form className="contact-form row" onSubmit={handleSubmit}>
      {isSubmitted && <div className="alert alert-success">Message sent successfully!</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input 
            type="text" 
            className="form-control form-control-lg light-300" 
            id="floatingname" 
            name="name" 
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingname" className="light-300">성함</label>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input 
            type="email" 
            className="form-control form-control-lg light-300" 
            id="floatingemail" 
            name="email" 
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingemail" className="light-300">이메일</label>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input 
            type="text" 
            className="form-control form-control-lg light-300" 
            id="floatingphone" 
            name="phone" 
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingphone" className="light-300">전화번호</label>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="form-floating">
          <input 
            type="text" 
            className="form-control form-control-lg light-300" 
            id="floatingsubject" 
            name="subject" 
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingsubject" className="light-300">문의제목</label>
        </div>
      </div>
      <div className="col-12">
        <div className="form-floating mb-3">
          <textarea 
            className="form-control light-300" 
            rows="8" 
            placeholder="Message" 
            id="floatingtextarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <label htmlFor="floatingtextarea" className="light-300">문의내용</label>
        </div>
      </div>
      <div className="col-md-12 col-12 m-auto text-end">
        <button type="submit" className="btn btn-secondary rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300">Send Message</button>
      </div>
    </form>
  );
};

export default ContactForm;
