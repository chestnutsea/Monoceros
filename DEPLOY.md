# 部署指南

本文档介绍如何将这个静态摄影作品集网站部署到线上，并绑定你的阿里云域名。

## 推荐方案

### 方案一：Vercel（推荐）⭐
- ✅ 完全免费
- ✅ 支持自定义域名（阿里云域名）
- ✅ 全球CDN加速
- ✅ 自动HTTPS
- ✅ 部署简单，支持拖拽上传

### 方案二：Netlify
- ✅ 完全免费
- ✅ 支持自定义域名
- ✅ 全球CDN加速
- ✅ 自动HTTPS

### 方案三：GitHub Pages
- ✅ 完全免费
- ✅ 支持自定义域名
- ⚠️ 需要Git基础

### 方案四：阿里云OSS + CDN
- ✅ 使用阿里云服务，管理方便
- ⚠️ 需要少量费用（通常每月几元到几十元）

---

## 方案一：Vercel 部署（最简单）

### 步骤1：准备文件
确保以下文件都在项目根目录：
- index.html
- styles.css
- script.js
- images-config.js
- images/ 文件夹（包含所有图片）

### 步骤2：访问 Vercel
1. 打开浏览器访问：https://vercel.com
2. 点击右上角 "Sign Up" 注册账号（可以用GitHub账号登录）

### 步骤3：部署网站
**方法A：拖拽上传（最简单）**
1. 登录后，点击 "Add New..." → "Project"
2. 选择 "Upload" 标签
3. 将整个项目文件夹拖拽到上传区域
4. 等待上传完成（图片较多可能需要几分钟）
5. 点击 "Deploy" 按钮

**方法B：使用Vercel CLI**
```bash
# 安装Vercel CLI
npm i -g vercel

# 在项目目录下运行
vercel

# 按照提示操作即可
```

### 步骤4：绑定阿里云域名
1. 部署完成后，进入项目设置（Settings）
2. 找到 "Domains" 选项
3. 输入你的域名（例如：photo.yourdomain.com）
4. 按照提示添加DNS记录：
   - 记录类型：CNAME
   - 主机记录：photo（或你想要的子域名）
   - 记录值：cname.vercel-dns.com
5. 在阿里云DNS控制台添加这条CNAME记录
6. 等待DNS生效（通常几分钟到几小时）

---

## 方案二：Netlify 部署

### 步骤1：访问 Netlify
1. 打开浏览器访问：https://www.netlify.com
2. 点击 "Sign up" 注册账号

### 步骤2：部署网站
1. 登录后，点击 "Add new site" → "Deploy manually"
2. 将整个项目文件夹压缩成zip文件
3. 拖拽zip文件到上传区域
4. 等待部署完成

### 步骤3：绑定域名
1. 进入站点设置 → "Domain settings"
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示添加DNS记录（通常是CNAME记录）

---

## 方案三：GitHub Pages 部署

### 步骤1：创建GitHub仓库
1. 访问 https://github.com 并登录
2. 点击右上角 "+" → "New repository"
3. 创建新仓库（例如：photography-portfolio）

### 步骤2：上传代码
```bash
# 在项目目录下初始化Git
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/photography-portfolio.git
git branch -M main
git push -u origin main
```

### 步骤3：启用GitHub Pages
1. 进入仓库设置（Settings）
2. 找到 "Pages" 选项
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，文件夹选择 "/ (root)"
5. 点击 "Save"

### 步骤4：绑定域名
1. 在仓库根目录创建 `CNAME` 文件，内容为你的域名
2. 在阿里云DNS添加CNAME记录指向：你的用户名.github.io

---

## 方案四：阿里云OSS部署

### 步骤1：创建OSS存储桶
1. 登录阿里云控制台
2. 进入 "对象存储OSS"
3. 创建存储桶（Bucket）
4. 设置读写权限为"公共读"

### 步骤2：上传文件
1. 进入存储桶
2. 点击 "上传文件"
3. 上传所有项目文件（包括images文件夹）

### 步骤3：设置静态网站托管
1. 在存储桶设置中找到 "静态网站托管"
2. 开启静态网站托管
3. 设置默认首页为：index.html

### 步骤4：绑定域名（可选）
1. 在存储桶设置中找到 "传输管理" → "绑定域名"
2. 添加你的域名
3. 在阿里云DNS添加CNAME记录指向OSS的访问域名

---

## 注意事项

### 图片优化建议
由于你有112张图片，建议：
1. **压缩图片**：使用工具如 TinyPNG 或 ImageOptim 压缩图片
2. **使用WebP格式**：现代浏览器支持，体积更小
3. **分批上传**：如果上传失败，可以分批上传

### DNS配置说明
在阿里云DNS控制台添加记录时：
- **记录类型**：CNAME
- **主机记录**：你想要的子域名（如：photo、www、或 @ 表示根域名）
- **记录值**：根据选择的平台填写（Vercel是 cname.vercel-dns.com）

### HTTPS证书
以上所有平台都会自动提供HTTPS证书，无需额外配置。

---

## 推荐流程

1. **首选Vercel**：最简单，支持拖拽上传，适合新手
2. **如果Vercel上传失败**：尝试Netlify（也有拖拽功能）
3. **如果需要版本控制**：使用GitHub Pages
4. **如果只想用阿里云**：使用OSS方案

---

## 部署后更新网站

### Vercel/Netlify
- 重新上传文件即可自动更新

### GitHub Pages
```bash
git add .
git commit -m "Update photos"
git push
```

### 阿里云OSS
- 在OSS控制台重新上传更新的文件

---

## 常见问题

**Q: 上传图片时很慢怎么办？**
A: 可以先压缩图片，或使用CLI工具上传。

**Q: 域名解析多久生效？**
A: 通常几分钟到几小时，最长不超过48小时。

**Q: 可以同时使用多个域名吗？**
A: 可以，在平台设置中添加多个域名即可。
