// import type { NeoteTag } from "@/modules/tags/components/NeoteTag";

import { Environment } from "@/types/environment";

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

export type {}