import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@excalidraw/excalidraw';
import { z } from 'zod';
import SidebarBase, { SidebarBasePropsSchema } from './Base';
import { Button, Input, Link } from '@mui/material';
import { copyToClipboard } from '@/utilities/clipboard';
import { useAtom } from 'jotai';
import { PeerConfigurationAtom, PeerConnectionAtom } from '@/atoms/webrtc';

export type CollaborationSidebarProps = z.infer<
  typeof CollaborationSidebarPropsSchema
>;

export const CollaborationSidebarPropsSchema = z
  .object({})
  .merge(SidebarBasePropsSchema);

const CollaborationSidebar: FC<CollaborationSidebarProps> = (props) => {
  const [peerConnection, setPeerConnection] = useAtom(PeerConnectionAtom);

  const [peerConfiguration] = useAtom(PeerConfigurationAtom);

  const initializePeerConnection = useCallback(() => {
    if (peerConnection) {
      devlog.warn('Peer connection already initialized');
      return;
    }

    setPeerConnection(new RTCPeerConnection(peerConfiguration));
  }, [peerConfiguration, peerConnection, setPeerConnection]);

  const [collaborationUrl, setCollaborationUrl] = useState<URL | null>(null);
  const [isCollaborationStarted, setIsCollaborationStarted] = useState(false);
  const [providedCollaborationUrl, setProvidedCollaborationUrl] =
    useState<URL | null>(null);

  const onMessage = useCallback((event: MessageEvent) => {
    devlog.log(event);
  }, []);

  const copyCollaborationUrl = useCallback(
    () => copyToClipboard(collaborationUrl?.toString(), undefined),
    [collaborationUrl]
  );

  // TODO: Check this !!
  const offerWerapper = useCallback(async () => {
    if (!peerConnection) {
      devlog.error('Peer connection not initialized');
      return;
    }

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    devlog.log(offer);
  }, []);

  return (
    <SidebarBase onClose={props.onClose}>
      <Sidebar.Header>Collaboration</Sidebar.Header>
      <Button onClick={initializePeerConnection}>
        Initialize a local peer.
      </Button>
      <Button> Create a new collaboration session. (offer)</Button>
    </SidebarBase>
  );
};

export default CollaborationSidebar;
