
const distance = (particle1, particle2) => {
  return Math.sqrt(
    Math.pow(particle1.x - particle2.x, 2) +
      Math.pow(particle1.y - particle2.y, 2)
  );
};

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.canvas=effect.canvas;
    this.radius = Math.floor(10 * Math.random() + 1);
    this.x = Math.random() * (this.canvas.width - 2 * this.radius) + this.radius;
    this.y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.95;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {

    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / distance;
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x + this.radius > this.canvas.width) {
      this.x = this.canvas.width - this.radius;
      this.vx = -this.vx;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx = -this.vx;
    }
    if (this.y + this.radius > this.canvas.height) {
      this.y = this.canvas.height - this.radius;
      this.vy = -this.vy;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy = -this.vy;
    }
  }
  reset() {
    this.x = Math.random() * (this.canvas.width - 2 * this.radius) + this.radius;
    this.y = Math.random() * (this.canvas.height - 2 * this.radius) + this.radius;
  }
}

export class Effect {
  constructor(canvas,context) {
    this.canvas = canvas;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.particles = [];
    this.numberOfParticles =Math.floor((this.height*this.width)/4000);
    this.context = context;
    this.createParticles();
    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 150,
    };
    console.log(Math.floor((this.height*this.width)/1800))
    window.addEventListener("resize", (e) => {
      this.resize(e.target.window.innerHeight, e.target.window.innerWidth,this.context);
    });

    window.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }
    });

    window.addEventListener("mouseup", (e) => {
      this.mouse.pressed = false;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener("mousedown", (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "darkblue");
    context.fillStyle = gradient;
    context.strokeStyle = "white";

  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles() {
    // this.conectParticles();
    this.particles.forEach((particle) => {
      particle.draw(this.context);
      particle.update();
    });
  }
  conectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        if (distance(this.particles[i], this.particles[j]) < 150) {
          this.context.save();
          let opacity =
            1 - distance(this.particles[i], this.particles[j]) / 200;
          this.context.globalAlpha = opacity;
          this.context.beginPath();
          this.context.moveTo(this.particles[i].x, this.particles[i].y);
          this.context.lineTo(this.particles[j].x, this.particles[j].y);
          this.context.stroke();
          this.context.restore();
        }
      }
    }
  }
  resize(height, width,context) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(1, "magenta");
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "white";
    this.particles.forEach(particle => {
      particle.reset();
    })
    
  }
  destroy() {
  window.removeEventListener("resize", this._resizeHandler);
  window.removeEventListener("mousemove", this._mouseMoveHandler);
  window.removeEventListener("mousedown", this._mouseDownHandler);
  window.removeEventListener("mouseup", this._mouseUpHandler);
}

}


