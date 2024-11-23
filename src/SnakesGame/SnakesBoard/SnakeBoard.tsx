import { useRef, useEffect } from "react";
import { SnakeGameEngine } from "./SnakeGame";

import "./SnakesBoardStyles.css";

interface SnakeGameBoard {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  externalScore: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setLives:React.Dispatch<React.SetStateAction<number>>;
}

export default function SnakeBoard({
  isPlaying,
  setIsPlaying,
  externalScore,
  setScore,
  setIsGameOver,
  setLives
}: SnakeGameBoard) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakes = useRef<SnakeGameEngine | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  const canvasSidesLength = 500; // Canvas size in pixels

  useEffect(() => {
    if (!canvasRef.current) {
      console.warn("Canvas reference is not yet initialized.");
      return; 
    }

    canvasRef.current.width = canvasSidesLength;
    canvasRef.current.height = canvasSidesLength;

    context.current = canvasRef.current.getContext("2d");
    if (context.current) {
      const ctx=context.current;
      snakes.current = new SnakeGameEngine(
        ctx,
        canvasSidesLength,
        externalScore,
        setScore,
        setIsGameOver,
        setLives,
        isPlaying
      );
    }

    // Add keydown listener for snake controls and pause
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!snakes.current) return;

      switch (e.key) {
        case "w":
        case "ArrowUp":
          snakes.current.snake.changeMovement("to top");
          break;
        case "s":
        case "ArrowDown":
          snakes.current.snake.changeMovement("to bottom");
          break;
        case "d":
        case "ArrowRight":
          snakes.current.snake.changeMovement("to right");
          break;
        case "a":
        case "ArrowLeft":
          snakes.current.snake.changeMovement("to left");
          break;
        case "Escape":
          setIsPlaying((prevIsPlaying) => !prevIsPlaying); // Toggle pause
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {

      if (snakes.current) {
        snakes.current.stopAnimation(); 
      }
      snakes.current = null;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ setIsGameOver, setIsPlaying]);

  useEffect(() => {
    // Trigger the animation based on isPlaying
    if (snakes.current) {
      snakes.current.animate(isPlaying);
    }
  }, [isPlaying]);

  return (
    <div>
      <canvas id="game-canvas" ref={canvasRef}></canvas>
    </div>
  );
}
