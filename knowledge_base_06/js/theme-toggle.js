/**
 * 深色模式切换功能
 * 用于处理网站深色/浅色主题的切换和本地存储
 */

// 初始化主题
function initTheme() {
    // 检查当前主题模式
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-toggle-light-icon')?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme-toggle-dark-icon')?.classList.remove('hidden');
    }
}

// 切换主题模式
function toggleTheme() {
    // 切换图标
    document.getElementById('theme-toggle-dark-icon')?.classList.toggle('hidden');
    document.getElementById('theme-toggle-light-icon')?.classList.toggle('hidden');
    
    // 切换主题类
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
}

// 当DOM内容加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 等待导航栏加载完成
    document.addEventListener('navbar-loaded', function() {
        // 监听主题切换按钮点击
        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleTheme);
        }
    });
});
