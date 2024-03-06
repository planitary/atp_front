import {useSelector,useDispatch} from "react-redux";
// 导入actionCreator
import {increment,decrement,addToNum,reduceToNum} from "./store/modules/counterStore";
import {useEffect} from "react";
import {fetchList} from "./store/modules/channelStore";
function ReduxApp(){
    const {count} = useSelector(state => state.counter)
    const {channelList} = useSelector(state => state.channel)
    const dispatch = useDispatch()
    // useEffect触发异步请求
    useEffect(() => {
        dispatch(fetchList())
    },[dispatch])
    return (
        <div className="App">
            <button onClick={() => dispatch(reduceToNum(10))}>reduce to 10 </button>
            <button onClick={() => dispatch(reduceToNum(20))}>reduce to 20 </button>
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addToNum(10))}> add to 10</button>
            <button onClick={() => dispatch(addToNum(20))}> add to 20</button>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}

export default ReduxApp