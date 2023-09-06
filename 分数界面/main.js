document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[name="subjects"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let checkedCount = document.querySelectorAll('input[name="subjects"]:checked').length;
            if (checkedCount > 3) {
                alert('只能选择三门科目!');
                checkbox.checked = false;
            }
        });
    });

    document.getElementById('volunteerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const score = document.getElementById('score').value;
        const ranking = document.getElementById('ranking').value;
        const subjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked')).map(checkbox => checkbox.value);

        const data = {
            rank: ranking,
            chosenSubjects: subjects
        };

        localStorage.setItem('userRanking', ranking);
        localStorage.setItem('userChosenSubjects', JSON.stringify(subjects)); 

        // 你可以选择是否启用此API调用
        // fetch('https://www.plys.love:7777/remote/getSchool', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json; charset=UTF-8'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     alert('数据已成功发送到后端!');
        //     window.location.href = '../推荐志愿/index2.html';
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('发送数据时出错!');
        // });
        window.location.href = '../推荐志愿/index2.html';
    });

    // 加入注销功能
    document.getElementById('logoutBtn').addEventListener('click', function() {
        fetch('/logout', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                // 你可以根据需要重定向到不同的页面
                window.location.href = "../用户界面/登录界面.html"; 
            } else {
                alert("注销失败!");
            }
        });
    });
});
function confirmLogout() {
    return confirm('确定退出账号？');
}
