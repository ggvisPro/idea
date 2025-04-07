/**
 * 导航栏模块
 * 提供统一的顶部导航栏，支持深色模式，适用于所有页面
 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建导航栏容器
    const navbarContainer = document.createElement('header');
    navbarContainer.className = 'fixed top-0 left-0 right-0 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300';
    
    // 构建导航栏内容
    navbarContainer.innerHTML = `
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <a href="main.html" class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    <span class="text-primary-600 dark:text-primary-400 mr-2"><i class="fas fa-book-medical"></i></span>
                    JUNCUS<sup>®</sup> Medical AI
                </a>
                
                <div class="flex items-center space-x-4">
                    <!-- 深色模式切换 -->
                    <button id="theme-toggle" class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200">
                        <span class="sr-only">切换深色模式</span>
                        <i id="theme-toggle-dark-icon" class="fas fa-moon text-lg hidden"></i>
                        <i id="theme-toggle-light-icon" class="fas fa-sun text-lg hidden"></i>
                    </button>
                    
                    <!-- 用户信息 -->
                    <a href="user_profile.html" class="flex items-center hover:opacity-80 transition-opacity">
                        <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                             class="w-9 h-9 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900" 
                             alt="用户头像">
                        <span class="ml-2 font-medium dark:text-gray-200">主任</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // 将导航栏添加到body开头
    document.body.prepend(navbarContainer);
    
    // 获取当前主题状态并设置对应图标
    const setInitialThemeIcon = () => {
        const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
            (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        
        if (isDarkMode) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    };
    
    // 设置初始图标
    setInitialThemeIcon();
    
    // 触发自定义事件通知导航栏已加载
    const event = new CustomEvent('navbar-loaded');
    document.dispatchEvent(event);
});
