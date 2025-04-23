import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import "./Tasks.css"
import TaskFilter from "../components/TaskFilter"

export type Task = { _id: string, task: string, completed: boolean }
export type Filter = "all" | "completed" | "uncompleted"

function TaskComponent(task: Task & { changeState: (id: string, bool: boolean) => void}) {

    const [IsCompleted, setIsCompleted] = useState<boolean>(task.completed)

    function changeState() {
        setIsCompleted(!IsCompleted)
        task.changeState(task._id, IsCompleted)
    }

    return (
        <li style={{backgroundColor: (task.completed? "green": "red")}} onClick={changeState}>
            <h1>{task.task}</h1>
        </li>
    )
}

export default function Tasks() {

    const [Tasks, setTasks] = useState<Task[]>([])
    const [CurrentTasks, setCurrentTasks] = useState<Task[]>([])
    const [CurrentFilter, setCurrentFilter] = useState<Filter>("all")

    async function fetchData() {
        await fetch("http://localhost:3000/tasks", {
            method: "GET"
        }).then(async (res) => {
            const data = await res.json()
            setTasks(data.reverse())
        })
    }

    async function addTask(taskName: string) {
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                task: taskName,
                completed: false
            })
        }).then(async (e) => {
            const data = await e.json()
            setTasks([{
                _id: data.insertedId,
                task: taskName,
                completed: false
            }, ...Tasks ])
        })
    }

    async function changeState(id: string, bool: boolean) {
        let index = Tasks.findIndex((e) => e._id == id )

        if (index == -1 ) return

        let OldData = Tasks
        OldData[index].completed = bool

        await fetch("http://localhost:3000/tasks", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                completed: bool
            })
        })

        setTasks([...OldData])
    }

    function setFilter(filter: Filter) {
        setCurrentFilter(filter)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const list = Tasks.filter((e) => {
            if (CurrentFilter == "all") { return true }
            if (CurrentFilter == "completed" && e.completed == true ) { return true }
            if (CurrentFilter == "uncompleted" && e.completed == false ) { return true }
            return false
        })
        setCurrentTasks([...list])
    }, [Tasks, CurrentFilter])

    return(
        <>
            <TaskForm onAdd={addTask} />
            <TaskFilter onFilter={setFilter} />
            <ul> 
                {CurrentTasks.map((e, i) => {
                    return <TaskComponent key={i} changeState={changeState} {...e} />
                })}       
            </ul>
        </>
    )
}