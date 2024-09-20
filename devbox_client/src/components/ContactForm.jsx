import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false); // 폼 제출 시 성공 상태 초기화
    setError(''); // 폼 제출 시 에러 상태 초기화
    setIsLoading(true); // 폼 제출 시 로딩 상태로 설정

    try {
       const response = await axios.post('/api/contact/send', formData);

      console.log('성공:', response.data);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // 폼 초기화
    } catch (error) {
      console.error('오류:', error.response?.data || error.message);
      setError('문의 전송 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setIsLoading(false); // 전송 완료 후 로딩 상태 해제
    }
  };

  return (
    <form className="contact-form row" onSubmit={handleSubmit}>
      {isLoading && <div className="alert alert-info">문의사항 전송에는 잠시의 시간이 소요되니, 성공 메시지가 나오는 것을 기다려주세요.</div>}
      {isSubmitted && !error && <div className="alert alert-success">문의가 성공적으로 전송되었습니다!</div>}
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
        <button 
          type="submit" 
          className="btn btn-secondary rounded-pill px-md-5 px-4 py-2 radius-0 text-light light-300"
          disabled={isLoading} // 로딩 중일 때 버튼 비활성화
        >
          문의하기
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
