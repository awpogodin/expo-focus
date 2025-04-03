import { toast, alert } from 'burnt';

type ToastOptions = {
  title: string;
  message?: string;
  /**
   * Defaults to `done`.
   */
  preset?: 'done' | 'error' | 'none';
  /**
   * Duration in seconds.
   */
  duration?: number;
  haptic?: 'success' | 'warning' | 'error' | 'none';
  /**
   * Defaults to `true`.
   */
  shouldDismissByDrag?: boolean;
  /**
   * Change the presentation side.
   * @platform ios
   */
  from?: 'top' | 'bottom';
};

export const useToast = () => {
  const showToast = (options: ToastOptions) => {
    toast({
      preset: 'none', // or "error", "none", "custom"
      haptic: 'success', // or "success", "warning", "error"
      from: 'top', // ios only, "top" or "bottom"
      ...options,
    });
  };

  const showAlert = alert;

  return {
    showToast,
    showAlert,
  };
};
