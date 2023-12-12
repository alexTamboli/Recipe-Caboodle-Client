import React from 'react'
import loading from '../../assets/loading.svg'

export default function Loading() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img src={loading} alt='Loading' />
        </div>
    )
}
