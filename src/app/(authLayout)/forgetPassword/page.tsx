import ForgetPassword from '@/components/Auth/ForgetPassword'
import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password',
}


export default function page() {
  return (
    <div>
      <ForgetPassword />
    </div>
  )
}
