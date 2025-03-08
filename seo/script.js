document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const seoForm = document.getElementById('seoForm');
    const realtimeTab = document.getElementById('realtimeTab');
    const finalTab = document.getElementById('finalTab');
    const realtimeOutput = document.getElementById('realtimeOutput');
    const finalOutput = document.getElementById('finalOutput');
    const copyButton = document.getElementById('copyButton');
    const downloadButton = document.getElementById('downloadButton');
    
    // 当前激活的输出面板
    let activeOutput = realtimeOutput;

    // 标签切换功能
    realtimeTab.addEventListener('click', () => {
        setActiveTab(realtimeTab, realtimeOutput);
    });
    
    finalTab.addEventListener('click', () => {
        setActiveTab(finalTab, finalOutput);
    });
    
    function setActiveTab(tab, outputPanel) {
        // 移除所有活动状态
        realtimeTab.classList.remove('active');
        finalTab.classList.remove('active');
        realtimeOutput.classList.remove('active');
        finalOutput.classList.remove('active');
        
        // 设置新的活动状态
        tab.classList.add('active');
        outputPanel.classList.add('active');
        activeOutput = outputPanel;
    }
    
    // 复制功能
    copyButton.addEventListener('click', () => {
        const content = getActiveOutputContent();
        if (content) {
            navigator.clipboard.writeText(content)
                .then(() => {
                    showNotification('内容已复制到剪贴板');
                })
                .catch(err => {
                    showNotification('复制失败，请手动复制', 'error');
                    console.error('无法复制内容: ', err);
                });
        } else {
            showNotification('没有内容可复制', 'warning');
        }
    });
    
    // 下载功能
    downloadButton.addEventListener('click', () => {
        const content = getActiveOutputContent();
        if (content) {
            const filename = 'seo-article.txt';
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showNotification('文件已下载');
        } else {
            showNotification('没有内容可下载', 'warning');
        }
    });
    
    // 获取当前活动输出面板的内容
    function getActiveOutputContent() {
        // 移除占位符文本
        const placeholder = activeOutput.querySelector('.placeholder');
        if (placeholder && placeholder.parentNode === activeOutput) {
            return '';
        }
        return activeOutput.textContent.trim();
    }
    
    // 表单提交处理
    seoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(seoForm);
        const apiKey = formData.get('apiKey');
        const product = formData.get('product');
        const productDescription = formData.get('productDescription');
        const theme = formData.get('theme');
        
        // 表单验证
        if (!apiKey || !product || !productDescription || !theme) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        // 这里只是模拟API调用和结果显示
        // 在实际应用中，您需要替换为真正的API调用
        simulateArticleGeneration(product, theme);
    });
    
    // 模拟文章生成过程
    function simulateArticleGeneration(product, theme) {
        // 清除现有内容和占位符
        realtimeOutput.innerHTML = '';
        finalOutput.innerHTML = '';
        
        // 切换到实时输出标签
        setActiveTab(realtimeTab, realtimeOutput);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            
            // 模拟实时输出
            const paragraph = document.createElement('p');
            paragraph.textContent = `正在生成关于${product}的${theme}文章...${progress}%`;
            realtimeOutput.appendChild(paragraph);
            realtimeOutput.scrollTop = realtimeOutput.scrollHeight;
            
            // 完成后显示最终结果
            if (progress >= 100) {
                clearInterval(interval);
                
                // 生成模拟的最终文章
                const finalArticle = generateMockArticle(product, theme);
                finalOutput.innerHTML = finalArticle;
                
                // 自动切换到最终结果标签
                setTimeout(() => {
                    setActiveTab(finalTab, finalOutput);
                    showNotification('文章生成完成');
                }, 500);
            }
        }, 100);
    }
    
    // 生成模拟文章
    function generateMockArticle(product, theme) {
        // 只使用中文模板
        let article = `
            <h1>${product} - ${theme}完整指南</h1>
            <p>在当今竞争激烈的市场中，${product}已经成为了行业的标杆。本文将深入探讨${theme}的各个方面，帮助您全面了解${product}。</p>
            
            <h2>1. ${product}的主要特点</h2>
            <p>${product}拥有许多突出的特点，使其在同类产品中脱颖而出。其创新设计和卓越性能满足了现代用户的各种需求。</p>
            
            <h2>2. 为什么选择${product}</h2>
            <p>选择${product}意味着您将获得无与伦比的体验。从易用性到可靠性，${product}都设立了新的行业标准。</p>
            
            <h2>3. ${theme}的最佳实践</h2>
            <p>要充分利用${product}，了解${theme}的最佳实践至关重要。我们的专家团队总结了多年经验，为您提供最有价值的建议。</p>
            
            <h2>4. ${product}用户的成功案例</h2>
            <p>众多用户通过使用${product}取得了显著的成果。他们的成功故事证明了${product}在${theme}方面的卓越表现。</p>
            
            <h2>5. ${product}的未来发展</h2>
            <p>随着技术的不断进步，${product}将继续创新和发展。未来的${product}将为${theme}带来更多令人兴奋的可能性。</p>
        `;
        
        return article;
    }

    // 显示通知
    function showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 添加到文档
        document.body.appendChild(notification);
        
        // 淡入效果
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // 自动淡出
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 添加通知样式
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background-color: #fff;
            color: #333;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            max-width: 300px;
        }
        .notification.success {
            border-left: 4px solid #34c759;
        }
        .notification.error {
            border-left: 4px solid #ff3b30;
        }
        .notification.warning {
            border-left: 4px solid #ff9500;
        }
    `;
    document.head.appendChild(style);
});
