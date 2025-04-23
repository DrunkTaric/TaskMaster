import { useState } from "react"
import "./Router.css"
import Home from "../pages/Home"
import About from "../pages/About"
import Tasks from "../pages/Tasks"

type Routes = "Home" | "Tasks" | "About"

export default function Router() {

    const [Route, setRoute] = useState<Routes>("Tasks")

    function changeRoute(route: Routes) {
        setRoute(route)
    }

    return (
        <main>
            <header>
                <button onClick={() => changeRoute("Home")}>Home</button>
                <button onClick={() => changeRoute("Tasks")}>Tasks</button>
                <button onClick={() => changeRoute("About")}>About</button>
            </header>

            <section>
                { Route == "Home" && <Home /> }
                { Route == "Tasks" && <Tasks /> }
                { Route == "About" && <About /> }
            </section>
        </main>
    )
}