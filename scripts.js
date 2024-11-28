document.addEventListener("DOMContentLoaded", function() {
    loadContent('home.html', document.querySelector('.menu li a.active'));
});

function loadContent(page, element) {
    const content = document.getElementById('content');

    // Удаляем класс active у всех ссылок
    const links = document.querySelectorAll('.menu li a');
    links.forEach(link => link.classList.remove('active'));

    // Добавляем класс active текущей ссылке
    element.classList.add('active');

    fetch(page)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            executeScripts(content);
        })
        .catch(error => {
            console.error('Ошибка загрузки страницы:', error);
            content.innerHTML = '<p>Не удалось загрузить содержимое.</p>';
        });
}

function executeScripts(element) {
    const scripts = element.querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
            newScript.async = true;
        } else {
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
    });
}
