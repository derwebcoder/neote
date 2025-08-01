import { defineNeoteEditor } from "@/modules/editor/components/NeoteEditor";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { toast } from "sonner";

export const usePIP = ({ Children }: { Children: React.ReactNode }) => {
	const [PIPWindow, setPIPWindow] = useState<Window | undefined>();

	const triggerPIP = async () => {
		if (!window.documentPictureInPicture) {
			console.info("Browser does not support picture in picture mode.")
			toast("Sadly your browser does not support picture in picture mode. Try for example Edge or Chrome.")
			return;
		}

		if (window.documentPictureInPicture?.window) {
			console.info("Another PIP window is already open.")
			toast("Another window is already open. You can't have two at the same time.")
			return;
		}

		const pip = await window.documentPictureInPicture?.requestWindow({
			width: 300,
			height: 150,
		});
		if (!pip) {
			return;
		}

		pip.addEventListener("pagehide", (_event) => {
			setPIPWindow(undefined);
		});

		// copy all existing styles because without would be boring
		const allStyles = [...document.styleSheets];
		for (const styles of allStyles) {
			try {
				const stylesheet = [...styles.cssRules]
					.map((rule) => rule.cssText)
					.join(" ");
				const style = document.createElement("style");
				style.textContent = stylesheet;
				pip.document.head.appendChild(style);
			} catch (e) {
				if (!styles.href) {
					continue;
				}
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.type = styles.type;
				link.media = styles.media.toString();
				link.href = styles.href;
				pip.document.head.appendChild(link);
			}
		}

		pip.document.documentElement.style.height = "100%";
		pip.document.body.className = window.document.body.className;

		// This does not seem to work, but let's keep it. Maybe it will in the future.
		const themeColor = document.createElement("meta");
		themeColor.name = "theme-color";
		themeColor.content = "#2563eb";
		pip.document.head.append(themeColor);

		setPIPWindow(pip);

		defineNeoteEditor(pip);

		const root = ReactDOM.createRoot(pip.document.body);
		root.render(Children);

		// const editor = document.createElement("neote-editor") as NeoteEditor;
		// editor.extensionTag = "enabled";
		// editor.placeholder = "Type here ...";
		// editor.className = "p-2 pe-8 h-full w-full rounded-sm border-1 border-stone-200 bg-white outline-0 focus-within:border-stone-400";
		// pip.document.body.appendChild(editor);
	};

	return {
		triggerPIP,
		PIPWindow
	}
}