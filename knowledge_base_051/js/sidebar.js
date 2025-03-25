document.addEventListener('DOMContentLoaded', function() {
    // 创建侧边栏容器
    const sidebarContainer = document.createElement('div');
    sidebarContainer.className = 'side-nav';
    
    // 获取当前页面的路径，用于高亮显示当前页面在侧边栏中的位置
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // 构建侧边栏HTML内容
    sidebarContainer.innerHTML = `
        <div class="collapse-btn" onclick="toggleSidebar()" data-tooltip="展开菜单">
            <div class="collapse-icon"></div>
            <div class="collapse-text">收起菜单</div>
        </div>
        <a href="deepseek_assistant.html" class="side-nav-item ${pageName === 'deepseek_assistant.html' ? 'active' : ''}">
            <div class="nav-icon">🤖</div>
            <div>DeepSeek</div>
        </a>
        <a href="main.html" class="side-nav-item ${pageName === 'main.html' || pageName === '' || pageName === 'index.html' ? 'active' : ''}">
            <div class="nav-icon">📚</div>
            <div>知识库</div>
        </a>
        <a href="ai_visualization.html" class="side-nav-item ${pageName === 'ai_visualization.html' ? 'active' : ''}">
            <div class="nav-icon">👁️‍🗨️</div>
            <div>AI可视化</div>
        </a>
        <a href="teaching_assistant.html" class="side-nav-item ${pageName === 'teaching_assistant.html' ? 'active' : ''}">
            <div class="nav-icon">📝</div>
            <div>教案助手</div>
        </a>
        <a href="case_teaching.html" class="side-nav-item ${pageName === 'case_teaching.html' ? 'active' : ''}">
            <div class="nav-icon">🏥</div>
            <div>病例教学</div>
        </a>
        <a href="office_assistant.html" class="side-nav-item ${pageName === 'office_assistant.html' ? 'active' : ''}">
            <div class="nav-icon">💼</div>
            <div>办公助手</div>
        </a>
        <a href="literature_search.html" class="side-nav-item ${pageName === 'literature_search.html' ? 'active' : ''}">
            <div class="nav-icon">📄</div>
            <div>文献检索</div>
        </a>
        <a href="my_assistant.html" class="side-nav-item ${pageName === 'my_assistant.html' ? 'active' : ''}">
            <div class="nav-icon">👨‍⚕️</div>
            <div>智能助手</div>
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
                top: 48px;
                width: 200px;
                height: calc(100% - 48px);
                background-color: white;
                box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
                padding: 20px 0;
                z-index: 99;
                overflow-y: auto;
                transition: width 0.3s, transform 0.3s;
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
                transition: background-color 0.2s;
                color: #1d1d1f;
                text-decoration: none;
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
            }
            
            .side-nav-item.active {
                background-color: #e8f2fc;
                color: #0071e3;
                font-weight: 500;
                border-left: 4px solid #0071e3;
            }
            
            .nav-icon {
                margin-right: 12px;
                font-size: 18px;
                width: 24px;
                text-align: center;
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
            
            .collapse-btn:hover {
                box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1), 
                            -1px -1px 3px rgba(255, 255, 255, 0.8);
                transform: translateX(2px);
                background: linear-gradient(145deg, #f8f8f8, #e8e8e8);
            }
            
            .collapse-btn:active {
                box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
                            inset -2px -2px 5px rgba(255, 255, 255, 0.8);
                transform: translateX(0);
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
            
            /* 弹出提示 */
            .collapse-btn:hover::after {
                content: attr(data-tooltip);
                position: absolute;
                left: 60px;
                background: rgba(0, 113, 227, 0.95);
                color: white;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                pointer-events: none;
                opacity: 0;
                white-space: nowrap;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                animation: tooltip-fade 0.2s ease forwards 0.1s;
                z-index: 100;
            }
            
            @keyframes tooltip-fade {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .side-nav.collapsed .collapse-btn:hover::after {
                display: block;
            }
            
            .side-nav:not(.collapsed) .collapse-btn:hover::after {
                display: none;
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
            
            /* 适配内容区域 */
            .container {
                margin-left: 220px !important;
                transition: margin-left 0.3s;
            }
            
            .container.expanded {
                margin-left: 70px !important;
            }
            
            .footer {
                margin-left: 200px !important;
                transition: margin-left 0.3s;
            }
            
            .footer.expanded {
                margin-left: 50px !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// 侧边栏折叠/展开功能
function toggleSidebar() {
    const sidebar = document.querySelector('.side-nav');
    const container = document.querySelector('.container');
    const footer = document.querySelector('.footer');
    const collapseBtn = document.querySelector('.collapse-btn');
    
    sidebar.classList.toggle('collapsed');
    container.classList.toggle('expanded');
    footer.classList.toggle('expanded');
    
    // 保存状态到本地存储，使折叠状态在页面间保持
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    
    // 更新提示文本
    if (isCollapsed) {
        collapseBtn.setAttribute('data-tooltip', '展开菜单');
    } else {
        collapseBtn.setAttribute('data-tooltip', '收起菜单');
    }
}

// 恢复侧边栏状态
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.side-nav');
    const container = document.querySelector('.container');
    const footer = document.querySelector('.footer');
    const collapseBtn = document.querySelector('.collapse-btn');
    
    // 从本地存储获取之前保存的侧边栏状态
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    
    // 应用状态
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        container.classList.add('expanded');
        footer.classList.add('expanded');
        collapseBtn.setAttribute('data-tooltip', '展开菜单');
    }
});
