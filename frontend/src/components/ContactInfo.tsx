import React from 'react';

const ContactInfo = () => (
  <section className="contact-info-one">
    <div className="container">
      <ul className="list-unstyled contact-info-one__list">
        <li>
          <div className="contact-info-one__single">
            <div className="contact-info-one__icon">
              <span className="icon-envelope"></span>
            </div>
            <div className="contact-info-one__content">
              <p className="contact-info-one__sub-title">Email Address:</p>
              <h5 className="contact-info-one__email">
                <a href="mailto:info@example.com">info@example.com</a>
              </h5>
            </div>
          </div>
        </li>
        <li>
          <div className="contact-info-one__single">
            <div className="contact-info-one__icon">
              <span className="icon-phone"></span>
            </div>
            <div className="contact-info-one__content">
              <p className="contact-info-one__sub-title">Phone Number</p>
              <h5 className="contact-info-one__email">
                <a href="tel:001239957689">+00 123 (99) 57689</a>
              </h5>
            </div>
          </div>
        </li>
        <li>
          <div className="contact-info-one__single">
            <div className="contact-info-one__icon">
              <span className="icon-location"></span>
            </div>
            <div className="contact-info-one__content">
              <p className="contact-info-one__sub-title">Our Address</p>
              <h5 className="contact-info-one__email">1234 Elm Street Springfield,</h5>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
);

export default ContactInfo;
