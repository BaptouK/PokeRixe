import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Intercepteur global pour gérer les erreurs HTTP.
 * Affiche une erreur dans la console et propage l'erreur.
 * @param req Requête HTTP interceptée
 * @param next Fonction pour continuer la chaîne d'intercepteurs
 * @returns Observable de la réponse HTTP ou de l'erreur
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error(`[HTTP ${err.status}]`, err.message);
      return throwError(() => err);
    })
  );
};
