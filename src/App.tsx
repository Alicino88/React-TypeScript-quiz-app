import React, { useState } from "react";
//components
import QuestionCard from "./Components/QuestionCard";
import ScoreModal from "./Components/ScoreModal";
import QuizContainer from "./Components/QuizContainer";
import Button from "./Components/Button";
//functions and types
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

  const [showModal, setShowModal] = useState(false);

  const startQuiz = async () => {
    setShowModal(false);
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

    const answerIsCorrect = questions[number].correct_answer === currentAnswer;

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

  const showScore = () => {
    setShowModal(true);
  };

  const closeScoreModal = () => {
    setShowModal(false);
  };

  return (
    <QuizContainer>
      <h1>Quiz App</h1>
      {gameOver && <Button title="Start the quiz" onStartGame={startQuiz} />}

      {loading && <p>Loading questions...</p>}
      {error && <p>We have a little problem, try again later</p>}
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

      {userAnswers.length === totalQuestions && !loading && (
        <button onClick={showScore}>check your score</button>
      )}
      {showModal && (
        <ScoreModal
          score={score}
          startNewGame={startQuiz}
          endGame={closeScoreModal}
        />
      )}
    </QuizContainer>
  );
}

export default App;
