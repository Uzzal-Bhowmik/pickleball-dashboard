import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import { Layout } from "antd";

export default function DashboardLayout({ children }) {
  return (
    <Layout hasSider>
      <SidebarContainer></SidebarContainer>

      <Layout>
        <HeaderContainer></HeaderContainer>

        <main
          style={{
            maxHeight: "90dvh",
            overflow: "auto",
            backgroundColor: "#f5f5f5",
            paddingInline: "50px",
            paddingBlock: "20px",
          }}
        >
          {children}
        </main>
      </Layout>
    </Layout>
  );
}
