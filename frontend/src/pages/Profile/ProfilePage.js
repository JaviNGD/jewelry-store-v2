import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import profileClass from './profilePage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {
    const {handleSubmit, register, formState: {errors}} = useForm();
    const { user , updateProfile } = useAuth();

    // Update user profile
    const submit = user => {
        updateProfile(user);
    }

    return (
        <div className={profileClass.container}>
            <div className={profileClass.details}>
                <Title title="Update Profile" />
                {user && (
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                        defaultValue={user.name} 
                        type="text" 
                        label="Name"
                        placeholder="Enter your name"
                        {...register("name", {required: true, minLength: 3})}
                        error={errors.name}
                    />
                    <Input
                        defaultValue={user.address}
                        type="text"
                        label="Address"
                        placeholder="Enter your address"
                        {...register("address", {required: true, minLength: 6})}
                        error={errors.address}
                    />

                    <Button type="submit" text="Update" />
                </form>
            )}
                <ChangePassword />
            </div>
        </div>
    )
}
