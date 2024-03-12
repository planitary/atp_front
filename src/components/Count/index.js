import './index.scss'

const Count = ({ onPlus, onMinus, count }) => {
  return (
    <div className="goods-count">
      <span className="minus" onClick={onMinus}/>
      <span className="count">{count}</span>
      <span className="plus" onClick={onPlus}/>
    </div>
  )
}

export default Count
