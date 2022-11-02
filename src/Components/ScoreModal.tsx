import "./ScoreModal.css";

type Props = {
  score: number;
  startNewGame: (e: React.MouseEvent<HTMLButtonElement>) => void;
  endGame: (e: React.MouseEvent) => void;
};

const ScoreModal: React.FC<Props> = ({ score, startNewGame, endGame }) => {
  return (
    <div className="backdrop" onClick={endGame}>
      <div className="scoreContainer">
        <p>Your final score is:{score} </p>
        <button onClick={startNewGame}>Play again</button>
        <button onClick={endGame}>End Game</button>
      </div>
    </div>
  );
};

export default ScoreModal;
