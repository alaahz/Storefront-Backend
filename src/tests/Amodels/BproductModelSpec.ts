import { Product } from '../../components/product/product.models';
const product = new Product()

const productInfo ={
    pname: 'Dell xp',
    price: 13000,
    category: 'Tech',
}

describe('Testing Product Model: ', () => {

    it('Creates a new product', async () => {
        expect(async () => {
            const result = await product.CreateNewProduct(productInfo)
          }).not.toThrow();
    })



    it('All Products', async () => {

        expect(async () => {
            const result = await product.allProducts()
          }).not.toThrow();
    })


    it('Get Product by ID', async () => {

        expect(async () => {
            const result = await product.findProductById(3)
          }).not.toThrow();

    })
    it('Get Category products', async () => {

        expect(async () => {
            const result = await product.findProductsByCategory(productInfo.category)
        }).not.toThrow();

    })
    it('Get Top 5 products', async () => {

        expect(async () => {
            const result = await product.popularProduct()
          }).not.toThrow();


    })
    it('Update product information', async () => {
        expect(async () => {
            const result = await product.updateValue('pname','IPone 13',3)
          }).not.toThrow();

    })
    it('Delete Product', async () => {
        expect(async () => {
            const result = await product.deleteProduct(2)
          }).not.toThrow();
    })

})