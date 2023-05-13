import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChampagneGlasses,
  faChurch,
  faExternalLinkAlt,
  faHatCowboy,
  faHotel,
  faPlaneArrival,
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

const hotels: CardProps[] = [
  {
    title: "The Best Western",
    duration: "~10 Minutes",
    location: "Chilton, WI",
    link: "https://www.bestwestern.com/en_US/book/hotels-in-chilton/best-western-stanton-inn/propertyCode.50121.html",
    icon: faHatCowboy,
  },
  {
    title: "The Osthoff",
    duration: "~15 Minutes",
    location: "Elkhart Lake, WI",
    link: "https://www.osthoff.com/",
    icon: faHotel,
  },
  {
    title: "Baymont By Wyndham",
    duration: "~20 Minutes",
    location: "Plymouth, WI",
    link: "https://www.wyndhamhotels.com/baymont/plymouth-wisconsin/baymont-inn-and-suites-plymouth/overview?CID=LC:BU::GGL:RIO:National:50121&iata=00093796",
    icon: faHotel,
  },
  {
    title: "The American Club",
    duration: "~30 Minutes",
    location: "Sheboygan, WI",
    link: "https://www.americanclubresort.com/",
    icon: faHotel,
  },
];

const airports: CardProps[] = [
  {
    title: "General Mitchell International Airport",
    duration: "~1 Hour 30 Minutes",
    location: "Milwuakee, WI",
    link: "https://www.mitchellairport.com/",
    icon: faPlaneArrival,
  },
  {
    title: "Austin Straubel International Airport",
    duration: "~1 Hour",
    location: "Green Bay, WI",
    link: "https://flygrb.com/",
    icon: faPlaneArrival,
  },
];

type CardProps = {
  title: string;
  time?: string;
  location: string;
  address?: string;
  icon?: IconProp;
  index?: number;
  link?: string;
  duration?: string;
};

const Card: FC<CardProps> = ({
  title,
  time,
  location,
  address,
  icon,
  index,
  link,
  duration,
}) => {
  return (
    <motion.div
      className="m-2 flex flex-col justify-between rounded-xl bg-gray-50 p-4 text-center sm:p-6 lg:w-1/4 lg:p-8 lg:text-left"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: (index ?? 0) * 0.25 }}
      viewport={{ once: true }}
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-2xl" />}
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      {time && (
        <p className="text-md mt-4 font-semibold text-gray-900">{time}</p>
      )}
      <p className="mt-4 text-sm text-gray-900">{location}</p>
      {duration && <p className="mt-4 text-sm text-gray-900">{duration}</p>}
      {address && <p className="mt-4 text-sm text-gray-900">{address}</p>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none"
        >
          <p className="mt-4 rounded-md bg-gray-200 px-6 py-2 text-center hover:brightness-105">
            View Website
            <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
          </p>
        </a>
      )}
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
      <div className="m:px-6 flex flex-col items-center px-4 pb-16 lg:px-8">
        <motion.div
          className="max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Dress Code</h2>
          <p className="mt-4 text-gray-300">
            We would love to see our family and friends get dressed up with us!
            We are requesting a semi-formal dress code for the evening. Wear
            whatever color you'd like, but please no white.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-3xl font-bold sm:text-4xl">Hotels</h2>
          <p className="mt-4 text-gray-300">
            We are not reserving any hotel blocks, but if you plan to stay
            overnight here are some reccomendations!
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        {hotels.map((hotel, i) => (
          <Card key={hotel.title} {...hotel} index={i} />
        ))}
      </div>
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-3xl font-bold sm:text-4xl">Airports</h2>
          <p className="mt-4 text-gray-300">
            If you are flying in for the wedding, here are some airports to
            consider!
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        {airports.map((airport, i) => (
          <Card key={airport.title} {...airport} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Details;
