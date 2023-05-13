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
      className="flex flex-col rounded-lg  bg-gray-50 px-4 py-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.25 }}
      viewport={{ once: true }}
    >
      <dt className="order-last text-lg font-medium text-gray-500">{label}</dt>
      <dd className="text-4xl font-extrabold text-primary md:text-5xl">
        {value}
      </dd>
    </motion.div>
  );
};

type CountdownProps = {};

const Countdown: FC<CountdownProps> = ({}) => {
  const [days, hours, minutes] = useCountdown("Aug 12, 2023");

  const cards = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
  ];

  return (
    <section className="bg-white" id="top">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="font-cursive text-2xl text-gray-400"
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            The Wedding Celebration of
          </motion.h2>
          <motion.h1
            className="mt-4 font-cursive text-6xl font-semibold text-gray-700"
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
