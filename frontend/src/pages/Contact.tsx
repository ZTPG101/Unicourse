import PageHeader from "../components/PageHeader";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Contact" }];

interface ContactInfo {
  icon: string;
  title: string;
  content: React.ReactNode;
}

const contactInfo: ContactInfo[] = [
  {
    icon: "/assets/images/icon/contact-two-icon-1.png",
    title: "Our Address",
    content: (
      <>
        3149 New Creek Road, Huntsville,
        <br /> Alabama, USA
      </>
    ),
  },
  {
    icon: "/assets/images/icon/contact-two-icon-2.png",
    title: "Contact Number",
    content: (
      <>
        <a href="tel:1200123456789">+12 (00) 123 456789</a>
        <br />
        <a href="tel:9100012458963">+91 (000) 1245 8963</a>
      </>
    ),
  },
  {
    icon: "/assets/images/icon/contact-two-icon-3.png",
    title: "Email Address",
    content: (
      <>
        <a href="mailto:info@domain.com">info@domain.com</a>
        <br />
        <a href="mailto:support@domain.com">support@domain.com</a>
      </>
    ),
  },
  {
    icon: "/assets/images/icon/contact-two-icon-4.png",
    title: "Class Schedule",
    content: (
      <>
        10:00 AM - 6:00 PM
        <br /> Monday - Friday
      </>
    ),
  },
];

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <>
      <PageHeader title="Contact" breadcrumbs={breadcrumbs} />
      
      {/* Contact Two Section */}
      <section className="contact-two">
        <div className="container">
          <ul className="row list-unstyled">
            {contactInfo.map((info, index) => (
              <li 
                key={index}
                className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" 
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="contact-two__single">
                  <div className="contact-two__icon">
                    <img src={info.icon} alt="" />
                  </div>
                  <h3 className="contact-two__title">{info.title}</h3>
                  <p>{info.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Three Section */}
      <section className="contact-three">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="contact-three__left">
                <div className="contact-three__img">
                  <img src="/assets/images/resources/contact-three-img-1.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact-three__right">
                <div className="section-title-two text-left sec-title-animation animation-style1">
                  <div className="section-title-two__tagline-box">
                    <div className="section-title-two__tagline-shape">
                      <img src="/assets/images/shapes/section-title-two-shape-1.png" alt="" />
                    </div>
                    <span className="section-title-two__tagline">Get in Touch</span>
                  </div>
                  <h2 className="section-title-two__title title-animation">
                    We're Here to Help and Ready to Hear from You
                  </h2>
                </div>
                <form className="contact-three__form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6">
                      <h4 className="contact-three__input-title">Full Name</h4>
                      <div className="contact-three__input-box">
                        <input type="text" name="name" placeholder="Jhon Doe" required />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                      <h4 className="contact-three__input-title">Email Address *</h4>
                      <div className="contact-three__input-box">
                        <input type="email" name="email" placeholder="jhon@domain.com" required />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <h4 className="contact-three__input-title">Subject *</h4>
                      <div className="contact-three__input-box">
                        <input type="text" name="subject" placeholder="Write about your enquiry" required />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <h4 className="contact-three__input-title">Message *</h4>
                      <div className="contact-three__input-box text-message-box">
                        <textarea name="message" placeholder="Write Your Message"></textarea>
                      </div>
                      <div className="contact-three__btn-box">
                        <button type="submit" className="thm-btn-two contact-three__btn">
                          <span>Submit Review</span>
                          <i className="icon-angles-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
