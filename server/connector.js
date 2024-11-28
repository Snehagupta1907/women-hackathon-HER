import TonConnect from '@tonconnect/sdk';
import { TonConnectStorage } from './storage.js';
import process from 'process';

export function getConnector(chatId) {
    return new TonConnect({
        manifestUrl: process.env.MANIFEST_URL,
        storage: new TonConnectStorage(chatId)
    });
}
