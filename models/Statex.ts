export default abstract class Statex<S = any> {
  abstract readonly name;
  abstract readonly inistialState: S;
  abstract readonly actions: Readonly<{
    [key: string]: (state?: S, payload?: any) => S;
  }>;
}
