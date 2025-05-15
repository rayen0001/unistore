import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subject, Observable } from 'rxjs';

export interface NotificationConfig {
  duration?: number;
  action?: string;
  icon?: string;
  sound?: boolean;
  requireInteraction?: boolean;
  showInApp?: boolean;
  showNative?: boolean;
}

export interface SnackbarTheme {
  success: string;
  error: string;
  info: string;
  warning: string;
  default: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'default';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly defaultDuration = 3000;
  private notificationPermission: NotificationPermission = 'default';
  private notificationSubject = new Subject<{ title: string; options: NotificationConfig }>();
  private activeSnackbars: MatSnackBarRef<any>[] = [];
  private maxSnackbars = 3;

  private theme: SnackbarTheme = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3',
    warning: '#ff9800',
    default: '#333333',

  };

  constructor(
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {
    this.initializeNotifications();
  }

  private async initializeNotifications(): Promise<void> {
    if ('Notification' in window) {
      this.notificationPermission = await Notification.requestPermission();
    }
  }

  /**
   * Show a success message
   */
  success(message: string, config?: NotificationConfig): void {
    this.show(message, 'success', {
      duration: this.defaultDuration,
      icon: '✓',
      ...config
    });
  }

  /**
   * Show an error message
   */
  error(message: string, config?: NotificationConfig): void {
    this.show(message, 'error', {
      duration: 5000, // Longer duration for errors
      icon: '⚠',
      requireInteraction: true,
      ...config
    });
  }

  /**
   * Show an info message
   */
  info(message: string, config?: NotificationConfig): void {
    this.show(message, 'info', {
      duration: this.defaultDuration,
      icon: 'ℹ',
      ...config
    });
  }

  /**
   * Show a warning message
   */
  warning(message: string, config?: NotificationConfig): void {
    this.show(message, 'warning', {
      duration: 4000,
      icon: '⚠',
      ...config
    });
  }
  notification(message: string, config?: NotificationConfig): void {
    this.show(message, 'default', {
      duration: 4000,
      icon: '🔔',
      ...config
    });
  }
  /**
   * Show a custom message
   */
  private show(
    message: string,
    type: NotificationType,
    config: NotificationConfig
  ): void {
    this.ngZone.run(() => {
      if (config.showInApp !== false) {
        this.showSnackbar(message, type, config);
      }

      if (config.showNative !== false) {
        this.showNativeNotification(message, config);
      }
    });
  }

  /**
   * Show Material Snackbar
   */
  private showSnackbar(
    message: string,
    type: NotificationType,
    config: NotificationConfig
  ): void {
    // Manage maximum number of snackbars
    if (this.activeSnackbars.length >= this.maxSnackbars) {
      const oldestSnackbar = this.activeSnackbars.shift();
      oldestSnackbar?.dismiss();
    }

    const snackbarConfig: MatSnackBarConfig = {
      duration: config.duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`],
    };

    const snackBarRef = this.snackBar.open(
      this.formatMessage(message, config.icon),
      config.action || 'Close',
      snackbarConfig
    );

    this.activeSnackbars.push(snackBarRef);

    // Apply custom styling
    snackBarRef.afterOpened().subscribe(() => {
      const snackBarElement = document.querySelector('.mat-mdc-snack-bar-container:last-child simple-snack-bar');
      if (snackBarElement) {
        const element = snackBarElement as HTMLElement;
        element.style.backgroundColor = this.theme[type];
        element.style.color = 'white';
        element.style.fontWeight = '500';
        element.style.borderRadius = '4px';
        element.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        
        // Style the action button
        const actionButton = element.querySelector('.mat-mdc-button') as HTMLElement;
        if (actionButton) {
          actionButton.style.color = 'white';
          actionButton.style.fontWeight = '600';
        }
      }
    });

    // Cleanup after dismissal
    snackBarRef.afterDismissed().subscribe(() => {
      this.activeSnackbars = this.activeSnackbars.filter(ref => ref !== snackBarRef);
    });

    // Play sound if enabled
    if (config.sound) {
      this.playNotificationSound();
    }
  }

  /**
   * Show Native Browser Notification
   */
  showNativeNotification(
    message: string,
    config: NotificationConfig
  ): void {
    if (
      this.notificationPermission === 'granted' &&
      'Notification' in window
    ) {
      const notification = new Notification(message, {
        body: message,
        icon: config.icon,
        requireInteraction: config.requireInteraction
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      if (config.duration) {
        setTimeout(() => notification.close(), config.duration);
      }
    }
  }

  /**
   * Format message with icon
   */
  private formatMessage(message: string, icon?: string): string {
    return icon ? `${icon} ${message}` : message;
  }

  /**
   * Play notification sound
   */
  private playNotificationSound(): void {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Fi4J6cG+Eh4OQhHptdXl2gYOFhoBtd3hxhIWLhHx+bP9eYXBgYmJoZ2piZ21wbG9yeXN0d3h2eHp4eXt+gIN/goKDg4KBg4GAfX9+fYGBgoF/gH59fn19fXx7e3p7fH1+f3+AgoOChYWHh4iKioqIiIeGhIOBgYB/gIB/f4CAgICAgH9+f4CBgoKDhISFh4aHiIiHhoeGhYSEgoKBgYGAgICAgICAgICAf39/f4CAgIGBgoKDg4SEg4ODg4KCgoKBgYGBgYGBgYGAgICAgICAgICAgICAgICAgICAgICAgICAgH9/f39/f39/f39/f39/f4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA=');
    audio.play().catch(() => {
      // Ignore autoplay restrictions
    });
  }

  /**
   * Set custom theme colors
   */
  setTheme(theme: Partial<SnackbarTheme>): void {
    this.theme = { ...this.theme, ...theme };
  }

  /**
   * Set maximum number of concurrent snackbars
   */
  setMaxSnackbars(max: number): void {
    this.maxSnackbars = max;
  }

  /**
   * Dismiss all active snackbars
   */
  dismissAll(): void {
    this.activeSnackbars.forEach(ref => ref.dismiss());
    this.activeSnackbars = [];
  }

  /**
   * Get notification events as observable
   */
  getNotifications(): Observable<{ title: string; options: NotificationConfig }> {
    return this.notificationSubject.asObservable();
  }
}