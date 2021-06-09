import Statex from "../models/Statex";

type State = {
  name: string;
  description: string;
  keywords: string[];
};
type S = State;

export default class Site extends Statex<S> {
  name = "Site" as const;

  inistialState = {
    name: "玄晓乌屋",
    description: "晓乌屋的日志记录，二次元、学习、程序、日志。",
    keywords: ["玄晓乌屋", "博客", "个人网站", "xxwwp"],
  };

  actions = {} as const;
}
