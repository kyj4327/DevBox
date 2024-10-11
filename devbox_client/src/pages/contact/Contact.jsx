import React from "react";
import ContactForm from "../../components/ContactForm";
import "../../assets/css/contact.css";
import bannerImage from "../../assets/img/banner-img-01.svg";
import { Link } from "react-router-dom";
import openChat from "../../assets/img/kakaoOpenChat.jpeg";

const Contact = () => {
  return (
    <>
      <section className="bg-light">
        <div className="container py-4">
          <div className="row align-items-center justify-content-between">
            <div className="contact-header col-lg-7">
              <h1 className="h2 pb-3 text-primary">고객센터</h1>
              <h3 className="h4 regular-400">오류를 찾았거나 개선이 필요한 점이 있다면 언제든지 문의해 주세요!</h3>
              <p className="contact-muted col-12 col-xl-8 text-left text-muted pb-5 light-300">
                여러분의 소중한 의견을 기다리고 있습니다.
              </p>
            </div>
            <div className="faq-img col-lg-5 align-items-end col-md-4">
              <img src={bannerImage} />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row pb-4">
          <div className="col-lg-4">
            <div className="contact row mb-4">
              <div className="contact-icon col-lg-3 col-3">
                <img src={openChat} style={{ width: "80px", height: "80px" }} />
              </div>
              <ul className="contact-info list-unstyled col-lg-9 col-9 light-300">
                <li className="h5 mb-0">DevBox 고객센터</li>
                <li className="contact-muted">오픈카톡</li>
                <li className="contact-muted">
                  <Link to="https://open.kakao.com/o/smHmDjTg" target="_blank">
                  https://open.kakao.com/
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
