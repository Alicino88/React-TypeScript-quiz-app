import styled from "styled-components";

type ButtonProps = {
  title: string;
  onClickEvent: (e: React.MouseEvent) => void;
  secondary?: boolean;
};

const ButtonElement = styled.button<Pick<ButtonProps, "secondary">>`
  font-size: 1em;
  margin-top: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  color: white;
  text-transform: uppercase;
  background-color: ${(props) => (props.secondary ? "#4897b1" : "#c1511d")};
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({ title, onClickEvent, secondary }) => {
  return (
    <ButtonElement secondary={secondary} onClick={onClickEvent}>
      {title}
    </ButtonElement>
  );
};

export default Button;
