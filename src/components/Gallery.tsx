import { motion } from "framer-motion";
import { FC } from "react";

type GalleryProps = {};

const Gallery: FC<GalleryProps> = ({}) => {
  return (
    <section
      className="mx-4 overflow-hidden rounded-md bg-gray-50 sm:grid sm:grid-cols-2"
      id="gallery"
    >
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <motion.h2
            className="text-2xl font-bold text-gray-900 md:text-3xl"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Gallery
          </motion.h2>
          <motion.p
            className="hidden text-gray-500 md:mt-4 md:block"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We are so excited to share these photos with you. They capture the
            love, laughter, and joy of our special day. We hope you enjoy them
            as much as we do.
          </motion.p>
          <div className="mt-4 flex justify-center gap-2 md:mt-8">
            <motion.a
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              target="_blank"
              href="https://photos.google.com/share/AF1QipPDkNKc2XWZqih-keWZOKp9-VRT6m9NdgqWozKf3GqU2TZ6CHQSdzTiO1stQJ4YVA?key=YUNaLVctZ2I0bjYzQlpCMmlKTFpKS05EY1pFc19R"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:brightness-105 focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1"
            >
              Engagement
            </motion.a>
            <motion.a
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              target="_blank"
              href="https://photos.google.com/share/AF1QipOHiV0ok7xQPagihZm9t54G4YMpkuVAyKpkdQOqlp_i_l_ACg3y8oCzpeWlwlWaDA?key=emZFWDk2ZUJUSlR0Y1JvWGtMNmdqM0dNRjIzeGRn"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:brightness-105 focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1"
            >
              Wedding
            </motion.a>
          </div>
        </div>
      </div>
      <motion.img
        alt="Engagement Photo"
        src="images/kaitlynwesley-45.jpg"
        className="h-56 w-full rounded-md object-cover sm:h-full"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default Gallery;
