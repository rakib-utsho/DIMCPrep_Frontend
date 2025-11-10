import Questions from '@/components/Questions/Questions'
import React from 'react'


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam',
}




export default function page() {
  return (
    <div>
      <Questions />
    </div>
  )
}
