import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    console.log(cartList)
    console.log(id)
    const newList = cartList.map(each => {
      if (each.id === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
        }
      }
      return each
    })

    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    console.log(cartList)
    console.log(id)
    const newList = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 0) {
          return {
            ...each,
            quantity: each.quantity - 1,
          }
        }
      }
      return each
    })

    const filteredList = newList.filter(each => each.quantity !== 0)

    this.setState({cartList: filteredList})
  }

  removeCartItem = id => {
    console.log(id)
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductPresent = cartList.some(each => each.id === product.id)

    console.log(isProductPresent)

    if (isProductPresent === true) {
      return this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === product.id) {
            return {
              ...each,
              quantity: each.quantity + 1,
            }
          }
          return each
        }),
      }))
    }
    return this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
