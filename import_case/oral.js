document.addEventListener('DOMContentLoaded', function() {
    const generateOralBtn = document.getElementById('generate-oral-btn');
    const editOralBtn = document.getElementById('edit-oral-btn');
    const saveOralBtn = document.getElementById('save-oral-btn');
    const backBtn = document.getElementById('back-btn');
    const caseNameDisplay = document.getElementById('case-name-display');
    const notification = document.getElementById('notification');
    const emptyOralState = document.getElementById('empty-oral-state');
    const oralContent = document.getElementById('oral-content');
    const oralExpression = document.getElementById('oral-expression');
    const optimizedPanelBody = document.getElementById('optimized-panel-body');
    const oralPanelBody = document.getElementById('oral-panel-body');
    
    // 从sessionStorage加载优化后的案例数据
    function loadOptimizedData() {
        try {
            const storedData = sessionStorage.getItem('optimizedCaseData');
            if (storedData) {
                const caseData = JSON.parse(storedData);
                
                // 更新页面标题
                caseNameDisplay.textContent = caseData.caseName;
                
                // 只填充保留的字段
                document.getElementById('optimized-complaint').textContent = caseData.complaint;
                document.getElementById('optimized-present-history').textContent = caseData.presentHistory;
                document.getElementById('optimized-past-history').textContent = caseData.pastHistory;
                document.getElementById('optimized-personal-history').textContent = caseData.personalHistory;
                document.getElementById('optimized-family-history').textContent = caseData.familyHistory;
                
                return caseData;
            } else {
                showNotification("提示", "未找到已保存的案例数据", "info");
                return null;
            }
        } catch (error) {
            console.error("加载数据失败:", error);
            showNotification("错误", "加载数据失败", "error");
            return null;
        }
    }
    
    // 初始加载数据
    const caseData = loadOptimizedData();
    if (!caseData) {
        // 如果没有数据则禁用生成按钮
        generateOralBtn.disabled = true;
        generateOralBtn.classList.add('btn-disabled');
    }
    
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
    
    // 生成口语化内容
    function generateOralContent(caseData) {
        // 直接使用预设的口语化内容，不进行实际转换
        document.getElementById('oral-complaint').innerHTML = convertToOralComplaint(caseData.complaint);
        document.getElementById('oral-present-history').innerHTML = convertToOralPresentHistory(caseData.presentHistory);
        document.getElementById('oral-past-history').innerHTML = convertToOralPastHistory(caseData.pastHistory);
        document.getElementById('oral-personal-history').innerHTML = convertToOralPersonalHistory(caseData.personalHistory);
        document.getElementById('oral-family-history').innerHTML = convertToOralFamilyHistory(caseData.familyHistory);
    }
    
    // 转换主诉为口语化表达
    function convertToOralComplaint(complaint) {
        return `胸口闷痛走两步就犯`;
    }
    
    // 转换现病史为口语化表达
    function convertToOralPresentHistory(presentHistory) {
        return `我这胸口啊，两个月前一走快点儿就发闷，像有人拿拳头压着胸脯中间那块儿。走个两百米或者爬两层楼准犯，一礼拜得疼个四五回，不过歇着时候倒没犯过。每次疼个五分钟左右，含那个救心药片两分钟就能好，疼起来还往脖子后面串，身上冒冷汗。最近一个礼拜可厉害了，现在走五十米或者刚上半个楼梯就疼得受不了，一天能疼四五次，疼得我立马就得站着不敢动。晚上睡觉倒没憋醒过，也没晕倒过，不咳嗽也不吐血，吃饭还行，就是有时候疼得睡不好。大便跟以前一样有点干，体重没变。`;
    }
    
    // 转换既往史为口语化表达
    function convertToOralPastHistory(pastHistory) {
        return `血压高有十年了，最高时候量过高压180低压100，现在每天规律吃降压药片，能压到130到140的。血脂也有点高，不过没正经吃过药。没糖尿病，肺子也没毛病。从没做过手术，也没输过血，吃药吃饭都没过敏的。`;
    }
    
    // 转换个人史为口语化表达
    function convertToOralPersonalHistory(personalHistory) {
        return `抽烟三十年了，每天一包烟，没戒掉。不喝酒。结婚生孩子都正常，老伴身体挺好，有个儿子。没去过疫区，开车也没接触过有毒的东西。`;
    }
    
    // 转换家族史为口语化表达
    function convertToOralFamilyHistory(familyHistory) {
        return `我大哥45岁那年突然心梗过，老爹老妈倒是没听说有啥大病。`;
    }
    
    // 生成口语化版本按钮点击事件
    generateOralBtn.addEventListener('click', function() {
        // 显示加载动画
        const loadingOverlay = showLoading("AI正在生成口语化表达...");
        
        // 等待3秒后再显示结果
        setTimeout(() => {
            // 移除加载动画
            removeLoading(loadingOverlay);
            
            // 隐藏空状态，显示口语化内容
            emptyOralState.style.display = 'none';
            oralContent.style.display = 'block';
            
            // 生成口语化表达内容
            generateOralContent(caseData);
            
            // 添加动画效果
            const oralFields = document.querySelectorAll('.oral-field');
            oralFields.forEach((field, index) => {
                field.style.opacity = '0';
                field.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    field.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    field.style.opacity = '1';
                    field.style.transform = 'translateY(0)';
                }, 100 * index);
            });
            
            showNotification("生成完成", "口语化表达已生成", "comment");
            
            // 设置滚动联动
            setupScrollSync();
        }, 3000); // 等待3秒
    });
    
    // 修改口语化案例按钮点击事件
    editOralBtn.addEventListener('click', function() {
        // 检查是否已生成口语化内容
        if (oralContent.style.display === 'none') {
            showNotification("提示", "请先生成口语化表达", "info");
            return;
        }
        
        // 获取所有口语化字段
        const oralFields = document.querySelectorAll('.oral-field');
        
        // 切换可编辑状态
        const isEditable = oralFields[0].contentEditable === 'true';
        
        oralFields.forEach(field => {
            field.contentEditable = !isEditable;
            
            if (!isEditable) {
                field.classList.add('editable');
            } else {
                field.classList.remove('editable');
            }
        });
        
        // 更新按钮文本
        editOralBtn.innerHTML = isEditable ? 
            '<i class="fas fa-edit"></i> 修改案例' : 
            '<i class="fas fa-times"></i> 取消修改';
        
        // 如果开启编辑，设置焦点到第一个字段
        if (!isEditable) {
            // 设置焦点到第一个字段，但不添加提示信息
            document.getElementById('oral-complaint').focus();
        }
            
        showNotification(!isEditable ? "开始编辑" : "退出编辑", 
                        !isEditable ? "您现在可以编辑口语化内容" : "已退出编辑模式", 
                        !isEditable ? "edit" : "times");
    });
    
    // 保存口语化案例按钮点击事件
    saveOralBtn.addEventListener('click', function() {
        // 检查是否已生成口语化内容
        if (oralContent.style.display === 'none') {
            showNotification("提示", "请先生成口语化表达", "info");
            return;
        }
        
        const loadingOverlay = showLoading("正在保存案例...");
        
        // 模拟保存过程
        setTimeout(() => {
            removeLoading(loadingOverlay);
            
            // 如果处于编辑状态，退出编辑状态
            const oralFields = document.querySelectorAll('.oral-field');
            if (oralFields.length > 0 && oralFields[0].contentEditable === 'true') {
                oralFields.forEach(field => {
                    field.contentEditable = false;
                    field.classList.remove('editable');
                });
                
                // 更新按钮文本
                editOralBtn.innerHTML = '<i class="fas fa-edit"></i> 修改案例';
                
                // 移除编辑提示（如果存在）
                const hint = document.querySelector('.edit-hint');
                if (hint) hint.remove();
            }
            
            // 保存口语化内容
            const oralData = {
                complaint: document.getElementById('oral-complaint').innerHTML,
                presentHistory: document.getElementById('oral-present-history').innerHTML,
                pastHistory: document.getElementById('oral-past-history').innerHTML,
                personalHistory: document.getElementById('oral-personal-history').innerHTML,
                familyHistory: document.getElementById('oral-family-history').innerHTML
            };
            
            sessionStorage.setItem('oralContent', JSON.stringify(oralData));
            
            showNotification("保存成功", "口语化案例已成功保存", "save");
        }, 1500);
    });
    
    // 返回按钮点击事件
    backBtn.addEventListener('click', function() {
        // 如果有未保存的编辑内容，提示用户
        if (oralExpression.contentEditable === 'true') {
            if (confirm('您有未保存的更改，确定要离开吗？')) {
                window.location.href = 'main.html';
            }
        } else {
            window.location.href = 'main.html';
        }
    });
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(event) {
        // Ctrl+S 或 Cmd+S 保存
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            saveOralBtn.click();
        }
        
        // Esc 键退出编辑模式
        if (event.key === 'Escape' && oralExpression.contentEditable === 'true') {
            editOralBtn.click();
        }
    });
    
    // 实现面板滚动联动 - 按字段标题对齐
    function setupScrollSync() {
        let isSyncingOptimized = false;
        let isSyncingOral = false;
        
        // 获取所有字段组
        const optimizedFieldGroups = optimizedPanelBody.querySelectorAll('.field-group');
        const oralFieldGroups = document.querySelectorAll('#oral-content .field-group');
        
        // 创建字段映射
        const fieldMapping = {};
        optimizedFieldGroups.forEach(group => {
            const label = group.querySelector('.field-label').textContent;
            fieldMapping[label] = {
                optimized: group
            };
        });
        
        oralFieldGroups.forEach(group => {
            const label = group.querySelector('.field-label').textContent;
            if (fieldMapping[label]) {
                fieldMapping[label].oral = group;
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
        
        // 优化面板滚动事件
        optimizedPanelBody.addEventListener('scroll', function() {
            if (!isSyncingOral && oralContent.style.display !== 'none') {
                isSyncingOptimized = true;
                
                // 找到当前可见的字段组
                const visibleField = findVisibleField(optimizedPanelBody, optimizedFieldGroups);
                if (visibleField) {
                    const label = visibleField.querySelector('.field-label').textContent;
                    if (fieldMapping[label] && fieldMapping[label].oral) {
                        const targetField = fieldMapping[label].oral;
                        const targetTop = targetField.offsetTop;
                        
                        // 计算原始字段在视窗中的相对位置比例
                        const optimizedRect = visibleField.getBoundingClientRect();
                        const containerRect = optimizedPanelBody.getBoundingClientRect();
                        const relativePosition = (optimizedRect.top - containerRect.top) / containerRect.height;
                        
                        // 应用这个比例到目标面板
                        const offset = Math.max(0, targetTop - relativePosition * oralPanelBody.clientHeight);
                        oralPanelBody.scrollTop = offset;
                    }
                }
                
                setTimeout(() => {
                    isSyncingOptimized = false;
                }, 100);
            }
        });
        
        // 口语化面板滚动事件
        oralPanelBody.addEventListener('scroll', function() {
            if (!isSyncingOptimized && oralContent.style.display !== 'none') {
                isSyncingOral = true;
                
                // 找到当前可见的字段组
                const visibleField = findVisibleField(oralPanelBody, oralFieldGroups);
                if (visibleField) {
                    const label = visibleField.querySelector('.field-label').textContent;
                    if (fieldMapping[label] && fieldMapping[label].optimized) {
                        const targetField = fieldMapping[label].optimized;
                        const targetTop = targetField.offsetTop;
                        
                        // 计算口语化字段在视窗中的相对位置比例
                        const oralRect = visibleField.getBoundingClientRect();
                        const containerRect = oralPanelBody.getBoundingClientRect();
                        const relativePosition = (oralRect.top - containerRect.top) / containerRect.height;
                        
                        // 应用这个比例到目标面板
                        const offset = Math.max(0, targetTop - relativePosition * optimizedPanelBody.clientHeight);
                        optimizedPanelBody.scrollTop = offset;
                    }
                }
                
                setTimeout(() => {
                    isSyncingOral = false;
                }, 100);
            }
        });
    }
});
