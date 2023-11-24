import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ProductContext = ({children}) =>{
    // list of products
    const [product,setProduct] = useState([]);
    // favourite
    const [favouriteItem,setFavouriteItem] = useState([]);

    const AddToFav = ({productId,reason}) =>{
       let copyFavItems = [...favouriteItem] 
       const index = copyFavItems.findIndex(item =>item.id === productId);
       if(index === -1){
        const getCurrentProductItem = product.find(
          (item) => item.id === productId
        );
        copyFavItems.push({
          title: getCurrentProductItem.title,
          id : productId,
          reason
         })
       }else{
        copyFavItems[index] = {
          ...copyFavItems[index], reason
        }
       }
       setFavouriteItem(copyFavItems)
    }

    // Remove Fav
    const handleRemoveFav = (currID) =>{
     let copyFavItems = [...favouriteItem]

     copyFavItems = copyFavItems.filter(item => item.id !== currID)
     setFavouriteItem(copyFavItems)
    }

    //  console.log(favouriteItem)

    return (
        <Context.Provider value={{product,loading,AddToFav,favouriteItem,handleRemoveFav}}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;