import { Filter } from "../pages/Tasks";
import { useState } from "react";
import "./TaskFilter.css"

export default function TaskFilter({ onFilter }: { onFilter: (filter: Filter) => void }) {

    const [CurrentFilter, setCurrentFilter] = useState<Filter>("all")

    function changeFilter(filter: Filter) {
        setCurrentFilter(filter)
        onFilter(filter)
    }

    return (
        <div id="buttons-wrapper">    
            <button onClick={() => changeFilter("all")} disabled={CurrentFilter == "all"}>⭐</button>
            <button onClick={() => changeFilter("completed")} disabled={CurrentFilter == "completed"}>✅</button>
            <button onClick={() => changeFilter("uncompleted")} disabled={CurrentFilter == "uncompleted"}>⛔</button>
        </div>
    )
}