import {NavBar, DatePicker} from "antd-mobile";
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";
import DailyBill from "./DayBill";


const Month = () => {
    // 按月做数据分组,1.拿到数据 2.useMemo二次处理 3.lodash按月分组
    const billList = useSelector(state => state.bill.billList)
    const monthRes = useMemo(() => {
        // return计算后的值,lodash的groupBy函数，第一个参数为源数据，第二个参数为分组规则
        return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY年 | MM月"))
    }, [billList])
    console.log(monthRes)
    // 控制弹框的打开和关闭
    const [dateVisible, setDateVisible] = useState(false);


    // 控制时间显示，初始值为档当前时间
    const [currentDate, setCurrentDate] = useState(() => {
        return new Date()
    });

    // 用于计算的中间数组，保存当前月份的数据
    const [currentMonthList, setCurrentMonthList] = useState([])
    // 计算
    const res = useMemo(() => {
        // 支出
        console.log("currentMonthList:" ,currentMonthList)
        // 避免currentMonthList为undefined的时候调用filter报错，当数组为undefined时，赋值为空数组
        const pay = (currentMonthList || []).filter(item => item.money < 0).reduce((a, b) => a + b.money, 0)
        // 收入
        const income = (currentMonthList || []).filter(item => item.money > 0).reduce((a, b) => a + b.money, 0)
        // 结余 total
        return {pay, income, total: pay + income}
    }, [currentMonthList])

    // 钩子函数，初始化页面，已进入页面就将当前月份的统计数据渲染到页面
    useEffect(() => {
        // 当前时间
        const currentDate = dayjs().format("YYYY年 | MM月");
        // 边界值，由于monthRes的取值来自异步，一开始为空
        if (monthRes[currentDate]) {
            setCurrentMonthList(monthRes[currentDate]);
        }
    }, [monthRes])

    const onConfirm = (date) => {
        setDateVisible(false)
        //注意后面在获取月份的时候需要+1
        setCurrentDate(date)
        // 格式化年月日，取值聚合计算时需要
        const parseDate = dayjs(date).format("YYYY年 | MM月")
        setCurrentMonthList(monthRes[parseDate])
    }

    // 当前月份的数据按日分组
    const dailyRes = useMemo(() => {
        if (typeof currentMonthList === 'undefined'){
            setCurrentMonthList([])
        }
        const groupByDay = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
        // 日期是一个key，通过Object.keys拿到每一项的日期
        const dailyKey = Object.keys(groupByDay)
        return {groupByDay, dailyKey}
    }, [currentMonthList])

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate.getFullYear()}年 | {currentDate.getMonth() + 1}月账单
            </span>
                        {/*弹框状态决定箭头方向 arrow expand朝下 arrow朝上*/}
                        <span className={dateVisible ? 'arrow expand' : 'arrow'}/>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{res.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{res.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{res.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        // 如果设置了onClose,则不需要单独设置onCancel,onConfirm默认会关闭控件，不需要单独指定
                        // onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
                {/*    单日列表统计*/}
                {dailyRes.dailyKey.map(key => {
                    return <DailyBill key={key} date={key} dailyList={dailyRes.groupByDay[key]}/>
                })}
            </div>
        </div>
    )
}

export default Month