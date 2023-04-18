import Logo from "../elements/Logo";
import ConnectButton from "../elements/ConnectButton";
import NetworkMenu from "../elements/NetworkMenu";
import { Header, Group, Text } from "@mantine/core";
import Link from "next/link";

const TheHeader = () => {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Group position="apart">
        <Group position="left" spacing="xl">
          <Link href="/">
            <Logo />
          </Link>
          <Text>Swap</Text>
          <Text>Token</Text>
        </Group>
        <Group position="right" spacing="xl">
          <NetworkMenu />
          <ConnectButton />
        </Group>
      </Group>
    </Header>
  );
};

export default TheHeader;
