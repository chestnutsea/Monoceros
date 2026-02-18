// 合并所有分类的图片
const allImages = [];
Object.keys(imageCategories).forEach(category => {
    allImages.push(...imageCategories[category]);
});

let currentCategory = 'all';
let displayedImages = [...allImages];
let currentImageIndex = -1;
let currentCategoryImages = [];

const gallery = document.getElementById('gallery');
const filterButtons = document.getElementById('filterButtons');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 创建图片元素并添加到画廊
function createGalleryItem(imageData, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item loading';
    item.dataset.index = index;
    item.dataset.category = imageData.category;

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.loading = 'lazy';
    img.draggable = false;
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    
    // 禁用所有可能的拖拽和上下文菜单
    img.addEventListener('dragstart', (e) => e.preventDefault());
    img.addEventListener('contextmenu', (e) => e.preventDefault());
    img.addEventListener('selectstart', (e) => e.preventDefault());

    item.appendChild(img);
    
    // 禁用容器的拖拽
    item.addEventListener('dragstart', (e) => e.preventDefault());
    item.addEventListener('contextmenu', (e) => e.preventDefault());

    // 图片加载完成后移除loading类
    img.addEventListener('load', () => {
        // 直接更新，不使用过渡效果
        item.classList.remove('loading');
        item.classList.add('loaded');
        // 确保图片立即显示
        img.style.opacity = '1';
    });
    
    // 如果图片已经缓存，立即显示
    if (img.complete && img.naturalHeight !== 0) {
        item.classList.remove('loading');
        item.classList.add('loaded');
        img.style.opacity = '1';
    }

    img.addEventListener('error', () => {
        item.classList.remove('loading');
        item.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">图片加载失败</div>';
    });

    // 点击事件
    item.addEventListener('click', () => {
        // 找到当前图片在当前显示列表中的索引
        const index = displayedImages.findIndex(img => 
            img.src === imageData.src && img.category === imageData.category
        );
        openModal(imageData, index);
    });

    return item;
}

// 渲染画廊
function renderGallery(images) {
    gallery.innerHTML = '';
    images.forEach((imageData, index) => {
        const item = createGalleryItem(imageData, index);
        gallery.appendChild(item);
    });
}

// 筛选图片
function filterImages(category) {
    currentCategory = category;
    
    if (category === 'all') {
        displayedImages = [...allImages];
    } else {
        displayedImages = allImages.filter(img => img.category === category);
    }
    
    // 更新当前类别的图片列表（用于模态框内切换）
    currentCategoryImages = displayedImages;
    
    renderGallery(displayedImages);
    
    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 绑定筛选按钮事件
filterButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        const category = e.target.dataset.category;
        filterImages(category);
    }
});

// 打开模态框
function openModal(imageData, index) {
    currentImageIndex = index !== undefined ? index : displayedImages.findIndex(img => 
        img.src === imageData.src && img.category === imageData.category
    );
    currentCategoryImages = displayedImages;
    
    modalImage.draggable = false;
    modalImage.src = imageData.src;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
    
    updateNavButtons();
}

// 更新导航按钮显示状态
function updateNavButtons() {
    if (currentCategoryImages.length <= 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

// 切换到上一张图片
function showPrevImage() {
    if (currentCategoryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
    const imageData = currentCategoryImages[currentImageIndex];
    
    // 添加加载状态
    modalImage.classList.add('loading');
    modalImage.src = imageData.src;
    
    // 图片加载完成后移除加载状态
    const img = new Image();
    img.onload = () => {
        modalImage.classList.remove('loading');
    };
    img.src = imageData.src;
}

// 切换到下一张图片
function showNextImage() {
    if (currentCategoryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
    const imageData = currentCategoryImages[currentImageIndex];
    
    // 添加加载状态
    modalImage.classList.add('loading');
    modalImage.src = imageData.src;
    
    // 图片加载完成后移除加载状态
    const img = new Image();
    img.onload = () => {
        modalImage.classList.remove('loading');
    };
    img.src = imageData.src;
}

// 关闭模态框
function closeModalHandler() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢复滚动
}

// 点击关闭按钮
closeModal.addEventListener('click', closeModalHandler);

// 点击模态框背景关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// 左右箭头按钮事件
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

// 键盘事件：ESC关闭，左右箭头切换
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
        closeModalHandler();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    }
});

// 初始化 - 显示所有图片
currentCategoryImages = displayedImages;
renderGallery(displayedImages);
