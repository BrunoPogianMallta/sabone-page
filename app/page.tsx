"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import {  Heart, Sparkles, Star, ChevronLeft, ChevronRight, ShoppingCart, X, Plus, Minus } from "lucide-react"
// import { CartSheet } from "@/components/cart-sheet"
// import { AddToCartButton } from "@/components/add-to-cart-button"
import { useState } from "react"
import Image from "next/image"

const soapProducts = [
  {
    id: 1,
    name: "Dolomita",
    description: "Enriquecido com extratos e óleos vegetais. A argila branca é recomendada para peles sensíveis e desidratadas.É clareadora, adstringente e também muito usada para combater espinhas e a acne. A dolomita proporciona controle de flacidez, tem efeito porcelana e hidratação profunda.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/dolomita.jpg",
    benefits: ["Clareadora", "Hidratante", "Adstringente"],
    ingredients: "base glicerinada, argila branca, dolomita, extrato de leite de cabra, óleo de semente de uva, lauril sulfato de sódio e essência ",
  },
  {
    id: 2,
    name: "Aveia e Mel",
    description: "Proporciona hidratação, suavização e revitalização da pele, também ajuda a combater o envelhecimento precoce.",
   price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/aveia_e_mel.jpg",
    benefits: ["Revitalização", "Hidratação", "Suavização"],
    ingredients: "base glicerinada, mel natural, aveia em flocos, extrato de mel, extrato de aveia, lauril sulfato de sódio e essência.",
  },
  {
    id: 3,
    name: "Carvao Ativado",
    description: "Detox natural, limpa profundamente e prepara a pele para receber outros produtos.Cicatrizante, antiflamatório e mantém a pele com brilho saudável.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/carvao_ativado.jpg",
    benefits: ["Detox", "Cicatrizante", "antiflamatório"],
    ingredients: "base glicerinada, carvão ativado, óleo de calêndula, extrato de aveia, lauril sulfato de sódio e essência.",
  },
  {
    id: 4,
    name: "Barbatimão e Melaleuca",
    description: "Especialmente desenvolvido para higiene íntima.Auxilia no tratamento de infeções e candidíase, controla o PH, além de ser calmante,  suavizante e refrescante.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/barbatimao_melaleuca.jpg",
    benefits: ["Íntimo", "Calmante", " Refrescante"],
    ingredients: "base glicerinada, extrato de barbatimão, extrato de melaleuca, dolomita em pó, lauril sulfato de sódio, corante e essência.",
  },
  {
    id: 5,
    name: "Erva Doce",
    description: "proporciona hidratação, suavização, controle da oleosidade e frescor, além de ser calmante para peles delicadas e sensíveis.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/erva_doce.jpg",
    benefits: ["Hidratante", "Refrescante", "Controla oleosidade"],
    ingredients: "base glicerinada, extrato de erva doce, óleo de amêndoas, extrato de aveia, lauril sulfato de sódio, corante verde e essência.",
  },
  {
    id: 6,
    name: "Infantil",
    description: "Especialmente desenvolvido para todas as crianças.Protege e hidrata a pele.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/infantil.jpg",
    benefits: ["Protege", "Hidratante", "Natural"],
    ingredients: "base glicerinada, extrato de aloe vera, extrato de aveia, óleo semente de uva, lauril sulfato de sódio, corante e essência.",
  },
  {
    id: 7,
    name: "Algas Marinhas",
    description: "Refresca, estimula a circulação sanguínea, protege contra os raios UV, desentoxica, hidrata e suaviza a pele.",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/algas_marinhas.jpg",
    benefits: ["Hidratante", "Detox", "Refrescante"],
    ingredients: "base glicerinada, extrato de algas marinhas, extrato de aloe vera, lauril sulfato de sódio, corantes azul e essência",
  },
  {
    id: 8,
    name: "Argila Verde",
    description: "Proporciona limpeza profunda e desintoxicação da pele. Poderoso esfoliante, calmante e adstringente, também tonificante e bactericida.",
   price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/argila_verde.png",
    benefits: ["Esfoliante", "Detox", "Bactericida"],
    ingredients: "base glicerinada, extrato de algas marinhas, extrato de aloe vera, lauril sulfato de sódio, corantes azul e essência",
  },
]



// Interface para os itens do carrinho
interface CartItem {
  id: number
  quantity: number
}

