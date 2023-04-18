import { fetchBalance } from "@wagmi/core";
import { useAccount } from "wagmi";
import {
  Paper,
  Image,
  Group,
  Text,
  Stack,
  Badge,
  Divider,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Address } from "wagmi";

const BalanceBlock = ({ network }: any) => {
  const [balance, setBalance] = useState("0");
  const [chain, setChain] = useState(network);
  const [isLoaded, setIsLoaded] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    fetchBalance({
      address: address as Address,
      chainId: chain.id,
    })
      .then((data) => {
        setBalance(data.formatted);
        setChain(network);
        setIsLoaded(true);
      })
      .catch((e) => {
        setIsLoaded(false);
        console.log(e);
      });
  });

  return (
    <Paper shadow="md" p="sm" withBorder>
      <Stack spacing="sm">
        <Group position="apart" spacing="xl">
          <Badge variant="dot">{chain.name as string}</Badge>
          <Image
            src={`/images/networks/${chain.network.split("-")[0]}.webp`}
            height={20}
            width={20}
            alt={chain.name}
          />
        </Group>

        <Group position="apart" spacing="xl">
          {chain.testnet ? (
            <Badge color="yellow" size="xs" variant="filled">
              testnet
            </Badge>
          ) : (
            <Badge color="lime" size="xs" variant="filled">
              mainnet
            </Badge>
          )}
          <Badge color="cyan" size="xs" variant="outline">
            chainId: {chain.id}
          </Badge>
          <Badge size="xs" color="grape">
            {chain.network}
          </Badge>
        </Group>

        <Divider my="sm" variant="dashed" />

        <Group position="apart" spacing="xl">
          {isLoaded ? (
            <Text fz="sm">{balance.slice(0, 12)}</Text>
          ) : (
            <Loader variant="dots" />
          )}
          <Text fz="sm">{chain.nativeCurrency?.symbol}</Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default BalanceBlock;
