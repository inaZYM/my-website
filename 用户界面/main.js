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
            rank: ranking
        };

        // 将排名存储到localStorage中
        localStorage.setItem('userRanking', ranking);

        //接口3
        //本地API
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

        //     // 添加页面跳转到指定链接
        //     window.location.href = '../推荐志愿/index2.html';
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('发送数据时出错!');
        // });
        window.location.href = '../推荐志愿/index2.html';
    });
});
