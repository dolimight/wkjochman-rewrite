import { motion } from "framer-motion";
import { FC } from "react";

type OurStoryProps = {};

const OurStory: FC<OurStoryProps> = ({}) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2 ">
          <motion.div
            className="relative z-10 lg:py-16"
            initial={{ x: -200 }}
            transition={{ duration: 0.5, once: true }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64 overflow-hidden rounded-md sm:h-80 lg:h-full">
              <img
                alt="House"
                src="images/question.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-center rounded-md bg-gray-50"
            initial={{ x: 200 }}
            transition={{ duration: 0.5 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <span className="hidden rounded-md lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-50"></span>
            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
              <motion.p
                className="mt-4 text-gray-600"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Wesley and Katie met in High School at Fox Valley Lutheran as
                Sophmores. Wesley immediatly took notice of Katie during the
                fist couple of weeks. He was extremely nervous around her but
                would talk to her as much as he could. He ended up helping her
                with homework, and eventually convinced her to join the robotics
                team.
              </motion.p>
              <motion.p
                className="mt-4 text-gray-600"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Over Sophmore and Junior year Wesley would work up the courage
                to ask Katie out and to dance at homecomings, but it wasn't
                until Senior year that she said yes and they started to date.
              </motion.p>
              <motion.p
                className="mt-4 text-gray-600"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                After 2 years of dating Wesley proposed on a "winter sleigh
                ride". Although there was no snow, but extremely cold it was the
                perfect proposal.
              </motion.p>
              <motion.p
                className="mt-4 text-gray-600"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                We are so excited to celebrate with you at our wedding ceremony
                and reception in August!
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
