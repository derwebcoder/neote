import { DetailedHTMLProps, HTMLAttributes } from "react";

export type CustomElement<
  T extends HTMLElement,
  Attributes,
> = DetailedHTMLProps<HTMLAttributes<T>, T> & Attributes;
// Partial<
//   T & // DOMAttributes<T> &
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   { children: any } & (K extends string ? CustomEvents<`on${K}`> : object)
// >;
