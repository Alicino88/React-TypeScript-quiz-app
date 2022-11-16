import styled from "styled-components";

const Text = styled.p`
  font-size: 1.2em;
  text-align: center;
  color: #254762;
`;

type Props = {
  text: String;
};

const Title: React.FC<Props> = ({ text }) => {
  return <Text>{text}</Text>;
};

export default Title;
