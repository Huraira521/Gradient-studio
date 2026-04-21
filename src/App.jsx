import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useGradientGenerator } from './hooks/useGradientGenerator';
import { useImageColorExtractor } from './hooks/useImageColorExtractor';
import GradientCard from './components/GradientCard';
import ColorPalette from './components/ColorPalette';
import ImageUploader from './components/ImageUploader';
import { getHexColorCode } from './utils/colorUtils';


function App() {

  const {
    num, setNum,
    type, setType,
    gradients, setGradients,
    generateGradient
  } = useGradientGenerator();


  const handleImageGradient = (topColors) => {
    const newGradient = {
      gradient: `linear-gradient(135deg, ${topColors[0]}, ${topColors[1]})`,
      css: `background: linear-gradient(135deg, ${topColors[0]}, ${topColors[1]});`,
      tailwind: `bg-[linear-gradient(135deg,_${topColors[0]},_${topColors[1]})]`
    };
    setGradients([newGradient]);
    toast.success('Gradient created from your image!', { position: 'top-center' });
  };

  const { imageColors, isExtracting, extractColorsFromImage } =
    useImageColorExtractor(handleImageGradient);



  function handleCopy(css) {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied to clipboard!", { position: 'top-center' })
  }

  // console.log(gradients)

  useEffect(() => {
    generateGradient();
  }, [generateGradient]);


  // css: background:linear-gradient(45deg,#f0cb40,#7f528c);  
  // tailwind: className='bg-[linear-gradient(265deg,_#ff9a9e,_#fad0c4,)]'


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div
          className='flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-2xl shadow-lg'
          style={{ background: getHexColorCode() }}
        >
          <h1 className='text-2xl sm:text-3xl font-bold text-white drop-shadow-2xl'>
            🎨 Gradient Studio
          </h1>
          <div className='flex flex-wrap gap-3'>
            <input
              className='border border-gray-300 bg-white/90 rounded-lg w-24 p-2 focus:outline-none focus:ring-2'
              onChange={(e) => setNum(Number(e.target.value))}
              value={num}
              placeholder='12'
            />
            <select value={type} className='border border-gray-300 bg-white/90 rounded-lg w-24 p-2 focus:outline-none focus:ring-2' onChange={(e) => setType(e.target.value)}>
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          <button onClick={generateGradient} className='bg-rose-600 hover:bg-rose-700 px-6 py-2 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg'>Generate ✨</button>

          <ImageUploader
            onImageUpload={extractColorsFromImage}
            isExtracting={isExtracting}
          />

        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            gradients.map((item, index) => (
              <GradientCard
                key={index}
                gradient={item}
                onCopy={handleCopy}
              />
            ))
          }
        </div>

        <ColorPalette
          colors={imageColors}
          onColorClick={(color) => handleCopy(color, 'Color')}
        />
      </div>
      <ToastContainer theme="dark" position="top-center" />
    </div>
  )
}

export default App