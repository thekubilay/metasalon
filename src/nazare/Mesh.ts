import Game from '@/nazare/Game';

export default class Mesh {
  create(game: Game): void {
    game.environments.forEach((env: any) => {
      env.publish(game);
    });
  }
}
