import { createGlobalStyle } from "styled-components";
import background from "./Assets/background.jpg";

export const GlobalStyle = createGlobalStyle`
*{
box-sizing: border-box;
margin: 0;
}

body {
background-image: url(${background});
background-size:cover;
font-family: 'Source Sans Pro', sans-serif;
display:flex;
justify-content:center;
height: 100vh
}

`;
