import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      const renderCardSummary = () => {
        const cartItemAmounts = cartList.map(each => each.price * each.quantity)
        const totalAmount = cartItemAmounts.reduce(
          (acc, currentVal) => acc + currentVal,
        )

        return (
          <div className="summary-card">
            <div className="order-total-card">
              <p className="order-total-text">Order Total:</p>
              <h1 className="total-amount">Rs {totalAmount}/-</h1>
            </div>
            <p className="no-of-items-text">{cartList.length} Items in cart</p>
            <button className="checkout-btn" type="button">
              Checkout
            </button>
          </div>
        )
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-card">
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                {renderCardSummary()}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
