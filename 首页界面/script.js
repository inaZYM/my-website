document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let query = document.querySelector('.search-input').value;
    window.location.href = 'https://www.baidu.com/s?wd=' + encodeURIComponent(query);
});

const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

function showNextSlide() {
    slides[slideIndex].style.opacity = 0; // 隐藏当前图片
    slideIndex = (slideIndex + 1) % 3; // 计算下一个图片的索引
    slides[slideIndex].style.opacity = 1; // 显示下一个图片
}

function showPrevSlide() {
    slides[slideIndex].style.opacity = 0; // 隐藏当前图片
    slideIndex = (slideIndex - 1 + 3) % 3; // 往前移动，需要确保索引不为负数
    slides[slideIndex].style.opacity = 1; // 显示上一个图片
}

setInterval(showNextSlide, 3000); // 每3秒切换到下一个图片

const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);
function confirmLogout() {
    return confirm('确定退出账号？');
}
