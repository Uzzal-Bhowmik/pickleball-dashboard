"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "../theme/mainTheme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import MainLayoutContextProvider from "@/context/MainLayoutContext";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

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
            <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>

            <NextTopLoader />

            <Toaster containerStyle={{ fontWeight: "bold", color: "#000" }} />
          </AntdRegistry>
        </MainLayoutContextProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
