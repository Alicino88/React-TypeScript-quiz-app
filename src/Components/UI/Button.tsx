import styled from "styled-components";

type ButtonProps = {
  title: string;
  onClickEvent: (e: React.MouseEvent) => void;
  secondary?: boolean;
};

const ButtonElement = styled.button<Pick<ButtonProps, "secondary">>`
  font-size: 1em;
  margin: 1em;
  padding: 0.45em 1em;
  border: 2px solid #c1511d;
  border-radius: 3px;
  color: ${(props) => (props.secondary ? "red" : "#c1511d")};
  text-transform: uppercase;
  background-color: white;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #c1511d;
  }
`;

const Button: React.FC<ButtonProps> = ({ title, onClickEvent, secondary }) => {
  return (
    <ButtonElement secondary={secondary} onClick={onClickEvent}>
      {title}
    </ButtonElement>
  );
};

export default Button;
