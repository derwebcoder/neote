import { app } from "electron"
import path from "node:path";
import fs from "node:fs";
import { defaultStorage, storageAtom } from "../state/storage";
import { Settings, Storage } from "../types/storage";

const FILE_NAME = 'storage.json'

export const loadStorage = () => {
  const userDataPath = app.getPath('userData')
  const storagePath = path.join(userDataPath, FILE_NAME)
  let storage = ''
  try {
    storage = fs.readFileSync(storagePath, 'utf8')
  } catch (error) {
    console.info('No storage file found, using empty storage.')
  }

  if (!storage || storage.trim() === '') {
    storageAtom.set(defaultStorage)
    return
  }

  try {
    const parsedStorage = JSON.parse(storage)
    storageAtom.set(parsedStorage)
  } catch (error) {
    console.info('Invalid storage file, using empty storage.')
    storageAtom.set(defaultStorage)
  }
}

export const saveStorage = (storage: Storage) => {
  storageAtom.set(storage)

  const userDataPath = app.getPath('userData')
  const storagePath = path.join(userDataPath, FILE_NAME)
  fs.writeFile(storagePath, JSON.stringify(storage, null, 2), {flag: 'w+'}, (err) => {
    if (err) {
      console.error('Error saving storage', err)
    }
  })
}

export const getStorage = () => {
  return storageAtom.get()
}

export const getSettings = () => {
  return storageAtom.get().settings
}

export const setSettings = (settings: Settings) => {
  const storage = storageAtom.get()
  storage.settings = settings
  saveStorage(storage)
}