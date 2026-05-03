import { FightState } from './fight.model';

export type PlayerStatus = 'WAITING_ACTION' | 'MUST_SWITCH';

/**
 * Generic Packet Structure
 */
export type Packet<TType extends string, TData> = {
  token: string;
  type: TType;
  data: TData;
};


export type AttackData = {
  moveSlot: number;
};

export type SwitchData = {
  switchToSlotIndex: number;
};

export type JoinData = {
  userId: string;
};

export interface PacketMap {
  AttackPacket: AttackData;
  SwitchPacket: SwitchData;
  MustSwichPacket: {};
  JoinPacket: JoinData;
  FullStatePacket: { game: FightState };
  GameStartPacket: {};
}


export type Message = {
  [K in keyof PacketMap]: Packet<K, PacketMap[K]>
}[keyof PacketMap];
