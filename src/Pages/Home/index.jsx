import { useState, useEffect } from 'react'
import Layout from '../../components/Layout/'
import Card from '../../components/Card'
import ProductDetail from '../../components/ProductDetail'


function Home() {

  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

    return (
      <Layout>
        Home
        <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg  justify-center'> 
          {
            items?.map((item) => <Card data={item} key={item.id} />)
          }
        </div>
      
          <ProductDetail />
      </Layout>
    )
  }
  
  export default Home