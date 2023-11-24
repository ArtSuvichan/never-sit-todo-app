import React from 'react';
import styles from './nav.module.css';
import { useRouter } from 'next/router';
import { useMyContext } from '../helper/AuthProvider';
import { useStoreContext } from '../helper/StoreProvider';

interface IProps {
    showNav: boolean;
    setShowNav: (showNav: boolean) => void
}
const Navbar: React.FC<IProps> = ({ showNav, setShowNav }) => {
    const route = useRouter();
    const { token, setToken } = useMyContext();
    const { setLoading } = useStoreContext()

    const toggleNavbar = () => {
        setShowNav(!showNav);
    };

    return (<>
        <div className=' position-absolute top-0 end-0 m-5' style={{ zIndex: 100 }}>
            {!!token ?
                <button className='btn btn-link'
                    onClick={() => {
                        setShowNav(true);
                    }}>
                    <i className="bi bi-three-dots-vertical" style={{ fontSize: 40, color: 'black' }}></i>
                </button> : <></>}

        </div>
        <nav className={`${styles.navbar} ${showNav ? styles.active : 'd-none'}`}>
            <button className={styles.toggleButton} onClick={toggleNavbar}>
                <i className="bi bi-x" style={{ fontSize: 40 }}></i>
            </button>
            <ul className={styles.navList}>
                <li onClick={async () => {
                    await setShowNav(false)
                    await setLoading(true)
                    await route.push('/done-task')
                }}>
                    Done Task
                </li>
                <li onClick={async () => {
                    await setShowNav(false)
                    await setLoading(true)
                    await route.push('/extar-page')
                }}>
                    Extra Point
                </li>
                <li onClick={async () => {
                    await localStorage.removeItem('session')
                    await setToken(undefined)
                    await setShowNav(false)
                    await route.push('/login-page')
                }}>
                    logout
                </li>
            </ul>
        </nav>
    </>

    );
};

export default Navbar;