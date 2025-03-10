import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'

interface Food {
    _id: string
    name: string
    category: string
    price: number
    image: string
}

const List = (props: any) => {
    const { url } = props;
    const [list, setList] = useState([]);
    const [pending, setPending] = useState(false);
    const fetchList = async () => {
        try {
            setPending(true)
            const response = await axios.get(`${url}/api/food/list`)
            if (response.data.success) {
                setList(response.data.food);
                setPending(false);
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
            setPending(false);

        }
    }

    const removeItem = async (id: string) => {
        try {
            setPending(true);
            const response = await axios.post(`${url}/api/food/remove`, { id })
            if (response.data.success) {
                await fetchList()
                setPending(false);
                toast.success(response.data.message)
            }
        } catch (error: any) {
            setPending(false);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])
    if (pending) {
        return <div className='spin'>
            <Spinner width={50} height={50} borderWidth={5} />
        </div>
    }

    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.length === 0 && <div className='empty'>No Food Available</div>}
                {list.map((item: Food, index) => (
                    <div className="list-table-format" key={index}>
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p className='cursor' onClick={() => removeItem(item._id)}>X</p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default List