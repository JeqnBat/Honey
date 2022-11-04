import SoloStyles from './Solo.module.css'

const Solo = ({ shift }) => {
  return (
    <>
      {shift.dayAtWork ? <p>tu bosses</p> : <p>tu bosses pas</p>}
    </>
  )
}

export default Solo