import './App.scss'
import avatar from './images/bozai.png'
import avatar2 from './images/IMG_3445.JPG'
import avatar3 from './images/__original_drawn_by_ama_mitsuki__5af6796539d372d39894afcc25707fa7.png'
import avatar4 from './images/o_3d8cd2c44511cb1eafab60ebc1f36dab.jpg'
import {useEffect, useRef, useState} from "react";
import _ from 'lodash'
import classNames from "classnames";
import {v4 as uuidV4} from 'uuid'
import dayjs from "dayjs";
import axios from "axios";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论(仅能删除自己的)
 */
// 启动类修改index.js文件加载的组件即可

// 评论列表数据
const defaultList = [
    {
        // 评论id
        rpid: 3,
        // 用户信息
        user: {
            uid: '13258165',
            avatar: avatar2,
            uname: '周杰伦',
        },
        // 评论内容
        content: '哎哟，不错哦',
        // 评论时间
        ctime: '10-18 08:15',
        like: 173,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: avatar3,
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 4,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 12,
    },
    {
        rpid: 4,
        user: {
            uid: '83294322',
            avatar: avatar4,
            uname: '爱脱鞋的女子',
        },
        content: '不错不错啊，建议快点更新',
        ctime: '04-02 15:22',
        like: 700
    }
]
// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: '黑马前端',
}


/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    {type: 'hot', text: '最热'},
    {type: 'time', text: '最新'},
]

// 封装item组件
function Item({item,onDel}){
    return (<div key={item.rpid} className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img
                        className="bili-avatar-img"
                        alt=""
                        src={item.user.avatar}
                    />
                </div>
            </div>

            <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */}
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        {/* 评论时间 */}
                        <span className="reply-time">{item.ctime}</span>
                        {/* 评论数量 */}
                        <span className="reply-time">点赞数:{item.like}</span>
                        {/* 删除显示-条件渲染，拿到当前项id，以此id为条件对评论列表做过滤or直接讲将内容清空*/}
                        {user.uid === item.user.uid && <span className="delete-btn" onClick={()=> onDel(item.rpid)}
                                                            >
                                    删除
                                </span>}

                    </div>
                </div>
            </div>
        </div>
    )
}

// 自定义封装hook函数
function useGetList(){
    const [commentList, setCommentList] = useState([])
    useEffect(() => {
        // 请求数据
        async function getList() {
            // axios请求数据
            const res = await axios.get(" http://localhost:3004/list")
            setCommentList(res.data)
        }

        getList()
    }, [])
    return {
        commentList,setCommentList
    }
}

const App = () => {
    // 渲染评论列表
    // 1、使用useState维护列表(初始按照最热排序，因为106行指定默认tab为最热)
    // const [commentList, setCommentList] = useState(_.orderBy(defaultList,'like','desc'))
    // 从接口获取数据进行渲染
    const {commentList,setCommentList} = useGetList()

    // 删除评论
    const handleDel = (id) => {
        console.log(id)
        setCommentList(commentList.filter(item => item.rpid !== id))

    }
    // tab切换功能
    // 记录点击的type，遍历整个数组，记录的type命中时则高亮
    const [type, setType] = useState('hot')
    const handleChangeType = (type) => {
        console.log(type)
        setType(type)
        // 基于列表的排序，根据type类型排序，如果是最新(time)，按照时间；如果是最热(hot)，按照点赞数
        // 引入lodash（封装的js库)
        if (type === 'hot') {
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        }
        if (type === 'time') {
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }
    // 发表评论
    const [_content, setContent] = useState('')
    const inputRef = useRef(null)
    // 评论发布按钮回调函数
    const submit = () => {
        // 修改原有评论列表，提交后清空内容
        setCommentList([
            ...commentList,
            {
                // 生成随机id
                rpid: uuidV4(),
                user: {
                    uid: '347982423',
                    avatar: avatar4,
                    uname: '测试人员',
                },
                content: _content,
                ctime: dayjs(new Date()).format("MM-DD HH:mm"), // 格式化时间：月-日 时:分npm
                like: 49,
            }
        ])
        // 1、清空输入框内容
        setContent('')
        // 2、重新聚焦到输入框(domRef)
        inputRef.current.focus()

    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量,动态获取 */}
                        <span className="total-reply">{commentList.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {/*模板字符串，动态生成css样式*/}

                        {tabs.map(item => <span
                            key={item.type}

                            // className={`nav-item ${type === item.type && 'active'}`}
                            // 使用classNames简化 classNames(param,key:value)
                            // 参数——静态类名:要修改的类名，key:要修改的css类名 value:条件，为true时执行
                            className={classNames('nav-item', {active: type === item.type})}
                            onClick={() => handleChangeType(item.type)}>{item.text}</span>
                        )}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea value={_content} onChange={(event => setContent(event.target.value))}
                                  ref={inputRef}
                                  className="reply-box-textarea"
                                  placeholder="说点什么吧~~"
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={submit}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => <Item key={item.id} item={item} onDel={handleDel}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App