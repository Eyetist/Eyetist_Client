import { Slider } from "@material-ui/core";
import React from "react";
import { useState } from "react";

const CustomSlider = (props) => {

    const handleSliderChange = (event, newValue) => {
        props.setProgress(newValue);
    };

    const handleInputChange = (event) => {
        props.setProgress(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (props.progress < 1) {
            props.setProgress(1);
        } else if (props.progress > props.maxRange) {
            props.setProgress(props.maxRange);
        }
    };
    return(
        <div>
            <div style={{float:"left" , marginLeft:"20px", color:'red'}}>{props.title}</div>
            <Slider
                style={{float:"left", width: props.width, height: props.height, marginLeft: "10px"}}

                value={typeof props.progress === 'number' ? props.progress : 1}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"

                step={0.1}
                // marks
                min={1}
                max={props.maxRange}

                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                color="secondary"
            />
            <input
                style={{width:'50px', fontWeight:'500' , fontSize:'14px', border:'none', marginLeft:'5px', color:'red'}}
                value={props.progress}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="number"
            />
        </div>
    )

}

export default CustomSlider;