import { beautyServices } from '@/constant/constants'
import React from 'react'
import BeautyServiceCard from './BeautyServiceCard'

const BeautyServiceCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-12 mt-10">
      {beautyServices.map((service) => (
        <BeautyServiceCard key={service.id} cardBeauty={service} />
      ))}
    </div>
  )
}

export default BeautyServiceCards
