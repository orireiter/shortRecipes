import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// ------ GENERAL


export const isEmailValid = (email: string): Boolean => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}


export function editObjectInArray<T, Key  extends keyof T>(objIndex: number,  objArray: Array<T>, fieldName: Key, fieldValue: T[Key]): Array<T> {
  let shallowArr = [...objArray];
  let shallowObj = {...shallowArr[objIndex]};
  shallowObj[fieldName] = fieldValue;
  shallowArr[objIndex] = shallowObj;
  return shallowArr;
}


// ------ REACT


export function editObjectInArrayAndSetState<T, Key extends keyof T>(objIndex: number,  objArray: Array<T>, fieldName: Key, fieldValue: T[Key], setFunc: React.Dispatch<React.SetStateAction<Array<T>>>) {
  let updatedArray = editObjectInArray(objIndex, objArray, fieldName, fieldValue);
  console.log(updatedArray);
  setFunc(updatedArray);
}


export function removeObjectFromArrayAndSetState<T>(objIndex: number, objArray: Array<T>, setFunc: React.Dispatch<React.SetStateAction<Array<T>>>) {
  let shallowArr = [...objArray];
  shallowArr.splice(objIndex, 1);
  setFunc(shallowArr);
};



export const Redirect = (props: {redirectTo: string}): JSX.Element => {
    let navigate = useNavigate();
    
    useEffect(() => {
      navigate(props.redirectTo, {replace: true});
    })
    
    return (
        <div>
        </div>
    );
};


export const LoadingScreen = (): JSX.Element => {
  return (
    <div id='loadingScreen'>
      <div></div>
    </div>
  );
}


export const ErrorMessage = (props: {errorMessage: string, children?: JSX.Element}): JSX.Element => {
  return (
    <div className='errorContainer'>
      <div className='errorMessage'>
        <span className="material-icons">
              error_outline
        </span>
        <h2>{props.errorMessage}</h2>
      </div>
      <div className='errorChildren'>
        {props.children}
      </div>
    </div>
  );
}


// ------ COLORS


class HslColor {
  // input
  originalHslString: string;
  
  // properties
  hue: number;
  saturation: number;
  lightness: number;

  constructor(originalHslString: string) {
    this.originalHslString = originalHslString;

    const hslArray = this.originalHslString.match(/\d+/g) || [];
    [this.hue, this.saturation, this.lightness] = hslArray.map(Number);
  };
 
  toHslString(): string {
    return `hsl(${this.hue} ${this.saturation}% ${this.lightness}%)`
  };

  nextShade(incrementHueBy=0, incrementSaturationBy=5, incrementLightnessBy=0): void {
    this.hue += incrementHueBy;
    this.saturation += incrementSaturationBy;
    this.lightness += incrementLightnessBy;
  };

  resetLightness(): void {
    const hslArray = this.originalHslString.match(/\d+/g) || [];
    let _;
    [_, _, this.lightness] = hslArray.map(Number);
  }

};


export type shadeGeneratorOptions = {
  maximumSaturation: number;
  incrementSaturationBy: number;
  incrementLightnessBy: number;
  lightsPerSaturations: number
};

const defaultShadeGeneratorOptions: shadeGeneratorOptions = {
  maximumSaturation: 100,
  incrementSaturationBy: 10,
  incrementLightnessBy: 5,
  lightsPerSaturations: 3
};


export function* hslShadeGenerator(hslString: string, shadeOptions: shadeGeneratorOptions = defaultShadeGeneratorOptions) {
  const hslColor = new HslColor(hslString);
  yield hslColor;
  
  let fullShadeOptions = {...shadeOptions, 
    isAscending: true, 
    minimumSaturation: hslColor.saturation,
  }
  
  while (true) {
    for (let i in  [...Array(fullShadeOptions.lightsPerSaturations - 1)]) {
      hslColor.nextShade(0, 0, fullShadeOptions.incrementLightnessBy);
      yield hslColor;  
    };

    hslColor.resetLightness()

    let isMaxSatReached = fullShadeOptions.isAscending && (hslColor.saturation + fullShadeOptions.incrementSaturationBy > fullShadeOptions.maximumSaturation);
    let isMinSatReached = !fullShadeOptions.isAscending && (hslColor.saturation + fullShadeOptions.incrementSaturationBy < fullShadeOptions.minimumSaturation);
    if (isMaxSatReached || isMinSatReached) {
      fullShadeOptions.isAscending = !fullShadeOptions.isAscending;
      fullShadeOptions.incrementSaturationBy = -fullShadeOptions.incrementSaturationBy;
    }
    hslColor.nextShade(0, fullShadeOptions.incrementSaturationBy, 0);
    yield hslColor;
  };

  return hslColor;
};
