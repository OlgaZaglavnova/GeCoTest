export interface Good {
    id: number;
    name: string;
    category: number;
    price: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface DataType {
    goods: Good[];
    categories: Category[];
}

export enum CartVariableName {
    LocalStorageCartName = 'GECOCART'
}
