Below some details on how the code works:

1. I Built the API url endpoint using https://opentdb.com/api_config.php.
fetchQuizQuestions() takes two arguments, a number for the amount of questions and an enum for the difficulty. The Difficult enum is imported inside App as it is used there when firing the fetch function.


2. Added error handling with try/catch inside async function (see API.ts file for more comments).

3. I add to the Question object the property "all_answers" that contains all right and wrong answers.
I apply shuffle function to make sure right and wrong answers are never in the same order:

export const shuffleArray = (array: any[]) =>  array.sort(() => Math.random() - 0.5);

The sort method transforms all non-undefined values to strings before sorting them in ascending order. 

Math.random()generates a random number from 0 (included) to 1 (excluded). 50% of the time I will get a negative number.
To the sort method I pass an optional argument "compareFunction" that compares two elements of the array. The compare function returns a number and the number is used to sort the array. Depending on whether the number is positive or negative then the questions are sorted in a different way.

For more info on the sort method: https://www.programiz.com/javascript/library/array/sort

4. When getting the questions back, I use useState to set them inside the variable "questions". The QuestionCard component displays the question. To display one question at a time I use array indexing: 

question={questions[number].question}

5. When clicking on an answer, the checkAnswer function is fired:
-the score is calculated
-the answerObject is added to the userAnswers array (note that I had to define a type for this, the "AnswerObject".)
-UserAnswer is passed down as prop to the QuestionCard component. When clicking on an answer the answerObject is added and passed down as a prop. Since the object exists then the buttons become disabled:

disabled={userAnswer ? true : false}

6. The "next question" button is shown only after the user answers to the question:

userAnswers.length === number + 1

The first time the user answers, the answerObject is added to the userAnswers array. userAnswers.length is equal to 1 which is equal to number+1 (number default value is 0).

7. When clicking on the "next question" button, nextQuestion function is fired: if I am on the last question, then the game is set to be over. Otherwise, I move on to the next question and I display it to the user by using array indexing.

Interesting concepts:

-typescript: types, enums </br>
-conditional rendering </br>
-sort() JS method and optional argument compareFunction </br>
-spread operator </br>
-error handling with async await
