import { useContext } from 'react'
import Layout from '../../components/Layout/'
import Card from '../../components/Card'
import ProductDetail from '../../components/ProductDetail'
import { ShoppingCartContext } from '../../Comtext'


function Home() {

  const context = useContext(ShoppingCartContext)


    return (
      <Layout>
         <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'>Exclusive Products</h2>
        </div>
        <input 
            type='text'  
            placeholder="Search"
            className='rounded-lg border border-black w-80 p-4 mb-4  focus:outline-none' 
            onChange={(event) => context.setSearchByTitle(event.target.value) }
            />
        <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full max-w-screen-lg  justify-center'> 
          {
            context.items?.map((item) => <Card data={item} key={item.id} />)
          }
        </div>
      
          <ProductDetail />
      </Layout>
    )
  }
  
  export default Home