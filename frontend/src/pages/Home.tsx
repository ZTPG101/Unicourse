import React from "react";
import BannerOne from "../components/HomePage/BannerOne";
import SlidingTextOne from "../components/HomePage/SlidingTextOne";
import CategoryOne from "../components/HomePage/CategoryOne";
import { aboutPageData } from "./About";
import StatisticsCounter from "../components/AboutPage/StatisticsCounter";
import TeamOne from "../components/HomePage/TeamOne";
import HomeTestimonials from "../components/HomePage/HomeTestimonials";
import HomeAbout from "../components/HomePage/HomeAbout";
import HomeWhyChooseUs from "../components/HomePage/HomeWhyChooseUs";
import HomeCourse from "../components/HomePage/HomeCourse";

const Home: React.FC = () => (
  <>
    <BannerOne />
    <SlidingTextOne />
    <CategoryOne />
    <HomeAbout data={aboutPageData.missionVision} />
    <HomeCourse />
    <HomeWhyChooseUs />
    <StatisticsCounter data={{ stat: [aboutPageData.stats] }} />
    <TeamOne />
    <HomeTestimonials />
  </>
);

export default Home;
