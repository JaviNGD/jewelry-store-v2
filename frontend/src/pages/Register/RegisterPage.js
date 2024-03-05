import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import registerPageClass from './registerPage.module.css';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    // If the user is logged in, redirect to the home page
    useEffect(() => {
        if (user) {
            navigate(returnUrl ? returnUrl : '/');
        }
    }
    , [user, navigate, returnUrl]);

    const { register, handleSubmit, getValues, formState: {errors} } = useForm();

    const submit = async data => {
        await auth.register(data);
    }

    return (
        <div className={registerPageClass.container}>
            <div className={registerPageClass.details}>
                <Title title="Register" />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type="text"
                        label="Name"
                        {...register('name', {required: true}, {minLength: 3})}
                        error={errors.name}
                    />
                    <Input
                        type="email"
                        label="Email"
                        {...register ('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address'
                            }})}
                        error={errors.email}
                    />
                    <Input
                        type="text"
                        label="Address"
                        {...register ('address', {required: true, minLength: 6})}
                        error={errors.address}
                    />
                    <Input
                        type="password"
                        label="Password"
                        {...register ('password', {required: true, minLength: 6, maxLength: 20})}
                        error={errors.password}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        {...register ('confirmPassword', {required: true, validate: value => value === getValues('password') || 'The passwords do not match'})}
                        error={errors.confirmPassword}
                    />
                    <Button type="submit" text="Register" />

                    <div className={registerPageClass.login}>
                        Already have an account? &nbsp;
                        <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : '' }`}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
