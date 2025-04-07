document.addEventListener('DOMContentLoaded', function() {
    // 创建侧边栏容器
    const sidebarContainer = document.createElement('div');
    sidebarContainer.className = 'side-nav dark:bg-gray-800 dark:text-gray-200 transition-colors duration-300';
    
    // 获取当前页面的路径，用于高亮显示当前页面在侧边栏中的位置
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // 构建侧边栏HTML内容，使用Font Awesome图标替换emoji
    sidebarContainer.innerHTML = `
        <div class="collapse-btn dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800" onclick="toggleSidebar()">
            <div class="collapse-icon"></div>
            <div class="collapse-text dark:text-gray-300">收起菜单</div>
        </div>
        <a href="deepseek_assistant.html" class="side-nav-item ${pageName === 'deepseek_assistant.html' ? 'active' : ''}">
            <div class="nav-icon"><i class="fas fa-robot"></i></div>
            <div>DeepSeek</div>
        </a>
        <a href="main.html" class="side-nav-item ${pageName === 'main.html' || pageName === '' || pageName === 'index.html' ? 'active' : ''}">
            <div class="nav-icon"><i class="fas fa-book-medical"></i></div>
            <div>知识库</div>
        </a>
        <a href="ai_visualization.html" class="side-nav-item ${pageName === 'ai_visualization.html' ? 'active' : ''}">
            <div class="nav-icon"><i class="fas fa-project-diagram"></i></div>
            <div>AI可视化</div>
        </a>
        <a href="case_analysis.html" class="side-nav-item ${pageName === 'case_analysis.html' ? 'active' : ''}">
            <div class="nav-icon"><i class="fas fa-hospital-user"></i></div>
            <div>AI病历分析</div>
        </a>
    `;
    
    // 将侧边栏添加到body
    document.body.appendChild(sidebarContainer);
    
    // 添加侧边栏样式
    if (!document.getElementById('sidebar-styles')) {
        const style = document.createElement('style');
        style.id = 'sidebar-styles';
        style.textContent = `
            /* 侧边导航栏样式 */
            .side-nav {
                position: fixed;
                left: 0;
                top: 64px; /* 适配导航栏高度16 */
                width: 200px;
                height: calc(100% - 64px);
                background-color: white;
                box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
                padding: 20px 0;
                z-index: 99;
                overflow-y: auto;
                transition: width 0.3s, transform 0.3s, background-color 0.3s, color 0.3s;
            }
            
            .side-nav.collapsed {
                width: 50px;
                overflow-x: hidden;
            }
            
            .side-nav-item {
                padding: 12px 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
                transition: all 0.2s ease;
                color: #1d1d1f;
                text-decoration: none;
                border-left: 4px solid transparent;
            }
            
            .dark .side-nav-item {
                color: #e5e7eb;
            }
            
            .side-nav.collapsed .side-nav-item {
                padding: 12px 0;
                justify-content: center;
            }
            
            .side-nav.collapsed .side-nav-item div:not(.nav-icon) {
                display: none;
            }
            
            .side-nav-item:hover {
                background-color: #f5f5f7;
                transform: translateX(3px) scale(1.02);
            }
            
            .dark .side-nav-item:hover {
                background-color: #374151;
            }
            
            .side-nav-item.active {
                background-color: #e8f2fc;
                color: #0071e3;
                font-weight: 500;
                border-left: 4px solid #0071e3;
            }
            
            .dark .side-nav-item.active {
                background-color: #1e40af20;
                color: #3b82f6;
                border-left: 4px solid #3b82f6;
            }
            
            .nav-icon {
                margin-right: 12px;
                font-size: 18px;
                width: 24px;
                text-align: center;
                transition: transform 0.2s ease;
            }
            
            .side-nav-item:hover .nav-icon {
                transform: scale(1.1);
            }
            
            /* 折叠按钮样式 */
            .collapse-btn {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                margin: 0 10px 15px 10px;
                background: linear-gradient(145deg, #ffffff, #f0f0f0);
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), 
                            -2px -2px 5px rgba(255, 255, 255, 0.8);
                position: relative;
                overflow: hidden;
            }
            
            .dark .collapse-btn {
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 
                            -2px -2px 5px rgba(30, 41, 59, 0.5);
            }
            
            .collapse-btn:hover {
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1), 
                            -1px -1px 3px rgba(255, 255, 255, 0.8);
                transform: translateX(2px) scale(1.03);
                background: linear-gradient(145deg, #f8f8f8, #e8e8e8);
            }
            
            .dark .collapse-btn:hover {
                background: linear-gradient(145deg, #374151, #1f2937);
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3), 
                            -1px -1px 3px rgba(30, 41, 59, 0.5);
            }
            
            .collapse-btn:active {
                box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
                            inset -2px -2px 5px rgba(255, 255, 255, 0.8);
                transform: translateX(0) scale(0.98);
            }
            
            .dark .collapse-btn:active {
                box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
                            inset -2px -2px 5px rgba(30, 41, 59, 0.5);
            }
            
            .collapse-icon {
                position: relative;
                width: 14px;
                height: 14px;
                margin-right: 8px;
                transition: transform 0.3s, margin 0.3s;
            }
            
            .collapse-icon::before, 
            .collapse-icon::after {
                content: '';
                position: absolute;
                width: 10px;
                height: 2px;
                background-color: #0071e3;
                border-radius: 1px;
                left: 0;
                transition: transform 0.3s;
            }
            
            .dark .collapse-icon::before, 
            .dark .collapse-icon::after {
                background-color: #3b82f6;
            }
            
            .collapse-icon::before {
                transform: rotate(45deg);
                top: 8px;
            }
            
            .collapse-icon::after {
                transform: rotate(-45deg);
                top: 4px;
            }
            
            .collapse-text {
                font-size: 14px;
                font-weight: 500;
                color: #333;
                transition: opacity 0.3s, color 0.3s;
            }
            
            .side-nav.collapsed .collapse-btn {
                justify-content: center;
                width: 40px;
                height: 40px;
                padding: 0;
                margin: 0 5px 15px 5px;
                border-radius: 50%;
            }
            
            .side-nav.collapsed .collapse-icon {
                margin-right: 0;
                transform: rotate(180deg);
            }
            
            .side-nav.collapsed .collapse-text {
                display: none;
                opacity: 0;
            }
            
            /* 加入动画效果 */
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .collapse-btn:hover .collapse-icon {
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 设置全局变量以跟踪侧边栏状态
    window.sidebarExpanded = true;
});

// 侧边栏折叠/展开功能
function toggleSidebar() {
    const sidebar = document.querySelector('.side-nav');
    const collapseBtn = document.querySelector('.collapse-btn');
    
    sidebar.classList.toggle('collapsed');
    
    // 保存状态到本地存储，使折叠状态在页面间保持
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    
    // 更新提示文本
    if (isCollapsed) {
        window.sidebarExpanded = false;
    } else {
        window.sidebarExpanded = true;
    }
    
    // 发送自定义事件通知布局变化
    const event = new CustomEvent('sidebar-toggle', { 
        detail: { expanded: !isCollapsed } 
    });
    document.dispatchEvent(event);
}

// 恢复侧边栏状态
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const sidebar = document.querySelector('.side-nav');
        const collapseBtn = document.querySelector('.collapse-btn');
        
        if (!sidebar || !collapseBtn) return;
        
        // 从本地存储获取之前保存的侧边栏状态
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        
        // 应用状态
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            window.sidebarExpanded = false;
        }
        
        // 延迟一下触发自定义事件，通知其他可能依赖侧边栏状态的组件
        setTimeout(function() {
            const event = new CustomEvent('sidebar-loaded', { 
                detail: { expanded: !isCollapsed } 
            });
            document.dispatchEvent(event);
        }, 50);
    }, 100); // 延迟加载以确保导航栏已加载
});
