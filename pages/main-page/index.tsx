
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { api } from '../../components/apis';
import CardContent from '../../components/card/card-content';
import { useStoreContext } from '../../components/helper/StoreProvider';
import SEO from '../../components/seo';

const MainPage: NextPage = () => {
    const { loading, setLoading, select, setSelectList } = useStoreContext()
    const [list, setList] = useState([])

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
            <SEO title="Todo List Home Page" description="Wellcome to home page" />
            <main>
                <div className='container vh-100 d-flex justify-content-center align-items-center position-relative flex-column'>
                    <div className='top-0 mt-5'><h1>TODO</h1></div>
                    <div className='position-relative h-75 overflow-y-scroll hind-scorll-bar pb-5' style={{
                        width: '100%',
                    }}>
                        {loading ?
                            <div className='text-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            list.map((value, index) =>
                                <div className='row w-100 mb-3' style={{ marginLeft: '1px' }} key={index}>
                                    <CardContent value={value} setLoading={setLoading} select={select} setSelectList={setSelectList} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MainPage