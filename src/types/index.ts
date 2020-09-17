export enum VISIBILITY {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export interface Message {
  id?: number
  text: string
  visibility: VISIBILITY
}
