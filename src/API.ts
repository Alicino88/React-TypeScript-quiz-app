//logic to fetch data from https://opentdb.com/api.php?amount=10type=multiple
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
  console.log(data);
};
