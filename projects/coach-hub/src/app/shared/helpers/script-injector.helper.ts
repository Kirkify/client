export function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', () => reject('Error loading script.'));
    script.addEventListener('abort', () => reject('Script loading aborted.'));
    document.head.appendChild(script);
  });
}
