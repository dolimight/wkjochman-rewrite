import { FC } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type ScrollbarProps = {
  children?: JSX.Element;
};

const Scrollbar: FC<ScrollbarProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 top-0 hidden h-full w-2 origin-top bg-primary md:block"
        style={{ scaleY: scaleY }}
      />
      <div className="overflow-hidden md:ml-2">{children}</div>
    </>
  );
};

export default Scrollbar;
