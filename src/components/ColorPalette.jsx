import React from 'react'

const ColorPalette = ({colors,onColorClick}) => {
    if (!colors || colors.length === 0) return null;
  return (
     <div className="mt-8 p-4 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-bold mb-3">🎨 Extracted Colors</h3>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => onColorClick(color)}
                    title="Click to copy color code"
                  />
                  <span className="text-xs mt-1 font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
  )
}

export default ColorPalette