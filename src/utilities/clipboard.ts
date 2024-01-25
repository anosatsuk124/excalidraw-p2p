export const copyToClipboard = (
  text: string | undefined | null,
  callback: (() => void) | undefined
) => {
  if (!text) {
    devlog.log('no text to copy');
    return;
  }

  devlog.log('copy collaboration url');
  devlog.log(text);

  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch((err: DOMException) => {
      devlog.error(`Could not copy text why: ${err.toString()}`);
    });
};
