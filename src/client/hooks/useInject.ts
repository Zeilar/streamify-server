import { useContext } from "react";
import { DependencyContext } from "../contexts/DependencyContext";

export function useInject() {
    return useContext(DependencyContext);
}
