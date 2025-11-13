import { Component, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-ambient-background',
  templateUrl: './ambient-background.html',
  styleUrls: ['./ambient-background.css']
})
export class AmbientBackgroundComponent implements AfterViewInit, OnDestroy {

  private particleCount = 700;
  private particlePropCount = 9;
  private particlePropsLength = this.particleCount * this.particlePropCount;
  private rangeY = 100;
  private baseTTL = 50;
  private rangeTTL = 150;
  private baseSpeed = 0.1;
  private rangeSpeed = 2;
  private baseRadius = 1;
  private rangeRadius = 4;
  private baseHue = 260;
  private rangeHue = 100;
  private noiseSteps = 8;
  private xOff = 0.00125;
  private yOff = 0.00125;
  private zOff = 0.0005;
  private backgroundColor = 'hsla(260,40%,5%,1)';

  private container!: HTMLElement;
  private canvas: any;
  private ctx: any;
  private center!: number[];
  private tick = 0;

  private simplex: any;
  private particleProps!: Float32Array;
  private animationFrame!: number;

  async ngAfterViewInit(): Promise<void> {
    await this.setup();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  private async setup(): Promise<void> {
    this.createCanvas();
    this.resize();
    await this.initParticles(); // 🔹 dynamic import
    this.draw();
  }

  private async initParticles(): Promise<void> {
    this.tick = 0;
    const SimplexNoiseModule = await import('simplex-noise'); // dynamic import ESM
    const SimplexNoiseClass = (SimplexNoiseModule as any).default || SimplexNoiseModule; 
    this.simplex = new SimplexNoiseClass();

    this.particleProps = new Float32Array(this.particlePropsLength);
    for (let i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.initParticle(i);
    }
  }

  private initParticle(i: number): void {
    const x = Math.random() * this.canvas.a.width;
    const y = this.center[1] + this.randRange(this.rangeY);
    const life = 0;
    const ttl = this.baseTTL + Math.random() * this.rangeTTL;
    const speed = this.baseSpeed + Math.random() * this.rangeSpeed;
    const radius = this.baseRadius + Math.random() * this.rangeRadius;
    const hue = this.baseHue + Math.random() * this.rangeHue;
    this.particleProps.set([x, y, 0, 0, life, ttl, speed, radius, hue], i);
  }

  private drawParticles(): void {
    for (let i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.updateParticle(i);
    }
  }

  private updateParticle(i: number): void {
    const [x, y, vx, vy, life, ttl, speed, radius, hue] = this.particleProps.slice(i, i + 9);
    const n = this.simplex.noise3D(x * this.xOff, y * this.yOff, this.tick * this.zOff) * this.noiseSteps * Math.PI * 2;
    const newVx = this.lerp(vx, Math.cos(n), 0.5);
    const newVy = this.lerp(vy, Math.sin(n), 0.5);
    const x2 = x + newVx * speed;
    const y2 = y + newVy * speed;

    this.drawParticle(x, y, x2, y2, life, ttl, radius, hue);
    this.particleProps.set([x2, y2, newVx, newVy, life + 1, ttl, speed, radius, hue], i);

    if (this.checkBounds(x2, y2) || life > ttl) this.initParticle(i);
  }

  private drawParticle(x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number): void {
    this.ctx.a.save();
    this.ctx.a.lineCap = 'round';
    this.ctx.a.lineWidth = radius;
    this.ctx.a.strokeStyle = `hsla(${hue},100%,60%,${this.fadeInOut(life, ttl)})`;
    this.ctx.a.beginPath();
    this.ctx.a.moveTo(x, y);
    this.ctx.a.lineTo(x2, y2);
    this.ctx.a.stroke();
    this.ctx.a.closePath();
    this.ctx.a.restore();
  }

  private checkBounds(x: number, y: number): boolean {
    return (x > this.canvas.a.width || x < 0 || y > this.canvas.a.height || y < 0);
  }

  private createCanvas(): void {
    this.container = document.querySelector('.content--canvas') as HTMLElement;
    this.canvas = {
      a: document.createElement('canvas'),
      b: document.createElement('canvas')
    };
    this.canvas.b.style.position = 'fixed';
    this.canvas.b.style.top = '0';
    this.canvas.b.style.left = '0';
    this.canvas.b.style.width = '100%';
    this.canvas.b.style.height = '100%';
    this.container.appendChild(this.canvas.b);
    this.ctx = {
      a: this.canvas.a.getContext('2d'),
      b: this.canvas.b.getContext('2d')
    };
    this.center = [];
  }

  private resize(): void {
    const { innerWidth, innerHeight } = window;
    this.canvas.a.width = innerWidth;
    this.canvas.a.height = innerHeight;
    this.canvas.b.width = innerWidth;
    this.canvas.b.height = innerHeight;
    this.center[0] = 0.5 * innerWidth;
    this.center[1] = 0.5 * innerHeight;
  }

  private renderGlow(): void {
    this.ctx.b.save();
    this.ctx.b.filter = 'blur(8px) brightness(200%)';
    this.ctx.b.globalCompositeOperation = 'lighter';
    this.ctx.b.drawImage(this.canvas.a, 0, 0);
    this.ctx.b.restore();
    this.ctx.b.save();
    this.ctx.b.filter = 'blur(4px) brightness(200%)';
    this.ctx.b.globalCompositeOperation = 'lighter';
    this.ctx.b.drawImage(this.canvas.a, 0, 0);
    this.ctx.b.restore();
  }

  private renderToScreen(): void {
    this.ctx.b.save();
    this.ctx.b.globalCompositeOperation = 'lighter';
    this.ctx.b.drawImage(this.canvas.a, 0, 0);
    this.ctx.b.restore();
  }

  private draw(): void {
    this.tick++;
    this.ctx.a.clearRect(0, 0, this.canvas.a.width, this.canvas.a.height);
    this.ctx.b.fillStyle = this.backgroundColor;
    this.ctx.b.fillRect(0, 0, this.canvas.a.width, this.canvas.a.height);
    this.drawParticles();
    this.renderGlow();
    this.renderToScreen();
    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

  @HostListener('window:resize')
  onResize() {
    this.resize();
  }

  private randRange(n: number): number {
    return Math.random() * (n * 2) - n;
  }

  private fadeInOut(t: number, m: number): number {
    const hm = 0.5 * m;
    return Math.abs((t + hm) % m - hm) / hm;
  }

  private lerp(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b;
  }
}
