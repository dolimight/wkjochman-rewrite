import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { motion } from "framer-motion";
import { FC } from "react";
import { Link } from "react-router-dom";

type NavigationProps = {};

const Navigation: FC<NavigationProps> = ({}) => {
  return (
    <nav
      aria-label="Site Navigation"
      className={classNames(
        "sticky top-0 z-50 mx-auto flex w-full items-center justify-between bg-white bg-opacity-20 p-4 backdrop-blur-md"
      )}
    >
      <a
        href="#top"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100"
      >
        <span className="sr-only">Rings</span>
        <motion.img
          src="wedding-ring.png"
          alt=""
          className="p-2"
          initial={{ rotate: -360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
      </a>

      <ul className="flex items-center gap-2 text-sm font-medium text-gray-800">
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a
            className="hidden rounded-lg px-3 py-2 transition-colors duration-300 ease-in-out hover:text-primary md:block"
            href="#party"
          >
            Bridal Party
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            className="hidden rounded-lg px-3 py-2 transition-colors duration-300 ease-in-out hover:text-primary md:block"
            href="#details"
          >
            Details
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            className="hidden rounded-lg px-3 py-2 transition-colors duration-300 ease-in-out hover:text-primary md:block"
            href="#gallery"
          >
            Gallery
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <a
            className="hidden rounded-lg px-3 py-2 transition-colors duration-300 ease-in-out hover:text-primary md:block"
            href="#faq"
          >
            FAQ
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-300 ease-in-out hover:text-primary"
            to="/rsvp"
            target="_blank"
          >
            RSVP
            <FontAwesomeIcon icon={faExternalLink} />
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
};

export default Navigation;
