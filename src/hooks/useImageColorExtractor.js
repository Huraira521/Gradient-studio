import { useState } from 'react';
import { extractTopColors } from '../utils/colorUtils';


export const useImageColorExtractor = (onGradientGenerated) => {
    const [imageColors, setImageColors] = useState([]);
    const [isExtracting, setIsExtracting] = useState(false);

    const extractColorsFromImage = (file) => {
        if (!file) return;
        setIsExtracting(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
                const topColors = extractTopColors(imageData);

                setImageColors(topColors);

                if (topColors.length >= 2 && onGradientGenerated) {
                    onGradientGenerated(topColors);
                }
                setIsExtracting(false);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    return { imageColors, isExtracting, extractColorsFromImage };
};