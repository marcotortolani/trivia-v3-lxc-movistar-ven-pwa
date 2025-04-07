import { motion } from 'framer-motion'
import { useConfigStore } from '@/lib/config-store'
import { useGameStore } from '@/lib/game-store'

import { DonutChart } from './donut-chart'
import SectionTitle from './section-title'

import correctIcon from '/img/default/correct-icon.webp'
import incorrectIcon from '/img/default/incorrect-icon.webp'
import bonusIcon from '/img/default/bonus-icon.webp'

export default function AnswersType() {
  const { colors, dictionary } = useConfigStore()
  const { answeredQuestions } = useGameStore()

  return (
    <motion.section
      initial={{ opacity: 0, x: 500 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.25,
          delay: 0,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 120,
          damping: 20,
        },
      }}
      className=" w-full max-w-lg h-fit px-4 relative flex flex-col items-center justify-center gap-2 "
    >
      <div
        className="w-full p-2 pb-4 rounded-xl "
        style={{ border: `2px solid ${colors?.primaryLight}` }}
      >
        <div className=" relative w-full h-3/5 p-0 flex items-center justify-center gap-2.5">
          <SectionTitle title={dictionary['Accuracy Index']} />
          <DonutChart />
        </div>
        <div className=" w-full flex justify-around ">
          <div className=" flex items-center justify-center gap-1">
            <img
              className=" w-[5vw] min-w-[15px] max-w-[30px] aspect-square"
              src={correctIcon}
              alt="Image Correct Icon"
            />
            <span
              className=" text-[0.6rem] xs:text-xs font-oswaldRegular uppercase "
              style={{ color: colors?.text }}
            >
              {dictionary['Correct(pl)']}: {answeredQuestions.correct}
            </span>
          </div>

          <div className=" flex items-center justify-center gap-1">
            <img
              className=" w-[5vw] min-w-[15px] max-w-[30px] aspect-square"
              src={incorrectIcon}
              alt="Image Correct Icon"
            />
            <span
              className=" text-[0.6rem] xs:text-xs font-oswaldRegular uppercase "
              style={{ color: colors?.text }}
            >
              {dictionary['Incorrect(pl)']}: {answeredQuestions.incorrect}
            </span>
          </div>

          <div className=" flex items-center justify-center gap-1">
            <img
              className=" w-[5vw] min-w-[15px] max-w-[30px] aspect-square"
              src={bonusIcon}
              alt="Image Correct Icon"
            />
            <span
              className=" text-[0.6rem] xs:text-xs font-oswaldRegular uppercase "
              style={{ color: colors?.text }}
            >
              {dictionary['Bonus']}: {answeredQuestions.bonus}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
