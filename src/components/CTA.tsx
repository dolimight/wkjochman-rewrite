import { motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";

type CTAProps = {};

const CTA: FC<CTAProps> = ({}) => {
  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-50 p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative rounded-lg bg-primary px-4 py-3 text-white shadow-lg">
        <p className="text-center text-sm font-medium">
          The deadline to rsvp is July 1st 2023
          <Link
            to="/rsvp"
            className="ml-2 inline-block underline"
            target="_blank"
          >
            RSVP Now!
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default CTA;
