import {Header} from "../../components/Header";

// posiciona o conteudo especifico de cada pagina
import {Outlet} from "react-router-dom";

import { LayoutContainer } from "./styles";

export function DefaultLayout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}