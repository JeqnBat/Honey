Date.prototype.getWeek =  function() {
  const janFirst = new Date(this.getFullYear(),0,1)

  let firstMonday
  for (let i = 0; i < 6; i++) {
    // Sunday - Saturday : 0 - 6 => Monday[1]
    if (janFirst.getDate()+i === 1) {
      firstMonday = janFirst.setDate(janFirst.getDate()+i)
    }
  }

  const today = new Date(this.getFullYear(),this.getMonth(),this.getDate())
  const dayOfYear = ((today - firstMonday + 86400000)/86400000)
  return Math.ceil(dayOfYear/7)
}

const today = new Date()
const weekNb = today.getWeek()

/* 2. COLUMN PARSER
________________________________________________________ */
/**
 * <B>DESCR:</B>
 * 
 * 
 */
const columnParser = (table, cell) => {
  let column = []
  for (let i = 1; i < 199; i++) {
    console.log(table.Sheets[`S${weekNb}`][cell+i])
  }
  return column
}

export { weekNb, columnParser }