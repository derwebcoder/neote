// import type { NeoteTag } from "@/modules/tags/components/NeoteTag";

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
	}
}

export type {}