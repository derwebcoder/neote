// import type { NeoteTag } from "@/modules/tags/components/NeoteTag";

import { Environment } from "@/modules/environment/types/Environments";

// CSS module declarations
declare module "*.css" {
  const content: any;
  export default content;
}

// declare module "react" {
//   namespace JSX {
//     interface IntrinsicElements {
//       "neote-tag": CustomElement<NeoteTag>;
//     }
//   }
// }

interface DocumentPictureInPicture {
	window?: Window;
	requestWindow(options: { width: number; height: number }): Promise<Window>;
}

declare global {
	interface Window {
		documentPictureInPicture?: DocumentPictureInPicture;
		neote?: Environment
	}
}

export type { }