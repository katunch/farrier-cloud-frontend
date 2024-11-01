import Customer from "./Customer";
import OrderItem from "./OrderItem";
import Animal from "./Animal";

interface Invoice {
    id: number;
    customer: Customer;
    items: OrderItem[];
    status: string;
    animal: Animal;
    date_created: string;
    total_price: number;
}
export default Invoice;