interface PausedModalProps {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PausedModal({ setIsPlaying }: PausedModalProps) {
  return (
    <div
      id="paused-modal-container"
      onClick={() => setIsPlaying((prevIsPlaying) => !prevIsPlaying)}
    >
      <div
        id="paused-modal"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <h2>Paused</h2>
        <p className="click-dir">(Click esc to continue)</p>
      </div>
    </div>
  );
}
