import classNames from 'classnames'
import './index.scss'
import dayjs from "dayjs";
import {billListData, billTypeToName} from "../../../BillContents";
import {useState} from "react";
import Icon from "../../Components/Icon"

const DailyBill = ({date, dailyList}) => {
    // 控制列表的显示
    const [billVisible, setBillVisible] = useState(false);
    // 默认状态隐藏


    const pay = (dailyList || []).filter(item => item.money < 0).reduce((a, b) => a + b.money, 0)
    const income = (dailyList || []).filter(item => item.money >= 0).reduce((a, b) => a + b.money, 0)
    const total = pay + income
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{dayjs(date).format("MM月DD日")}</span>
                    <span className={billVisible ? "arrow expand" : "arrow"}
                          onClick={() => setBillVisible(!billVisible)}/>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            {/*通过billVisible的状态来控制billList这个div的展示，最外层再用div来控制语句
            类似于: <div>
            {billVisible?<div>xxx</div>:'null'>
            </div>
            */}
            {/*或者通过控制style样式来操作div的展示和隐藏*/}

            <div className={"billList"} style={{display: billVisible ? 'block' : 'none'}}>
                {dailyList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            {/*渲染图标*/}
                            <Icon type={item.useFor}/>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill