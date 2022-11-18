import styled from "styled-components";

type ButtonProps = {
  title: string;
  onClickEvent: (e: React.MouseEvent) => void;
  outlined?: boolean;
};

const ButtonElement = styled.button<Pick<ButtonProps, "outlined">>`
  font-size: 1em;
  margin-top: 1em;
  padding: 0.5em 1em;
  border: 2px solid #c1511d;
  border-radius: 3px;
  color: ${(props) => (props.outlined ? "#c1511d" : "white")};
  text-transform: uppercase;
  background-color: ${(props) => (props.outlined ? "white" : "#c1511d")};
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({ title, onClickEvent, outlined }) => {
  return (
    <ButtonElement outlined={outlined} onClick={onClickEvent}>
      {title}
    </ButtonElement>
  );
};

export default Button;
