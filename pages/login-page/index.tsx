
import type { NextPage } from 'next'
import LoginForm from '../../components/login-form'
import SEO from '../../components/seo'

const Home: NextPage = () => {
    return (
        <div>
           <SEO title="Login to TODO List" description="login to process with todo list" />
            <main className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'linear-gradient(141deg, rgb(159, 184, 173) 0%, rgb(31, 200, 219) 51%, rgb(44, 181, 232) 75%)' }}>
                <LoginForm />
            </main>
        </div>
    )
}

export default Home