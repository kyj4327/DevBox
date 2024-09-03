import React from 'react';
import ContactForm from './ContactForm';
import '../assets/css/contact.css';
import bannerImage from '../assets/img/contact.jpg';

const Contact = () => {
  return (
    <>
      <section className="contact-background">
        <img src={bannerImage} alt="Contact Banner" />
        <div className="container py-4">
          <div className="row align-items-center justify-content-between">
            <div className="contact-header col-lg-4">
              <h1 className="h2 pb-3 text-primary">Contact</h1>
              <h3 className="h4 regular-400">문의사항</h3>
              <p className="light-300">
                부산광역시 해운대구 센텀동로 41
                센텀벤처타운 502호 
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h1 className="col-12 col-xl-8 h2 text-left text-primary pt-3">BDIA에게 궁금한점을 물어보세요!</h1>
        <h2 className="col-12 col-xl-8 h4 text-left regular-400">교육관련, 궁금한점을 직접 문의하세요</h2>
        <p className="col-12 col-xl-8 text-left text-muted pb-5 light-300">
          진행중에 교육과정, 진행예정인 교육과정에 대해 궁금한점을 물어보세요
        </p>

        <div className="row pb-4">
          <div className="col-lg-4">
            <div className="contact row mb-4">
              <div className="contact-icon col-lg-3 col-3">
                <div className="border py-3 mb-2 text-center border rounded text-secondary">
                  <i className='bx bx-laptop display-6' />
                </div>
              </div>
              <ul className="contact-info list-unstyled col-lg-9 col-9 light-300">
                <li className="h5 mb-0">교육문의</li>
                <li className="text-muted">BDIA</li>
                <li className="text-muted">051-749-9354</li>
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
