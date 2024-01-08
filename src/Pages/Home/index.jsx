import { useContext } from 'react'
import Layout from '../../components/Layout/'
import Card from '../../components/Card'
import ProductDetail from '../../components/ProductDetail'
import { ShoppingCartContext } from '../../Comtext'


function Home() {

  const context = useContext(ShoppingCartContext)

  const renderView = () =>{
    if(context.setSearchByTitle?.length > 0){
      if(context.filteredItems?.length > 0){
          return (
            (context.filteredItems?.map((item) => <Card data={item} key={item.id} />))
          )
      }else{
        return (
          <div>
            We don't have anything :(
          </div>
        )
      }
   
    }else{
      return (context.items?.map((item) => <Card data={item} key={item.id} />))
    }
  }

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
            renderView()
          }
        </div>
      
          <ProductDetail />
      </Layout>
    )
  }
  
  export default Home