import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChampagneGlasses,
  faChurch,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC } from "react";

const details: CardProps[] = [
  {
    title: "Ceremony",
    time: "3:00 PM",
    location: "Trinity Lutheran Church",
    address: "387 Cemetery Rd, Kiel, WI 53042",
    icon: faChurch,
  },
  {
    title: "Cocktail Hour",
    time: "4:00 PM",
    location: "DeBruin Household",
    address: "N392 Irish Rd, New Holstein, WI 53061",
    icon: faChampagneGlasses,
  },
  {
    title: "Dinner & Dancing",
    time: "5:30 PM",
    location: "DeBruin Household",
    address: "N392 Irish Rd, New Holstein, WI 53061",
    icon: faUtensils,
  },
];

type CardProps = {
  title: string;
  time: string;
  location: string;
  address: string;
  icon?: IconProp;
  index?: number;
};

const Card: FC<CardProps> = ({
  title,
  time,
  location,
  address,
  icon,
  index,
}) => {
  return (
    <motion.div
      className="m-2 rounded-xl bg-gray-50 p-4 text-center sm:p-6 md:w-1/4 md:text-left lg:p-8"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: (index ?? 0) * 0.25 }}
      viewport={{ once: true }}
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-2xl" />}
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      <p className="text-md mt-4 font-semibold text-gray-900">{time}</p>
      <p className="mt-4 text-sm text-gray-900">{location}</p>
      <p className="mt-4 text-sm text-gray-900">{address}</p>
    </motion.div>
  );
};

type DetailsProps = {};

const Details: FC<DetailsProps> = ({}) => {
  return (
    <section className="bg-white py-16" id="details">
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 ">
        <motion.div
          className="max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-3xl font-bold sm:text-4xl">Details</h2>
          <p className="mt-4 text-gray-300">
            To make your day as enjoyable as possible we have provided all the
            details you will need! If you have any questions about the day
            please visit the FAQ for more information!
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        {details.map((detail, i) => (
          <Card key={detail.title} {...detail} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Details;
