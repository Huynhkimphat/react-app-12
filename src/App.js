import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-action";
let isInitial = true;
function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);
    // ! With component
    // useEffect(() => {
    // const sendCartData = async () => {
    // dispatch(
    //     uiActions.showNotification({
    //         status: "pending",
    //         title: "Sending...",
    //         message: "Sending Cart Data!",
    //     })
    // );
    // const response = await fetch(
    //     "https://react-http-c8a8d-default-rtdb.firebaseio.com/cart.json",
    //     {
    //         method: "PUT",
    //         body: JSON.stringify(cart),
    //     }
    // );
    // if (!response.ok) {
    //     throw new Error("Sending cart data failed");
    // }
    // dispatch(
    //     uiActions.showNotification({
    //         status: "success",
    //         title: "Success!",
    //         message: "Sending Cart Data Successfully!",
    //     })
    // );
    // };
    // if (isInitial) {
    //     isInitial = false;
    //     return;
    // }
    // sendCartData().catch((e) => {
    //     dispatch(
    //         uiActions.showNotification({
    //             status: "error",
    //             title: "Error...",
    //             message: "Sending Cart Data Failed!",
    //         })
    //     );
    // });
    // }, [cart, dispatch]);
    // ! With create action
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);
    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
