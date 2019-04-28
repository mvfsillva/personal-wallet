const formatNumber = num => num.toString().padStart(2, '0')

const d = new Date()
const day = formatNumber(d.getDate())
const month = formatNumber(d.getMonth() + 1)
const year = formatNumber(d.getFullYear())
const hour = formatNumber(d.getHours())
const minute = formatNumber(d.getMinutes())
const second = formatNumber(d.getSeconds())

const utc = [year, month, day].join('-')
const ptBr = [day, month, year].join('/')
const time = [hour, minute, second].join(':')
const full = `${ptBr} ${time}`

const date = {
  utc,
  ptBr,
  time,
  full,
}

export default date
