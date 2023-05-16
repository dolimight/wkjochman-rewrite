import { FC } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { motion } from "framer-motion";

type CardProps = {
  label: string;
  value: number;
  index: number;
};

const Card: FC<CardProps> = ({ label, value, index }) => {
  return (
    <motion.div
      className="flex flex-col rounded-lg bg-gray-50 bg-opacity-10 px-4 py-8 text-center backdrop-blur-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.25 }}
      viewport={{ once: true }}
    >
      <dt className="order-last text-lg font-medium text-gray-100">{label}</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">
        {value}
      </dd>
    </motion.div>
  );
};

type CountdownProps = {};

const Countdown: FC<CountdownProps> = ({}) => {
  const [days, hours, minutes] = useCountdown("Aug 12, 2023 15:00:00");

  const cards = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
  ];

  return (
    <section
      className="relative overflow-hidden rounded-md bg-gray-900 bg-opacity-30 md:mr-2 "
      id="top"
    >
      <img
        src="/images/top-image.webp"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-48 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-cursive text-3xl text-gray-100"
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            The Wedding Celebration of
          </motion.h2>
          <motion.h1
            className="mt-4 font-cursive text-8xl font-semibold text-gray-50"
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Katie & Wesley
          </motion.h1>
        </div>
        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card, index) => (
              <Card
                key={card.label}
                label={card.label}
                value={card.value}
                index={index + 1}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
