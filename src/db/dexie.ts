import Dexie, { Table } from 'dexie';

export interface History {
  id?: number;
  cover: string;
  title: string;
  url: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  history!: Table<History>;

  constructor() {
    super('savetok');
    this.version(1).stores({
      history: '++id, cover, title, url', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
