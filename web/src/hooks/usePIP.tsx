import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export const usePIP = () => {
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
	};

	const PIPWrapper = ({ children }: { children: React.ReactNode }) => (
		<>
			{PIPWindow &&
				createPortal(
					children,
					PIPWindow.document.body,
				)}
		</>
	)

	return {
		triggerPIP,
		PIPWrapper,
		PIPWindow
	}
}