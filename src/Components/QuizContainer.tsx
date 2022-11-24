import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  text-align: center;

  @media (max-width: 700px) {
    width: 350px;
    padding: 40px 20px;
    text-align: center;
  }

  @media (min-width: 701px) and (max-width: 850px) {
    width: 700px;
    padding: 40px 50px;
    text-align: center;
  }
`;

type Props = {
  children: React.ReactNode;
};

const QuizContainer: React.FC<Props> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default QuizContainer;
