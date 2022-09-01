---
id: spatialisations-(fr)
title: Spatialisations (FR)
---

# Spatialisations  

# Introduction  

Bienvenue sur ce tutoriel avancé.Vous apprendrez ici les techniques avancées de spatialisation de réseaux dans Gephi et notamment l’utilisation d’algorithmes qui déterminent la position des noeuds dans l’espace graphique.  

Ce tutoriel se base sur la version 0.8alpha de Gephi.  
[Télécharger Gephi](https://gephi.org/users/download/)  

# Installation des plug-ins  
## Installation des plug-ins de spatialisation  

Il est nécessaire d’installer des plug-ins supplémentaires.  

~~ Image : blog_geolayout1_FR.png ~~

* Dans le menu **Outils**, cliquez sur **Plug-ins**.  
* Dans l’onglet **Plug-ins disponibles**, cochez :

  * OpenOrdLayout
  * CircularLayout
  * GeoLayout
  * Geometric Transformation
  * NoverlapLayout

* Cliquez sur **Installer**. Les plug-ins s’installent et vous êtes invité à redémarrer Gephi. Cliquez sur **OK**.  

# Import de fichiers  
## Ouverture d’un fichier de graphe  

~~ Image : tutorial_quickstart1_FR.png ~~  

* Téléchargez le fichier [LesMiserables.gexf](https://gephi.org/datasets/LesMiserables.gexf)  
* Dans la barre de menu, allez dans le menu **Fichier** et cliquez sur **Ouvrir...**.  
* Lorsque votre fichier est ouvert, le rapport récapitule les données trouvées et les problèmes rencontrés.  

  * Nombre de noeuds
  * Nombre de liens
  * Type de graphe

* Pour valider et voir le graphe, cliquez sur **OK**.  

**Format du graphe**
- GEXF
- GraphML
- Pajek NET
- GDF
- GML
- Tulip TLP
- CSV
- Netdraw VNA
- Archives ZIP/GZ  

## Affichage du graphe  

Nous avons importé l’ensemble de données du graphe LesMiserables.gexf<sup>1</sup>. Il s’agit d’un réseau pondéré des apparitions simultanées des personnages du roman _Les Misérables_ de Victor Hugo.  

~~ Image : ? ~~  

Les noeuds sont d’abord placés de manière aléatoire, la présentation que vous voyez peut donc différer légèrement.  

<cite><sup>1</sup>D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial Computing, Addison-Wesley, Reading, MA (1993).</cite>  

# Exécution  
## Exécution d’une spatialisation  

La fonction principale des algorithmes de spatialisation est de définir la forme du graphe.  

* Dans le volet à gauche de l’écran, affichez le module **Spatialisation**.  

~~ Image : tutorial_quickstart6_FR.png ~~  
* Sélectionnez **Force Atlas**.  

Vous pouvez voir les propriétés de la spatialisation sous son nom. Laissez les valeurs par défaut.  
* Pour lancer l’algorithme, cliquez sur **Exécuter**.  
* Vous voyez à présent les positions des noeuds qui changent en temps réel.  

<STRONG>Algorithmes de spatialisation</STRONG>  

La spatialisation des graphes est généralement réalisée à partir d’algorithmes basés sur les forces.
Ils suivent un principe simple : les noeuds reliés s’attirent et les noeuds non reliés se repoussent.  

## Contrôle de la spatialisation  

Les propriétés de spatialisation vous permettent de contrôler l’algorithme afin de générer une représentation lisible.  
~~ Image : tutorial_quickstart9_FR.png ~~  

* Pour agrandir le graphe, réglez la **Force de répulsion** sur 10 000.  
* Pour valider la valeur modifiée, appuyez sur la touche **Entrée** de votre clavier.  
* Vous pouvez maintenant **Arrêter** l’algorithme.  

<STRONG>Conseils</STRONG>  

Si vous ne voyez plus le graphe, cliquez sur l’icône **Centrer** sur le graphe situé dans le coin inférieur gauche de la fenêtre de visualisation.  

## Affichage du graphe spatialisé  

~~ Image : ? ~~  

## Amusez-vous avec l’algorithme !  

Exécutez à nouveau la spatialisation puis déplacez les noeuds de façon à mieux les distinguer.  
~~ Image : mouseselect_FR.png ~~  

* Repérez le bouton **Déplacement** situé dans l’angle supérieur gauche de la fenêtre de visualisation.  
* Ajustez le diamètre de sélection dans la fenêtre ou à l’aide du raccourci « Ctrl + molette de la souris ».  

Dans les propriétés de la spatialisation, réglez la **Force d’auto-stabilisation** à 100 000, puis déplacez les noeuds. Cela permet de réduire les déformations du graphe.  

* Vous pouvez maintenant **Arrêter** l’algorithme.  

~~ Images : ??? ~~ 

# Options  
## Plusieurs spatialisations disponibles  

Gephi propose différents algorithmes de spatialisation. Ils permettent de définir la forme du graphe.  

* OpenOrd  
~~ Image : ? ~~  
* Force Atlas 2  
~~ Image : ? ~~  
* Radial Axis  
~~ Image : ? ~~  
* GeoLayout  
~~ Image : ? ~~  

## Comment sélectionner une spatialisation ?  

Sélectionnez une spatialisation en fonction des caractéristiques de la topologie que vous souhaitez mettre en avant :  

* mise en avant  
DIVISIONS  
_OpenOrd_  
* mise en avant  
COMPLÉMENTARITÉS  
ForceAtlas, Yifan Hu, Fruchterman-Reingold  
* mise en avant  
CLASSEMENT  
Circular, Radial Axis  
* mise en avant  
RÉPARTITION GÉOGRAPHIQUE  
GeoLayout  

<STRONG>Ajustements graphiques</STRONG>  
- Ajustement des labels
- Noverlap
- Expansion
- Contraction  

# Force Atlas  
## Spatialisation Force Atlas  

Cette spatialisation propre à Gephi permet de spatialiser des réseaux sans échelle et des réseaux petit-monde. Elle est centrée sur la qualité (elle doit ainsi « être utile pour explorer des données réelles ») afin de permettre une interprétation rigoureuse des graphes (avec le plug-in Social Network Analysis par exemple) le plus directement et
lisiblement possible malgré un temps d’exécution assez long.  

<table>
<tr>
<td>Auteur :</td><td>Mathieu Jacomy</td>
</tr>
<tr>
<td>Date :</td><td>2007</td>
</tr>
<tr>
<td>Type :</td><td>Basé sur les forces</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N²)</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 10 000 noeuds</td>
</tr>
<tr>
<td>Gestion de la taille des liens :</td><td>Oui</td>
</tr>
</table>  

~~ Image : ? ~~  

## Exécution de Force Atlas  

**Exécuter** la spatialisation en appliquant les réglages suivants étape par étape :  

* Force d’auto-stabilisation = 2 000  
Plus elle est élevée, plus les noeuds se déplacent lentement.  
* Force de répulsion = 1 000  
Force avec laquelle les noeuds se repoussent.  
* Force d’attraction = 1  
Force avec laquelle les paires de noeuds connectés s’attirent.  
* Gravité = 100  
Attire tous les noeuds vers le centre pour éviter la dispersion des composants déconnectés.  
* Attraction distribuée = coché  
Repousse les noyaux (nombre important de liens sortants) à la périphérie et rapproche les autorités (nombre important de liens entrants) du centre.  

Vous pouvez maintenant **Arrêter** l’algorithme.  

<STRONG>Ajustement par taille</STRONG>  

Cette option permet d’éviter le chevauchement des noeuds, en fonction la taille de chaque noeud.  

# Fruchterman Reingold  
## Spatialisation Fruchterman Reingold  

Elle permet au graphe de simuler un système de particules de masse. Les noeuds représentent les particules de masse et les liens représentent les ressorts entre ces particules. Les algorithmes tentent de minimiser l’énergie de ce système physique. L’utilisation de cette spatialisation est devenue une pratique courante même si elle demeure très lente.  

<table>
<tr>
<td>Auteur :</td><td>Thomas Fruchterman et Edward Reingold<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>1991</td>
</tr>
<tr>
<td>Type :</td><td>Basé sur les forces</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N²)</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 1 000 noeuds</td>
</tr>
<tr>
<td>Gestion de la taille des liens :</td><td>Non</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>Fruchterman, T. M. J., et Reingold, E. M. (1991). Graph Drawing by Force-Directed Placement. Software: Practice and Experience, 21(11).</cite>  

