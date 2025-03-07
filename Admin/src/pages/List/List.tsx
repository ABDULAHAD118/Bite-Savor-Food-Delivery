import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

interface Food {
    _id: string
    name: string
    category: string
    price: number
    image: string
}

const List = (props: any) => {
    const { url } = props
    const [list, setList] = useState([])
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            if (response.data.success) {
                setList(response.data.food)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)

        }
    }

    const removeItem = async (id: string) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id })
            if (response.data.success) {
                await fetchList()
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

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