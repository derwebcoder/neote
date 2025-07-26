import { Environment } from "@/modules/environment/types/Environments";

// CSS module declarations
declare module "*.css" {
	const content: any;
	export default content;
}

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