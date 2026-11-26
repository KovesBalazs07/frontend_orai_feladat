export type KuldetesStatusz = | 'tervezett' | 'folyamatban' | 'teljesitett' | 'megszakitott';

export interface Kuldetes {
  id: string;
  cim: string;
  celpont: string;
  urhajoId: string;
  kapitany: string;
  inditas: string;
  idotartamNap: number;
  prioritas: number;
  statusz: KuldetesStatusz;
  legenyseg: string[];
  leiras: string;
}

export type UjKuldetes = Omit<Kuldetes, 'id'>;