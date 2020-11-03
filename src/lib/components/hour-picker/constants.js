import styles from './transitions.scss';

console.log(styles);

export const FADE_MILLI = parseFloat(styles.animationFade) * 1000;
export const FAST_MILLI = parseFloat(styles.animationFast) * 1000;
export const SLOW_MILLI = parseFloat(styles.animationSlow) * 1000;

export const DIVISIONS = 12;
export const RADIUS = 120;

export const EDIT_HOURS = 'hrs';
export const EDIT_MINUTES = 'min';