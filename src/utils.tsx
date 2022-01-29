import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// ------ REACT


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
  minimumSaturation: number;
  maximumSaturation: number;
  incrementSaturationBy: number;

  minimumLightness: number;
  maximumLightness: number;
  incrementLightnessBy: number;

  lightsPerSaturations: number
};

const defaultShadeGeneratorOptions: shadeGeneratorOptions = {
  minimumSaturation: 0,
  maximumSaturation: 100,
  incrementSaturationBy: 5,
  minimumLightness: 0,
  maximumLightness: 100,
  incrementLightnessBy: 5,

  lightsPerSaturations: 3
};


export function* hslShadeGenerator(hslString: string, shadeOptions: shadeGeneratorOptions = defaultShadeGeneratorOptions) {
  const hslColor = new HslColor(hslString);
  console.log(hslColor.toHslString());
  yield hslColor.toHslString();
  
  let fullShadeOptions = {...shadeOptions, 
    isAscending: true, 
    originalSaturation: hslColor.saturation,
    originalLightness: hslColor.lightness
  }
  
  while (true) {
    for (let i in  [...Array(shadeOptions.lightsPerSaturations - 1)]) {
      hslColor.nextShade(0, 0, shadeOptions.incrementLightnessBy);
      console.log(hslColor.toHslString());
      yield hslColor.toHslString();  
    };

    hslColor.resetLightness()
    hslColor.nextShade(0, shadeOptions.incrementSaturationBy, 0);
    console.log(hslColor.toHslString());
    yield hslColor.toHslString();
  };
};


const ori = new HslColor('hsl(0deg 0% 90%)');
const hueIter = hslShadeGenerator(ori.originalHslString);

for (let a in [...Array(20)]) {
  // console.log(hueIter.next());
}
