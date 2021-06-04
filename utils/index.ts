export * from "./net";
export * from "./store";

/**
 * 创建一组颜色
 * @param color 16进制色值
 */
export function createRGB(color = "#000000", reverse: boolean = false) {
  const c = color.substr(1);
  const rgbs = [c[0] + c[1], c[2] + c[3], c[4] + c[5]].map((v) => parseInt(v, 16));

  const inc = rgbs.map((v) => ({
    down: Math.floor((v - 0) / 5),
    up: Math.floor((255 - v) / 5),
  }));

  const res = [100, 200, 300, 400].reduce((res, weight, weightIndex) => {
    res[weight] = rgbs.reduce((prev, v, i) => {
      prev += (v - inc[i].down * (4 - weightIndex)).toString(16).padStart(2, "0");
      return prev;
    }, "#");
    return res;
  }, {});

  res[500] = color;
  res["primary"] = color;

  [600, 700, 800, 900].reduce((res, weight, weightIndex) => {
    res[weight] = rgbs.reduce((prev, v, i) => {
      prev += (v + inc[i].up * (weightIndex + 1)).toString(16);
      return prev;
    }, "#");
    return res;
  }, res);

  if (reverse) {
    [res[100], res[900]] = [res[900], res[100]];
    [res[200], res[800]] = [res[800], res[200]];
    [res[300], res[700]] = [res[700], res[300]];
    [res[400], res[600]] = [res[600], res[400]];
  }

  return res;
}
