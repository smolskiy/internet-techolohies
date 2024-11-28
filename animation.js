const canvas = document.getElementById('systemCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;
console.log(canvas)
// Модули системы
const modules = [
    { name: 'Data Collection', x: 150, y: 100, color: '#6A9EBB' },
    { name: 'Validation', x: 400, y: 100, color: '#91D5A6' },
    { name: 'Analysis', x: 150, y: 300, color: '#FFD166' },
    { name: 'Forecasting', x: 400, y: 300, color: '#EF476F' },
    { name: 'Visualization', x: 275, y: 500, color: '#118AB2' }
];

const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 }
];

let progress = 0; // Прогресс анимации

// Рисование модуля
function drawModule(module) {
    ctx.fillStyle = module.color;
    ctx.beginPath();
    ctx.arc(module.x, module.y, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(module.name, module.x, module.y + 5);
}

// Рисование связи
function drawConnection(start, end, progress) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ratio = Math.min(progress / len, 1);
    const nx = start.x + dx * ratio;
    const ny = start.y + dy * ratio;

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    ctx.closePath();
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем связи до текущего прогресса
    connections.forEach((conn, index) => {
        if (progress > index * 100) {
            const start = modules[conn.from];
            const end = modules[conn.to];
            drawConnection(start, end, progress - index * 100);
        }
    });

    // Рисуем модули
    modules.forEach((module, index) => {
        if (progress > index * 100) {
            drawModule(module);
        }
    });

    progress += 5; // Увеличиваем прогресс

    if (progress < modules.length * 100 + connections.length * 100) {
        requestAnimationFrame(animate);
    }
}

animate();
