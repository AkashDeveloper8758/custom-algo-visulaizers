export class AlgoType {
  static Balancer = "balancer";
  static KnightPath = "horsePath";
  static NQueens = "nqeens";
  static PathFinderVisualizerr = "pathFinder";
  static ThiefAway = "thiefAway";
}

export async function waitFor(durationInMillisecond) {
  await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, durationInMillisecond);
  });
}
