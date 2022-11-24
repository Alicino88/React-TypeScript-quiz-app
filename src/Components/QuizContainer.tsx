import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: white;
  padding: 60px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 700px) {
    width: 350px;
    padding: 40px 20px;
    text-align: center;
  }

  @media (min-width: 701px) and (max-width: 850px) {
    width: 600px;
    padding: 40px 30px;
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
