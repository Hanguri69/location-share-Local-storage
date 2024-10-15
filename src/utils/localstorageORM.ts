import { Tables } from "../lib/tablesType";

export class LocalStorageORM {
  private static instance: LocalStorageORM;

  public static getInstance(): LocalStorageORM {
    if (!LocalStorageORM.instance) {
      LocalStorageORM.instance = new LocalStorageORM();
    }
    return LocalStorageORM.instance;
  }

  public from<T extends keyof Tables>(tableName: T): LocalStorageORMWithFrom<T> {
    return new LocalStorageORMWithFrom(tableName);
  }
}

export class LocalStorageORMWithFrom<T extends keyof Tables> {
  public constructor(tableName: T) {
    this.tableName = tableName;
    if (!localStorage.getItem(this.tableName)) {
      localStorage.setItem(this.tableName, JSON.stringify([]));
    }
  }

  private tableName: T;

  private _getTableData(): Tables[T][] {
    return JSON.parse(localStorage.getItem(this.tableName)!) || [];
  }

  private _setTableData(data: Tables[T][]) {
    localStorage.setItem(this.tableName, JSON.stringify(data));
  }

  private _getNextId(): number {
    const tableData = this._getTableData();
    if (tableData.length === 0) {
      return 0;
    }
    const maxId = Math.max(...tableData.map((record) => record.id));
    return maxId + 1;
  }

  public insert(record: Omit<Tables[T], "id">): Tables[T] {
    const tableData = this._getTableData();
    const newRecord = { ...record, id: this._getNextId() } as Tables[T];
    tableData.push(newRecord);
    this._setTableData(tableData);
    return newRecord;
  }

  public select(condition: (record: Tables[T]) => boolean = () => true): Tables[T][] {
    const tableData = this._getTableData();
    return tableData.filter(condition);
  }

  public update(
    condition: (record: Tables[T]) => boolean,
    changes: Partial<Omit<Tables[T], "id">>
  ) {
    let tableData = this._getTableData();
    tableData = tableData.map((record) => {
      if (condition(record)) {
        return { ...record, ...changes, id: record.id };
      }
      return record;
    });
    this._setTableData(tableData);
  }

  public delete(condition: (record: Tables[T]) => boolean) {
    const tableData = this._getTableData();
    const filteredData = tableData.filter((record) => !condition(record));
    this._setTableData(filteredData);
  }

  // private clear() {
  //   this._setTableData([]);
  // }
}
