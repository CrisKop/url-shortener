import { ObjectId } from "mongodb";

declare global {
  // lo que viene del backend
  interface LinkDTO {
    _id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    timesVisited: string;
    shortened: string;
  }

  // tu tipo en el frontend (ya convertido)
  interface Link {
    _id?: string | ObjectId;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    timesVisited: number;
    shortened: string;
  }
}

export {};
