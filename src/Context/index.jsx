import { createContext, useEffect, useState } from 'react'
import data from '../data/products.json'

export const ShoppingCartContext = createContext()


export const initializeLocalStorage = () =>{
    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount
    let parsedSignOut
    
    if(!accountInLocalStorage){
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount = {}
    }else{
        parsedAccount = JSON.parse(accountInLocalStorage)
    }
    
    if(!signOutInLocalStorage){
        localStorage.setItem('sign-out', JSON.stringify(false))
        parsedSignOut= false
    }else{
        parsedSignOut = JSON.parse(signOutInLocalStorage)
    }

}


export const ShoppingCartProvider = ({children}) =>{

    //My Account
    const [account, setAccount] = useState({})

    //Sign out
    const [signOut, setSignOut] = useState(false)

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

    //Get Products By Category
    const [searchByCategory, setSearchByCategory] = useState(null)



    useEffect(() => {
        setItems(data.data)
    }, [])

    const filteredItemsByTitle = (items, searchByTitle) =>{
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) =>{
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle, searchByCategory) =>{
        if(searchType === "BY_TITLE"){
           return  filteredItemsByTitle(items, searchByTitle)
        }

        if(searchType === "BY_CATEGORY"){
            return  filteredItemsByCategory(items, searchByCategory)
        }

        if(searchType === "BY_TITLE_AND_CATEGORY"){
            return  filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }

        if(!searchType){
            return  items
        }
    }

    useEffect(() => {

        if(searchByTitle && !searchByCategory){
            setFilteredItems(filterBy("BY_TITLE", items, searchByTitle))
        }

        if(!searchByTitle && searchByCategory){
            setFilteredItems(filterBy("BY_CATEGORY",items,null, searchByCategory))
        }


        if(!searchByTitle && !searchByCategory){
            setFilteredItems(filterBy(null,items))
        }

        if(searchByTitle && searchByCategory){
            setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY",items, searchByTitle, searchByCategory))
        }


    }, [items, searchByTitle, searchByCategory])

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
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            account, 
            setAccount,
            signOut, 
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}