// hooks/useGradientGenerator.js
import { useState, useCallback } from 'react';
import { getHexColorCode } from '../utils/colorUtils';

export const useGradientGenerator = () => {
  const [num, setNum] = useState(4);
  const [type, setType] = useState('linear');
  const [gradients, setGradients] = useState([]);

  const generateGradient = useCallback(() => {
    const colorsArray = [];
    for (let i = 0; i < num; i++) {
      const degree = Math.floor(Math.random() * 360);
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      
      if (type === 'linear') {
        colorsArray.push({
          gradient: `linear-gradient(${degree}deg, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degree}deg, ${color1}, ${color2});`,
          tailwind: `bg-[linear-gradient(${degree}deg, ${color1}, ${color2})]`
        });
      } else {
        colorsArray.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient(circle, ${color1}, ${color2});`,
          tailwind: `bg-[radial-gradient(circle at center, ${color1}, ${color2})]`
        });
      }
    }
    setGradients(colorsArray);
  }, [num, type]);

  return {
    num, setNum,
    type, setType,
    gradients, setGradients,
    generateGradient
  };
};