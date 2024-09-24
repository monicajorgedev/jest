const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct} = require('./product')

beforeEach(() => {
    resetProducts();
});


describe('Adding Products', ()=> {
    it('should add a product',() => {
        const product = addProduct('iphone',600)
        expect(product.name).toBe('iphone');
        expect(product.price).toBe(600);
        expect(product.id).not.toBe(null)
    })
    it('should increment the id when a new product is added', () => {
        const totalProducts = getProducts().length
        const product = addProduct('pc', 400)
        expect(product.id).toBe(totalProducts + 1)
        })
    it('should fail when adding a repeated product', () => {
        addProduct('iphone-repeated',600)
        expect(() => addProduct('iphone-repeated',600)).toThrow('product already exists');
      })
    it('should fail when adding a product with no name', () => {
        expect(() => addProduct(null,600)).toThrow('name is required');
      })
    it('should fail when adding a product with no price', () => {
        expect(() => addProduct('mouse',"2")).toThrow('price is required');
        expect(() => addProduct('mouse',null)).toThrow('price is required');
      })
})



describe('Removing Products', ()=> {
    it('should remove a product',() => {
        addProduct('mac',1500)
        expect(getProduct(1)).not.toBe(null)
        removeProduct(1)

        expect(() => getProduct(1)).toThrow('product does not exist')
    })
    it('shoul fail when delete product if product does not exist', () => {
        getProducts()
        expect(()=> removeProduct(5)).toThrow('product does not exist')
    })
})


describe('Getting a single product', ()=> {
    it('should get a product', ()=>{
        addProduct('iphone',600)
        const products = getProducts() 
        expect(getProduct(1)).toBe(products.find(product => product.id === 1))
    })
    it('shoul fail when getting product if product does not exist', () => {
        expect(()=> getProduct(5)).toThrow('product does not exist')
    })
})


describe('Updating Products', ()=> {
    it('should update a product', ()=>{
        addProduct('iphone',600)
        updateProduct(1,'mac', 1000)
        const product = getProduct(1)
        expect(product).toStrictEqual({"id": 1, "name": "mac", "price": 1000})
    })
    it('should fail when updating a product that does not exist ', () => {
        
        expect(()=> updateProduct(9999,'mac', 1000)).toThrow('product does not exist')
    })
    it('should only update the name', ()=>{
        addProduct('ipad', 200)
        updateProduct(1,'ipod')
        const productModified = getProduct(1)
        expect(productModified.name).toBe('ipod')
        expect(productModified.price).toBe(200)
    })
})

