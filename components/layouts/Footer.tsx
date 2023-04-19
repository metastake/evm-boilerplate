import React, { Footer, Group, Text } from "@mantine/core";

const TheFooter = () => {
  return (
    <Footer height={60} p="md">
      <Group position="apart">
        <Text size="sm">© {new Date().getFullYear()} MetaStake Labs</Text>
      </Group>
    </Footer>
  );
};

export default TheFooter;
