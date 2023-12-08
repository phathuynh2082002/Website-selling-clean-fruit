import React, { useEffect } from "react";
import vietgap from "./img_standard/vietgap.png"
import globalgap from "./img_standard/globalgap.png"

const Standard = (props) => {
    const  standard  = props.standard;
    return (
        <>
            {
                standard==='vietgap'
                ? (
                    <div className="standard_vietgap">
                        <img src={vietgap} className="img_standard"/>
                    </div>
                )
                : (
                    <div className="standard_globalgap">
                        <img src={globalgap} className="img_standard"/>
                    </div>
                )
            }
        </>
        
    )
    
}

export default Standard;