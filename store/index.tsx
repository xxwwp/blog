import Statex from "../models/Statex";
import Article from "./Article";
import Site from "./Site";

type SSystem = Readonly<{}>;

class System extends Statex<SSystem> {
  name = "system" as const;
  inistialState = {} as const;
  actions = {} as const;
}

const mods = {
  system: new System(),
  article: new Article(),
  site: new Site(),
};

export default mods;
