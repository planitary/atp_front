import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {itemMinus,itemPlus} from "../../meituan-store/modules/takeaway";
import {cartClear} from "../../meituan-store/modules/takeaway";
import {useState} from "react";

const Cart = () => {
    const {cartList} = useSelector(state => state.foods)

    const dispatch = useDispatch()
    // 计算总价
    const totalPrice = cartList.reduce((a,c) => a + c.price * c.count,0)

    // 便利购物车中的count值，累加商品数量
    const totalCount = cartList.reduce((a,b) => a + b.count,0)
    // 写法二
    // function getTotal(carList){
    //     let total = 0
    //     carList.forEach(item => {
    //         total += item.count
    //     })
    //     return total
    // }
    // 状体控制，点击蒙层隐藏购物车
    const [visible,setVisible] = useState(false)
    function visibleWithTrue(){
        if (totalCount > 0){
            setVisible(true)
        }
    }
    return (
        <div className="cartContainer">
            {/* 遮罩层 添加visible类名可以显示出来 */}
            <div onClick={() => setVisible(false)}
                className={classNames('cartOverlay', visible && 'visible')}
            />
            <div className="cart">
                {/* fill 添加fill类名可以切换购物车状态*/}
                {/* 购物车数量 */}
                <div  onClick={() => visibleWithTrue()} className={classNames('icon',totalCount > 0 && 'fill')}>
                    {totalCount > 0 && <div className="cartCornerMark">{totalCount}</div>}
                </div>
                {/* 购物车价格 */}
                <div className="main">
                    <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
                {totalPrice}
            </span>
                    </div>
                    <span className="text">预估另需配送费 ¥5</span>
                </div>
                {/* 结算 or 起送 */}
                {totalCount > 0  ? (
                    <div className="goToPreview">去结算</div>
                ) : (
                    <div className="minFee">¥20起送</div>
                )}
            </div>
            {/* 添加visible类名 div会显示出来 */}
            <div className={classNames('cartPanel',visible && 'visible')}>
                <div className="header">
                    <span className="text">购物车</span>
                    <span className="clearCart" onClick={() => dispatch(cartClear())} >
            清空购物车
          </span>
                </div>

                {/* 购物车列表 */}
                <div className="scrollArea">
                    {cartList.map(item => {
                        return (
                            <div className="cartItem" key={item.id}>
                                <img className="shopPic" src={item.picture} alt=""/>
                                <div className="main">
                                    <div className="skuInfo">
                                        <div className="name">{item.name}</div>
                                    </div>
                                    <div className="payableAmount">
                                        <span className="yuan">¥</span>
                                        <span className="price">{item.price}</span>
                                    </div>
                                </div>
                                <div className="skuBtnWrapper btnGroup">
                                    <Count
                                        count={item.count}
                                        onPlus={() => dispatch(itemPlus({id: item.id}))}
                                        onMinus={() => dispatch(itemMinus({id:item.id}))}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cart
