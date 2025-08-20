"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: string
  priceNumber: number
  image: string
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNumber: product.priceNumber,
        image: product.image,
      },
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="bg-primary hover:bg-primary/90 transition-all duration-200"
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Adicionado!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
