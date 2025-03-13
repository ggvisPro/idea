document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要的元素
    const fileUpload = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');
    const optimizeBtn = document.getElementById('optimize-btn');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const aiUnderstandBtn = document.getElementById('ai-understand-btn');
    const rightPanelFields = document.querySelectorAll('.right-panel .field-content');
    const dropArea = document.getElementById('drop-area');

    // 检查是否从导入页面跳转而来
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    
    if (source) {
        // 如果是从导入页面跳转来的，显示导入成功通知
        const notification = createNotification("案例导入成功，准备处理", "success");
        setTimeout(() => removeNotification(notification), 3000);
    }

    // 添加AI理解按钮的事件监听器
    aiUnderstandBtn.addEventListener('click', function() {
        // 显示加载动画
        showLoading();
        
        // 模拟AI分析过程
        setTimeout(() => {
            hideLoading();
            
            // 创建AI理解弹窗
            showAIUnderstandingModal();
        }, 2000);
    });

    // AI理解弹窗
    function showAIUnderstandingModal() {
        const modal = document.createElement('div');
        modal.classList.add('ai-modal');
        
        modal.innerHTML = `
            <div class="ai-modal-content">
                <div class="ai-modal-header">
                    <h3>AI 临床理解</h3>
                    <button class="ai-modal-close">&times;</button>
                </div>
                <div class="ai-modal-body">
                    <div class="ai-insight">
                        <h4>临床诊断建议</h4>
                        <p>根据患者症状和病史，高度怀疑冠状动脉粥样硬化性心脏病。胸痛特点（运动诱发、休息缓解）、危险因素（高血压、糖尿病、吸烟、饮酒）以及近期症状加重都支持此诊断。</p>
                    </div>
                    <div class="ai-insight">
                        <h4>进一步检查建议</h4>
                        <ul>
                            <li>心电图检查，观察有无ST段改变</li>
                            <li>心肌酶谱检测，排除心肌损伤</li>
                            <li>考虑冠状动脉CT或冠脉造影确定诊断</li>
                            <li>血脂检测评估血管风险</li>
                        </ul>
                    </div>
                    <div class="ai-insight">
                        <h4>治疗方向建议</h4>
                        <p>建议抗血小板治疗、他汀类降脂、β受体阻滞剂等药物治疗，同时严格控制血压和血糖，戒烟限酒，低盐低脂饮食，适度运动。</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加CSS
        if (!document.querySelector('#ai-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'ai-modal-styles';
            style.innerHTML = `
                .ai-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .ai-modal-content {
                    background: white;
                    width: 80%;
                    max-width: 700px;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    animation: zoomIn 0.3s ease-out;
                }
                
                .ai-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 25px;
                    background: var(--apple-blue);
                    color: white;
                }
                
                .ai-modal-header h3 {
                    font-size: 20px;
                    font-weight: 500;
                }
                
                .ai-modal-close {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                }
                
                .ai-modal-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .ai-modal-body {
                    padding: 25px;
                    max-height: 70vh;
                    overflow-y: auto;
                }
                
                .ai-insight {
                    margin-bottom: 25px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }
                
                .ai-insight:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                
                .ai-insight h4 {
                    color: var(--apple-blue);
                    margin-bottom: 10px;
                    font-size: 18px;
                }
                
                .ai-insight p, .ai-insight ul {
                    color: #333;
                    line-height: 1.6;
                }
                
                .ai-insight ul {
                    padding-left: 20px;
                }
                
                .ai-insight li {
                    margin-bottom: 5px;
                }
                
                @keyframes zoomIn {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 添加关闭事件
        const closeBtn = modal.querySelector('.ai-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.add('fadeOut');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // 点击遮罩关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('fadeOut');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }

    // 添加拖放事件处理
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('drag-over');
    }

    function unhighlight() {
        dropArea.classList.remove('drag-over');
    }

    // 处理文件拖放
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files && files[0]) {
            handleFiles(files);
        }
    }

    function handleFiles(files) {
        fileName.innerText = files[0].name;
        
        // 显示加载动画
        showLoading();
        
        // 模拟上传和处理过程
        setTimeout(() => {
            // 填充左侧面板数据
            populateLeftPanel(sampleData);
            hideLoading();
            
            // 添加完成动画
            showUploadComplete();
        }, 1500);
    }

    // 文件上传处理 (修改原有函数)
    fileUpload.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            handleFiles(this.files);
        }
    });

    // 模拟数据 - 实际项目中会从后端获取
    const sampleData = {
        caseName: "冠心病标准化病例",
        patientName: "张三",
        age: "56岁",
        occupation: "工程师",
        education: "本科",
        chiefComplaint: "胸痛、胸闷3年，加重2周",
        presentIllness: "患者3年前开始出现活动后胸痛、胸闷症状，休息后可缓解。2周前症状加重，静息状态下也会出现胸痛，伴有气促、出汗等症状。",
        pastHistory: "高血压病史10年，规律服用降压药物。2型糖尿病5年，服用二甲双胍控制血糖。",
        personalHistory: "吸烟30年，每日20支，饮酒习惯，每日白酒约100ml。",
        familyHistory: "父亲有冠心病病史，母亲有高血压病史。"
    };
    
    // 案例优化按钮
    optimizeBtn.addEventListener('click', function() {
        // 显示加载动画
        showLoading();
        
        // 模拟优化过程
        setTimeout(() => {
            // 填充右侧面板数据
            populateRightPanel(sampleData);
            hideLoading();
            
            // 添加完成动画
            showOptimizeComplete();
        }, 1500);
    });
    
    // 修改案例按钮
    editBtn.addEventListener('click', function() {
        rightPanelFields.forEach(field => {
            field.focus();
            field.classList.add('editing');
        });
        
        // 显示编辑指示动画
        document.querySelector('.right-panel').classList.add('editing-mode');
        showEditMode();
    });
    
    // 保存案例按钮
    saveBtn.addEventListener('click', function() {
        rightPanelFields.forEach(field => {
            field.classList.remove('editing');
        });
        
        document.querySelector('.right-panel').classList.remove('editing-mode');
        
        // 显示保存成功的动画
        showSaveComplete();
    });
    
    // 显示加载动画
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.classList.add('loading-overlay');
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#0071e3" stroke-width="5"></circle>
                </svg>
                <p>处理中...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        // 添加CSS样式
        const style = document.createElement('style');
        style.innerHTML = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease-out;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .loading-spinner svg {
                animation: rotate 1.5s linear infinite;
            }
            
            .loading-spinner circle {
                stroke-dasharray: 125;
                stroke-dashoffset: 125;
                animation: dash 1.5s ease-in-out infinite;
            }
            
            .loading-spinner p {
                margin-top: 15px;
                font-family: var(--apple-font);
                color: var(--apple-blue);
                font-size: 18px;
            }
            
            @keyframes rotate {
                100% { transform: rotate(360deg); }
            }
            
            @keyframes dash {
                0% {
                    stroke-dashoffset: 125;
                }
                50% {
                    stroke-dashoffset: 0;
                }
                100% {
                    stroke-dashoffset: -125;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 隐藏加载动画
    function hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 300);
        }
    }
    
    // 填充左侧面板
    function populateLeftPanel(data) {
        document.getElementById('case-name-left').textContent = data.caseName;
        document.getElementById('patient-name-left').textContent = data.patientName;
        document.getElementById('age-left').textContent = data.age;
        document.getElementById('occupation-left').textContent = data.occupation;
        document.getElementById('education-left').textContent = data.education;
        document.getElementById('chief-complaint-left').textContent = data.chiefComplaint;
        document.getElementById('present-illness-left').textContent = data.presentIllness;
        document.getElementById('past-history-left').textContent = data.pastHistory;
        document.getElementById('personal-history-left').textContent = data.personalHistory;
        document.getElementById('family-history-left').textContent = data.familyHistory;
        
        // 添加加载效果
        const fields = document.querySelectorAll('.left-panel .field-content');
        fields.forEach((field, index) => {
            field.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            field.style.opacity = '0';
        });
    }
    
    // 填充右侧面板
    function populateRightPanel(data) {
        document.getElementById('case-name-right').textContent = data.caseName + " (优化版)";
        document.getElementById('patient-name-right').textContent = data.patientName;
        document.getElementById('age-right').textContent = data.age;
        document.getElementById('occupation-right').textContent = data.occupation;
        document.getElementById('education-right').textContent = data.education;
        document.getElementById('chief-complaint-right').textContent = data.chiefComplaint;
        document.getElementById('present-illness-right').textContent = data.presentIllness + " 经过详细问诊，患者近期工作压力大，常熬夜，症状与情绪和疲劳程度相关。曾在当地医院就诊，心电图提示ST段轻度改变。";
        document.getElementById('past-history-right').textContent = data.pastHistory + " 无药物过敏史。曾于2018年因胆囊炎行胆囊切除术，术后恢复良好。";
        document.getElementById('personal-history-right').textContent = data.personalHistory + " 近期因工作压力大，运动量减少，饮食不规律。";
        document.getElementById('family-history-right').textContent = data.familyHistory + " 兄长有高脂血症，妹妹健康状况良好。";
        
        // 添加加载效果
        const fields = document.querySelectorAll('.right-panel .field-content');
        fields.forEach((field, index) => {
            field.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
            field.style.opacity = '0';
        });
    }
    
    // 显示上传完成的动画
    function showUploadComplete() {
        const notification = createNotification("文件解析完成", "success");
        setTimeout(() => removeNotification(notification), 3000);
    }
    
    // 显示优化完成的动画
    function showOptimizeComplete() {
        const notification = createNotification("案例优化完成", "success");
        setTimeout(() => removeNotification(notification), 3000);
    }
    
    // 显示编辑模式指示
    function showEditMode() {
        const notification = createNotification("编辑模式已开启", "info");
        setTimeout(() => removeNotification(notification), 3000);
    }
    
    // 显示保存完成的动画
    function showSaveComplete() {
        const notification = createNotification("案例保存成功", "success");
        setTimeout(() => removeNotification(notification), 3000);
    }
    
    // 创建通知
    function createNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'success' ? '✓' : 'ℹ'}
            </div>
            <div class="notification-message">${message}</div>
        `;
        document.body.appendChild(notification);
        
        // 添加CSS
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.innerHTML = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out forwards, fadeOut 0.3s ease-in 2.7s forwards;
                    max-width: 300px;
                }
                
                .notification-icon {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    font-weight: bold;
                }
                
                .notification-success .notification-icon {
                    background-color: #34c759;
                    color: white;
                }
                
                .notification-info .notification-icon {
                    background-color: #0071e3;
                    color: white;
                }
                
                .notification-message {
                    font-family: var(--apple-font);
                    font-size: 16px;
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        return notification;
    }
    
    // 移除通知
    function removeNotification(notification) {
        notification.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
});
