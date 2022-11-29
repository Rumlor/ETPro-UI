import Navbar from "./Navbar";

export const ComponentWithNav = ({component:Component})=>{

    return (
        <div>
            <Navbar/>
            <>
                {Component}
            </>
        </div>
    )
}