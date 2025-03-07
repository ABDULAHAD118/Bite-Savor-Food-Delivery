import { useNavigate, useSearchParams } from 'react-router'
import './Verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../contexts/StoreContext';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId");
    const { URL } = useContext<any>(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${URL}/api/order/verify`, { success, orderId });
        if (response.data.success) {
            navigate('/myorders')
        }
        else {
            navigate('/')
        }

    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <Spinner width={50} height={50} borderWidth={5} />
        </div>
    )
}

export default Verify