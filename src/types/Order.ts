interface Order {
    id: number;
    customerId: number;
    animalId: number;
    date_created: string;
    total_price: number;
    status: string;
}
export default Order;