## Exécution de Fruchterman Reingold  

**Exécuter** la spatialisation en appliquant les réglages suivants étape par étape :  

* Zone = 100  
* Zone = 100 000  
Zone de la taille du graphe.  
* Gravité = 1 000  
* Gravité = 100  
Attire tous les noeuds vers le centre pour éviter la dispersion des composants déconnectés.  

Vous pouvez maintenant **Arrêter** l’algorithme.  

<STRONG>Position des noeuds instable</STRONG>  

Il arrive parfois que l’algorithme ne converge pas, ce qui rend alors le graphe instable. Réduisez le réglage Vitesse afin d’améliorer la précision.  

# Multi-niveaux d’Yifan Hu  
## Spatialisation Multi-niveaux d’Yifan Hu  

Il s’agit d’un algorithme très rapide et de très bonne qualité pour les grands graphes.
Il combine un modèle basé sur les forces et une technique de simplification de graphes (algorithme multi-niveaux) pour réduire la complexité. Les forces de répulsion entre un noeud et un groupe de noeuds distants sont calculées approximativement avec l’algorithme de Barnes-Hut qui les traite comme un super-noeud. La spatialisation s’arrête
automatiquement.  

<table>
<tr>
<td>Auteur :</td><td>Yifan Hu<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2005</td>
</tr>
<tr>
<td>Type :</td><td>Basé sur les forces + multi-niveaux</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N*log(N))</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>100 à 100 000 noeuds</td>
</tr>
<tr>
<td>Gestion de la taille des liens :</td><td>Non</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>Y. F. Hu, Efficient and high quality force-directed graph drawing. The Mathematica Journal, 10
(37-71), 2005.</cite>  

