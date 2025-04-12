"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "../theme/mainTheme";
import NextTopLoader from "nextjs-toploader";
import MainLayoutContextProvider from "@/context/MainLayoutContext";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { SocketProvider } from "../context/SocketContextApi";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export default function Providers({ children }) {
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        console.log("Page loaded from bfcache (not a reload).");
      } else {
        console.log("Page was reloaded!");
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayoutContextProvider>
          <AntdRegistry>
            <ConfigProvider theme={mainTheme}>
              <SocketProvider>{children}</SocketProvider>
            </ConfigProvider>

            <NextTopLoader />

            <ToastContainer
              position="top-right"
              autoClose={4500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </AntdRegistry>
        </MainLayoutContextProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
