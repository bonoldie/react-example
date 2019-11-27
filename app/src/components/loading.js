import React from 'react'

const Loading = () => {
    return (

        <div>
            {
                <div>
                    <div className={"overlay"}></div>
                    <div className={"spinner-border text-primary"}>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            }

        </div>

    )
}


export default Loading