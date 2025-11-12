import { Page } from "../utilities/page";

export interface Instructions {
  getByIndex( index: number);
  mysteries;
  pages: Page[];
  homeTitle: string;
  home1: string;
  home2: string;
}
