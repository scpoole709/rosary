export interface Page {
  instruction: string;
  file?: any;
  decadeIndex?: number;
  mysteryIndex?: number;
}

export interface PrayerFile{
  title: string;
  text: string;
}

export interface CounterState{
  current: number;
  low:number;
  high: number;
  direction: boolean;
}

export function applyChange(state: {current: number, low:number, high: number, direction: boolean}){
  if (state.direction){
    if (state.current >= state.high){
      state.direction = !state.direction;
      state.current--;
    } else {
      state.current++;
    }
  } else {
     if (state.current <= state.low){
      state.direction = !state.direction;
      state.current++;
    } else {
      state.current--;
    }
  }
  return state.current.toString(16);
}
