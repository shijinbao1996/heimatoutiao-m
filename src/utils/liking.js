import storage from './storage'

const GET_LIKINGS = 'HEIMA_TOUTIAO_GET_LIKINGS'

export const getLikings = () => storage.get(GET_LIKINGS)

export const setLikings = (id) => storage.set(GET_LIKINGS, id)

export const removeLikings = () => storage.remove(GET_LIKINGS)
