// 自动生成图片配置脚本
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const categories = ['在中国', '在欧洲', '孩子们'];

const imageConfig = {};

categories.forEach(category => {
    const categoryPath = path.join(imagesDir, category);
    if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath)
            .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
            .sort()
            .map(file => ({
                src: `images/${category}/${file}`,
                alt: file.replace(/\.[^/.]+$/, ''),
                category: category
            }));
        imageConfig[category] = files;
    }
});

// 生成JavaScript配置代码
let jsCode = '// 自动生成的图片配置\n';
jsCode += 'const imageCategories = {\n';
categories.forEach(category => {
    if (imageConfig[category]) {
        jsCode += `    '${category}': [\n`;
        imageConfig[category].forEach(img => {
            jsCode += `        { src: '${img.src}', alt: '${img.alt}', category: '${img.category}' },\n`;
        });
        jsCode += '    ],\n';
    }
});
jsCode += '};\n';

// 写入文件
fs.writeFileSync(path.join(__dirname, 'images-config.js'), jsCode);
console.log('图片配置已生成到 images-config.js');
console.log(`共找到 ${Object.values(imageConfig).reduce((sum, arr) => sum + arr.length, 0)} 张图片`);
