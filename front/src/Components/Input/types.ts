import {ChangeEvent} from "react";

export interface InputProps {
  type: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
}