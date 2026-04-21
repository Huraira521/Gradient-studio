export const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const intValue = Math.floor(Math.random() * rgb);
    const hexCode = intValue.toString(16);
    const colorHex = hexCode.padStart(6, '0');
    return `#${colorHex}`;

}

export const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};


export const extractTopColors = (imageData, sampleRate = 100) => {
    const colorMap = new Map();

    for (let i = 0; i < imageData.length; i += sampleRate) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const hex = rgbToHex(r, g, b);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    return Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);
};