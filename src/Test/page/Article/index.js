import {useSearchParams} from "react-router-dom";
import {useParams} from "react-router-dom";

const Article = () => {
    // 拿到上一个路由的searchParam形式的传参
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    // 拿到上一个路由的param形式的传参
    const params = useParams()
    const id2 = params.id

    return <div>我是文章页,当前文章id:{id},作者:{name},另一个方式拿到的id为:{id2}</div>
}


export default Article