export interface Comment {
  id: number;
  by?: string;
  text?: string;
  time: number;
  kids?: number[];
  type: "comment";
  deleted?: boolean;
  dead?: boolean;
}
