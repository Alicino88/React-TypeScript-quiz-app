import styled from "styled-components";
import Button from "./UI/Button";

type Props = {
  score: number;
  startNewGame: (e: React.MouseEvent) => void;
  endGame: (e: React.MouseEvent) => void;
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);

  div {
    width: 40rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fffcf9;
    padding: 60px;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
  }

  p {
    font-size: 1.2em;
    color: #484644;
    margin-bottom: 1em;
  }

  .boldPar {
    font-weight: bold;
  }
  Button {
    margin-right: 30px;
  }
`;

const ScoreModal: React.FC<Props> = ({ score, startNewGame, endGame }) => {
  return (
    <Container>
      <div>
        {score >= 8 && <p>You rock!</p>}
        {score >= 5 && score < 8 && <p>Woop woop! Good job!</p>}
        {score < 5 && <p>Don't despair, there is still time to be a hero!</p>}
        <p className="boldPar">Your final score is: {score} </p>

        <Button onClickEvent={startNewGame} title="Play again" />
        <Button outlined onClickEvent={endGame} title="End Game" />
      </div>
    </Container>
  );
};

export default ScoreModal;
