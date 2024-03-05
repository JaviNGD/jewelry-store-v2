import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import loginPageClass from './loginPage.module.css'
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm()
    
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');

    }, [user]);

    const submit = async ({ email, password }) => {
        await login(email, password);
    };


    return (
    <div className={loginPageClass.container}>
        <div className={loginPageClass.details}>
            <Title title="Login" />
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input 
                    type='email'
                    label='Email'
                    {...register('email', { 
                        required: true,
                        pattern: { 
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
                            message: 'Email is not valid'
                        },
                    })}
                    error={errors.email}
                />
                <Input 
                    type='password'
                    label='Password'
                    {...register('password', { 
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                    error={errors.password}
                /> 
                <Button type='submit' text='Login' />

                <div className={loginPageClass.register}>
                    New user? &nbsp;
                    <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>Create an account</Link>
                </div>
            </form>
        </div>
    </div>
    )
}
