import { shuffleArray } from "./utils";
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

//the below adds the all_answers property to the Question type above
export type QuestionState = Question & { all_answers: string[] };
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//case1: data are retrieved successfully
/*case2: The URL before ? has some spelling mistakes: await fetch inside try block throws an error caught in the catch block. 
I don't get the response back. I console log error and message and with conditional rendering I show a special message inside UI.*/
/*case3: The query (after ?) is wrong and I get an empty array back. I check with if statement, throw an error and modify UI.

If the words "difficulty and "type" are wrong the data are still retrieved. "amount" cannot be misspelled and also cannot omit &*/
//it depends on how the API is built: some queries are required, others aren't. it is possible that when non-required queries are misspelled then I get back a defalut value (e.g.multiple)
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

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
