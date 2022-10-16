import LoadingStyles from './Loading.module.css'

const Loading = () => {
  return (
    <div id={LoadingStyles.screen}>
      <p>Chargement</p>
      <div id={LoadingStyles.loadingDots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  )
}

export default Loading