## Exécution de multi-niveaux d’Yifan Hu  

**Exécutez** la spatialisation en appliquant les réglages suivants étape par étape :  

* Ratio du pas = 0.99  
Ratio utilisé pour mettre à jour la taille du pas. Son augmentation permet d’obtenir une meilleure qualité (au dépend de la vitesse).  
* Distance optimale = 200  
Longueur naturelle des ressorts. Son augmentation permet d’éloigner les noeuds les uns des autres.  
* Theta = 1.0  
Approximation de l’algorithme de Barnes-Hut. Les faibles valeurs augmentent la précision.  

# OpenOrd  
## Spatialisation OpenOrd  

Elle implique l’utilisation de grands graphes non orientés et a pour objectif de mieux distinguer les **groupes de noeuds**. Elle peut être exécutée en parallèle d’une accélération du traitement informatique et s’arrête automatiquement. L’algorithme est basé sur la spatialisation Fruchterman Reingold et fonctionne avec un nombre déterminé d’itérations
contrôlées par le biais d’une méthode de type recuit simulé (options liquid, expansion, cool-down, crunch et simmer du plug-in). Les liens longs sont coupés pour permettre aux groupes de noeuds de se séparer.  

<table>
<tr>
<td>Auteur :</td><td>S. Martin, W. M. Brown, R. Klavans, et K. Boyack<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2010 (VxOrd)</td>
</tr>
<tr>
<td>Type :</td><td>Basé sur les forces + recuit simulé</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N*log(N))</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>100 à 1 000 000 noeuds</td>
</tr>
<tr>
<td>Gestion de la taille des liens :</td><td>Oui</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>S. Martin, W. M. Brown, R. Klavans, et K. Boyack, « OpenOrd: An Open-Source Toolbox for Large
Graph Layout, » SPIE Conference on Visualization and Data Analysis (VDA)., 2011</cite>  

## Exécution de OpenOrd  

**Exécutez** la spatialisation en appliquant les réglages suivants étape par étape :  

