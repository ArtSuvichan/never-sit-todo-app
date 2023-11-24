
import { useRouter } from 'next/router'
import { useStoreContext } from '../../components/helper/StoreProvider'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react'
import CardContent from '../../components/card/card-content'
import { api } from '../../components/apis'
import SEO from '../../components/seo'

interface IProps {
    date?: string
}

const CalendarPage: React.FC<IProps> = () => {
    const route = useRouter()
    const { loading, setLoading, select, setSelectList } = useStoreContext()
    const [date, setDate] = useState(new Date())
    const [list, setList] = useState([])

    useEffect(() => {
        if (!!date) {
            setLoading(true)
        }
    }, [date])
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
            <SEO title="Calendar Page" description="See your todo list of the day!" />
            <main className="vh-100 d-flex align-items-center flex-column">
                <div className='top-0 mt-5'><h1>Calendar</h1></div>
                <div className='container d-flex flex-column my-5'>
                    <div className='row mb-5'>
                        <div className="col">
                            <DatePicker
                                id="selectedDate"
                                name="selectedDate"
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col">
                            <div className='position-relative h-75 overflow-y-scroll hind-scorll-bar' style={{
                                width: '100%',
                            }}>
                                {loading ?
                                    <div className='text-center'>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div> :
                                    list.map((value, index) =>
                                        <div className='row w-100 mb-3' style={{ marginLeft: '1px' }} key={index}>
                                            <CardContent value={value} setLoading={setLoading} select={select} setSelectList={setSelectList} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CalendarPage