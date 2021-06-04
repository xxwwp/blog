export declare namespace PersistentStorage {
  export type StorageType = "session" | "local";
}

/**
 * 持久储存数据
 */
export class PersistentStorage {
  static StorageName = "BLOG";

  static setItem(name, data, type: PersistentStorage.StorageType = "session") {
    // 服务器没有状态库
    if (process.env.IS_SERVER) return;

    // 根据储存类型获取数据
    const storage = type === "session" ? sessionStorage : localStorage;
    const srcData = JSON.parse(storage.getItem(this.StorageName) || "{}");
    const updatedAt = new Date().toString();

    // 更新数据
    const item = srcData[name] || { createdAt: updatedAt };
    item.data = data;
    item.uptatedAt = updatedAt;

    storage.setItem(this.StorageName, JSON.stringify({ ...srcData, [name]: data }));
  }

  /**
   * @description 参考 PersistentStorage.setItem
   */
  static getItem(name, type: PersistentStorage.StorageType = "session") {
    if (process.env.IS_SERVER) return null;

    const storage = type === "session" ? sessionStorage : localStorage;
    return JSON.parse(storage.getItem(this.StorageName) || "{}")[name];
  }

  static clear(type: PersistentStorage.StorageType | undefined) {
    const space = JSON.stringify({});
    if (type === undefined || type === "session") {
      sessionStorage.setItem(this.StorageName, space);
    }
    if (type === undefined || type === "local") {
      localStorage.setItem(this.StorageName, space);
    }
  }
}
