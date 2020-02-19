import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AUTH_TOKEN } from '../constants';

const Login = () => {
    const [login, setLogin] = useState(true);
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        console.log(values)
    }

    return(
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
                {!login && 
                    <input
                        name="name"
                        ref={register({ 
                            required: 'Enter your name' 
                        })}
                        placeholder="Your name"
                    />
                }

                <input
                    name="email"
                    ref={register({
                        required: 'You must provide url address'
                    })}
                    placeholder="Email"
                />
                {errors.email && errors.email.message}
                <input
                    name="password"
                    type="password"
                    ref={register({
                        required: 'You must provide a password'
                    })}
                    placeholder="Password"
                />
                {errors.password && errors.password.message}

                <div className="flex mt3">
                    <button className="pointer mr2 button" type="submit">
                        {login ? 'login' : 'create account'}
                    </button>
                    <div
                        className="pointer button"
                        onClick={() => setLogin({ login: !login })}
                    >
                        {login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;