import classNames from 'classnames'
import './index.scss'
import dayjs from "dayjs";

const DailyBill = ({date,dailyList}) => {

    const pay = (dailyList || []).filter(item => item.money < 0).reduce((a, b) => a + b.money, 0)
    const income = (dailyList || []).filter(item => item.money >= 0).reduce((a,b) => a + b.money,0)
    const total = pay + income
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{dayjs(date).format("MM月DD日")}</span>
                    <span className={classNames('arrow')}/>
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
        </div>
    )
}
export default DailyBill