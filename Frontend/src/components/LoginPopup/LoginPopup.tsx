import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { LoginPopupProps } from '../../Types'
import { StoreContext } from '../../contexts/StoreContext'
import axios from 'axios'


const LoginPopup = (props: LoginPopupProps) => {
    const { setShowLogin } = props
    const { URL } = useContext<any>(StoreContext)
    const [currentState, setCurrentState] = useState('Sign Up');
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
        try {
            let newURL = URL;
            if (currentState === 'Sign Up') {
                newURL = `${URL}/api/user/register`
            }
            else {
                newURL = `${URL}/api/user/login`
            }
            let response = await axios.post(newURL, data)
            console.log(response)
            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                setShowLogin(false)
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
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
                    <input type="checkbox" name="" required id="" />
                    <p>By continuing,I agree to the terms of use & privacy policy.</p>
                </div>
                <button type='submit' >{currentState === 'Sign Up' ? 'Create an account' : "Login"}</button>
                {currentState === 'Sign Up' ? <p>Already Have an Account?<span onClick={() => setCurrentState('Login')}>Login Here</span></p> : <p>Create a New Account?<span onClick={() => setCurrentState('Sign Up')}>Click Here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup