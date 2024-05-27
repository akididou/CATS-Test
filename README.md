# Test technique CATS 

Le projet est visible sur mon site : https://cats.jppoizat.fr

Le projet à été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Point technique utilisé 

 - Store : Pour éviter un call à l'API des assets 
 - Custom Pipe : Afin de mettre en forme les données récupérées de l'API
 - Mat-Table : Afin de mettre en ordre les données récupérées de l'API. 
 Ici le choix à été de ne pas surcharger l'application avec une autre librairie alors que Angular Material peut largement faire le travail
 - Mat-Stepper : Afin de faire un semblant de parcours d'achat pour les tickets de transport. 
 - Travail en features séparées


## Pour aller plus loin

Dans l'idée ou ce projet serait celui d'un vrai projet d'entreprise, nous aurions pu aller plus loin en ajoutant des fonctionnalités tel que : 
 - Mise en place d'un Virtual Scrool pour optimiser les perfomances du tableau.
 - Gérer une pagination dans le call à l'API pour les assets et les exchanges
 - Mise en place de test end 2 end afin de vérifier les calls aux APIs et leur bon affichage
 - Mise en place d'un CI/CD, qui vérifirait le code et push automatiquement en préprod/prod suivant la branch 
 - Mettre un loader sur l'appel API 
