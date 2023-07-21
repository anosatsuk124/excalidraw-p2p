import { FC, useCallback, useEffect, useState } from 'react';
import { Button, SidebarHeader } from '@/Components/Utilities';
import { z } from 'zod';
import SidebarProviderBase, { SidebarBasePropsSchema } from './Base';
import { startCollaboration } from '@/webrtc/collaboration';
import {
  SignalingData,
  decodeSignalingData,
  encodeSignalingData,
} from '@/webrtc/utilities';
import { Input, Link } from '@mui/material';
import { fromUrl, toUrl } from '@/utilities/url';
import { copyToClipboard } from '@/utilities/clipboard';

export type CollaborationSidebarProps = z.infer<
  typeof CollaborationSidebarPropsSchema
>;

export const CollaborationSidebarPropsSchema = z
  .object({})
  .merge(SidebarBasePropsSchema);

const CollaborationSidebar: FC<CollaborationSidebarProps> = (props) => {
  const signalingDataCallback = useCallback((data: SignalingData) => {
    const encodedData = encodeSignalingData(data);
    const url = toUrl({ signalingData: encodedData });

    setCollaborationUrl(url);

    console.log(data);
  }, []);

  const [collaborationUrl, setCollaborationUrl] = useState<URL | null>(null);
  const [isCollaborationStarted, setIsCollaborationStarted] = useState(false);
  const [providedCollaborationUrl, setProvidedCollaborationUrl] =
    useState<URL | null>(null);

  const onMessage = useCallback((event: MessageEvent) => {
    console.log(event);
  }, []);

  const startCollaborationWrapper = useCallback(async () => {
    console.log('start collaboration');

    const signalingData = providedCollaborationUrl
      ? decodeSignalingData(fromUrl(providedCollaborationUrl).signalingData!)
      : undefined;

    console.log(signalingData);

    await startCollaboration(signalingData, signalingDataCallback, {
      onMessage,
    });
  }, [signalingDataCallback, onMessage, providedCollaborationUrl]);

  const copyCollaborationUrl = useCallback(async () => {
    console.log('copy collaboration url');
    console.log(collaborationUrl?.toString());
    await copyToClipboard(collaborationUrl ? collaborationUrl?.toString() : '');
  }, [collaborationUrl]);

  useEffect(() => {
    if (isCollaborationStarted || providedCollaborationUrl) {
      startCollaborationWrapper().catch((error) => console.error(error));
    }
  }, [
    isCollaborationStarted,
    startCollaborationWrapper,
    providedCollaborationUrl,
  ]);

  return (
    <SidebarProviderBase onClose={props.onClose}>
      <SidebarHeader>Collaboration</SidebarHeader>
      <Button onClick={() => setIsCollaborationStarted(true)}>
        Start Collaboration
      </Button>
      <Link>{collaborationUrl?.toString()}</Link>
      <Button
        onClick={() => {
          copyCollaborationUrl().catch((e) => console.error(e));
        }}
      >
        Copy
      </Button>
      <Input
        value={providedCollaborationUrl ?? ''}
        onChange={(e) => setProvidedCollaborationUrl(new URL(e.target.value))}
      ></Input>
    </SidebarProviderBase>
  );
};

export default CollaborationSidebar;
