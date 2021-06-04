import Statex from "../models/Statex";
import { PersistentStorage } from "../utils/PersistentStorage";

interface State {
  viewed: {
    [id: string]: boolean;
  };
}

export default class Article extends Statex<State> {
  name = "Article" as const;

  inistialState = {
    viewed: PersistentStorage.getItem("Article", "session") || {},
  } as const;

  actions = {
    // 设置一篇文章在本次会话期间已经观看过
    viewed({ viewed, ...rest }: State, id: string) {
      const newViewed = { ...viewed, [id]: true };

      PersistentStorage.setItem("Article", newViewed, "session");

      return {
        ...rest,
        viewed: newViewed,
      };
    },
  } as const;
}
