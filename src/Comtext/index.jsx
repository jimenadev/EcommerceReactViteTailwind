import { createContext, useEffect, useState } from 'react'

export const ShoppingCartContext = createContext()


export const ShoppingCartProvider = ({children}) =>{

    //Shopping Cart  - Increment Quantity
    const [count, setCount] = useState(0)

    //Shopping Cart  - Add products to cart
    const [cartProducts, setCartProducts] = useState([])


    //Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)


    //Checkout Side Menu - Open/Close
    const [isCheckoutSideMenu , setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Product Detail - Show Product
    const [productToShow, setProductToShow] = useState(undefined)

    //Shopping Cart - Order
    const [order, setOrder] = useState([])

    //Get Products
    const [items, setItems] = useState(null)

    const [filteredItems, setFilteredItems] = useState(null)


    //Get Products By Title
    const [searchByTitle, setSearchByTitle] = useState(null)


    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems(data))
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    useEffect(() => {

        if(searchByTitle){
            setFilteredItems(filteredItemsByTitle(items, searchByTitle))
        }


    }, [items, searchByTitle])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenu,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems

        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}