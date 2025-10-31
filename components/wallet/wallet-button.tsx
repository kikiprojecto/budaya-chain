'use client';

import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { truncateAddress } from '@/lib/solana-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Wallet Connect Button
 * Displays wallet connection status and balance
 */
export function WalletButton() {
  const {
    connected,
    connecting,
    publicKey,
    balance,
    connect,
    disconnect,
  } = useWallet();

  if (connecting) {
    return (
      <Button disabled variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (!connected || !publicKey) {
    return (
      <Button onClick={() => connect()} variant="default">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {truncateAddress(publicKey.toBase58())}
          </span>
          {balance !== null && (
            <span className="hidden md:inline text-muted-foreground">
              ({balance.toFixed(2)} SOL)
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm">
          <div className="font-medium">Address</div>
          <div className="text-muted-foreground text-xs font-mono">
            {publicKey.toBase58()}
          </div>
        </div>
        {balance !== null && (
          <div className="px-2 py-1.5 text-sm">
            <div className="font-medium">Balance</div>
            <div className="text-muted-foreground">
              {balance.toFixed(4)} SOL
            </div>
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Wallet Status Badge
 * Simple connection indicator
 */
export function WalletStatus() {
  const { connected, publicKey, balance } = useWallet();

  if (!connected || !publicKey) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-destructive" />
        Not Connected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="font-mono">{truncateAddress(publicKey.toBase58())}</span>
      {balance !== null && (
        <span className="text-muted-foreground">
          • {balance.toFixed(2)} SOL
        </span>
      )}
    </div>
  );
}
