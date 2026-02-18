# 摄影作品集网站

一个简约的三列信息流摄影作品展示网站，支持分类筛选。

## 功能特点

- ✨ 三列瀑布流布局（桌面端）
- 📱 移动端自适应双列布局
- 🏷️ 分类筛选功能（在中国、在欧洲、孩子们）
- 🔍 点击图片放大查看
- ⚡ 图片懒加载优化
- 🎨 简约白色底设计风格
- 📐 自动适应不同尺寸图片
- 🤖 自动扫描图片并生成配置

## 使用方法

### 1. 组织图片文件

将你的摄影作品按分类放入 `images` 文件夹下的对应子文件夹：
```
images/
├── 在中国/
│   ├── 图片1.jpg
│   ├── 图片2.jpg
│   └── ...
├── 在欧洲/
│   ├── 图片1.jpg
│   └── ...
└── 孩子们/
    ├── 图片1.jpg
    └── ...
```

### 2. 自动生成图片配置

运行自动生成脚本（需要 Node.js）：
```bash
node generate-images.js
```

这个脚本会自动扫描 `images` 文件夹下的所有分类文件夹，生成 `images-config.js` 配置文件。

### 3. 打开网站

- 直接用浏览器打开 `index.html` 文件
- 或使用本地服务器（推荐）：
  ```bash
  # 使用 Python
  python -m http.server 8000
  
  # 或使用 Node.js (需要安装 http-server)
  npx http-server
  ```

## 文件结构

```
.
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript 功能
├── images-config.js    # 自动生成的图片配置（运行 generate-images.js 后生成）
├── generate-images.js  # 自动生成配置脚本
├── images/             # 图片文件夹
│   ├── 在中国/
│   ├── 在欧洲/
│   └── 孩子们/
└── README.md           # 说明文档
```

## 添加新图片

1. 将新图片放入对应的分类文件夹
2. 运行 `node generate-images.js` 重新生成配置
3. 刷新浏览器即可看到新图片

## 注意事项

- 图片格式支持：JPG, JPEG, PNG, WebP, GIF
- 为了更好的性能，建议压缩图片后再使用
- 如果修改了分类文件夹名称，需要同步更新 `generate-images.js` 中的 `categories` 数组
