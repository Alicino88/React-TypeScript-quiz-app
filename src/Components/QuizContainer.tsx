import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  padding: 60px;
  margin-top: 30vh;
  border-radius: 5px;
  text-align: center;
`;

type Props = {
  children: React.ReactNode;
};

const QuizContainer: React.FC<Props> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default QuizContainer;
