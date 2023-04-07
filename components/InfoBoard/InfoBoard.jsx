import { useStoreState, useStoreActions } from 'easy-peasy'
import WeeksList from './WeeksList/WeeksList'
import Menu from './Menu/Menu'
import UploadFail from './UploadFail/UploadFail'
import Success from './Success/Success'
import InfoBoardStyles from './InfoBoard.module.css'

const InfoBoard = () => {
  const { active, source, success, error } = useStoreState(state => ({ 
    active: state.overlayActive,
    source: state.overlaySource,
    error: state.error,
    success: state.success
  }))
  const { setState } = useStoreActions(actions => ({ setState: actions.setState }))

  const handleClick = (e) => {
    if (e.target.nodeName.toLowerCase() !== 'span') {
      setState({ overlayActive : false })
    }
  }

  return (
    <nav 
      id={InfoBoardStyles.wrapper}
      onClick={handleClick}
      className={active ? InfoBoardStyles.active : ''}
    >
      <div id={InfoBoardStyles.board}>
        {(() => {
          switch (source) {
            case 'WeekPicker':
              return <WeeksList />
            case 'Kebab':
              return <Menu />
            case 'upload success':
              return <Success msg={success} />
            case 'upload fil':
              return <UploadFail msg={error} />
            default:
              return <p>Woops</p>
          }
        })()}
      </div>
    </nav>
  )
}

export default InfoBoard