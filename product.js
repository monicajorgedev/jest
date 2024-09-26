let products = [];
let id = 0;

const resetProducts = () => {
    products = []
    id = 0
}

const addProduct = (name, price) => {
    if(!name || typeof(name) !== 'string') {
        throw new Error('name is required')
    }
    if(!price || price === 0 || typeof(price) !== 'number') {
        throw new Error('price is required')
    }
    const existProduct = products.some(product => product.name === name)
    console.log(existProduct)
    if(existProduct) {
        throw new Error('product already exists');
    }
    id++
    const newProduct = {
        id: id,
        name: name,
        price: price
    }
    products.push(newProduct)
    return newProduct
}


const removeProduct = (id) => {
    const existProduct = products.some(product => product.id === id)
    if(existProduct === false) {
        throw new Error('product does not exist')
    }
    products = products.filter(product => product.id !== id)
}


const getProducts = () => {
    return products
}

const getProduct = (id) => {
    const existProduct = products.some(product => product.id === id)
    if(existProduct === false) {
        throw new Error('product does not exist')
    }
    const product = products.find(objeto => objeto.id === id)
    return product
}

const updateProduct = (id, name, price) => {
    const product = products.find(objeto => objeto.id === id)
    if(!product) {
        throw new Error('product does not exist')
    }
    product.name = name;
    if (price) {
        product.price = price;
    }
    return product
}

module.exports = { 
    resetProducts,
    addProduct, 
    removeProduct, 
    getProducts, 
    getProduct, 
    updateProduct}

    