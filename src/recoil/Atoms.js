import {atom} from 'recoil';

export const MOUSE_POS = atom({
	key : 'mousePos',
    default : [{
        x: 0,
        y: 0,
    }],
});

export const MOUSE_SENSITIVITY = atom({
	key : 'mouseSensitivity',
    default : 3.0
});

export const IS_LEFT_EYE_BLINK = atom({
	key : 'isLeftEyeBlink',
    default : false
});

export const IS_RIGHT_EYE_BLINK = atom({
	key : 'isRightEyeBlink',
    default : false
});

export const IS_MOUSE_OPEN = atom({
	key : 'isMouseOpen',
    default : false
});

export const STROKE_COLOR = atom({
    key : 'strokeColor',
    default : '#000000'
})

export const LINE_WIDTH=atom({
    key : 'lineWidth',
    default : '10'
})

export const CURRENT_FUNCTION=atom({
    key : 'currentFunction',
    default : 'draw'
})