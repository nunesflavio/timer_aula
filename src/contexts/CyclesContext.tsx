import {createContext, ReactNode, useState, useReducer, useEffect} from "react";
import { Cycle, cylesReducer} from '../reducers/cycles/reducer';
import {
    ActionTypes,
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsFinishedAction
} from "../reducers/cycles/actions";
import {differenceInSeconds} from "date-fns";

interface CreateCycleData {
    task: string;
    minutesAmount: number
}

interface CycleContextType {
    cycles: Cycle[]
    //interface Cycle
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
    children: ReactNode;
}


export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cylesReducer, {

        cycles: [],
        activeCycleId: null,
    }, () => {
        const storedStateAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if (storedStateAsJson) {
            return JSON.parse(storedStateAsJson)
        }
    })

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

        if (activeCycle) {

            return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
        }

        return 0;

    });

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)
    }, [cyclesState])

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    //marca ciclo atual como finalizado
    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())

    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        //formato anterior depende do novo na alteração do estado, melhor usar arrow function com state
        //setCycles((state) => [...state, newCycle]);

        setAmountSecondsPassed(0);

    }

    function interruptCurrentCycle() {
        //percorre todos os ciclos , se ciclo ativo
        dispatch(interruptCurrentCycleAction())

    }

    return (
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed,
            setSecondsPassed, createNewCycle, interruptCurrentCycle, cycles }}
        >
            {children}
        </CyclesContext.Provider>
    )
}