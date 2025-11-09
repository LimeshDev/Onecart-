import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopDataContext } from '../Context/ShopContext';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../Component/RelatedProduct';

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage1(product.image1);
      setImage2(product.image2);
      setImage3(product.image3);
      setImage4(product.image4);
      setImage(product.image1);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = (id, selectedSize) => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addtoCart(id, selectedSize);
    navigate('/Cart');
  }

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div>
      <div className='w-[99vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px]'>
        {/* Images */}
        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row'>
          <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap '>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                <img src={img} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={() => setImage(img)} />
              </div>
            ))}
          </div>
          <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
            <img src={image} alt="" className='w-[100%] lg:h-[100%] h-[100%] text-[30px] text-white text-center rounded-md object-fill' />
          </div>
        </div>

        {/* Product Details */}
        <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] gap-[10px]'>
          <h1 className='text-[40px] font-semibold text-[aliceblue]'>{productData.name.toUpperCase()}</h1>
          <div className='flex items-center gap-1'>
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStar className='text-[20px] fill-[#FFD700]' />
            <FaStarHalfAlt className='text-[20px] fill-[#FFD700]' />
            <p className='text-[18px] font-semibold pl-[5px] text-[white]'>(124)</p>
          </div>
          <p className='text-[30px] font-semibold pl-[5px] text-[white]'>{currency} {productData.price}</p>
          <p className='w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]'>{productData.description}</p>

          <div className='flex flex-col gap-[10px] my-[10px]'>
            <p className='text-[25px] font-semibold pl-[5px] text-[white]'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, idx) => (
                <button
                  key={idx}
                  className={`border py-2 px-4 rounded-md ${item === size ? 'bg-black text-[#2f97f1] text-[20px]' : 'bg-slate-300'}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className='text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-[10px] px-[20px] rounded-2xl mt-[10px] border-[1px] border-[#80808049] text-white shadow-md shadow-black'
              onClick={() => handleAddToCart(productData._id, size)}
            >
              Add To Cart
            </button>
          </div>

          <div className='w-[90%] h-[1px] bg-slate-700'></div>
          <div className='w-[80%] text-[16px] text-white'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Related Products */}
      <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col overflow-x-hidden'>
        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
          <p className='border px-5 py-3 text-sm text-white'>Description</p>
          <p className='border px-5 py-3 text-sm text-white'>Reviews (124)</p>
        </div>
        <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px] flex items-center justify-center'>
          <p>Upgrade your wardrobe with this stylish slim-fit cotton shirt, crafted from breathable, high-quality fabric. Easy to maintain and perfect for any setting.</p>
        </div>

        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      </div>
    </div>
  );
}

export default ProductDetail;
