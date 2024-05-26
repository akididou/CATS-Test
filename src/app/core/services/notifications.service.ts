import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
    ) { }

    notification(message: string, action = '', config?: MatSnackBarConfig): void {
        this.snackBar.open(message, action, config);
    }

    notificationSuccess(message: string): void {
        this.snackBar.open(message, 'Fermer', { panelClass: ['alertSnackBar', 'alertSnackBar-success'], duration: 3000 });
    }

    notificationError(): void {
        this.snackBar.open('Une erreur est survenue :(', 'Fermer', { panelClass: ['alertSnackBar', 'alertSnackBar-error'], duration: 3000 });
    }

    notificationErrorWithText(message: string): void {
        this.snackBar.open(message, 'Fermer', { panelClass: ['alertSnackBar', 'alertSnackBar-error'], duration: 3000 });
    }
}
