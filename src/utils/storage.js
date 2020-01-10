
// 封装操作本地存储的工具方法模块儿

export const getItem = name => {
  const data = window.localStorage.getItem(name)

  try {
    //   尝试把data转为JavaScript对象
    // 如果转换成功 一定意味着数据是一个json格式的字符串
    // 如果data不是json格式字符串 那就失败 进入catch 返回原数据
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
