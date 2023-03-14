import HomeGridStyles from './HomeGrid.module.css'

const AllTeam = ({ names, event}) => {
  return (
    <>
      <div id={HomeGridStyles.pick}>
        {names.map(el => (
          el.shift.dayAtWork ?
          <div
            key={el.index}
            data={el.index}
            name={el.name}
            className={[el.shift.morning ? HomeGridStyles.morning : HomeGridStyles.eve, HomeGridStyles.details].join(' ')}
            onClick={event}
          >
            <div className='spacinho'></div>
            <h3>{el.name}</h3>
            <h4>{el.shift.starts} - {el.shift.ends}</h4>
          </div>
          :
          <div className='hide' key={el.index}></div>
        ))}
      </div>
    </>
  )
}

export default AllTeam