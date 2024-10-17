import React, { useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';  
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

import { FilterChain } from '@dynamic-labs/sdk-react-core';

import {
    BaseChainIcon,
    BitcoinIcon,
    EthereumIcon,
    PolygonIcon,
    SolanaIcon,
  } from '@dynamic-labs/iconic';


export const DynamicProviders = ({ children }: { children: React.ReactNode }) => {

    const DYNAMIC_ENVIRONMENT_ID = "6a1e9351-8209-4f7a-b4a4-f17895ace559";

    return (
        <DynamicContextProvider
            settings={{
                apiBaseUrl: "https://auth.jasonparisi.com/api/v0",
                environmentId: DYNAMIC_ENVIRONMENT_ID,
                walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors, SolanaWalletConnectors],
                eventsCallbacks: {
                    onWalletAdded: (args) => {
                        console.log('onWalletAdded was called', args);
                    },
                    onLogout: (args) => {
                        console.log('onLogout was called', args);
                    },

                },
                overrides: {
                    views: [
                      {
                        tabs: {
                          items: [
                            {
                              label: { text: 'All chains' },
                              recommendedWallets: [
                                {
                                  walletKey: 'metamask',
                                },
                                {
                                  walletKey: 'phantom',
                                },
                              ],
                            },
                
                            {
                              label: { icon: <SolanaIcon /> },
                              walletsFilter: FilterChain('SOL'),
                            },
                            {
                              label: { icon: <BitcoinIcon /> },
                              walletsFilter: FilterChain('BTC'),
                            },
                            {
                              label: { icon: <EthereumIcon /> },
                              recommendedWallets: [
                                {
                                  walletKey: 'phantomevm',
                                },
                              ],
                              walletsFilter: FilterChain('EVM'),
                            },
                            {
                              label: { icon: <PolygonIcon /> },
                              walletsFilter: FilterChain('EVM'),
                            },
                            {
                              label: { icon: <BaseChainIcon /> },
                              walletsFilter: FilterChain('EVM'),
                            },
                          ],
                        },
                        type: 'wallet-list',
                      },
                    ],
                  },
                  recommendedWallets: [
                    {
                      walletKey: 'metamask',
                    },
                  ],
            }}
        >
            {children}
        </DynamicContextProvider>
    );
};

export default DynamicProviders;
