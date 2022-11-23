import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  padding: 60px;
  margin-top: 8rem;
  border-radius: 5px;
  text-align: center;

  @media (max-width: 700px) {
    padding: 30px 20px;
    margin: 6rem 1.5rem;
  }
`;

type Props = {
  children: React.ReactNode;
};

const QuizContainer: React.FC<Props> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default QuizContainer;