* Edge cut = 0.95  
De 0 (Fruchterman Reingold standard) à 1. Pourcentage correspondant à la plus grande distance entre deux noeuds sur le graphe. Une valeur de coupe élevée entraîne la formation d’un plus grand nombre de groupes de noeuds.  
* Num iterations = 100  
Contracte les groupes de noeuds.  
* Num iterations = 850  
Étend les groupes de noeuds.  
* Random seed = -6308261588084905834  
Utilisez cette valeur pour produire exactement la même forme que celle précédemment affichée.  

<STRONG>Verrouillage du placement d’un noeud</STRONG>  

Pour verrouiller la position d’un noeud (ou d’un groupe de noeuds sélectionnés), cliquez avec le bouton droit sur un noeud, puis cliquez sur **Fixer**. Fonctionne pour toutes les spatialisations sauf Yifan Hu. Pour OpenOrd, utilisez le paramètre **Fixed time** du volet **Spatialisation** pour configurer le temps de verrouillage des noeuds.  

~~ Image : tutorial-layouts15_FR.png ~~  

## Exécution de OpenOrd sur un grand graphe  

OpenOrd est très utile pour les grands graphes.  

~~ Image : tutorial_quickstart1_FR.png ~~  

* Importez le fichier [internet_routers-22july06.gml.zip](https://gephi.org/datasets/internet_routers-22july06.gml.zip)  

Ce réseau est constitué de 22 963 noeuds et de 48 436 liens. Il s’agit d’un _snapshot_ symétrique représentant la structure d’Internet au niveau des systèmes autonomes, reconstruit à partir des tables BGP postées par l’université d’Oregon dans le cadre du projet Route Views. Ce _snapshot_ a été créé à partir de données par Mark Newman le 22 juillet 2006.  

Si vous possédez un ordinateur avec processeurs multi-coeurs :  
Augmentez le nombre de fils pour l’exécuter en parallèle et par conséquent accélérer l’exécution de l’algorithme. Il est recommandé de régler le nombre de coeurs de votre processeur sur le nombre de coeurs moins un, afin de conserver un fil pour l’affichage.  

* Réglez le paramètre **Num Threads** (Nb fils) ou laissez les paramètres par défaut.  
* Cliquez sur **Exécuter** et patientez jusqu’à l’arrêt.  

~~ Image : tutorial-layouts33.png ~~  

OpenOrd s’exécute en un nombre déterminé d’itérations, vous pouvez donc voir sa progression dans l’angle inférieur droit de l’écran.  


## Affichage du graphe de spatialisation  

~~ Image : ? ~~  

## Retour à l’espace de travail précédent  

Une fois le deuxième ensemble de données importé, un nouvel espace de travail est créé automatiquement. Vous vous situez en ce moment dans le « Workspace 2 ». Retournons maintenant dans le « Workspace 1 » où le graphe LesMiserables.gexf est encore présent.  

~~ Image : tutorial-layouts32.png ~~  

* Repérez la zone qui permet de basculer entre les espaces de travail dans l’angle inférieur droit de l’écran.  
* Vous pouvez voir le nom de l’espace de travail en cours d’utilisation.  
* Cliquez dessus et sélectionnez « Workspace 1 ». Vous pouvez aussi cliquer sur les flèches pour changer d’espace de travail.  

# Force Atlas 2  
## Spatialisation Force Atlas 2  

Version améliorée de la spatialisation Force Atlas pour gérer de vastes réseaux tout en conservant une très bonne qualité. La répulsion des noeuds est calculée approximativement avec l’algoritme de Barnes-Hut, qui réduit par conséquent la complexité de l’algorithme de spatialisation. Remplace les forces d’**attraction** et de **répulsion** par un paramètre **Échelle**.  

<table>
<tr>
<td>Auteur :</td><td>Mathieu Jacomy<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2011</td>
</tr>
<tr>
<td>Type :</td><td>Basé sur les forces</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N*log(N))</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 1 000 000 noeuds</td>
</tr>
<tr>
<td>Gestion de la taille des liens :</td><td>Oui</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>https://gephi.wordpress.com/2011/06/06/forceatlas2-the-new-version-of-our-home-brew-layout/  
Cette page est disponible uniquement en anglais.</cite>  

