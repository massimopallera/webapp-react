import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";

export default function DefaultLayout(){
    return(
    <>

        <AppHeader />

        <main className="bg-dark py-5">
            {<Outlet />}
        </main>
    
    </>
    )
}