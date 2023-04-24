import React from 'react'
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import { Anchor, Button, Menu, Group, Text, useMantineColorScheme } from '@mantine/core'
import { Power, Wallet, Sun, Moon, Search, PigMoney } from 'tabler-icons-react'
import Image from 'next/image'
import Chains from '../Utils/Chains'

const ConnectIcon = (connector: Connector) => {
  const [height, width] = [36, 36]

  switch (connector.id) {
    case 'walletConnect':
      return (
        <Image
          src="images/walletConnectors/walletconnect.svg"
          height={height}
          width={width}
          alt="TrustWallet, Exodus ..."
        />
      )
    case 'injected':
      return (
        <Image
          src="images/walletConnectors/metamask.svg"
          height={height}
          width={width}
          alt="Metmask, CoinBase, Brave ..."
        />
      )
    case 'ledger':
      return (
        <Image
          src="images/walletConnectors/ledger-square.svg"
          height={height}
          width={width}
          alt="Metmask, CoinBase, Brave ..."
        />
      )
    case 'coinbaseWallet':
      return (
        <Image
          src="images/walletConnectors/coinbasewallet.svg"
          height={height}
          width={width}
          alt="Metmask, CoinBase, Brave ..."
        />
      )
  }
}

const ConnectButton = () => {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect({
    onError(error) {
      console.log('Error', error)
    },
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const chains = Chains

  if (isConnected) {
    return (
      <Menu position="bottom-end">
        <Menu.Target>
          <Button color="gray" radius="md" leftIcon={<Wallet />}>
            {`${address?.slice(0, 6)}...${address?.slice(38)}`}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Private zone</Menu.Label>
          <Menu.Item icon={<PigMoney />}>
            <Anchor underline={false} color="DefaultMantineColor" href="/balance">
              Balance
            </Anchor>
          </Menu.Item>
          <Menu.Item onClick={() => toggleColorScheme()} icon={colorScheme === 'dark' ? <Sun /> : <Moon />}>
            Switch
          </Menu.Item>
          <Menu.Item onClick={() => disconnect()} icon={<Power />}>
            Disconnect
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>
            <Group position="apart">
              <Text>Block Explorer</Text>
              <Search height={15} width={15} />
            </Group>
          </Menu.Label>
          {chains.map((network) => (
            <Menu.Item
              icon={
                <Image
                  src={`/images/networks/${network.network.split('-')[0]}.webp`}
                  height={20}
                  width={20}
                  alt={network.blockExplorers.default.name}
                />
              }
              key={network.id}
            >
              <Anchor
                href={`${network.blockExplorers.default.url}/address/${address}`}
                target="_blank"
                underline={false}
                color="DefaultMantineColor"
              >
                {network.blockExplorers.default.name}{' '}
              </Anchor>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button radius="md">Connect Wallet</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {connectors.map((connector) => (
          <Menu.Item
            onClick={() => connect({ connector })}
            icon={ConnectIcon(connector)}
            disabled={!connector.ready}
            key={connector.id}
          >
            {connector.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default ConnectButton
