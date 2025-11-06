import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  const { products } = useContext(shopDataContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  return (
    <div className="w-full py-10">
      {/* Title Section */}
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-blue-100 text-[14px] md:text-[18px] px-4">
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      {/* Grid Layout */}
      <div
        className="w-[90%] mx-auto grid 
                   grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                   gap-6 md:gap-10 justify-items-center"
      >
        {latestProducts.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
