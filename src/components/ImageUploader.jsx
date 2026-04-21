import React, { useRef } from 'react'

const ImageUploader = ({ onImageUpload, isExtracting }) => {
const fileInputRef = useRef(null);

  return (
        <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => onImageUpload(e.target.files[0])}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        disabled={isExtracting}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 px-4 py-2 text-white rounded-lg transition-all"
      >
        {isExtracting ? '⏳ Extracting...' : '🖼️ Extract from Image'}
      </button>
    </>

  )
}

export default ImageUploader