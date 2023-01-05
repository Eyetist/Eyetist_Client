import {atom} from 'recoil';

export const MOUSE_POS = atom({
	key : 'mousePos',
    default : [{
        x: 0,
        y: 0,
    }],
});

export const IS_LEFT_EYE_BLINK = atom({
	key : 'isLeftEyeBlink',
    default : false
});

export const IS_RIGHT_EYE_BLINK = atom({
	key : 'isRightEyeBlink',
    default : false
});