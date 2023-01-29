import React from "react";

function DownloadStatements() {
    function hello() {
        console.log('hello');
    }

    return (
        <div>
            <h1>DownloadStatements</h1>
            <form onSubmit={hello}>
                <button>submit</button>
            </form>
        </div>
    )
}


export default DownloadStatements;