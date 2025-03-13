document.addEventListener('DOMContentLoaded', function() {
    const optimizeBtn = document.getElementById('optimize-btn');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const importCaseBtn = document.getElementById('import-case-btn');
    const aiUnderstandBtn = document.getElementById('ai-understand-btn'); // 新增AI理解按钮
    const caseNameDisplay = document.getElementById('case-name-display');
    const notification = document.getElementById('notification');
    const optimizedFields = document.querySelectorAll('.optimized-panel .field-value');
    const emptyOptimizeState = document.getElementById('empty-optimize-state');
    const optimizedContent = document.getElementById('optimized-content');
    const optimizationStatus = document.getElementById('optimization-status');
    const originalPanelBody = document.getElementById('original-panel-body');
    const optimizedPanelBody = document.getElementById('optimized-panel-body');
    
    // 从 URL 或 sessionStorage 中获取案例信息
    function loadCaseInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get('source');
        
        if (source === 'upload') {
            const fileName = sessionStorage.getItem('importedFile') || '未命名案例';
            caseNameDisplay.textContent = fileName.replace(/\.[^/.]+$/, ""); // 移除文件扩展名
        } else if (source === 'demo') {
            const caseType = urlParams.get('case');
            let caseName = '示例案例';
            
            // 根据案例类型设置不同的名称
            switch(caseType) {
                case 'coronary': 
                    caseName = '冠心病示例'; 
                    break;
                case 'diabetes': 
                    caseName = '糖尿病示例'; 
                    break;
                case 'hypertension': 
                    caseName = '高血压示例'; 
                    break;
                default: 
                    caseName = caseType ? `${caseType}示例` : '示例案例';
            }
            
            caseNameDisplay.textContent = caseName;
        }
        
        // 将案例名称同步到两个面板
        document.getElementById('original-case-name').textContent = caseNameDisplay.textContent;
        document.getElementById('optimized-case-name').textContent = caseNameDisplay.textContent;
    }
    
    // 加载案例信息
    loadCaseInfo();
    
    // 显示加载动画
    function showLoading(message) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.classList.add('loading-overlay');
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#0071e3" stroke-width="5"></circle>
                </svg>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        return loadingOverlay;
    }
    
    // 移除加载动画
    function removeLoading(overlay) {
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 500);
        }
    }
    
    // 显示通知
    function showNotification(title, message, icon = 'check') {
        const notificationTitle = notification.querySelector('h3');
        const notificationMessage = notification.querySelector('p');
        const notificationIcon = notification.querySelector('.notification-icon i');
        
        notificationTitle.textContent = title;
        notificationMessage.textContent = message;
        notificationIcon.className = `fas fa-${icon}`;
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // AI优化按钮点击事件
    optimizeBtn.addEventListener('click', function() {
        const loadingOverlay = showLoading("AI正在优化案例...");
        
        // 模拟AI优化过程
        setTimeout(() => {
            removeLoading(loadingOverlay);
            
            // 隐藏空状态，显示优化内容
            emptyOptimizeState.style.display = 'none';
            optimizedContent.style.display = 'block';
            
            // 更新优化状态徽章
            optimizationStatus.textContent = '智能优化版';
            optimizationStatus.classList.add('optimized');
            
            // 获取所有优化后字段
            const optimizedFields = document.querySelectorAll('#optimized-content .field-value');
            
            // 突出显示变化的字段，从主诉开始
            const mainComplaint = document.getElementById('optimized-complaint');
            if (mainComplaint) {
                mainComplaint.classList.add('highlight-start');
                
                // 确保主诉字段是第一个显示的
                const mainComplaintGroup = mainComplaint.closest('.field-group');
                if (mainComplaintGroup) {
                    // 滚动到主诉位置，确保它显示在视图顶部
                    optimizedPanelBody.scrollTop = mainComplaintGroup.offsetTop - 20;
                    
                    // 同步原始面板到相应位置
                    const originalComplaint = document.getElementById('original-complaint');
                    if (originalComplaint) {
                        const originalComplaintGroup = originalComplaint.closest('.field-group');
                        if (originalComplaintGroup) {
                            originalPanelBody.scrollTop = originalComplaintGroup.offsetTop - 20;
                        }
                    }
                }
            }
            
            // 其他字段也添加高亮
            optimizedFields.forEach(field => {
                if (field.id !== 'optimized-complaint') { // 排除已高亮的主诉
                    setTimeout(() => {
                        field.classList.add('highlight');
                        setTimeout(() => {
                            field.classList.remove('highlight');
                        }, 1500);
                    }, 1000); // 主诉高亮后延迟一段时间再高亮其他字段
                }
            });
            
            showNotification("优化完成", "AI已成功优化案例内容", "magic");
        }, 2000);
        
        setTimeout(() => {
            // 重新设置滚动联动，确保字段映射正确
            setupScrollSync();
        }, 2100); // 在优化完成后执行
    });
    
    // 修改案例按钮点击事件
    editBtn.addEventListener('click', function() {
        // 切换可编辑状态
        const isEditable = document.querySelector('#optimized-content .field-value').contentEditable === 'true';
        
        // 获取所有可编辑字段（包括基本信息中的项目）
        const editableFields = document.querySelectorAll('#optimized-content .field-value:not(.basic-info-container)');
        const infoItems = document.querySelectorAll('#optimized-content .info-item span[id]');
        
        // 设置普通字段的可编辑状态
        editableFields.forEach(field => {
            field.contentEditable = !isEditable;
            
            if (!isEditable) {
                field.classList.add('editable');
            } else {
                field.classList.remove('editable');
            }
        });
        
        // 设置基本信息项目的可编辑状态
        infoItems.forEach(item => {
            item.contentEditable = !isEditable;
            
            if (!isEditable) {
                item.classList.add('editable');
            } else {
                item.classList.remove('editable');
            }
        });
        
        // 更新按钮文本
        editBtn.innerHTML = isEditable ? 
            '<i class="fas fa-edit"></i> 修改案例' : 
            '<i class="fas fa-times"></i> 取消修改';
            
        // 如果开启了编辑模式，将焦点设置到主诉字段
        if (!isEditable) {
            const complaintField = document.getElementById('optimized-complaint');
            if (complaintField) {
                // 滚动到主诉字段位置
                const complaintGroup = complaintField.closest('.field-group');
                if (complaintGroup) {
                    optimizedPanelBody.scrollTop = complaintGroup.offsetTop - 20;
                }
                
                // 设置焦点并将光标放在文本末尾
                setTimeout(() => {
                    complaintField.focus();
                    
                    // 创建范围并设置光标位置在文本末尾
                    const range = document.createRange();
                    const selection = window.getSelection();
                    
                    if (complaintField.childNodes.length > 0) {
                        const lastChild = complaintField.childNodes[complaintField.childNodes.length - 1];
                        range.setStart(lastChild, lastChild.length || 0);
                    } else {
                        range.setStart(complaintField, 0);
                    }
                    
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }, 100);
            }
        }
            
        showNotification(!isEditable ? "开始编辑" : "退出编辑", 
                        !isEditable ? "您现在可以编辑优化后的内容" : "已退出编辑模式", 
                        !isEditable ? "edit" : "times");
    });
    
    // 保存案例按钮点击事件
    saveBtn.addEventListener('click', function() {
        const loadingOverlay = showLoading("正在保存案例...");
        
        // 模拟保存过程
        setTimeout(() => {
            removeLoading(loadingOverlay);
            
            // 如果处于编辑状态，退出编辑状态
            const editableFields = document.querySelectorAll('#optimized-content .field-value:not(.basic-info-container)');
            const infoItems = document.querySelectorAll('#optimized-content .info-item span[id]');
            
            if (editableFields.length > 0 && editableFields[0].contentEditable === 'true') {
                // 退出普通字段的编辑状态
                editableFields.forEach(field => {
                    field.contentEditable = false;
                    field.classList.remove('editable');
                });
                
                // 退出基本信息项目的编辑状态
                infoItems.forEach(item => {
                    item.contentEditable = false;
                    item.classList.remove('editable');
                });
                
                // 更新按钮文本
                editBtn.innerHTML = '<i class="fas fa-edit"></i> 修改案例';
            }
            
            // 保存到sessionStorage
            saveContentToSession();
            
            showNotification("保存成功", "案例已成功保存", "save");
        }, 1500);
    });
    
    // 导入案例按钮点击事件
    importCaseBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // AI理解按钮点击事件 - 跳转到口语化页面
    aiUnderstandBtn.addEventListener('click', function() {
        // 检查是否已优化并保存
        if (optimizedContent.style.display === 'none') {
            showNotification("提示", "请先进行AI优化并保存案例", "info");
            return;
        }
        
        // 存储当前优化的内容到sessionStorage
        saveContentToSession();
        
        // 跳转到口语化页面
        window.location.href = 'oral.html';
    });
    
    // 保存内容到sessionStorage以便在oral.html中使用
    function saveContentToSession() {
        const caseData = {
            caseName: document.getElementById('optimized-case-name').textContent,
            name: document.getElementById('optimized-name').textContent,
            age: document.getElementById('optimized-age').textContent,
            occupation: document.getElementById('optimized-occupation').textContent,
            education: document.getElementById('optimized-education').textContent,
            complaint: document.getElementById('optimized-complaint').textContent,
            presentHistory: document.getElementById('optimized-present-history').textContent,
            pastHistory: document.getElementById('optimized-past-history').textContent,
            personalHistory: document.getElementById('optimized-personal-history').textContent,
            familyHistory: document.getElementById('optimized-family-history').textContent
        };
        
        sessionStorage.setItem('optimizedCaseData', JSON.stringify(caseData));
    }
    
    // 实现面板滚动联动 - 按字段标题对齐
    function setupScrollSync() {
        let isSyncingOriginal = false;
        let isSyncingOptimized = false;
        
        // 获取所有字段组
        const originalFieldGroups = originalPanelBody.querySelectorAll('.field-group');
        const optimizedFieldGroups = optimizedContent.querySelectorAll('.field-group');
        
        // 创建字段映射
        const fieldMapping = {};
        originalFieldGroups.forEach(group => {
            const label = group.querySelector('.field-label').textContent;
            fieldMapping[label] = {
                original: group
            };
        });
        
        optimizedFieldGroups.forEach(group => {
            const label = group.querySelector('.field-label').textContent;
            if (fieldMapping[label]) {
                fieldMapping[label].optimized = group;
            }
        });
        
        // 找到当前视图中最接近顶部的字段组
        function findVisibleField(container, groups) {
            const containerTop = container.scrollTop;
            let closestField = null;
            let closestDistance = Infinity;
            
            groups.forEach(group => {
                const rect = group.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const distance = Math.abs(rect.top - containerRect.top);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestField = group;
                }
            });
            
            return closestField;
        }
        
        // 原始面板滚动事件
        originalPanelBody.addEventListener('scroll', function() {
            if (!isSyncingOptimized && optimizedContent.style.display !== 'none') {
                isSyncingOriginal = true;
                
                // 找到当前可见的字段组
                const visibleField = findVisibleField(originalPanelBody, originalFieldGroups);
                if (visibleField) {
                    const label = visibleField.querySelector('.field-label').textContent;
                    if (fieldMapping[label] && fieldMapping[label].optimized) {
                        const targetField = fieldMapping[label].optimized;
                        const targetTop = targetField.offsetTop;
                        
                        // 计算原始字段在视窗中的相对位置比例
                        const originalRect = visibleField.getBoundingClientRect();
                        const containerRect = originalPanelBody.getBoundingClientRect();
                        const relativePosition = (originalRect.top - containerRect.top) / containerRect.height;
                        
                        // 应用这个比例到目标面板
                        const offset = Math.max(0, targetTop - relativePosition * optimizedPanelBody.clientHeight);
                        optimizedPanelBody.scrollTop = offset;
                    }
                }
                
                setTimeout(() => {
                    isSyncingOriginal = false;
                }, 100);
            }
        });
        
        // 优化面板滚动事件
        optimizedPanelBody.addEventListener('scroll', function() {
            if (!isSyncingOriginal && optimizedContent.style.display !== 'none') {
                isSyncingOptimized = true;
                
                // 找到当前可见的字段组
                const visibleField = findVisibleField(optimizedPanelBody, optimizedFieldGroups);
                if (visibleField) {
                    const label = visibleField.querySelector('.field-label').textContent;
                    if (fieldMapping[label] && fieldMapping[label].original) {
                        const targetField = fieldMapping[label].original;
                        const targetTop = targetField.offsetTop;
                        
                        // 计算优化字段在视窗中的相对位置比例
                        const optimizedRect = visibleField.getBoundingClientRect();
                        const containerRect = optimizedPanelBody.getBoundingClientRect();
                        const relativePosition = (optimizedRect.top - containerRect.top) / containerRect.height;
                        
                        // 应用这个比例到目标面板
                        const offset = Math.max(0, targetTop - relativePosition * originalPanelBody.clientHeight);
                        originalPanelBody.scrollTop = offset;
                    }
                }
                
                setTimeout(() => {
                    isSyncingOptimized = false;
                }, 100);
            }
        });
        
        // 确保主诉字段在优化后可见
        if (optimizedContent.style.display !== 'none') {
            const mainComplaint = document.getElementById('optimized-complaint');
            if (mainComplaint) {
                const mainComplaintGroup = mainComplaint.closest('.field-group');
                if (mainComplaintGroup) {
                    // 此时不需要滚动，只需确保映射正确
                    const label = mainComplaintGroup.querySelector('.field-label').textContent;
                    if (fieldMapping[label] && fieldMapping[label].original) {
                        // 映射已经设置正确，不需要额外操作
                    }
                }
            }
        }
    }
    
    // 设置滚动联动
    setupScrollSync();
});
