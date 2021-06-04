import Statex from "../models/Statex";

type State = {
  keywords: string[];
};
type S = State;

export default class Site extends Statex<S> {
  name = "Theme" as const;

  inistialState = {
    keywords: ["玄晓乌屋", "博客", "个人网站", "xxww"],
  };

  actions = {} as const;
}
