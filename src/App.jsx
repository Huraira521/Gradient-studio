import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [num, setNum] = useState(4);
  const [type, setType] = useState("linear")
  const [gradients, setGradients] = useState([]);

  const [imageColors, setImageColors] = useState([])
  const fileInputRef = useRef(null)

  function getHexColorCode() {
    const rgb = 255 * 255 * 255;
    const intValue = Math.floor(Math.random() * rgb);
    const hexCode = intValue.toString(16);
    const colorHex = hexCode.padStart(6, '0');
    return `#${colorHex}`;

  }

  function generateGradient() {
    const colorsArray = [];
    for (let i = 0; i < num; i++) {
      const degree = Math.floor(Math.random() * 360);
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      if (type === 'linear') {
        colorsArray.push({
          gradient: `linear-gradient(${degree}deg,${color1},${color2})`,
          css: `background:linear-gradient(${degree}deg,${color1},${color2});`,
          tailwind: `bg-[linear-gradient(${degree}deg,${color1},${color2})]`
        })
      }
      else {
        colorsArray.push({
          gradient: `radial-gradient(circle,${color1},${color2})`,
          css: `background:radial-gradient(circle,${color1},${color2});`,
          tailwind: `bg-[radial-gradient(circle at center,${color1},${color2})]`
        })
      }
    }

    // console.log(colorsArray)
    setGradients(colorsArray)
    // console.log(gradients)

  }

  function handleCopy(css) {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied to clipboard!", { position: 'top-center' })
  }
  // console.log(gradients)

  useEffect(() => {
    generateGradient();
  }, [num, type])


  // css: background:linear-gradient(45deg,#f0cb40,#7f528c);  
  // tailwind: className='bg-[linear-gradient(265deg,_#ff9a9e,_#fad0c4,)]'


  const extractColorsFromImage = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        // Sample colors from image
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data
        const colorMap = new Map()

        for (let i = 0; i < imageData.length; i += 100) { // Sample every 100th pixel
          const r = imageData[i]
          const g = imageData[i + 1]
          const b = imageData[i + 2]
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1)
        }

        // Get top 5 colors
        const topColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(entry => entry[0])

        setImageColors(topColors)
        // Auto-generate gradient from these colors
        if (topColors.length >= 2) {
          const newGradient = {
            gradient: `linear-gradient(135deg, ${topColors[0]}, ${topColors[1]})`,
            css: `background: linear-gradient(135deg, ${topColors[0]}, ${topColors[1]});`,
            tailwind: `bg-[linear-gradient(135deg,_${topColors[0]},_${topColors[1]})]`
          }
          setGradients(prev => [newGradient, ...prev.slice(0, 7)])
        }
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }



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
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => extractColorsFromImage(e.target.files[0])}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white rounded-lg"
          >
            🖼️ Extract from Image
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            gradients.map((item, index) => (
              <div
                key={index}
                className='h-56 rounded-xl shaow-md hover:shadow-xl transition-all duration-300 relative'
                style={{
                  background: item.gradient,
                }}
              >
                <button onClick={() => handleCopy(item.tailwind)} className='absolute left-3 bottom-3 bg-black/50 rounded py-1 px-2 text-[10px] text-white hover:bg-black cursor-pointer'>TAILWIND</button>
                <button onClick={() => handleCopy(item.css)} className='absolute right-3 bottom-3 bg-black/50 hover:bg-black rounded text-white py-1 px-2 text-[10px] cursor-pointer'>CSS</button>
              </div>
            ))
          }
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default App