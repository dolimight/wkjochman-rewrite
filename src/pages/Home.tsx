import { FC, useEffect } from "react";
import Scrollbar from "../components/Scrollbar";
import Navigation from "../components/Navigation";
import Countdown from "../components/Countdown";
import CTA from "../components/CTA";
import OurStory from "../components/OurStory";
import BridalParty from "../components/BridalParty";
import Details from "../components/Details";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";
import { useSearchParams } from "react-router-dom";

type HomeProps = {};

const Home: FC<HomeProps> = ({}) => {
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const item = searchParams.get("ref");
    item && document.getElementById(item)?.scrollIntoView();
  }, [searchParams]);

  return (
    <>
      <Scrollbar>
        <>
          <Navigation />
          <div className="overflow-x-hidden">
            <Countdown />
            <OurStory />
            <BridalParty />
            <Gallery />
            <Details />
            <FAQ />
          </div>
        </>
      </Scrollbar>
      <CTA />
    </>
  );
};

export default Home;
