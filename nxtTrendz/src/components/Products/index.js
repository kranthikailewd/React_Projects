import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="products_container">
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </div>
  </>
)

export default Products
