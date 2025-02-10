import Cart from "../components/cart/Cart";
import PageContent from "../components/PageContent";

const CartPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-24 w-12/12 lg:w-8/12 bg-yellow-100 bg-opacity-50">
            <Cart />
        </PageContent>
    );
}

export default CartPage;