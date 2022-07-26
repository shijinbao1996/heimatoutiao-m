import storage from './storage'

const GET_FOLLOWS = 'HEIMA_TOUTIAO_FOLLOWS'

export const getFollows = () => storage.get(GET_FOLLOWS)

export const setFollows = (id) => storage.set(GET_FOLLOWS, id)

export const removeFollows = () => storage.remove(GET_FOLLOWS)
