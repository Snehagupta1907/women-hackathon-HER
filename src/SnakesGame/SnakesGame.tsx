import React, { useState, useEffect } from "react";
import SnakeBoard from "./SnakesBoard";
import GameOverModal from "./GameOverModal";
import PausedModal from "./PausedModal";
import "./styles.css";
import { useDataContext } from "../context/DataContext";
import JoinPoolModal from "./JoinPoolModal";

export const HIGH_SCORE_KEY = "high-score";

const SnakesGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const { joinPool } = useDataContext();
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [justStarted, setJustStarted] = useState<boolean>(true);
  const [highScore, setHighScore] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [lives, setLives] = useState<number>(3);

  // Load high score from localStorage
  useEffect(() => {
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY) || "0";
    setHighScore(Number(storedHighScore));
  }, []);

  // Update high score in localStorage
  useEffect(() => {
    if (isGameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  }, [isGameOver, score, highScore]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleJoinPool = async () => {
    try {
      await joinPool(1, 5);
    } catch (error) {
      console.error("Error joining pool:", error);
    }
  };

  const handleStartGame = async () => {
    if (justStarted) {
      setLives(3);
      setIsPlaying(true);
      setJustStarted(false);
      setScore(0);
      return;
    }

    if (!isGameOver) {
      setIsPlaying((prev) => !prev);
    }
  };

  // const handleRestartGame = () => {
  //   if (lives > 0) {
  //     setIsGameOver(false);
  //     setScore(0);
  //     setIsPlaying(true);
  //   } else {
  //     setJustStarted(true); // If no lives left, reset to the start screen
  //   }
  // };

  useEffect(() => {
    if (isGameOver) {
      if (lives > 0) {
        // Trigger respawn delay
        setTimeout(() => {
          setIsGameOver(false);
          setIsPlaying(true);
        }, 2000); // Delay before respawning
      } else {
        // No lives left; show game over modal
        setJustStarted(true);
      }
    }
  }, [isGameOver, lives]);
  


  return (
    <div id="snakes-game-container">
      {justStarted ? (
       <>
       <p className="new-game-hint text-center text-sm sm:text-base">
         Click on "Let's Play" to start
       </p>
       <div className="flex justify-center w-full mt-5 sm:mt-10 px-3">
         <div className="w-full sm:w-[50%] md:w-[30%] bg-transparent border rounded-lg shadow">
           <img
             className="rounded-t-lg w-full"
             src="https://m.media-amazon.com/images/I/81t8t9TyYLL.png"
             alt="Snake Game Banner"
           />
           <div className="p-4 sm:p-5">
             <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
               Snake Game #Pool 1
             </h5>
             <p className="mb-3 font-normal text-green-300 text-sm sm:text-base text-center">
               Welcome to the Snake Game! Aim to beat your highest score by
               collecting as many points as possible.
             </p>
             <p className="text-purple-500 mb-5 text-xl sm:text-3xl font-bold text-center">
               High Score: {highScore}
             </p>
             <button
               onClick={() => setIsModalOpen(true)}
               className="block text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 w-full"
             >
               Let's Play
             </button>
           </div>
         </div>
       </div>
     </>
     
      ) : (
        <>
          <p className="text-purple-500 text-3xl font-bold">
            High Score: {highScore}
          </p>
          <div className="score-pause-container">
            <p className="score">Score: {score}</p>
            <p className="score">Lives: {lives}</p>
            <p className="pause-hint">
              <kbd>ESC</kbd> to pause
            </p>
          </div>
        </>
      )}

      {!justStarted && !isGameOver && (
        <SnakeBoard
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          externalScore={score}
          setScore={setScore}
          setIsGameOver={setIsGameOver}
          setLives={setLives}
        />
      )}

{isGameOver && lives > 0 && !justStarted && <p>Respawning...</p>}
      {isGameOver && lives === 0 && (
        <GameOverModal
          setIsGameOver={setIsGameOver}
          setIsPlaying={setIsPlaying}
          finalScore={score}
          setJustStarted={setJustStarted}
          setScore={setScore}
        />
      )}

      {!justStarted && !isGameOver && !isPlaying && (
        <PausedModal setIsPlaying={setIsPlaying} />
      )}

      {isModalOpen && (
        <JoinPoolModal
          handleJoinPool={handleStartGame}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default SnakesGame;
