import { Tooltip } from "bootstrap";

export const activateBootstrapTooltips = () => {
  const tooltips = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltips.map((el) => new Tooltip(el, { html: true }));
};
