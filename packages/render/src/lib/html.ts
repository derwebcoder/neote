/**
 * Renders a given template string.
 *
 * (!) Not optimised for performance.
 *
 * Add a `ref` attribute to each element you want to get as part of the return value
 *
 * @param template
 * @param expressions
 * @returns a tuple of the wrapper element and all with `ref` marked elements
 */
export const html = <ROOT extends HTMLElement, REFS extends HTMLElement[]>(
  template: TemplateStringsArray,
  ...expressions: string[]
): [ROOT, ...REFS] => {
  let html = template[0];
  for (let i = 1; i < template.length; i++) {
    html += expressions[i - 1] + template[i];
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  // briefly add wrapper to the document so that custom elements are being connected
  document.body.appendChild(wrapper);
  document.body.removeChild(wrapper);

  if (wrapper.children.length > 1 || !wrapper.children.item(0)) {
    throw new Error(
      "@neote/render: html does not support multiple container elements. Please wrap your code in one element.",
    );
  }

  const refs = [...wrapper.querySelectorAll("[ref]")] as REFS;
  refs.forEach((ref) => ref.removeAttribute("ref"));

  return [wrapper.children.item(0) as ROOT, ...refs];
};
