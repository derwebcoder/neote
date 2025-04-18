import type { NeoteTag } from "@/modules/tags/components/NeoteTag";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "neote-tag": CustomElement<NeoteTag>;
    }
  }
}
