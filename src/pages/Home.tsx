import { FC } from "react";
import Scrollbar from "../components/Scrollbar";
import Navigation from "../components/Navigation";
import Countdown from "../components/Countdown";
import CTA from "../components/CTA";
import OurStory from "../components/OurStory";
import BridalParty from "../components/BridalParty";
import Details from "../components/Details";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";

type HomeProps = {};

const Home: FC<HomeProps> = ({}) => {
  return (
    <>
      <Scrollbar>
        <>
          <Navigation />
          <Countdown />
          <OurStory />
          <BridalParty />
          <Gallery />
          <Details />
          <FAQ />
        </>
      </Scrollbar>
      <CTA />
    </>
  );
};

export default Home;
