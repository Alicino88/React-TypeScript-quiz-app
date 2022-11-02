import React, { useState } from "react";
import QuestionCard from "./Components/QuestionCard";
import { fetchQuizQuestions } from "./API";
import { QuestionState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const totalQuestions = 10;

function App() {
  const [loading, setLoading] = useState(false);
  //we need to specify that questions array has type QuestionState in order to be able to use the data
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [error, setError] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      Difficulty.EASY
    );
    console.log(newQuestions);
    //to be able to get undefined, I need to catch the error in fetchQuizQuestions, otherwise "Uncaught (in promise) TypeError" displayed in console.
    if (newQuestions === undefined || newQuestions.length === 0) {
      setLoading(false);
      setError(true);
    }

    setQuestions(newQuestions);
    setLoading(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentAnswer = e.currentTarget.value;
    console.log(currentAnswer);
    const answerIsCorrect = questions[number].correct_answer === currentAnswer;
    console.log(answerIsCorrect);
    if (answerIsCorrect) setScore((prev) => prev + 1);
    const answerObject = {
      question: questions[number].question,
      answer: currentAnswer,
      correct: answerIsCorrect,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === totalQuestions ? (
        <button className="start" onClick={startQuiz}>
          Start the quiz
        </button>
      ) : null}

      {!gameOver && <p className="score">your score:{score}</p>}
      {loading && <p>Loading questions...</p>}
      {error && <p>Oops, there was an error while retrieving the data</p>}
      {!loading && !gameOver && !error && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={totalQuestions}
          question={questions[number].question}
          answers={questions[number].all_answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          id={Math.random()}
        />
      )}

      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next question
          </button>
        )}
    </div>
  );
}

export default App;
