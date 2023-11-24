import { useFormik } from 'formik';
import { Button, Modal, ModalFooter } from 'reactstrap'
import * as Yup from 'yup';
import { api } from '../apis';

interface Values {
    title: string;
    description: string;
    _id: string;
}

interface IProps {
    setShowConfirm?: (showConfirm: boolean) => void;
    setLoading?: (isLoading: boolean) => void;
    showConfirm?: boolean;
    value: Values;
}

const ConfirmModal: React.FC<IProps> = ({ value, showConfirm, setShowConfirm, setLoading }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        onSubmit: async () => {
            try {
                const response = await api.deleteList(value._id);

                if (response.status === 200) {
                    setShowConfirm(false)
                    setLoading(true)
                } else {
                    // setFieldError('loginFail', 'Invalid username or password');
                }
            } catch (error) {
                // setFieldError('loginFail', 'Invalid username or password');
            }
        },
    });
    return (
        <>
            <Modal toggle={() => setShowConfirm(true)} isOpen={showConfirm}>
                <div className=" modal-header">
                    <h5 className=" modal-title" id="exampleModalLabel">
                        Want to delete {value.title} ?
                    </h5>
                    <button
                        aria-label="Close"
                        className="btn btn-default"
                        type="button"
                        onClick={() => setShowConfirm(false)}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <ModalFooter>
                    <Button
                        color="secondary"
                        type="button"
                        onClick={() => setShowConfirm(false)}
                    >
                        Close
                    </Button>
                    <Button color="primary" type="button" onClick={() => formik.handleSubmit()}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    )
}
export default ConfirmModal

