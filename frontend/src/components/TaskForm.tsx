import { ChangeEvent, useState } from "react";
import "./TaskForm.css"

export default function TaskForm({ onAdd }: { onAdd: (text: string) => void }) {

    const [CurrentText, setCurrentText] = useState<string>("")

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setCurrentText(e.target.value)
    }

    function onKeyUp(e: any) {
        if (e.key != "Enter") { return }
        if (CurrentText.replace(" ", "").length <= 0) { return }
        e.preventDefault()
        onAdd(CurrentText)
        setCurrentText("")
    }

    return (
        <div>
            <input placeholder="Task Name" onChange={onChange} onKeyUp={(e) => onKeyUp(e)} value={CurrentText} />
        </div>
    )
}