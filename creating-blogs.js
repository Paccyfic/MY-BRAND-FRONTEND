document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();

    const thumbnail = document.querySelector('#thumbnail');
    let thumbnail_value = thumbnail.value;
    const heading = document.querySelector('#heading');
    const article = document.querySelector('#article');
    

    const thumbnail_icon = document.querySelector('#thumbnail-icon');

    const form = document.querySelector('#form');

    thumbnail.addEventListener('change', function (e) {
        // CONVERT IMAGE TO BASE64
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            const img = document.createElement('img');
            img.src = reader.result;
            img.style.width = '100%';
            img.style.height = '100%';
            thumbnail.parentElement.appendChild(img);
            thumbnail_icon.style.display = 'none';
            thumbnail_value = reader.result;
        };
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // FETCH BLOGS FROM LOCAL STORAGE
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        // PUSH NEW BLOG
        blogs.unshift({
            thumbnail: thumbnail_value,
            heading: heading.value,
            article: article.value,
            createdAt: new Date().toLocaleString()
        });
        // SAVE BLOGS TO LOCAL STORAGE
        localStorage.setItem('blogs', JSON.stringify(blogs));

        // NAVIGATE TO BLOGS PAGE
        window.location.href = 'blogs.html';
    });
});