## Exécution de Force Atlas 2  

**Exécuter** la spatialisation en appliquant les réglages suivants étape par étape :  

* Mode LinLog = activé  
* Mode LinLog = désactivé  
L’attraction linéaire et la répulsion logarithmique (lin-lin par défaut), contractent les groupes de noeuds.  
* Échelle = 100  
Plus la valeur est élevée, plus le graphe est clairsemé.  
* Influence du poids des liens = 0  
De 0 (pas d’influence) à 1 (normal). La valeur 0 permet de calculer les forces sans tenir compte du poids des liens.  

Vous pouvez maintenant **Arrêter** l’algorithme.  

<STRONG>Performance</STRONG>  

~~ Image : tutorial-layouts18_FR.png ~~  

Activez **Répulsion Approximative** uniquement sur les grands graphes. Nous allons cependant tester ce paramètre dans ce
tutoriel. Activez-le, définissez le paramètre **Tolérance** sur 0.04 et exécutez l’algorithme puis observez l’oscillation des noeuds !  

# Circular layout  
## Circular layout  

Il permet de tracer des noeuds en cercle selon leur identifiant, une mesure (degré, betweenness centrality...) ou un attribut. Utilisez cette spatialisation pour afficher une distribution des noeuds et leurs liens.  

<table>
<tr>
<td>Auteur :</td><td>Matt Groeninger<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2010</td>
</tr>
<tr>
<td>Type :</td><td>Circulaire</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N)</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 1 000 000 noeuds</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>https://gephi.org/gephi-plugins-front/#/plugin/circular-layout  
Cette page est disponible uniquement en anglais.</cite>  

## Exécution de Circular Layout  

* Sélectionnez **Circular Layout** dans le volet **Spatialisation**  
* Définissez le paramètre **Order Nodes by** sur **Degree**.  
* **Exécuter** la spatialisation.  

~~ Image : tutorial-layouts22.png ~~  

* Dans le volet **Classement**, sélectionnez **Degree** (Degré) comme paramètre de classement.  
* Pour régler la taille, sélectionnez l’icône en forme de diamant dans la barre d’outils.  
* Réglez la taille minimale à 10 et la taille maximale à 50.  
* Pour visualiser la distribution du degré, cliquez sur **Exécuter**  

~~ Image : tutorial-layouts21_FR.png  ~~  

* **Exécuter** de nouveau la spatialisation pour éviter un chevauchement de noeuds.  

# Radial Axis Layout  
## Radial Axis Layout  

Cette spatialisation est fournie avec le plug-in Circular Layout. Elle permet de regrouper les noeuds et de tracer les groupes selon des axes (ou des courbes) qui rayonnent vers l’extérieur depuis un cercle central. Les groupes sont générés à partir d’une mesure (degré, betweenness centrality...) ou d’un attribut. Utilisez la spatialisation pour étudier
l’homophilie en affichant les distributions des noeuds dans des groupes avec leurs liens.  

<table>
<tr>
<td>Auteur :</td><td>Matt Groeninger<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2011</td>
</tr>
<tr>
<td>Type :</td><td>Circulaire</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N)</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 1 000 000 noeuds</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>https://gephi.org/gephi-plugins-front/#/plugin/circular-layout  
Cette page est disponible uniquement en anglais.</cite>  

## Détection de communauté  

Nous souhaitons maintenant étudier la structure communautaire de ce réseau : est-il naturellement séparé en groupes de noeuds avec des connexions denses au sein des groupes et des connexions espacées entre les groupes ?  

~~ Image : ? ~~  

Dans le volet **Statistiques**, cliquez **Exécuter** sur en regard de la ligne **Modularité**<sup>1</sup>.  

L’algorithme de détection de communauté a créé une valeur **Modularity Class** pour chaque noeud.  

Le module **Partition** peut utiliser ces nouvelles données pour mettre en couleur les communautés.  
~~ Image : tutorial_quickstart30_FR.png ~~  
* Repérez le module **Partition** dans le volet à gauche de l’écran.  
* Cliquez sur le bouton **Rafraîchir** pour remplir la liste de partitions.  
* Dans la liste de partitions, sélectionnez **Modularity Class**.  

~~ Image : ? ~~  

Dans l’exemple ci-contre, neuf communautés ont été trouvées. Ce nombre peut être différent pour vous. Une couleur a été définie au hasard pour chaque identifiant de communauté.  

* Pour colorer les noeuds, cliquez sur **Exécuter**.  

<cite><sup>1</sup>Blondel V, Guillaume J, Lambiotte R, Mech E (2008) Fast unfolding of communities in large networks. J Stat Mech : Theory Exp 2008:P10008. (http://findcommunities.googlepages.com)</cite>  

## Exécution de Radial Axis Layout  

**Exécuter** la spatialisation en appliquant les réglages suivants étape par étape :  

* Group Nodes by = Degree  
Homophilie par degré ?  
* Group Nodes by = Modularity Class  
* Order Nodes in Spar/Axis by = Degree  
Distribution des noeuds par degré dans chaque communauté.  
* Draw Spar/Axis as Spiral = coché  
Meilleure visualisation des liens dans les communautés  
* Draw Spar/Axis as Spiral = décoché  
* Ascending Order of Spar/Axis = coché  
Meilleure visualisation des liens entre les communautés  

~~ Images : ???? ~~   

# Cartographie  
## Cartographie avec GeoLayout  

GeoLayout utilise les coordonnées de latitude et de longitude pour définir la position des noeuds dans le réseau. Plusieurs projections sont disponibles, dont celle de Mercator qui est utilisée par Google Maps et d’autres services en ligne. Les deux colonnes d’attributs des noeuds doivent être au format numérique pour les coordonnées.  

<table>
<tr>
<td>Auteur :</td><td>Alexis Jacomy<sup>1</sup></td>
</tr>
<tr>
<td>Date :</td><td>2010</td>
</tr>
<tr>
<td>Type :</td><td>Cartographie</td>
</tr>
<tr>
<td>Complexité :</td><td>O(N)</td>
</tr>
<tr> 
<td>Taille du graphe :</td><td>1 à 1 000 000 noeuds</td>
</tr>
</table>  

~~ Image : ? ~~  

<cite><sup>1</sup>http://gephi.org/2010/map-geocoded-data-with-gephi/  
Cette page est disponible uniquement en anglais.</cite>  

## Exécution de GeoLayout  

* Téléchargez le fichier[airlines-sample.gexf](https://gephi.org/datasets/airlines-sample.gexf) et ouvrez-le.  

~~ Image : tutorial_quickstart1_FR.png ~~  

Le réseau est un graphe non-orienté qui comporte 235 noeuds et 1 297 liens. Chaque noeud se caractérise par sa latitude et
sa longitude qui sont exprimées en degrés.  

* Dans le module **Spatialisation**, sélectionnez **Geo Layout** dans la liste.  

Cliquez sur **Exécuter**.  

~~ Image : blog_geolayout3_FR.png ~~ ~~ Image : blog_geolayout4_FR.png ~~  

# Chevauchement des noeuds  
## Comment éviter le chevauchement des noeuds ?  

Il arrive que la spatialisation ne soit pas totalement satisfaisante. En effet, des noeuds de grande taille chevauchent parfois des noeuds plus petits. Trois techniques différentes permettent d’éviter ce désagrément.  

L’algorithme **Force Atlas** dispose d’une option qui permet de prendre en compte la taille des noeuds lors de l’application de la spatialisation.  

~~ Image ? ~~  

* Retournez au **Workspace 1**.  
* Dans le volet **Spatialisation**, sélectionnez **Force Atlas**.  
* Pour réinitialiser les paramètres de spatialisation, cliquez sur **Réinitialiser** en bas du volet.  
* **Exécuter** l’algorithme.  
* Vérifiez l’option **Ajustement par taille** (**Empêcher le Recouvrement** dans Force Atlas 2) et exécutez à nouveau l’algorithme pendant un court instant.  
* Réglez la **Force de répulsion** sur 1 000.  
* Réglez la **Force d’auto-stabilisation** sur 500.  
* **Arrêter** l’algorithme.  

~~ Image : tutorial_quickstart26_FR.png ~~  

Les noeuds ne se chevauchent plus désormais.  

<STRONG>Instabilité !</STRONG>  

Cette option rend la position des noeuds très instable et perturbe le processus de spatialisation. Utilisez cette option à la fin pour améliorer votre spatialisation.  

## Spatialisation Noverlap  

Utilisez cette option après n’importe quelle spatialisation afin d’éviter le chevauchement des noeuds tout en conservant la forme de votre graphe. Cette spatialisation est optimisée pour les graphes de grande taille.  

~~ Image : blog_geolayout9_FR.png ~~  

* Tout d’abord, exécutez la spatialisation **Yifan Hu**.  
* Sélectionnez l’algorithme **Noverlap**, puis exécutez-le jusqu’à ce qu’il s’arrête.  
* Pour améliorer la qualité, réduisez le paramètre **speed** à 0.1.  
* Pour augmenter l’espacement entre les noeuds, augmentez le paramètre **ratio** à 2 et la paramètre **margin** à 10.  

Les noeuds ne se chevauchent plus désormais.  

~~ Images : ?? ~~  

## Spatialisation Ajustement des labels  

Cette spatialisation ajuste la taille du texte pour repousser les noeuds et ainsi rendre chaque label lisible. Elle fonctionne uniquement sur les noeuds visibles dans le volet **Visualisation**.  

* Repérez les réglages du volet **Visualisation**.  
* Pour activer l’affichage du texte, cliquez sur **T**.  
* Augmentez la taille du texte au maximum.  

~~ Image : tutorial_visualization11_FR.png ~~  
~~ Image : tutorial-layouts13_FR.png ~~  

* Allez sur la fenêtre **Spatialisation**.  
* Sélectionnez l’algorithme **Ajustement des labels**, puis exécutez-le jusqu’à ce qu’il s’arrête.  

~~ Images : ?? ~~  

# Transformation géométrique  
## Transformations géométriques  

Aucun point cardinal n’est indiqué sur les spatialisations et les distances sont toujours relatives. Si une spatialisation est utilisée à plusieurs reprises dans un graphe, elle peut produire des formes avec des orientations et une échelle différentes. Les transformations sont parfois utiles pour comparer des graphes orientés.  

Pour effectuer des transformations de base sur le graphe, utilisez les spatialisations suivantes :  

* **Rotation sens horaire** avec un angle égal à -90°  
* **Rotation sens anti-horaire** avec un angle égal à -45°  
* **Expansion** avec un facteur d’échelle égal à 1.2  
* **Contraction** avec un facteur d’échelle égal à 0.8  

<STRONG>Spatialisation Transformation</STRONG>  

Le plug-in **Geometric Transformation** permet d’associer à la fois des rotations, des homothéties et des transpositions.  

# Enregistrement  
## Enregistrement de votre projet  

L’enregistrement de votre projet regroupe l’ensemble des données et des résultats dans un fichier de session unique.  

~~ Image : ? ~~  
~~ Image : tutorial_quickstart48_FR.png ~~  

# Conclusion  
## Conclusion  

Avec ce tutoriel, vous avez appris à utiliser différentes spatialisations dans Gephi en fonction de la caractéristique que vous souhaitiez mettre en avant dans la topologie et la taille du réseau, à éviter le chevauchement des noeuds et à effectuer des transformations géométriques.  

~~ Images : ??? ~~  

D’autres plug-ins de spatialisation sont disponibles via le [Centre de plug-ins Gephi](https://gephi.org/gephi-plugins-front/#/browse/type/layout).  

Pour en savoir plus :  
* [Site Web Gephi](https://gephi.org/)
* [Wiki Gephi] (http://wiki.gephi.org/)
* [Forum Gephi] (http://forum.gephi.org/)

Ces pages sont uniquement disponibles en anglais.  

Dernière mise à jour le 13 juin 2011  