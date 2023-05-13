import { motion } from "framer-motion";
import { FC } from "react";

type CardProps = {
  name: string;
  img: string;
  desc?: string;
  index?: number;
};

const Card: FC<CardProps> = ({ name, img, desc, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 text-center"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: (index ?? 0) * 0.25 }}
      viewport={{ once: true }}
    >
      <span
        className={`h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105`}
      >
        <img src={`images/party/${img}`} alt="" />
      </span>
      <div>
        <h2 className="text-lg font-medium">{name}</h2>
        {desc && <p>{desc}</p>}
      </div>
    </motion.div>
  );
};

const bridalParty: { name?: string; people: CardProps[] }[] = [
  {
    people: [
      { name: "Isabella Hanmann", img: "bella.webp", desc: "Maid of Honor" },
      { name: "Evan Wichman", img: "evan_JPG.webp", desc: "Best Man" },
    ],
  },
  {
    name: "Bridesmaids",
    people: [
      { name: "Lillian Hanmann", img: "lillian_JPG.webp" },
      {
        name: "Ava Enter",
        img: "ava.webp",
      },
      {
        name: "Ashlee Jochman",
        img: "ashlee.webp",
      },
      {
        name: "Allison DeBruin",
        img: "IMG_3981_edited.webp",
      },
      {
        name: "Lillian DeBruin",
        img: "lilly.webp",
      },
    ],
  },
  {
    name: "Groomsmen",
    people: [
      {
        name: "Jackson Fleming",
        img: "jackson.webp",
      },
      { name: "Connor Jordan", img: "connor_JPG.webp" },
      {
        name: "Bryce Jochman",
        img: "IMG_3981_edited.webp",
      },
      {
        name: "Stewart Larson",
        img: "IMG_3981_edited.webp",
      },
      {
        name: "Samuel DeBruin",
        img: "sam.webp",
      },
    ],
  },
];

type BridalPartyProps = {};

const BridalParty: FC<BridalPartyProps> = ({}) => {
  return (
    <section className="bg-white" id="party">
      <div className="flex flex-col items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <motion.div
          className="max-w-xl text-center"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Bridal Party</h2>
          <p className="mt-4 text-gray-300">
            It's an honor to present our family members and very closest friends
            who will be our bridesmaids and groomsmen. They've stood by us
            throughout our entire relationship and in some cases much longer,
            and will now stand by our side on our special day!
          </p>
        </motion.div>
        {bridalParty.map((row, i) => (
          <motion.div
            key={`bridal-row-${i}`}
            initial={{
              y: 100,
            }}
            whileInView={{
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: i * 0.2,
            }}
            viewport={{ once: true }}
          >
            <h1 className="text-center text-2xl font-bold">{row.name}</h1>
            <div className="my-6 flex w-full flex-wrap items-center justify-center gap-8 rounded-md bg-gray-50 p-5 md:gap-12">
              {row.people.map((member, i) => (
                <Card key={member.name} {...member} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BridalParty;
