export interface IUserCollectionTable {
  idUser: number;
  idCollection: number;
  use: boolean;
  edit: boolean;
  own: boolean;
}

const userCollectionTable: IUserCollectionTable[] = [
        {
          idUser:1,
          idCollection:1,
          use: true,
          edit: true,
          own:false,
        },
        {
          idUser:1,
          idCollection:2,
          use: true,
          edit: false,
          own:false,
        },
        {
          idUser:1,
          idCollection:3,
          use: false,
          edit: true,
          own:true,
        },
        {
          idUser:2,
          idCollection:1,
          use: true,
          edit: true,
          own:false,
        },
        {
          idUser:2,
          idCollection:2,
          use: true,
          edit: true,
          own:true,
        },
        {
          idUser:3,
          idCollection:1,
          use: false,
          edit: false,
          own:true,
        },
        {
          idUser:3,
          idCollection:3,
          use: true,
          edit: true,
          own:true,
        },
    ];
export default userCollectionTable