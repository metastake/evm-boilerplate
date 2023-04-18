import { FC, ReactNode } from "react";
import { AppShell } from "@mantine/core";
import NoSsr from "../NoSsr";
import TheHeader from "./Header";
import TheFooter from "./Footer";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NoSsr>
      <AppShell header={<TheHeader />} footer={<TheFooter />}>
        {children}
      </AppShell>
    </NoSsr>
  );
};

export default Layout;
