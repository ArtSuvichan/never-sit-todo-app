import { Field, Form, ErrorMessage, useFormik, FormikProvider } from 'formik';
import styles from './login-form.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';
import * as Yup from 'yup';
import { api } from '../apis';
import { useStoreContext } from '../helper/StoreProvider';
import { useMyContext } from '../helper/AuthProvider';

interface Values {
    username: string;
    password: string;
    loginFail?: string;
}

export default function LoginForm() {
    const router = useRouter();
    const { setToken } = useMyContext()
    const { setLoading } = useStoreContext()

    const SignupSchema = Yup.object().shape({
        username: Yup.string().email('รูปแบบเมลล์ไม่ถูกต้อง').required('กรุณาใส่ username'),
        password: Yup.string()
            .min(8, 'รหัสผ่านสั้นเกินไป')
            .required('กรุณาใส่ password'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async (values: Values, { setSubmitting, setFieldError }) => {
            // Simulate API call for authentication
            try {
                // Simulate API call for authentication
                const response = await api.login(values);

                if (response.status === 200) {
                    // Redirect to the dashboard page after successful login
                    setLoading(true)
                    setToken(response?.data?.token)
                    localStorage.setItem('session', response?.data?.token)
                    await router.push('/main-page');
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
        <div className={styles.login_box + ' p-3'}>
            <h1 className="display-6 mb-3 text-center">Login</h1>
            <FormikProvider value={formik}>
                <Form>
                    <div className="container">
                        <div className="row mb-3">
                            <div className="col-12 mb-3">
                                <Field
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                            </div>
                            <div className="col-12">
                                <ErrorMessage className='formik-error-message' name="username" component="div" >{msg => <div className={styles.formik_error_message}>{msg}</div>}</ErrorMessage>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 mb-3">
                                <Field
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>
                            <div className="col-12">
                                <ErrorMessage className='formik-error-message' name="password" component="div">{msg => <div className={styles.formik_error_message}>{msg}</div>}</ErrorMessage>
                                {formik.errors?.loginFail && <div className={styles.formik_error_message}>{formik.errors?.loginFail}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="mb-3 text-center col-12">
                                <button type="submit" className="btn btn-primary text-center" disabled={formik.isSubmitting}>Login</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </FormikProvider>

        </div>
    );
};