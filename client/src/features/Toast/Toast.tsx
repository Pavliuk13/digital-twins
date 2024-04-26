import { toast, ToastBar, Toaster, DefaultToastOptions } from 'react-hot-toast';

import styles from './Toast.module.scss';

const toastOptions: DefaultToastOptions = {
  duration: 3000,
  style: {
    fontSize: 14,
    color: '#ffffff',
    maxWidth: '500px',
    backgroundColor: '#202326',
  },
  success: {
    iconTheme: {
      primary: '#1b85f3',
      secondary: '#202326',
    },
  },
  loading: {
    iconTheme: {
      primary: '#1b85f3',
      secondary: '#ddebf7',
    },
  },
};

function Toast() {
  return (
    <Toaster toastOptions={toastOptions}>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className={styles.toast} onMouseEnter={() => toast.dismiss()}>
              <div data-cid={`toast-icon-${t.type}`}>{icon}</div>
              <div data-cid="toast-message">{message}</div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default Toast;
