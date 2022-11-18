import React, { useState } from "react";
//components
import QuestionCard from "./Components/QuestionCard";
import ScoreModal from "./Components/ScoreModal";
import QuizContainer from "./Components/QuizContainer";
import Button from "./Components/UI/Button";
import Title from "./Components/UI/Title";
import Text from "./Components/UI/Text";
//functions and types
import { fetchQuizQuestions } from "./API";
import { QuestionState, Difficulty } from "./API";

//style
import Rocket from "./Assets/rocket.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

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
    setGameOver(false);
    setShowModal(false);
    setLoading(true);

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

    if (answerIsCorrect) {
      setScore((prev) => prev + 1);
    }
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
    setGameOver(true);
  };

  return (
    <QuizContainer>
      {gameOver && (
        <Container>
          <img src={Rocket} alt="rocket" width="40px" />
          <Title text="Ready to test your knowledge?" />
        </Container>
      )}
      {gameOver && <Button title="Start the quiz" onClickEvent={startQuiz} />}

      {loading && <Text text="Loading questions..." />}
      {error && <Text text="We have a little problem, try again later" />}
      {!gameOver && !loading && !error && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={totalQuestions}
          question={questions[number].question}
          answers={questions[number].all_answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          id={Math.random()}
          correctAnswer={questions[number].correct_answer}
        />
      )}

      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 && (
          <Button title="Next question" onClickEvent={nextQuestion} />
        )}

      {userAnswers.length === totalQuestions && !loading && !gameOver && (
        <Button onClickEvent={showScore} title="check your score" />
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
