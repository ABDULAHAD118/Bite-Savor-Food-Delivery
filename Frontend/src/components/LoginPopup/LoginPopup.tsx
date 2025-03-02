import { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { LoginPopupProps } from '../../Types'


const LoginPopup = (props: LoginPopupProps) => {
    const { setShowLogin } = props
    const [currentState, setCurrentState] = useState('Sign Up')
    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Sign Up' && <input type="text" placeholder='Your Name' title='Your Name' required />}
                    <input type="email" placeholder='Your Email' title='Your Email' required />
                    <input type="password" placeholder='Password' title='Password' required />
                </div>
                <div className="login-popup-conditions">
                    <input type="checkbox" name="" required id="" />
                    <p>By continuing,I agree to the terms of use & privacy policy.</p>
                </div>
                <button>{currentState === 'Sign Up' ? 'Create an account' : "Login"}</button>
                {currentState === 'Sign Up' ? <p>Already Have an Account?<span onClick={() => setCurrentState('Login')}>Login Here</span></p> : <p>Create a New Account?<span onClick={() => setCurrentState('Sign Up')}>Click Here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup