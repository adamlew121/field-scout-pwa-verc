/**
 * Warstwa dostępu do IndexedDB.
 * Zastępuje localStorage — dane przeżywają restart przeglądarki
 * i nie mają limitu pojemności 5MB.
 */
import { openDB } from 'idb'

const DB_NAME = 'field-scout'
const DB_VERSION = 1

let db = null

export function getDb() {
  if (!db) {
    db = openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        // Jeden object store na obserwacje terenowe
        const store = database.createObjectStore('logs', {
          keyPath: 'id',
          autoIncrement: true
        })
        // Indeks po czasie – do sortowania
        store.createIndex('time', 'time')
      }
    })
  }
  return db
}

export async function getLogs() {
  const db = await getDb()
  // Pobierz wszystkie wpisy posortowane od najnowszego
  const all = await db.getAll('logs')
  return all.reverse()
}

export async function addLog(log) {
  const db = await getDb()
  // Zwraca wygenerowane id
  return db.add('logs', log)
}

export async function deleteLog(id) {
  const db = await getDb()
  return db.delete('logs', id)
}
