import styled from "styled-components";

type ButtonProps = {
  title: string;
  onStartGame: (e: React.MouseEvent) => void;
};

const ButtonElement = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.45em 1em;
  border: 2px solid #254762;
  border-radius: 3px;
  color: #254762;
  text-transform: uppercase;
  background-color: white;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #254762;
  }
`;

const Button: React.FC<ButtonProps> = ({ title, onStartGame }) => {
  return <ButtonElement onClick={onStartGame}>{title}</ButtonElement>;
};

export default Button;

/*
  background: ${(props) => (props.primary ? "#39758b" : "white")};
  color: ${(props) => (props.primary ? "white" : "#39758b")};
  */
