import {
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { FC } from "react";

const faqs: CardProps[] = [
  {
    title: "What time is the Ceremony?",
    description:
      "We ask all guests to arrive by 2:45 p.m. If you are late please wait to attend until cocktail hour.",
  },
  {
    title: "Where is the ceremony and reception taking place?",
    description:
      "The ceremony will be held at Trinity Lutheran Church in Kiel, WI (387 Cemetery Rd, Kiel, WI 53042). Cocktail Hour, Dinner, and Reception will be held at the DeBruin Household in New Holstein, WI (N392 Irish Rd, New Holstein, WI 53061) The ceremony will be held indoors, whereas the cocktail hour, dinner, and reception will be outside.",
  },
  {
    title: "Can I take pictures during the ceremony?",
    description:
      "We are having an “unplugged” ceremony which means no photos! We ask all guests to follow this and be completely present during our special time! Our hired professionals will be doing the photo taking during that time! Feel free to take all the photos you'd like after we say “I Do!”",
  },
  {
    title: "What is the dress code?",
    description:
      "We would love to see our family and friends get dressed up with us! We are requesting a 'Fancy but Friendly' dress code for the evening. Wear whatever color you'd like, but please no white.",
  },
  {
    title: "Can I bring a guest?",
    description:
      "If a plus one is listed on your invite and when you RSVP, then yes! Otherwise we want to keep the wedding with just friends and family ❤️",
  },
  {
    title: "Can I bring my children?",
    description:
      "Unless your children are listed on your invite, we ask that you please leave them at home",
  },
  {
    title: "What if I forget to RSVP?",
    description:
      "If you do not RSVP, unfortunately you will not be able to attend. Due to limited space if you were to show up there would be no seats for you. To make sure this doesn't happen please RSVP before the deadline!",
  },
  {
    title: "What if I can't make it?",
    description:
      "Your presence will surely be missed! Please RSVP, “Will NOT Attend”. If you have already RSVP'd that you will be attending, but find that you won't be able to make it please email us wkjochman@gmail.com.",
  },
];

type CardProps = {
  title: string;
  description: string;
  index?: number;
};

const Card: FC<CardProps> = ({ title, description, index }) => {
  return (
    <motion.details
      className="group w-full max-w-3xl rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + (index || 0) * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
        <h2 className="font-medium">{title}</h2>
        <span className="relative h-5 w-5 shrink-0">
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
          />
          <FontAwesomeIcon
            icon={faMinusSquare}
            className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
          />
        </span>
      </summary>
      <motion.p
        className="mt-4 leading-relaxed text-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {description}
      </motion.p>
    </motion.details>
  );
};

type FAQProps = {};

const FAQ: FC<FAQProps> = ({}) => {
  return (
    <section className="bg-white py-16" id="faq">
      <motion.div
        className="flex flex-col items-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">FAQ</h2>
          <p className="mt-4 text-gray-400">
            We created this section to help answer any questions you may have.
            If there is something that isn't covered on this page but you still
            have questions, please email us at{" "}
            <span className="text-primary">wkjochman@gmail.com</span>
          </p>
        </div>
      </motion.div>
      <div className="flex flex-col items-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
        {faqs.map((faq, i) => (
          <Card key={faq.title} {...faq} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
