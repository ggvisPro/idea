document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });
    
    // 密码显示/隐藏切换
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // 账号登录表单提交处理
    const accountForm = document.getElementById('accountForm');
    const loginMessage = document.getElementById('loginMessage');
    
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 模拟登录验证 (实际应用中应通过API请求验证)
        if (username === 'wang' && password === '1234') {
            // 登录成功
            loginMessage.textContent = '欢迎您，王院！';
            loginMessage.style.color = 'green';
            
            // 这里可以添加跳转逻辑
            setTimeout(() => { window.location.href = 'main.html'; }, 3000);
        } else {
            // 登录失败
            loginMessage.textContent = '账号或密码错误';
            loginMessage.style.color = 'red';
        }
        
        loginMessage.style.display = 'block';
    });
    
    // 手机号和邮箱登录的验证可以类似实现
});
