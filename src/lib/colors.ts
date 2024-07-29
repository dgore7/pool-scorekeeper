export function getCssPropertyValue(property: string) {
  return getComputedStyle(document.body).getPropertyValue(property);
}
