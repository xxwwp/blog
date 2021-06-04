import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import Statex from "../models/Statex";
import mods from "../store";

/** 模块类型 */
type Mods = { [key: string]: Statex<any> };

/** 根状态 */
type RootState<R extends Mods> = {
  [Key in keyof R]: R[Key]["inistialState"];
};

/** 转化原始 action 为可执行类型 */
type ActionTrans<T> = T extends (s: any, payload: infer P, meta: infer M) => any
  ? (payload?: P, meta?: M) => void
  : () => void;

/** 分发器类型 */
type Dispatchs<T extends Mods> = {
  [Key in keyof T]: {
    [AKey in keyof T[Key]["actions"]]: ActionTrans<T[Key]["actions"][AKey]>;
  };
};

/** 上下文类型 */
type Context<R extends Mods> = [
  {
    [Key in keyof R]: R[Key]["inistialState"];
  },
  Dispatchs<R>
];

class Store<
  /** 状态模块 */
  M extends Mods = {},
  /** 状态 */
  S = RootState<M>
> {
  /** 分发器 */
  dispatchs: Dispatchs<M>;
  /** 状态值，依赖于外部的 useState */
  state: S;
  /** 状态设置方法，依赖于外部的 useState */
  setState: Dispatch<SetStateAction<S>>;
  /** 状态模块 */
  mods: M;
  /** 单例实例 */
  static instanse: Store;

  constructor(mods: M, state?: S, setState?: Dispatch<SetStateAction<S>>) {
    if (Store.instanse) {
      return Store.instanse as Store<M, S>;
    }

    this.mods = mods;
    this.state = state;
    this.setState = setState;
    this.dispatchs = this.createDispatchs();

    Store.instanse = this;
  }

  /**
   * 用来创建一个分发器，分发器是一个对象，其值哈希了各个模块的
   * @returns 返回一个分发器
   */
  private createDispatchs() {
    return {
      ...Object.keys(this.mods).reduce(
        (prev, mod) => ({
          ...prev,
          [mod]: Object.keys(this.mods[mod].actions).reduce(
            (prev, name) => ({
              ...prev,
              [name]: (payload) => {
                const resState = this.mods[mod].actions[name](this.state[mod], payload);
                this.setState({ ...this.state, [mod]: resState });
              },
            }),
            {}
          ),
        }),
        {} as Dispatchs<M>
      ),
    };
  }

  /** 创建模块的初始值 */
  static createInistialState<M extends Mods>(mods: M) {
    return Object.keys(mods).reduce((prev, key) => ({ ...prev, [key]: mods[key].inistialState }), {} as RootState<M>);
  }
}

/** 状态上下文 */
const Context = React.createContext<Context<typeof mods>>([] as any);

/**
 * 状态供应组件
 * @description 数据状态的提供者，会向下分发 [state,dispatchs]，其中 state 为注册模块的数据，dispatchs 为行为的分发器
 */
export function StoreProvider({ children }) {
  const [state, setState] = useState(useMemo(() => Store.createInistialState(mods), []));
  const [store] = useState(new Store(mods, state, setState));

  // 数据的分发托管到了 Store 类，Store 类的数据和分发依赖一个简单的 useState
  useEffect(() => {
    store.setState = setState;
    store.state = state;
  }, [state, setState]);

  return <Context.Provider value={[state, store.dispatchs]}>{children}</Context.Provider>;
}

/** 消费状态钩子 */
export function useStore() {
  return useContext(Context);
}
