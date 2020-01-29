const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
})

let trail = 0.5

function randomIntFromRange(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = Math.random() * 0.01
    this.radians = Math.random() * Math.PI * 2
    this.randomIntFromRange = randomIntFromRange(100, 800)

    this.update = () => {
        this.radians += this.velocity

        this.x = x + Math.cos(this.radians) * this.randomIntFromRange
        this.y = y + Math.sin(this.radians) * this.randomIntFromRange

        this.draw()
    }

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
}

let paricles

function init() {
    particles = []

    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, Math.random() * 1, 'white'))
    }
}

function animate() {
    requestAnimationFrame(animate)

    c.fillStyle = 'rgba(0, 0, 0,' + trail + ')'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(Particle => {
        Particle.update()
    });
}

init()
animate()