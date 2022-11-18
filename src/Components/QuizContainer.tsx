import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  padding: 60px;
  margin-top: 25vh;
  border-radius: 5px;
`;

type Props = {
  children: React.ReactNode;
};

const QuizContainer: React.FC<Props> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default QuizContainer;
