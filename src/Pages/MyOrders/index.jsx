import { useContext } from 'react'
import Layout from '../../components/Layout/'
import  OrdersCard  from '../../components/OrdersCard'
import { ShoppingCartContext } from '../../Comtext'
import { Link } from 'react-router-dom'


function MyOrders() {

  const context = useContext(ShoppingCartContext)

    return (
      <Layout>
        <div className="flex w-80  relative items-center justify-center mb-2">
          <h1 className='font-medium text-xl'>My Orders</h1>
        </div>
         
         {
          context.order.map((ord, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard 
                    totalPrice={ord.totalPrice} 
                    totalProducts={ord.totalProducts} />
            </Link>
          ))
         }
         <OrdersCard />
      </Layout>
    )
  }
  
  export default MyOrders