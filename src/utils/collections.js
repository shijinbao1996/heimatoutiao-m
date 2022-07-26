import storage from './storage'

const GET_COLLECTIONS = 'HEIMA_TOUTIAO_GET_COLLECTIONS'

export const getCollections = () => storage.get(GET_COLLECTIONS)

export const setCollections = (id) => storage.set(GET_COLLECTIONS, id)

export const removeCollections = () => storage.remove(GET_COLLECTIONS)
