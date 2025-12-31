import CheckoutForm from "@/components/DashboardLayout/checkout/CheckoutForm";
import OrderComplete from "@/components/DashboardLayout/checkout/OrderComplete";

export default function CheckoutPage() {
  return (
    <section className="container mx-auto">
        <h1 className="text-2xl pb-5 font-semibold">Realiza tu Pago</h1>
        <div className="container flex flex-col space-y-4 max-w-3xl">
            <CheckoutForm />
            <OrderComplete />
        </div>
    </section>
  )
}
