document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const wordInput = document.getElementById('word');
    const letterInput = document.getElementById('letter');
    const resultDiv = document.getElementById('result');
    const targetLetterSpan = document.getElementById('targetLetter');
    const targetWordSpan = document.getElementById('targetWord');
    const countSpan = document.getElementById('count');
    const strawberryContainer = document.getElementById('strawberry-container');
    
    // 设置默认值
    wordInput.value = 'strawberry';
    letterInput.value = 'r';
    
    // 初始化时更新结果
    updateResult();
    
    // 添加输入框变化事件 - 自动计算结果
    wordInput.addEventListener('input', updateResult);
    letterInput.addEventListener('input', function(e) {
        // 确保只输入一个字符
        if (e.target.value.length > 1) {
            e.target.value = e.target.value.charAt(0);
        }
        updateResult();
    });
    
    // 更新结果函数
    function updateResult() {
        const word = wordInput.value.trim();
        const letter = letterInput.value.trim();
        
        if (word && letter) {
            // 计算字母出现次数
            const count = countOccurrences(word, letter);
            
            // 更新显示
            targetLetterSpan.textContent = letter;
            targetWordSpan.textContent = word;
            countSpan.textContent = count;
            
            resultDiv.style.display = 'block';
            
            // 更新草莓图标
            updateStrawberryIcons(count);
        } else {
            if (!word) targetWordSpan.textContent = "___";
            if (!letter) targetLetterSpan.textContent = "_";
            countSpan.textContent = "0";
            
            resultDiv.style.display = 'block';
            strawberryContainer.innerHTML = '';
            
            if (!word || !letter) {
                const placeholderMsg = document.createElement('div');
                placeholderMsg.className = 'no-strawberry';
                placeholderMsg.innerHTML = '<span style="opacity: 0.3; font-size: 30px;">🍓</span><p>请输入单词和字母</p>';
                strawberryContainer.appendChild(placeholderMsg);
            }
        }
    }
    
    // 计算字母在单词中出现的次数
    function countOccurrences(str, char) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i].toLowerCase() === char.toLowerCase()) {
                count++;
            }
        }
        return count;
    }
    
    // 更新草莓图标
    function updateStrawberryIcons(count) {
        // 清空容器
        strawberryContainer.innerHTML = '';
        
        // 添加草莓图标
        for (let i = 0; i < count; i++) {
            const strawberry = document.createElement('span');
            strawberry.className = 'strawberry';
            strawberry.textContent = '🍓';
            strawberry.style.animationDelay = `${i * 0.1}s`;
            
            // 随机角度
            const rotation = Math.random() * 20 - 10;
            strawberry.style.transform = `rotate(${rotation}deg)`;
            
            strawberryContainer.appendChild(strawberry);
        }
        
        // 如果没有草莓，显示一个灰色草莓
        if (count === 0) {
            const noStrawberry = document.createElement('div');
            noStrawberry.className = 'no-strawberry';
            noStrawberry.innerHTML = '<span style="opacity: 0.3; font-size: 30px;">🍓</span><p>没有找到匹配的字母</p>';
            strawberryContainer.appendChild(noStrawberry);
        }
    }
});
