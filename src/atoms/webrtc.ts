import { DefaultPeerConfiguration } from '@/webrtc/connection';
import { atom } from 'jotai';

export const PeerConnectionAtom = atom<RTCPeerConnection | undefined>(
  undefined
);

export const PeerConfigurationAtom = atom<RTCConfiguration>(
  DefaultPeerConfiguration
);
