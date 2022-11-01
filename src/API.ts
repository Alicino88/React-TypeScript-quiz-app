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

//case1: data are retrieved
//case2: url before ? is wrong then, by using await fetch, javascript automaticlly throws an error
//case3: url after ? is wrong the response actually gets back but response.results is an empty array
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amoun=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(endPoint);
    console.log(response);

    //still need to investigate this: (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
    //when changing the URL before "?" I don't get a response back, it seems the API doesn't support cross origin requests
    /*
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong");
    }
    */
    const data = await response.json();
    console.log(data);
    if (data.results.length === 0) {
      throw new Error("The part after ? contains some mistake");
    }
    //below I create the new property "all_answers" and make sure the answers order is never the same
    return data.results.map((question: Question) => ({
      ...question,
      all_answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error: any) {
    console.log(error.name);
    console.log(error.message);
  }
};
