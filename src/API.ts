import { shuffleArray } from "./utils";
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

//the below adds the all_answers property to the Question type
export type QuestionState = Question & { all_answers: string[] };
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(endPoint);
  const data = await response.json();

  //console.log(data);
  //below I create the new property "all_answers" and make sure the answers order is never the same
  return data.results.map((question: Question) => ({
    ...question,
    all_answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
