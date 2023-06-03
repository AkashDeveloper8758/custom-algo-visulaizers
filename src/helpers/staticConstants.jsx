export class AlgoType {
  static Balancer = "balancer";
  static KnightPath = "horsePath";
  static NQueens = "nqeens";
  static PathFinderVisualizerr = "pathFinder";
}

export async function waitFor(durationInMillisecond) {
  await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, durationInMillisecond);
  });
}
