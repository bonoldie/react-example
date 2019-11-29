import React from 'react'

const Loading = () => {
    return (

        <div>
            {
                <div>
                    <div className={"overlay"}></div>
                    <div className={"spinner-border text-primary"}>
                        <span className={"sr-only"}>Loading...</span>
                    </div>
                </div>

            }

        </div>

    )
}


export default Loading