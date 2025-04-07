import useSound from 'use-sound'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useGameStore } from '@/lib/game-store'
import { useConfigStore } from '@/lib/config-store'
import { useLottie } from 'lottie-react'
import { Button } from '../ui/button'
import { Sidebar } from '../sidebar'

import gameFinished from '@/assets/lotties/game-finished.json'
import blopSound from '@/assets/sound/blop.mp3'

export function GameCompletedModal() {
  const { resetGame } = useGameStore()
  const { colors, soundActive, dictionary } = useConfigStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [playButton] = useSound(blopSound)

  const options = {
    animationData: gameFinished,
    loop: true,
    autoplay: true,
  }
  const { View } = useLottie(options)
  function handleReset() {
    resetGame()
  }
  return (
    <motion.div
      key="game-completed-modal"
      initial={{ opacity: 0, y: -1000, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -1000, scale: 0 }}
      className=" absolute top-0  z-30 w-full min-h-[100dvh] pt-14 pb-20 overflow-y-scroll md:overflow-hidden flex flex-col items-center justify-center  bg-gradient-to-b from-black/50 via-black/75 to-black backdrop-blur-sm  backdrop-brightness-75"
    >
      <motion.div
        initial={{ opacity: 0, y: -500, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className=" w-full mx-auto h-full px-6 pt-12 pb-10 flex flex-col items-center justify-center gap-0 md:gap-4"
      >
        <p
          className="px-4 pt-1 text-2xl md:text-3xl uppercase font-tekoMedium text-center mb-0 rounded-lg"
          style={{
            color: colors.text,
            background: `linear-gradient(180deg, ${colors.primary} 60%, rgb(0, 0, 0,1) 150%)`,
          }}
        >
          {dictionary['You did it']}
        </p>

        <div className=" w-3/4 max-w-[250px]">{View}</div>

        <div className=" w-full mb-4">
          <h2
            className=" font-oswaldHeavyItalic text-4xl md:text-5xl uppercase text-center"
            style={{ color: colors.primary }}
          >
            {dictionary['Congrats!']}
          </h2>
          <p
            className=" font-oswaldHeavyItalic text-4xl md:text-5xl leading-9 uppercase text-center"
            style={{ color: colors.text }}
          >
            {dictionary['You completed the Trivia!']}
          </p>
        </div>

        <p
          className=" font-tekoRegular text-lg md:text-xl uppercase mb-4"
          style={{ color: colors.text }}
        >
          {dictionary['Would you like to play again?']}
        </p>
        <Button
          onClick={() => {
            if (soundActive) playButton()
            handleReset()
          }}
          className=" h-fit px-8 pt-1 pb-0 font-tekoRegular text-3xl lg:text-4xl hover:scale-105 active:scale-100 uppercase transition-all duration-200 ease-in-out rounded-full"
          style={{
            background: `linear-gradient(180deg, ${colors.primary} 60%, rgb(0, 0, 0,1) 150%)`,
            color: colors.text,
          }}
        >
          {dictionary['Reseting Trivia']}
        </Button>
      </motion.div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </motion.div>
  )
}
