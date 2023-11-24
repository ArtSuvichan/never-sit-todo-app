import moment from "moment";
import { useEffect, useState } from "react";
import SEO from "../../components/seo";

const ExtarPoint = () => {
    const [list, setList] = useState([])
    const columns = [
        { "key": "id", "name": "" },
        { "key": "no", "name": "No." },
        { "key": "title", "name": "Title" },
        { "key": "desc", "name": "Description" },
        { "key": "date", "name": "Created Date" }
    ]


    const data = [
        ["f22ecad5-cbb6-402b-995f-6867792bc9c6", 1, "Job 1", "This is job 1", "1 Oct 2023 12:03:48"],
        ["6a412fa7-2c3b-4e38-8973-2b32479bffab", 2, "Job 2", "This is job 2", "11 Oct 2023 10:03:48"],
        ["2c302941-3ba7-413d-84a6-20503355b08a", 3, "Job 3", "This is job 3", "14 Oct 2023 18:34:48"],
        ["eff7e063-3e18-4790-95b4-abf62470e874", 4, "Job 4", "This is job 4", "1 Oct 2023 09:26:48"]
    ]


    const calculate = () => {
        const result = data.map((row) => {
            return columns.reduce((obj, col, index) => {
                obj[col.key] = row[index];
                return obj;
            }, {});
        });
        setList(result)
    }
    useEffect(() => {
        calculate()
    }, [])

    return (
        <>
            <SEO title="Extar Point" description="Extar point of the project" />
            <main>
                <div className='container vh-100 d-flex justify-content-center align-items-center position-relative'>
                    <div className="container d-flex justify-content-center p-5 flex-column">
                        <pre id="json">{JSON.stringify(list, null, 4)}</pre>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Create Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((data) =>
                                    <tr>
                                        <th scope="row">{data.no}</th>
                                        <td>{data.title}</td>
                                        <td>{data.desc}</td>
                                        <td>{moment(data.date).format("DD/MM/YYYY")}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>

    )
}
export default ExtarPoint