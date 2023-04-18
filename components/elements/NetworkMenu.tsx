import { Button, Menu } from "@mantine/core";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { mainnet } from "@wagmi/chains";
import Image from "next/image";
import Chains from "../Utils/Chains";

const NetworkMenu = () => {
  let { chain } = useNetwork();
  let { chains, switchNetwork } = useSwitchNetwork();

  if (typeof chain === "undefined") {
    chain = mainnet;
    chains = Chains;
  }

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button
          color="gray"
          leftIcon={
            <Image
              src={`/images/networks/${chain.network.split("-")[0]}.webp`}
              height={20}
              width={20}
              alt={chain?.name as string}
            />
          }
          radius="xl"
        >
          {chain.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {chains.map((network) => (
          <Menu.Item
            onClick={() => switchNetwork?.(network.id)}
            disabled={!switchNetwork || network.id === chain?.id}
            key={network.id}
            icon={
              <Image
                src={`/images/networks/${network.network.split("-")[0]}.webp`}
                height={20}
                width={20}
                alt={network?.name as string}
              />
            }
          >
            {network.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NetworkMenu;
