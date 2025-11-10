import ResetPassword from '@/components/Auth/ResetPassword'


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
}



export default function Page() {

  return (
    <div>
      <ResetPassword />
    </div>
  );
}
