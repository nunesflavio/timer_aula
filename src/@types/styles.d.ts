//aqui definição de tipos

import 'styled-components';
import { defaultTheme} from "../styles/themes/default";

//quais as propriedades do tema
type ThemeType = typeof  defaultTheme;

// criar a tipagem para o styled components
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}

}

