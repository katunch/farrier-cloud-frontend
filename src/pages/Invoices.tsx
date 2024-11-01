import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import InvoiceTable from "../components/InvoiceTable";
import Api from "../service/Api";
import Invoice from "../types/Invoice";

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    Api.get("/invoices").then((response: { data: Invoice[] }) => {
      console.log(`Invoices loaded: ${response.data.length}`);
      setInvoices(response.data);
    });
  }, []);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rechnungen</h1>
          <p className="text-gray-600">Manage your invoices here.</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log('Add new invoice')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Invoice
        </button>
      </div>
      
      <div className="flex flex-col">
        <InvoiceTable invoices={invoices}/>
      </div>
    </div>
  );
};

export default Invoices;