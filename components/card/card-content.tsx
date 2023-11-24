import { useState } from "react"
import ConfirmModal from "../modal/confirm-modal"
import ModalContent from "../modal/modal-content"
import { useRouter } from "next/router"

interface propsValue {
  createdAt: string,
  description: string,
  title: string,
  updatedAt: string,
  user_id: string,
  _id: string
}

interface Iprops {
  value: propsValue
  setLoading: (loading: boolean) => void
  select?: boolean;
  setSelectList?: any
}

const CardContent: React.FC<Iprops> = ({ value, setLoading, select, setSelectList }) => {
  const route = useRouter();
  const [showConfirm, setShowConfirm] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const dateObject = new Date(value.createdAt);
  const formattedDate = dateObject.toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();

  const { pathname } = route;

  return (
    <div className="card w-100">
      {select || pathname === '/done-task' ? <></> :
        <span>
          <div className='pt-1 pe-1 position-absolute top-0 end-0'
            onClick={() => {
              setShowConfirm(true)
            }}>
            <i className="bi bi-x" style={{ fontSize: 30 }}></i>
          </div>
        </span>
      }
      <div className="card-body d-flex justify-content-between" onClick={() => { select ? "" : setModalOpen(true) }}>
        <div className="col-8">
          <h5 className="card-title">{value.title}</h5>
          <p className="card-text">{value.description}</p>
        </div>
        <div className="flex-column col-2  align-self-center">
          {select ?
            <div className="d-flex justify-content-center text-center">
              <input type="checkbox" className="h-1vh" style={{ width: 30, height: 30 }} aria-label="Checkbox for following text input" onClick={() => setSelectList((prevList): any[] => [...prevList, value])} />
            </div>
            :
            <>
              <div>
                <h6>{formattedDate}</h6>
              </div>
              <div>
                <p>{hours}:{minutes}</p>
              </div>

            </>
          }

        </div>
      </div>
      <ModalContent setLoading={setLoading} modalOpen={modalOpen} setModalOpen={setModalOpen} value={value} pathname={pathname}/>
      <ConfirmModal value={value} showConfirm={showConfirm} setShowConfirm={setShowConfirm} setLoading={setLoading} />
    </div >
  )
}
export default CardContent
