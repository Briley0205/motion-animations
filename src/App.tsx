import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  //overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "50%" },
  drag: { backgroundColor: "rgba(255, 255, 255, 0.4)" },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const motionRotate = useTransform(x, [-245, 245], [-360, 360]);
  const motionGradient = useTransform(
    x,
    [-245, 0, 245],
    [
      "linear-gradient(135deg, rgb(0,210,238), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0,238,155), rgb(238,178,0))",
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  /*useEffect(() => {
    // x.onChange(() => console.log(x.get()));
    motionRotate.onChange(() => console.log(motionRotate.get()));
  }, [motionRotate]);*/
  return (
    <Wrapper style={{ background: motionGradient }}>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          style={{ x, rotateZ: motionRotate, scale }}
          drag
          dragSnapToOrigin
          dragElastic={0.1}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileDrag="drag"
          whileTap="click"
        />
      </BiggerBox>
    </Wrapper>
  );
}
/** Basic animations
 * transition={{ type: "spring", delay: 0.5 }}
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotateZ: 360 }}
 */

/**
 * const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};
 * const CircleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
  <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
        <Circle variants={CircleVariants} />
      </Box>
};
 */

/**
 * Drag Gestures
 * 
 * const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "50%" },
  drag: { backgroundColor: "rgba(255, 255, 255, 0.4)" },
};
 * drag
          dragSnapToOrigin
          dragElastic={0.3}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileDrag="drag"
          whileTap="click"
 */
export default App;
