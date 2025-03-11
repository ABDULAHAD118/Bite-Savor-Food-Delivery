import { ChangeEvent, FormEvent, useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const Add = (props: any) => {
    const { url } = props;
    const [image, setImage] = useState<File | null>(null);
    const [pending, setPending] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        category: 'Salad',
        price: ''
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            toast.error('Please upload image');
            return;
        }
        if (!data.name || !data.description || !data.price) {
            toast.error('Please fill all fields');
            return;
        }
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('image', image as Blob);
        try {
            setPending(true);
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setPending(false);
                setData({
                    name: '',
                    description: '',
                    category: 'Salad',
                    price: ''
                });
                setImage(null);
                toast.success(response.data.message);
            }
        } catch (error: any) {
            console.log(error);
            setPending(false);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image" className='cursor'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input type="file" id='image' name='image' onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                        }
                    }} hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
                </div>
                <div className="add-product-description flex-col   ">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='Write content here' />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" id="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodle">Noodle</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs.200' />
                    </div>
                </div>
                <button className="add-button" type='submit' >{pending ? <Spinner width={20} height={20} borderWidth={2} /> : "Add Product"}</button>
            </form>
        </div>
    )
}


export default Add