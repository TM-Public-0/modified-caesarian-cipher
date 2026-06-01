"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../lib/utils/backgroundUtils.jsx";

export const TextGenerateEffect = ({
  words,
  className,
  filter,
  duration,
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(",");
  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
    }, {
      duration: duration ? duration : 0.6,
      delay: stagger(0.2),
    });
  }, [scope.current]);

  const renderWords = () => {
    return (
      (<motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            (<motion.span
              key={word + idx}
              className="dark:text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}
            </motion.span>)
          );
        })}
      </motion.div>)
    );
  };

  return (
        <div
          className="dark:text-white text-white text-xl font-bold leading-snug tracking-wide flex flex-row">
          {renderWords()}
        </div>
    // (<div className={cn("", className)}>
    //   <div className="mt-4">
    //   </div>
    // </div>)
  );
};