export default function SoapCatalog() {
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const productsPerPage = 3
  const totalPages = Math.ceil(soapProducts.length / productsPerPage)
  
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = soapProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // Função para adicionar produto ao carrinho
  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? {...item, quantity: item.quantity + 1} : item
        )
      } else {
        return [...prevCart, {id: productId, quantity: 1}]
      }
    })
  }

  // Função para remover produto do carrinho
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId ? {...item, quantity: item.quantity - 1} : item
        )
      } else {
        return prevCart.filter(item => item.id !== productId)
      }
    })
  }

  // Função para remover item completamente do carrinho
  const removeItemFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, item) => {
    const product = soapProducts.find(p => p.id === item.id)
    return total + (product?.priceNumber || 0) * item.quantity
  }, 0)

  // Calcular quantidade total de itens
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  // Gerar mensagem para WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "Olá, SABONÊ! Gostaria de fazer um pedido:\n\n"
    
    cart.forEach(item => {
      const product = soapProducts.find(p => p.id === item.id)
      if (product) {
        message += `• ${product.name} - Quantidade: ${item.quantity} - R$ ${(product.priceNumber * item.quantity).toFixed(2)}\n`
      }
    })
    
    message += `\n*Total: R$ ${cartTotal.toFixed(2)}*`
    message += "\n\nAguardo instruções para finalizar o pagamento e fornecer meus dados."
    
    return encodeURIComponent(message)
  }

  const whatsappNumber = "554198083515" // Substitua pelo número real
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header com ícone do carrinho e contador */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/logo.jpg"
                    alt="SABONÊ Saboaria Artesanal"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground">SABONÊ</h1>
                  <p className="text-xs text-muted-foreground">Saboaria Artesanal</p>
                </div>
              </div>
            </div>
            
            {/* Ícone do carrinho com contador */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay do carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Seu Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-center py-8">Seu carrinho está vazio</p>
              ) : (
                <>
                  {cart.map(item => {
                    const product = soapProducts.find(p => p.id === item.id)
                    return product ? (
                      <div key={item.id} className="border-b py-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-primary font-bold">{product.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button 
                                onClick={() => removeFromCart(product.id)}
                                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => addToCart(product.id)}
                                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => removeItemFromCart(product.id)}
                                className="ml-auto text-red-500 text-sm"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  })}
                  
                  <div className="py-4 border-t mt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <a 
                      href={whatsappURL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-md font-medium"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Finalizar Pedido via WhatsApp
                    </a>
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Você será direcionado ao WhatsApp para finalizar seu pedido
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-card to-background py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 relative">
              <Image
                src="/logo.jpg"
                alt="SABONÊ Saboaria Artesanal"
                width={96}
                height={96}
                className="rounded-full object-cover border-4 border-primary/20"
              />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Saboaria Artesanal
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Descubra nossa coleção exclusiva de sabonetes artesanais, feitos com ingredientes 100% naturais e óleos
            essenciais puros para uma experiência de bem-estar única.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Artesanal</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Cruelty Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nossa Coleção</h3>
            <p className="text-muted-foreground max-w-xl mx-auto px-4">
              Cada sabonete é cuidadosamente formulado com ingredientes selecionados para proporcionar benefícios
              específicos à sua pele.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentProducts.map((soap) => (
              <Card key={soap.id} className="group hover:shadow-lg transition-shadow duration-300 bg-card border-border flex flex-col h-full">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={soap.image || "/placeholder.svg"}
                      alt={soap.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg md:text-xl font-bold text-foreground">{soap.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">5</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base line-clamp-3 min-h-[60px]">
                    {soap.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4 min-h-[40px] items-start">
                    {soap.benefits.map((benefit) => (
                      <Badge
                        key={benefit}
                        variant="secondary"
                        className="text-xs bg-secondary/20 text-secondary-foreground whitespace-nowrap"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-xs text-muted-foreground leading-tight">
                      <strong>Ingredientes:</strong> {soap.ingredients}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 flex items-center justify-between mt-4">
                  <span className="text-xl md:text-2xl font-bold text-primary">{soap.price}</span>
                  <Button 
                    onClick={() => addToCart(soap.id)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 md:mt-12">
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => paginate(page)}
                    className="h-8 w-8 md:h-10 md:w-10 text-sm"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Por que Escolher a SABONÊ?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-3">Ingredientes Naturais</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Utilizamos apenas ingredientes naturais e orgânicos, livres de químicos agressivos e parabenos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-3">Produção Artesanal</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Cada sabonete é feito à mão em pequenos lotes, garantindo qualidade e frescor únicos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-foreground mb-3">Cuidado Consciente</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Produtos cruelty-free e embalagens sustentáveis para cuidar de você e do planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 relative">
                <Image
                  src="/logo.jpg"
                  alt="SABONÊ Saboaria Artesanal"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <h5 className="text-lg md:text-xl font-bold">SABONÊ</h5>
            </div>
            <p className="text-background/70 mb-4 md:mb-6 text-sm md:text-base">
              Transformando o cuidado diário em um ritual de bem-estar natural.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-background/70">
              <span>📧 ns.tais@hotmail.com</span>
              <span>📱 (41) 9808-3515</span>
              <span>✨ Saboaria Artesanal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}