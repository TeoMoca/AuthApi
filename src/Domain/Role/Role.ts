export interface Roles {
  id: number;
  label: string;
  isDisable: boolean;
}

export class Roles implements Roles {
  constructor(
    public id: number,
    public label: string,
    public isDisable: boolean
  ) {}
}
