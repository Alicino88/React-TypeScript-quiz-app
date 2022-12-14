import styled from "styled-components";

const TitleComponent = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #254762;
  font-weight: 600;
  margin-left: 0.5rem;
  @media (max-width: 700px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

type Props = {
  text: String;
};

const Title: React.FC<Props> = ({ text }) => {
  return <TitleComponent>{text}</TitleComponent>;
};

export default Title;
