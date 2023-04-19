import React from "react";
import Chains from "./Utils/Chains";
import { Group, SimpleGrid } from "@mantine/core";
import BalanceBlock from "./elements/BalanceBlock";

const Balance = () => {
  const chains = Chains;

  return (
    <Group position="center" p="xl">
      <SimpleGrid cols={3}>
        {chains.map((chain) => (
          <BalanceBlock network={chain} key={chain.id} />
        ))}
      </SimpleGrid>
    </Group>
  );
};

export default Balance;
