type Caster = number | boolean | object;

class KeyListener {
  keys: { [key: string]: boolean };
  caster: Caster;

  constructor(caster: Caster[] = []) {
    this.keys = {};
    this.caster = caster;
  }

  setCaster(caster: Caster): void {
    this.caster = caster;
  }

  isPressed(key: string): boolean {
    return this.keys[key] ? this.keys[key] : false;
  }

  down(e: KeyboardEvent): void {
    if (this.keys[e.key]) return;
    this.keys[e.key] = true;
    this.setCaster([e.key, true, this.keys]);
  }

  up(e: KeyboardEvent): void {
    this.keys[e.key] = false;
    this.setCaster([e.key, false, this.keys]);
  }

  start(): void {
    const stage: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    stage.addEventListener('keydown', this.down.bind(this));
    stage.addEventListener('keyup', this.up.bind(this));
  }

  stop(): void {
    const stage: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    stage.removeEventListener('keydown', this.down.bind(this));
    stage.removeEventListener('keyup', this.up.bind(this));
  }
}

export default KeyListener;
