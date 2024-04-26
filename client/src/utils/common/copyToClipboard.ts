import toast from 'react-hot-toast';

export const copyToClipboard = (text: string, callback?: () => void) => {
  if (window.clipboardData && window.clipboardData.setData) {
    return window.clipboardData.setData('Text', text);
  }

  if (
    document.queryCommandSupported &&
    document.queryCommandSupported('copy')
  ) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand('copy');
    } catch (ex) {
      return false;
    } finally {
      document.body.removeChild(textarea);

      if (callback) {
        callback();
      } else {
        toast.success('Successfully copied');
      }
    }
  }
  return false;
};
