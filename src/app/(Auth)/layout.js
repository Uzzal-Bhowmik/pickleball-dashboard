import { Flex } from "antd";
import ImageSlider from "./_components/ImageSlider";

export default function AuthLayout({ children }) {
  return (
    <main className="grid h-screen max-h-screen place-items-center overflow-auto bg-gradient-to-br from-primary/65 to-primary">
      <Flex
        align="stretch"
        justify="start"
        className="mx-auto max-h-[60vh] w-full rounded-xl bg-gray-100 shadow md:w-[85%] lg:w-3/4 xl:w-1/2"
      >
        <div className="xl:w-[38%]">
          <ImageSlider />
        </div>

        <div className="grid flex-1 place-items-center p-8">{children}</div>
      </Flex>
    </main>
  );
}
