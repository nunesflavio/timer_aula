import {ButtonContainer, ButtonVariant} from "./Button.styles";

interface ButtonProps {
    variant?: ButtonVariant;
}

export function _Button_({ variant = 'primary' }: ButtonProps) {
    return <ButtonContainer variant={variant}>WWWW </ButtonContainer>
}
