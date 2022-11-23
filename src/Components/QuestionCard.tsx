import styled from "styled-components";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;

  correctAnswer: String;
};

const Container = styled.div`
  text-align: left;
  max-width: 40rem;
  p {
    font-size: 1.2em;
    color: #484644;
    margin-bottom: 1em;
  }

  h3 {
    color: #254762;
    border-left: 3px solid #c1511d;
    padding-left: 0.5rem;
    margin-bottom: 1.8em;
  }

  button {
    margin-bottom: 0.8rem;
    margin-right: 2rem;
    background-color: white;
    color: #254762;
    border: 2px solid #254762;
    padding: 0.8rem 1.3rem;
    cursor: pointer;
    border-radius: 3px;
    font-size: 1rem;
  }

  .redbackground {
    background-color: #ed9893;
  }

  .greenBackground {
    background-color: #b1edad;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  @media (max-width: 580px) {
    display: block;
  }
`;

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  correctAnswer,
}) => {
  //console.log(answers);
  return (
    <Container>
      <p className="number">
        Question: {questionNumber}/{totalQuestions}
      </p>
      <h3 dangerouslySetInnerHTML={{ __html: question }}></h3>
      <ButtonContainer>
        {answers.map((answer) => (
          <div key={Math.random()}>
            <button
              disabled={userAnswer ? true : false}
              onClick={callback}
              value={answer}
              //</div> userAnswer?.answer === answer makes sure that only the answer the user has clicked on becomes red in case it is wrong*/
              //userAnswer object is undefined until the user clicks on an answer

              className={
                userAnswer?.answer === answer && userAnswer?.correct === false
                  ? "redbackground"
                  : userAnswer && answer === correctAnswer
                  ? "greenBackground"
                  : ""
              }
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />{" "}
            </button>
          </div>
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default QuestionCard;
