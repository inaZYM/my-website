// 用于检查响应状态
function checkStatus(response) {
    if (response.ok) {
        return response;
    } else {
        return response.text().then(text => {
            throw new Error(text || response.statusText);
        });
    }
}

// 用于切换登录和注册表单的函数
function toggleForms() {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');

    if (loginContainer.classList.contains('hidden')) {
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    } else {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 隐藏注册表单
    document.getElementById('registerContainer').classList.add('hidden');

    // 注册表单事件监听
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;


// 接口1

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(checkStatus) 
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('注册成功!');
                toggleForms();  // 注册成功后切换到登录表单
            } else {
                alert(data.message || '注册失败!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('发送注册信息时出错!');
        });
    });

    // 登录表单事件监听
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('登录成功!');               
                window.open("../分数界面/用户.html", "_blank");                
            } else {
                alert(data.message || '登录失败!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('登录时出错!');
        });
    });
});
