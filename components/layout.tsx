import React, { useState } from "react"
import Footer from "./footer"
import Navbar from "./nav"
import { useStoreContext } from "./helper/StoreProvider"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const { setLoading, setSelect, select, selectList, setSelectList } = useStoreContext()
  return (
    <>
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div className="min-h-screen">{children}</div>
      <Footer setLoading={setLoading} setSelect={setSelect} select={select} selectList={selectList} setSelectList={setSelectList} />
    </>
  )
}
export default Layout
