import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { LoginPopupProps } from '../../Types'
import { StoreContext } from '../../contexts/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../Spinner/Spinner'


const LoginPopup = (props: LoginPopupProps) => {
    const { setShowLogin } = props
    const { URL, setToken } = useContext<any>(StoreContext);
    const [currentState, setCurrentState] = useState('Login');
    const [pending, setPending] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const onLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (currentState === 'Sign Up') {
            if (!data.name.trim() || !data.password.trim()) {
                toast.error('Please fill all fields');
                return;
            }
        }
        else {
            if (!data.password.trim()) {
                toast.error('Please fill all fields');
                return;
            }
        }

        try {
            let newURL = URL;
            if (currentState === 'Sign Up') {
                newURL = `${URL}/api/user/register`
            }
            else {
                newURL = `${URL}/api/user/login`
            }
            setPending(true);
            let response = await axios.post(newURL, data)
            if (response.data.success) {
                setPending(false);
                localStorage.setItem('token', response.data.token)
                setToken(response.data.token);
                toast.success(response.data.message);
                setShowLogin(false)
            }
        } catch (error: any) {
            setPending(false);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Sign Up' && <input type="text" name='name' onChange={handleChange} value={data.name} placeholder='Your Name' title='Your Name' required />}
                    <input type="email" onChange={handleChange} name='email' value={data.email} placeholder='Your Email' title='Your Email' required />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} value={data.password} title='Password' required />
                </div>
                <div className="login-popup-conditions">
                    <input type="checkbox" name="" required className='terms' id="terms" />
                    <label htmlFor='terms' className='terms'>By continuing,I agree to the terms of use & privacy policy.</label>
                </div>
                <button type='submit' disabled={pending}>
                    {pending ? <Spinner width={20} height={20} borderWidth={2} /> : (currentState === 'Sign Up' ? 'Create an account' : "Login")}
                </button>
                {currentState === 'Sign Up' ? <p>Already Have an Account?<span onClick={() => setCurrentState('Login')}>Login Here</span></p> : <p>Create a New Account?<span onClick={() => setCurrentState('Sign Up')}>Click Here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup