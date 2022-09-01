---
id: démarrage-rapide-(fr)
title: Démarrage rapide (FR)
---

# Tutoriel Gephi <br/> Démarrage rapide  
Bienvenue sur ce tutoriel. Vous apprendrez ici les étapes fondamentales pour visualiser et manipuler un réseau dans Gephi.  

Ce tutoriel se base sur la version 0.7alpha2 de Gephi.  
[Télécharger Gephi](https://gephi.org/users/download/)  

# Import de fichiers  
## Ouverture d’un fichier graphe  
* Téléchargez le fichier [LesMiserables.gexf](https://gephi.org/datasets/LesMiserables.gexf)  
* Dans la barre de menu, allez dans le menu **Fichier** et **Ouvrir...**  

~~ Image : tutorial_quickstart1_FR ~~  

<STRONG>Format des graphes</STRONG>  
- GEXF  
- GraphML  
- Pajek NET  
- GDF  
- GML  
- Tulip TLP  
- CSV  
- ZIP compressé  

## Rapport d’import  
<ul>
<li>Lorsque votre fichier s’ouvre, le rapport récapitule les données trouvées et les problèmes rencontrés.</li>  
<ul>
<li>Nombre de noeuds</li>  
<li>Nombre de liens</li>  
<li>Type de graphe</li>  
</ul>  
</ul>  
* Cliquez sur **OK** pour valider et visualiser le graphe.  

~~ Image : tutorial_quickstart2_FR ~~  

## Affichage du graphe  
Nous avons importé le fichier de données LesMiserables.gexf<sup>1</sup>. Il s’agit du réseau pondéré des apparitions simultanées des personnages du roman _Les Misérables_ de Victor Hugo.  
~~ Image : ? ~~  

Les noeuds sont d’abord placés de manière aléatoire, la présentation que vous voyez peut donc différer légèrement.  

<cite><sup>1</sup>D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial Computing, Addison-Wesley, Reading, MA (1993)</cite>  

# Visualisation  
## Visualisation du graphe  
<ul>
<li>Utilisez votre souris pour vous déplacer dans la visualisation et modifier son échelle.</li>  
<ul>
<li>Zoom : Molette de la souris</li>  
~~ Image : ? ~~
<li>Panoramique : Glisser à droite</li>  
~~ Image : ? ~~
</ul>
</ul>  
* L’**échelle du poids des liens** se trouve en bas de la fenêtre.  

~~ Image : gephi_configure_labels__bisFR ~~
* Si vous ne voyez plus votre graphe, réinitialisez l’échelle.  

~~ Image : ? ~~  

# Spatialisation  
## Spatialisation du graphe  
La fonction principale des algorithmes de spatialisation est de définir la forme du graphe.  
* Repérez le module **Spatialisation** dans le volet à gauche de l’écran.  
* Sélectionnez **Force Atlas**.  
Vous pouvez voir les propriétés de la spatialisation sous son nom. Conservez les valeurs.  
* Pour lancer l’algorithme, cliquez sur **Exécuter**.  

<STRONG>Algorithmes de spatialisation</STRONG>  
La spatialisation des graphes est généralement réalisée à partir d’algorithmes basés sur les forces. Ils suivent un principe simple : les noeuds reliés s’attirent et les noeuds non reliés se repoussent.  

## Contrôle de la spatialisation  
Les propriétés de spatialisation vous permettent de contrôler l’algorithme afin de générer une représentation esthétique.  
~~ Image : tutorial_quickstart9_FR ~~
* Pour agrandir le graphe, réglez la **Force de répulsion** sur 10 000.  
* Pour valider la valeur modifiée, appuyez sur la touche **Entrée** de votre clavier.  
* Vous pouvez maintenant **Arrêter** l’algorithme.  

## Affichage du graphe spatialisé  
~~ Image : ? ~~  

# Classement (par couleur)  
## Classement (par couleur)  
Le module **Classement** vous permet de configurer la couleur et la taille d’un noeud.  
* Cliquez sur le module **Classement** en haut à gauche de l’écran.  
* Sélectionnez **Degré** comme paramètre de classement.  

~~ Image : tutorial_quickstart12_FR ~~  

Le panneau de configuration suivant s’affiche :  
~~ Image : tutorial_quickstart13_FR ~~  
* Cliquez sur **Appliquer** pour afficher le résultat.  

## Configuration des couleurs  
~~ Image : tutorial_quickstart13_FR ~~  
* Déplacez la souris sur le curseur de dégradé.  
~~ Image : ? ~~  
* Pour configurer la couleur, double-cliquez sur les triangles.  
~~ Image : ? ~~  

<STRONG>Palette</STRONG>  
Pour utiliser la palette, double-cliquez sur le volet.  
~~ Image : tutorial_quickstart17_FR + ? ~~  

## Tableau des résultats du classement  
Vous pouvez voir les valeurs du classement en affichant le tableau des résultats. Le noeud Valjean possède 36 liens et est le plus connecté du réseau.  
* Activez l’affichage des résultats sous forme de tableau.  
* Cliquez à nouveau sur le bouton **Appliquer**.  

~~ Image : tutorial_quickstart18_FR ~~  

# Métriques  
## Métriques  
Nous allons calculer la longueur de chemin moyenne pour le réseau. Cela permet de calculer la longueur du chemin entre toutes les paires de noeuds et de fournir des informations sur la distance entre les noeuds.  
* Dans le volet droit, cliquez sur le module **Statistiques**.  
* Cliquez sur **Exécuter** en face de **Plus courts chemins**.  

~~ Image : tutorial_quickstart19_FR ~~

<STRONG>Métriques disponibles</STRONG>  
- Diamètre  
- Plus courts chemins  
- Coefficient de Clustering  
- PageRank  
- HITS  
- Betweeness Centrality  
- Closeness Centrality  
- Excentricité  
- Détection de communauté (Modularité)  

## Configuration des métriques  
Le panneau de configuration s’affiche.  
~~ Image : tutorial_quickstart20_FR ~~  
Pour calculer la métrique, sélectionnez **Dirigé**, puis cliquez sur **OK**.  

## Résultat des métriques  
À la fin du traitement, le résultat de la métrique est affiché dans un rapport.  
~~ Image : tutorial_quickstart21 ~~  

# Classement (par taille)  
## Classement (par taille)  
Les métriques génèrent des rapports généraux ainsi que les résultats pour chaque noeud.  
Ainsi, trois nouvelles valeurs ont été créées par l’algorithme **Plus courts chemins**.  
<ul>
<li>**Betweeness Centrality**</li>  
<li>**Closeness Centrality**</li>  
<li>**Excentricité**</li>  
</ul>    

* Retournez sur l’onglet **Classement**.  
* Sélectionnez **Betweeness Centrality** dans la liste déroulante.  
~~ Image : tutorial_quickstart22_FR ~~  
Cette métrique fait ressortir les noeuds les plus importants dont la fréquence est la plus élevée.  

À présent, paramétrez la taille des noeuds. L’indicateur de **Degree** (Degré) est toujours représenté par des couleurs.  
* Pour définir la taille, sélectionnez l’icône en forme de diamant dans la barre d’outils.  
* Définissez la taille minimale sur 10 et la taille maximale sur 50.  
~~ Image : tutorial_quickstart23_FR ~~  
* Pour voir le résultat, cliquez sur **Appliquer**.  

## Graphe avec différenciation de couleurs et de tailles  
~~ Image : ?  ~~  
Couleur : Degree (Degré)  
Taille : Métrique **Betweeness Centrality**  

# Nouvelle spatialisation  
## Nouvelle spatialisation  
La spatialisation n’est pas totalement satisfaisante. En effet, des noeuds de grande taille chevauchent parfois des noeuds plus petits.  
L’algorithme **Force Atlas** dispose d’une option qui permet de prendre la taille des noeuds en considération lors de la spatialisation.  
* Retournez sur le volet **Spatialisation**.  
* Cochez l’option **Ajustement par taille**, puis exécutez à nouveau l’algorithme pendant quelques instants.  
* Les noeuds ne se chevauchent plus désormais.  

~~ Image : tutorial_quickstart26_FR ~~

# Affichage des labels  
## Affichage des labels  
Explorons le réseau plus en détails maintenant que les couleurs et la taille mettent en valeur les noeuds importants.  
~~ Image : tutorial_quickstart27_FR ~~  
* Affichez les labels des noeuds.  
~~ Image : tutorial_quickstart ~~
* Paramétrez l’affichage des labels afin que leur taille soit proportionnelle à celle des noeuds.  
~~ Image : gephi_configure_labels__bisbisFR ~~  
* Pour régler la taille des labels, faites glisser le curseur de l’échelle.  
~~ Image : gephi_configure_labels__bisbisbisFR ~~  

# Détection de communauté  
## Détection de communauté  
La capacité à détecter et à étudier les communautés est essentielle à l’analyse du réseau. Dans notre exemple, nous souhaitons colorer les groupes de noeuds.  
Gephi utilise la méthode Louvain<sup>1</sup>, disponible dans le volet **Statistiques**.  
Cliquez sur **Exécuter** en regard de la ligne **Modularité**.  
~~ Image : tutorial_quickstart28_FR ~~  

* Sélectionnez **Aléatoire** dans le volet.  
* Pour lancer la détection, cliquez sur **OK**.
~~ Image : tutorial_quickstart29_FR ~~  

<cite><sup>1</sup>Blondel V, Guillaume J, Lambiotte R, Mech E (2008) Fast unfolding of communities in large networks. J Stat Mech : Theory Exp 2008:P10008. (http://findcommunities.googlepages.com)</cite>  

# Partition  
## Partition  
L’algorithme de détection de communauté a créé une valeur de **Modularity Class** (classe de modularité) pour chaque noeud.  
Le module **Partition** peut utiliser ces nouvelles données pour colorer les communautés.  
* Dans le volet gauche, cliquez sur le module **Partition**.  
* Pour remplir la liste de partitions, cliquez sur le bouton **Rafraîchir**.  
~~ Image : tutorial_quickstart30_FR ~~  

<STRONG>Comment visualiser les colonnes affichant les noeuds et les liens ?</STRONG>  
Pour afficher les colonnes et les valeurs des noeuds et des liens, consultez le **Tableau de données**.  
Pour actualiser le tableau, cliquez sur l’onglet **Laboratoire des données**, puis cliquez sur **Noeuds**.    

<br />
* Dans la liste de partitions, sélectionnez **Modularity Class** (classe de modularité).  
Dans l’exemple ci-dessous, neuf communautés ont été trouvées. Le nombre de communautés est variable. Une couleur a été définie au hasard pour chaque identifiant de communauté.  
~~ Image : tutorial_quickstart31_FR ~~  
* Pour afficher les noeuds en couleur, cliquez sur **Appliquer**.  
Pour accéder à la fonction **Générer les couleurs aléatoirement**, cliquez sur le volet à l’aide du bouton droit de la souris.  
~~ Image : tutorial_quickstart33_FR ~~  

## Nouvelle apparence du réseau  
~~ Image : ? ~~  

# Filtrage  
## Filtrage  
Le filtrage constitue la dernière manipulation. Il est possible de créer des filtres permettant de masquer certains noeuds et liens du réseau. Dans cet exemple, nous allons créer un filtre afin de supprimer les feuilles, c’est-à-dire les noeuds à lien unique.  
~~ Image : tutorial_quickstart34_FR ~~  
* Dans le volet droit, cliquez sur le module **Filtres**.  
* Dans la catégorie **Topologie**, sélectionnez **Plage de degrés**.  
~~ Image : tutorial_quickstart35_FR ~~  
* Sous **Requêtes**, faites glisser l’option sur **Glissez** le filtre ici.  
~~ Image : tutorial_quickstart36_FR ~~  
* Pour activer le filtre, cliquez sur **Plage de degrés**. Le volet des paramètres s’affiche.  
~~ Image : tutorial_quickstart37_FR ~~  
Ce volet comprend un curseur de réglage de la plage de degrés ainsi qu’un graphique représentant les données, ici la répartition par degrés.  
~~ Image : tutorial_quickstart39_FR ~~  
* Déplacez le curseur de gauche afin de régler le degré minimum sur 2.  
* Pour appliquer le filtre, cliquez sur le bouton **Filtrer**.  
Les noeuds dont le degré est inférieur à 2 sont désormais masqués.  

<STRONG>Astuce</STRONG>  
Pour modifier les limites des degrés, double-cliquez sur les valeurs correspondantes.  
~~ Image : ? ~~  

## Réseau filtré  
~~ Image : ? ~~  
La manipulation est terminée. Nous allons à présent prévisualiser la modélisation et préparer l’export.  

# Prévisualisation  
## Prévisualisation  
<ul>
<li>Avant d’exporter le graphe au format SVG ou PDF, allez sur la **Prévisualisation** pour :</li>  
<ul>
<li>obtenir un aperçu exact du graphe ;</li>  
<li>y apporter la touche finale.</li>  
</ul>
</ul>
* Dans le ruban, sélectionnez l’onglet **Prévisualisation** :  
~~ Image : tutorial_quickstart41_FR ~~  
* Pour afficher la prévisualisation, cliquez sur **Rafraîchir**.  
~~ Image : tutorial_quickstart_preview_FR ~~

<STRONG>Astuce</STRONG>  
Si le graphe est trop grand, vous pouvez afficher un graphe partiel en déplaçant le curseur du **Ratio** à 50 % ou à 25 %.  

* Dans la catégorie **Labels de noeud**, activez la case à cocher **Afficher les labels**.  
* Cliquez sur **Prévisualiser**.  
~~ Image : tutorial_quickstart44_FR ~~  
Dans les **Paramètres d’aperçu**, cliquez sur la liste de **Réglages** prédéfinis et essayez différentes configurations.  

## Prévisualisation du graphe  
~~ Image : ~~  

# Export  
## Export au format SVG  
À partir de la **Prévisualisation**, cliquez sur **SVG** en face de **Export**.  
~~ Image : tutorial_quickstart43_FR ~~  

Tout comme les PDF, les fichiers SVG sont des graphiques vectoriels. Les images peuvent facilement être redimensionnées. Il est donc possible de les imprimer ou de les intégrer à des présentations en haute résolution.  

Les fichiers SVG peuvent être modifiés à l’aide du logiciel Inkscape ou Adobe Illustrator.  
~~ Image : ~~  

<STRONG>Captures d’écran en haute résolution</STRONG>  
Si vous préférez uniquement les captures d’écran au format PNG en haute résolution, cliquez sur l’icône ~~ Image : ? ~~ située sous l’aperçu, dans la barre des paramètres d’aperçu.  

# Enregistrement  
## Enregistrement du projet  
L’enregistrement de votre projet regroupe l’ensemble des données et des résultats dans un fichier de session unique.  
~~ Image : tutorial_quickstart48_FR ~~  
~~ Image : ? ~~  
Si vous n’avez pas suivi toutes les étapes, vous pouvez télécharger la session :  
[https://gephi.org/datasets/lesmiserables.gml.zip](https://gephi.org/datasets/lesmiserables.gml.zip)

# Conclusion  
Ce tutoriel vous a présenté les manipulations de base permettant d’ouvrir, de visualiser, de manipuler et de générer un fichier de réseau avec Gephi.  
~~ Images : ??? ~~  
Pour en savoir plus :  
* [Site Web Gephi](http://gephi.org/)  
* [Wiki Gephi](http://wiki.gephi.org/)  
* [Forum Gephi](http://wiki.gephi.org/)  

Ces pages sont disponibles uniquement en anglais.  

Dernière mise à jour le 5 mars 2010  