import styled, { css } from "styled-components";
/*.button {
    width: 100px;
    height: 40px;
}

.primary {
    background: purple;
}

.secondary {
    background: orange;
}*/

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}

interface ButtonContainerProps {
    variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
 width: 100px;
 height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;
  
  background-color: ${props => props.theme["green-500"]};
  color: ${props => props.theme.white};
  
 
   
`