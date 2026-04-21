import React from 'react'

const GradientCard = ({gradient,onCopy}) => {
console.log(gradient)
  return (
   <div
                key={Math.floor(Math.random() * 1000)}
                className='h-56 rounded-xl shaow-md hover:shadow-xl transition-all duration-300 relative'
                style={{
                  background: gradient.gradient,
                }}
              >
                <button onClick={() => onCopy(gradient.tailwind)} className='absolute left-3 bottom-3 bg-black/50 rounded py-1 px-2 text-[10px] text-white hover:bg-black cursor-pointer'>TAILWIND</button>
                <button onClick={() => onCopy(gradient.css)} className='absolute right-3 bottom-3 bg-black/50 hover:bg-black rounded text-white py-1 px-2 text-[10px] cursor-pointer'>CSS</button>
              </div>
  )
}

export default GradientCard