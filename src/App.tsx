import React from "react";
import QuestionCard from "./Components/QuestionCard";

function App() {
  const startQuiz = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quiz</h1>
      <button className="start" onClick={startQuiz}>
        Start the quiz
      </button>
      <p className="score">your score:</p>
      <p>Loading questions...</p>
      <QuestionCard />
      <button className="next" onClick={nextQuestion}>
        Next question
      </button>
    </div>
  );
}

export default App;
