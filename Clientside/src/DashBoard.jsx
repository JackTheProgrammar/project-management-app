import { useState } from "react"
import { Link } from 'react-router-dom';

function DashBoard() {
    return (
        <>
            <div>
                Dashboard
                <Link to='/tasks'>Link To Taks</Link>
            </div>
        </>
    )
}


export default DashBoard
