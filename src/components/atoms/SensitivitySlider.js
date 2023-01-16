import { Slider } from "@material-ui/core";
import React from "react";
import { MOUSE_SENSITIVITY } from "../../recoil/Atoms";
import { useRecoilState } from "recoil";

const SensitivitySlider = (props) => {
    let [mouseSensitivity, setMouseSensitivity] = useRecoilState(MOUSE_SENSITIVITY)

    const handleSliderChange = (event, newValue) => {
        setMouseSensitivity(newValue);
    };

    const handleInputChange = (event) => {
        setMouseSensitivity(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (mouseSensitivity < 1) {
            setMouseSensitivity(1);
        } else if (mouseSensitivity > props.maxRange) {
            setMouseSensitivity(props.maxRange);
        }
    };
    return(
        <div>
            <div style={{float:"left" , marginLeft:"20px", color:'red'}}>{props.title}</div>
            <Slider
                style={{float:"left", width: props.width, height: props.height, marginLeft: "10px"}}

                value={typeof mouseSensitivity === 'number' ? mouseSensitivity : 1}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"

                step={1}
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
                value={mouseSensitivity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                type="number"
            />
        </div>
    )

}

export default SensitivitySlider;