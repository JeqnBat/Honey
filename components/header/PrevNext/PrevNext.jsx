import PrevNextStyles from './PrevNext.module.css'

const PrevNext = () => {
  let previous, next, weekNb
  return (
    <div id={PrevNextStyles.week}>
    <span onClick={previous}>‹</span> 
    <span>semaine</span>
    <span>#{weekNb}</span>
    <span onClick={next}>›</span>
  </div>
  )
}

export default PrevNext