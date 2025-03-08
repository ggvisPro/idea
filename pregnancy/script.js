// 日期格式化函数
function formatDate(date) {
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// 计算孕期相关信息
function calculatePregnancy() {
    console.log('计算孕期函数被调用');
    const lastPeriodInput = document.getElementById('lastPeriod').value;
    
    if (!lastPeriodInput) {
        alert('请输入末次月经日期');
        return;
    }
    
    const lastPeriod = new Date(lastPeriodInput);
    
    // 计算预产期（末次月经 + 280天）
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(lastPeriod.getDate() + 280);
    
    // 计算当前孕周
    const today = new Date();
    const pregnancyDays = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    
    if (pregnancyDays < 0) {
        document.getElementById('dueDate').textContent = formatDate(dueDate);
        document.getElementById('currentWeek').textContent = "末次月经日期在将来，无法计算当前孕周";
        return;
    }
    
    const pregnancyWeeks = Math.floor(pregnancyDays / 7);
    const remainingDays = pregnancyDays % 7;
    
    document.getElementById('dueDate').textContent = formatDate(dueDate);
    document.getElementById('currentWeek').textContent = `${pregnancyWeeks}周${remainingDays}天`;
    
    // 默认将今天设为指定日期
    document.getElementById('specificDate').valueAsDate = new Date();
    calculateSpecificDateWeek();
    
    // 只为主要孕期计算结果添加动画效果
    animateResults(['dueDate', 'currentWeek']);
}

// 计算指定日期的孕周
function calculateSpecificDateWeek() {
    console.log('计算指定日期孕周函数被调用');
    const lastPeriodInput = document.getElementById('lastPeriod').value;
    const specificDateInput = document.getElementById('specificDate').value;
    
    if (!lastPeriodInput || !specificDateInput) {
        alert('请输入末次月经日期和指定日期');
        return;
    }
    
    const lastPeriod = new Date(lastPeriodInput);
    const specificDate = new Date(specificDateInput);
    
    const pregnancyDays = Math.floor((specificDate - lastPeriod) / (1000 * 60 * 60 * 24));
    
    if (pregnancyDays < 0) {
        document.getElementById('specificDateWeek').textContent = "指定日期早于末次月经日期";
        return;
    }
    
    const pregnancyWeeks = Math.floor(pregnancyDays / 7);
    const remainingDays = pregnancyDays % 7;
    
    document.getElementById('specificDateWeek').textContent = `${pregnancyWeeks}周${remainingDays}天`;
    
    // 只为指定日期孕周结果添加动画效果
    animateResults(['specificDateWeek']);
}

// 根据孕周计算日期
function calculateWeekDate() {
    console.log('计算孕周对应日期函数被调用');
    const lastPeriodInput = document.getElementById('lastPeriod').value;
    const weekInput = document.getElementById('weekInput').value;
    const dayInput = document.getElementById('dayInput').value;
    
    if (!lastPeriodInput) {
        alert('请先输入末次月经日期');
        return;
    }
    
    if (weekInput === '' || dayInput === '') {
        alert('请输入周数和天数');
        return;
    }
    
    const weeks = parseInt(weekInput);
    const days = parseInt(dayInput);
    
    if (days > 6) {
        alert('天数应小于等于6');
        return;
    }
    
    const lastPeriod = new Date(lastPeriodInput);
    const totalDays = weeks * 7 + days;
    
    const resultDate = new Date(lastPeriod);
    resultDate.setDate(lastPeriod.getDate() + totalDays);
    
    document.getElementById('weekDate').textContent = formatDate(resultDate);
    
    // 只为孕周日期结果添加动画效果
    animateResults(['weekDate']);
}

// 计算两个日期之间的间隔
function calculateDateDifference() {
    console.log('计算日期间隔函数被调用');
    const date1Input = document.getElementById('date1').value;
    const date2Input = document.getElementById('date2').value;
    
    if (!date1Input || !date2Input) {
        alert('请输入两个日期');
        return;
    }
    
    const date1 = new Date(date1Input);
    const date2 = new Date(date2Input);
    
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('dateDifference').textContent = `${diffDays}天`;
    
    // 只为日期间隔结果添加动画效果
    animateResults(['dateDifference']);
}

// 计算向前/向后推算的日期
function calculateNewDate() {
    console.log('计算推算日期函数被调用');
    const baseDateInput = document.getElementById('baseDate').value;
    const dayCountInput = document.getElementById('dayCount').value;
    const direction = document.getElementById('direction').value;
    
    if (!baseDateInput) {
        alert('请输入基准日期');
        return;
    }
    
    if (!dayCountInput) {
        alert('请输入天数');
        return;
    }
    
    const baseDate = new Date(baseDateInput);
    let dayCount = parseInt(dayCountInput);
    
    if (direction === 'backward') {
        dayCount = -dayCount;
    }
    
    const resultDate = new Date(baseDate);
    resultDate.setDate(baseDate.getDate() + dayCount);
    
    document.getElementById('newDate').textContent = formatDate(resultDate);
    
    // 只为新日期结果添加动画效果
    animateResults(['newDate']);
}

// 为指定结果添加动画效果
function animateResults(elementIds) {
    console.log('动画效果被应用于:', elementIds);
    // 将元素ID数组转换为实际的DOM元素
    const results = elementIds.map(id => document.getElementById(id));
    
    results.forEach((result, index) => {
        if (!result) return; // 确保元素存在
        
        result.style.opacity = '0';
        result.style.transform = 'translateY(10px)';
        setTimeout(() => {
            result.style.transition = 'all 0.3s ease-out';
            result.style.opacity = '1';
            result.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

// 页面加载后设置今天的日期为默认值
document.addEventListener('DOMContentLoaded', function() {
    // 选项卡切换功能
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有选项卡和内容区域的active类
            tabs.forEach(t => t.classList.remove('active'));
            const sections = document.querySelectorAll('.calculator-section');
            sections.forEach(s => s.classList.remove('active'));
            
            // 为当前点击的选项卡添加active类
            this.classList.add('active');
            
            // 显示对应的内容区域
            const targetTabId = this.getAttribute('data-tab');
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    const today = new Date();
    
    if (document.getElementById('lastPeriod'))
        document.getElementById('lastPeriod').valueAsDate = today;
    
    if (document.getElementById('specificDate'))
        document.getElementById('specificDate').valueAsDate = today;
    
    if (document.getElementById('date1'))
        document.getElementById('date1').valueAsDate = today;
    
    if (document.getElementById('date2'))
        document.getElementById('date2').valueAsDate = today;
    
    if (document.getElementById('baseDate'))
        document.getElementById('baseDate').valueAsDate = today;
        
    // 设置默认的天数值
    if (document.getElementById('dayInput'))
        document.getElementById('dayInput').value = "0";
        
    if (document.getElementById('weekInput'))
        document.getElementById('weekInput').value = "0";
        
    if (document.getElementById('dayCount'))
        document.getElementById('dayCount').value = "1";
    
    // 移动设备优化
    if ('ontouchstart' in window) {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // iOS设备优化
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        document.body.classList.add('ios-device');
        
        // 处理iOS日期输入
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.addEventListener('blur', function(e) {
                if(!this.valueAsDate) {
                    this.valueAsDate = new Date();
                }
            });
        });
    }
    
    // 添加界面入场动画
    const sections = document.querySelectorAll('.calculator-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        const activeElement = document.activeElement;
        if (activeElement.tagName === "INPUT") {
            e.preventDefault();
            
            const section = activeElement.closest('.calculator-section');
            if (section) {
                const button = section.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        }
    }
});
