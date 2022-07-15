class Storage {
  // localStorage.setItem
  // localStorage.setItem('HEIMA_TOUTIAO_TOKEN', JSON.stringify)
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get(key) {
    // 11如果parse是一个JSON格式字符串, JSON.parse
    // 不是呢? return
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
export default storage
