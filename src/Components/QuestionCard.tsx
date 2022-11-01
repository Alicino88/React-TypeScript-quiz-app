import { AnswerObject } from "../App";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
  id: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  id,
}) => {
  return (
    <div>
      <p className="number">
        Question: {questionNumber}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => (
          <div>
            <button
              disabled={userAnswer ? true : false}
              onClick={callback}
              value={answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
