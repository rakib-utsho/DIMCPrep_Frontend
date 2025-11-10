import EmailVerificationForm from '@/components/Auth/EmailVerificationForm'
import React from 'react'


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify',
}



export default async function Page() {


  return (
    <div>
      <EmailVerificationForm />
    </div>
  )
}
