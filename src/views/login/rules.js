export const mobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern: /^1[0-9]\d{9}$/,
    message: '手机号格式错误'
  }
]

export const codeRules = [
  { required: true, message: '请输入验证码' },
  {
    pattern: /[0-9]{6}/,
    message: '验证码格式错误'
  }
]
