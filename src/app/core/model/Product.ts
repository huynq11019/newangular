export interface IProduct {
  cateGoryofPro?: string;
  category?: number;
  createdAt?: Date;
  createdBy?: number;
  deleteAt?: Date;
  description?: string;
  discount?: number;
  id?: number;
  image?: string;
  lastUpdated?: Date;
  nameProduct?: string;
  quantity?: number;
  realPrice?: number;
  status?: number;
  updatedBy?: number;
}

export class Product implements IProduct {
  constructor(
    public cateGoryofPro?: string,
    public category?: number,
    public createdAt?: Date,
    public createdBy?: number,
    public deleteAt?: Date,
    public description?: string,
    public discount?: number,
    public id?: number,
    public image?: string,
    public lastUpdated?: Date,
    public nameProduct?: string,
    public quantity?: number,
    public realPrice?: number,
    public status?: number,
    public updatedBy?: number,
  ) {
  }
}
