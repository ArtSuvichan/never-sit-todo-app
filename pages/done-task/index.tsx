
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useStoreContext } from '../../components/helper/StoreProvider'
import { useEffect, useState } from 'react'
import { api } from '../../components/apis'
import CardContent from '../../components/card/card-content'
import SEO from '../../components/seo'

const DoneTask: NextPage = () => {
    const route = useRouter()
    const { loading, setLoading } = useStoreContext()
    const [list, setList] = useState([])

    useEffect(() => {
        setLoading(true)
    }, [])
    useEffect(() => {
        if (loading) {
            handleLoad();
        }
    }, [loading])

    const handleLoad = async () => {
        const res = await api.getAllTodoList();
        if (res.status === 200) {
            setList(res?.data)
        }
        setLoading(false)
    }
    return (
        <div>
            <SEO title="Done Task page" description="See your todo successfully list" />
            <main className="vh-100 d-flex justify-content-center align-items-center flex-column">
                <div className=''><h1>Done Task</h1></div>
                <div className='container d-flex flex-column'>
                    <div className='position-relative overflow-y-scroll hind-scorll-bar pb-5' style={{
                        width: '100%',
                        height: "80vh"
                    }}>
                        {loading ?
                            <div className='text-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> :
                            list.map((value, index) =>
                                <div className='row w-100 mb-3' style={{ marginLeft: '1px' }} key={index}>
                                    <CardContent value={value} setLoading={setLoading} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='position-absolute top-0 start-0 m-5' onClick={() => {
                    route.push('/main-page')
                    setLoading(true)
                }}>
                    <i className="bi bi-arrow-left" style={{ fontSize: 40 }}></i>
                </div>
            </main>
        </div>
    )
}

export default DoneTask