import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import * as Yup from 'yup';
import { api } from '../apis';

interface Values {
  title: string;
  description: string;
  _id?: string;
}

interface IProps {
  setModalOpen?: (modalOpen: boolean) => void;
  setLoading?: (loading: boolean) => void;
  modalOpen?: boolean;
  value?: Values
  pathname?: string
}

const ModalContent: React.FC<IProps> = ({ setLoading, modalOpen, setModalOpen, value, pathname }) => {

  const [valueForm, setFormValue] = useState<Values>({
    title: '',
    description: '',
    _id: undefined
  })

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required('กรุณาใส่หัวข้อ'),
    description: Yup.string()
      .required('กรุณากรอกคำอธิบาย'),
  });

  useEffect(() => {
    if (!!value && modalOpen) {
      getData();
    }
  }, [modalOpen])

  const getData = async () => {
    const response = await api.getOneTodoList(value._id);
    if (response.status === 200) {
      const { data } = response;
      setFormValue({ title: data.title, description: data.description, _id: data._id })
    }
  }

  const formik = useFormik({
    initialValues: valueForm,
    enableReinitialize: true,
    validationSchema: SignupSchema,
    onSubmit: async (values: any, { setSubmitting, setFieldError }) => {
      try {
        // Simulate API call for authentication
        let response
        if (!!values._id) {
          response = await api.updateList(valueForm._id, values);
        } else {
          response = await api.createList(values);
        }
        if (response.status === 200) {
          setModalOpen(false)
          setLoading(true)
        } else {
          setFieldError('loginFail', 'Invalid username or password');
        }
      } catch (error) {
        setFieldError('loginFail', 'Invalid username or password');
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <Modal toggle={() => setModalOpen(true)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">

            {!!valueForm._id ? `Update TODO List` : ` Create new TODO List`}
          </h5>
          <button
            aria-label="Close"
            className="btn btn-default"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <FormikProvider value={formik}>
            <Form>
              <Field
                className="form-control mb-3"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                disabled={pathname === '/done-task' ? true : false}
              />
              <ErrorMessage className='formik-error-message' name="title" component="div" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
              <Field
                className="form-control  my-3"
                type="description"
                id="description"
                name="description"
                as="textarea"
                rows="4"
                cols="50"
                placeholder="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                disabled={pathname === '/done-task' ? true : false}
              />
              <ErrorMessage className='formik-error-message' name="description" component="div" >{msg => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
            </Form>
          </FormikProvider>
        </ModalBody>
        <ModalFooter>
          {pathname !== '/done-task' ?
            <>
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  setModalOpen(false);
                }}
              >
                Close
              </Button>
              <Button color="primary" type="button" onClick={() => formik.handleSubmit()}>
                {!!valueForm._id ? `Update` : `Create`}
              </Button>
              {!!valueForm._id &&
                <Button color="success" type="button" onClick={() => alert(JSON.stringify(value._id))}>
                  Done
                </Button>
              }
            </>
            :
            <Button
              color="success"
              type="button"
              onClick={() => {
                formik.resetForm();
                setModalOpen(false);
              }}
            >
              Done
            </Button>
          }


        </ModalFooter>
      </Modal >
    </>
  )
}
export default ModalContent

