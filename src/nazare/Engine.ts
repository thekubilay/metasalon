/* callback function type */

type CBF = () => void;

export default class Engine {
  flag: boolean;
  callbacks: any;

  constructor() {
    this.flag = false;
    this.callbacks = [];
  }

  inLoop(callback: CBF): void {
    this.callbacks.push(callback)
  }

  outLoop(callback: CBF): void {
    this.callbacks = this.callbacks.filter((cb: any) => cb !== callback);
  }

  animate(): void {
    if (!this.flag) return;
    // this.callbacks.forEach((cb: any) => cb());
    for (let i = this.callbacks.length; i--; ) {
      this.callbacks[i]();
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  start(): void {
    if (this.flag) return;
    this.flag = true;
    this.animate();
  }

  stop(): void {
    this.flag = false;
  }
}
