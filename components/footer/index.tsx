import { useEffect, useState } from "react";
import ModalContent from "../modal/modal-content";
import { Button } from 'reactstrap'
import { useRouter } from "next/router";
import { useStoreContext } from "../helper/StoreProvider";

interface Iprops {
    setLoading?: (loading: boolean) => void;
    setSelect?: (select: boolean) => void;
    select?: boolean;
    selectList?: any[];
    setSelectList?: (selectList: any[]) => void
}
const Footer: React.FC<Iprops> = ({ setLoading, setSelect, select, selectList, setSelectList }) => {
    const route = useRouter();
    const { setDoneList } = useStoreContext()
    const [modalOpen, setModalOpen] = useState(false)
    const [page, setPage] = useState<string>('')

    useEffect(() => {
        if (route) {
            setPage(route.pathname)
        }
    }, [route])

    return (
        page === '/done-task' ? <></> :
            <div className="w-100 text-center position-absolute bottom-0"
                style={{
                    backgroundImage: "linear-gradient(0deg, rgba(255,255,255,1) 53%, rgba(255,255,255,0) 100%)",
                    paddingTop: "40px"
                }}>
                {page === '/main-page' &&
                    <>
                        <div className="row pt-3 pb-3">
                            <div className="col">
                                <Button
                                    className="rounded-circle"
                                    style={{
                                        border: 'none',
                                        background: " rgb(99,34,195)",
                                        backgroundImage: "linear-gradient(34deg, rgba(99,34,195,1) 0%, rgba(163,39,213,1) 41%, rgba(253,45,238,1) 95%)"
                                    }}
                                    type="button"
                                    onClick={() => {
                                        setSelect(!select)
                                        setSelectList([])
                                    }}
                                >
                                    {select ? <i className="bi bi-x" style={{ fontSize: 40 }}></i> : <i className="bi bi-check" style={{ fontSize: 40 }}></i>}
                                </Button>
                            </div>
                            {select ? <div className="col">
                                <Button
                                    className="rounded-circle"
                                    color="primary"
                                    type="button"
                                    onClick={() => {
                                        setSelect(false)
                                        setDoneList(selectList)
                                    }}
                                >
                                    <i className="bi bi-check-all" style={{ fontSize: 40 }}></i>
                                </Button>
                            </div> :
                                <>
                                    <div className="col">
                                        <Button
                                            className="rounded-circle"
                                            style={{ background: 'white', border: '1px solid gray' }}
                                            type="button"
                                            onClick={async () => {
                                                await route.push('/calendar-page')
                                                await setLoading(true)
                                            }}
                                        >
                                            <i className="bi bi-calendar4" style={{ fontSize: 40, color: 'red' }}></i>
                                        </Button>

                                    </div>
                                    <div className="col">
                                        <Button
                                            className="rounded-circle"
                                            style={{
                                                border: 'none',
                                                background: "rgb(5,191,255)",
                                                backgroundImage: " linear-gradient(40deg, rgba(5,56,255,1) 0%, rgba(26,254,247,1) 100%)"
                                            }}
                                            type="button"
                                            onClick={() => setModalOpen(!modalOpen)}
                                        >
                                            <i className="bi bi-plus" style={{ fontSize: 40 }}></i>
                                        </Button>
                                    </div>
                                </>
                            }
                        </div>
                    </>
                }

                {page === '/calendar-page' && <>
                    <div className="row  pt-3 pb-3">
                        <div className="col">
                            <Button
                                className="rounded-circle"
                                style={{
                                    border: 'none',
                                    background: " rgb(99,34,195)",
                                    backgroundImage: "linear-gradient(34deg, rgba(99,34,195,1) 0%, rgba(163,39,213,1) 41%, rgba(253,45,238,1) 95%)"
                                }}
                                type="button"
                                onClick={() => {
                                    route.push('/main-page');
                                    setLoading(true);
                                }}
                            >
                                <i className="bi bi-check" style={{ fontSize: 40 }}></i>
                            </Button>
                        </div>
                        <div className="col">
                            <Button
                                className="rounded-circle bg-white"
                                type="button"
                                onClick={() => {
                                    route.push('/main-page');
                                    setLoading(true);
                                }}
                            >
                                <i className="bi bi-list" style={{ fontSize: 40, color: "red" }}></i>
                            </Button>
                        </div>
                        <div className="col">
                            <Button
                                className="rounded-circle"
                                type="button"
                                onClick={() => setModalOpen(!modalOpen)}
                                style={{
                                    border: 'none',
                                    background: "rgb(5,191,255)",
                                    backgroundImage: " linear-gradient(40deg, rgba(5,56,255,1) 0%, rgba(26,254,247,1) 100%)"
                                }}
                            >
                                <i className="bi bi-plus" style={{ fontSize: 40 }}></i>
                            </Button>
                        </div>
                    </div>
                </>}
                {page === '/done-task' && <></>}

                <ModalContent setLoading={setLoading} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>

    )
}
export default Footer