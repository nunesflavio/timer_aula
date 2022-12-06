import {HandPalm, Play} from "phosphor-react";
import {FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// nessa nao ha export default, por isso faz  * as
import * as zod from 'zod';
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,

} from "./styles";
import {useContext} from "react";
import {NewCycleForm} from "./components/NewCycleForm";
import {Countdown} from "./components/Countdown";
import {CyclesContext} from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
});

//para referenciar variavel JS dentro do Typescript usa o Typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,

        },
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)

        reset();

    }

    // valor do campo em tempo real e ele é um Controled component. novo digito recria toda a pagina
    const task = watch('task');

    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown  />

                { activeCycle ? (
                    <StopCountdownButton type="button" onClick={interruptCurrentCycle}> <HandPalm size={24}/> Stop </StopCountdownButton>

                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}> <Play size={24}/> Começar </StartCountdownButton>

                )
                }

            </form>

        </HomeContainer>
    )
}