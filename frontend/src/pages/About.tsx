import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AboutIntro from "../components/AboutPage/AboutIntro";
import AboutTestimonials from "../components/AboutPage/AboutTestimonials";
import StatisticsCounter from "../components/AboutPage/StatisticsCounter";
import WhyChooseUs from "../components/AboutPage/WhyChooseUs";
import PageHeader from "../components/PageHeader";
import SlidingTextThree from "../components/SlidingTextThree";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "About" }];

export const aboutPageData = {
  missionVision: {
    mission: [
      {
        title: "Empower Through Education",
        text: "To democratize learning by providing accessible, high-quality online courses that empower individuals to achieve their personal and professional goals.",
      },
      {
        title: "Foster a Community of Learners",
        text: "To build a supportive and interactive community where students, instructors, and industry experts can connect, collaborate, and grow together.",
      },
    ],
    vision: [
      {
        title: "Shape the Future of Learning",
        text: "To be a global leader in online education, pioneering innovative learning technologies that adapt to the unique needs of every student.",
      },
      {
        title: "Bridge the Skills Gap",
        text: "To create a world where anyone, anywhere, can acquire the skills and knowledge needed to thrive in a rapidly evolving digital landscape.",
      },
    ],
  },
  ceo: {
    name: "Kittipob Borsisut",
    title: "CEO & FOUNDER",
    image: "/assets/images/resources/why-choose-three-ceo-img.jpg",
    signature: "/assets/images/resources/why-choose-three-ceo-img-two.jpg", // Assuming this is the signature image
    speech:
      "At Unicourse, we believe that education is the most powerful catalyst for change. We're not just building a platform; we are crafting pathways to opportunity. Every course we launch and every feature we develop is driven by a single commitment: to empower our learners with the practical skills and confidence they need to turn their ambition into achievement. Our journey is one of shared growth, and we are honored to be a part of yours.",
  },

  stats: {
    studentsTrained: 99,
    recordedCourses: 50,
    satisfactionRate: 98,
  },
  testimonials: [
    {
      text: `As someone looking to switch careers into tech, Unicourse was a game-changer. The 'Full-Stack Development' course was comprehensive, practical, and the instructor support was outstanding. I landed a new job within two months of completion.`,
      name: "Alex Carter",
      role: "Software Developer",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
    {
      text: `The courses on project management were incredibly practical. I was able to apply the concepts at my job immediately, which led to a promotion. The flexibility of the platform allowed me to learn without disrupting my work schedule.`,
      name: "Priya Sharma",
      role: "Senior Project Manager",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
    {
      text: `We used Unicourse to upskill our entire marketing team on the latest digital analytics tools. The platform's analytics made it easy to track progress and ROI. It's been a fantastic investment for our company's growth.`,
      name: "David Chen",
      role: "Head of Marketing",
      logo: "/assets/images/testimonial/testimonial-two-client-logo.png",
    },
  ],
  thumbs: [
    "/assets/images/team/alex-carter.jpg",
    "/assets/images/team/priya-sharma.jpg",
    "/assets/images/team/david-chen.jpg",
  ],
};

const About: React.FC = () => {
  return (
    <>
      <PageHeader title="About" breadcrumbs={breadcrumbs} />

      <AboutIntro data={aboutPageData.missionVision} />
      <WhyChooseUs data={{ ceo: [aboutPageData.ceo] }} />
      <StatisticsCounter data={{ stat: [aboutPageData.stats] }} />
      <AboutTestimonials
        data={{
          list: aboutPageData.testimonials,
          thumbs: aboutPageData.thumbs,
        }}
      />

      <SlidingTextThree />
    </>
  );
};

export default About;
