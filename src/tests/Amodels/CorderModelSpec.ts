import { Orders } from '../../components/order/order.models';
const order = new Orders()


const productInfo ={
    orderid:1,
    productid:2,
    productquantity:1,

}

describe('Testing Order Model: ', () => {

    it('Creates a new order', async () => {
        expect(async () => {
            const result = await order.createOrder(2)
          }).not.toThrow();
    })


    it('Add product to order', async () => {
        expect(async () => {
            const result = await order.addProductToOrder(productInfo)
          }).not.toThrow();
       

    })

    it('Get user orders', async () => {

        expect(async () => {
            const result = await order.showOrders(1)
          }).not.toThrow();

    })
    it('Get user Completed orders', async () => {

        expect(async () => {
            const result = await order.completedOrders(1)
            expect(result?.length).toEqual(0)
          }).not.toThrow();

    })
    it('Delete Order', async () => {
        expect(async () => {
            const result = await order.deleteOrder(1,2)
            const ordersNumber = await order.showOrders(1)
          }).not.toThrow();
    })
 })