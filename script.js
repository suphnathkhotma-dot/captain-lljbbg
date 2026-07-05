const canvas = document.getElementById("sakura");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const music = document.getElementById("music");
let started = false;

class Petal {

    constructor(x, y, size, speed) {

        this.x = x;
        this.y = y;

        this.size = size;
        this.speed = speed;

        this.angle = Math.random() * Math.PI * 2;
        this.rotate = Math.random() * 360;
        this.rotateSpeed = (Math.random() - 0.5) * 4;

    }

    update() {

        this.y += this.speed;

        this.x += Math.sin(this.angle) * 1.5;

        this.angle += 0.03;

        this.rotate += this.rotateSpeed;

        if (this.y > height + 30) {

            this.y = -20;
            this.x = Math.random() * width;

        }

    }

    draw() {

        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate(this.rotate * Math.PI / 180);

        ctx.beginPath();

        ctx.fillStyle = "#ffc7e5";

        ctx.ellipse(
            0,
            0,
            this.size,
            this.size * 0.6,
            Math.PI / 4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}

const petals = [];

for (let i = 0; i < 90; i++) {

    petals.push(
        new Petal(
            Math.random() * width,
            Math.random() * height,
            4 + Math.random() * 6,
            1 + Math.random() * 2
        )
    );

}

function animate() {

    ctx.clearRect(0, 0, width, height);

    petals.forEach((petal) => {

        petal.update();
        petal.draw();

    });

    requestAnimationFrame(animate);

}

animate();

function burst(x, y) {

    for (let i = 0; i < 25; i++) {

        petals.push(

            new Petal(

                x + (Math.random() - 0.5) * 80,

                y + (Math.random() - 0.5) * 80,

                3 + Math.random() * 5,

                2 + Math.random() * 4

            )

        );

    }

}

document.body.addEventListener("click", (e) => {

    burst(e.clientX, e.clientY);

    if (!started) {

        started = true;

        music.play().catch(() => {});

    }

});

document.body.addEventListener("touchstart", (e) => {

    const touch = e.touches[0];

    burst(touch.clientX, touch.clientY);

    if (!started) {

        started = true;

        music.play().catch(() => {});

    }

});
