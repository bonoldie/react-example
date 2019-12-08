import React from 'react'
import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const Loading = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={"row"} style={{height:windowDimensions.height / 3}}>

            <div className={"card col-12"}>
                <div className={"card-body"}>
                    <div className={"overlay"}>
                        <div className={"spinner-border text-primary"} /></div>
                </div>
            </div>
        </div>


    )
}


export default Loading