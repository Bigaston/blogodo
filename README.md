# blogodo
Petit système de blog minimaliste encore en cours de développement.

Exemple : [blog.bigaston.me](http://blog.bigaston.met
)

## Installation
```
~: git clone https://github.com/Bigaston/blogodo
~: cd blogodo
~/blogodo: npm install
~/blogodo: npm start
```

Le serveur va générer automatiquement tous les dossiers dont vous aurez besoin à ce moment là. Vous pouvez modifier toutes les variables de votre site internet dans le fichier `.env` alors généré.

## Arborescence
- `/build` contient tous les fichiers qui seront utilisés par votre site web
- `/img` contient vos images. Vous pouvez utiliser des sous-dossiers. Les images sont accessibles sur `/img/[le chemin vers l'image]`
- `/source` contient vos articles en .md. Voir plus bas pour le template d'article

## Template d'article
Les articles sont précédés d'un YML Front Matter, qui permet de définir quelques métadonnés très utiles. Ajoutez simplement un article dans `source` pour que il soit ajouté à votre site. Le chemin d'accès de l'article sera définit à partir du nom du fichier sans le `.md`, donc évitez les espaces si vous ne voulez pas de problèmes.
```Markdown
---
title: 'Un exemple'
subtitle: Description
img: '/img/banner.jpg'
pubdate: '31/03/2020'
tags: vos, tags
---
Texte de votre article
```

**Important :**
- `img` n'est pas obligatoire
- `pubdate` n'est pas obligatoire, mais doit être renseigné au format `jj/mm/aaaa`
- `tags` n'est pas obligatoire, mais les tags doivent être séparés par des virgules, et les espaces seront supprimés
- Votre texte peut utiliser du Markdown pour la mise en page, et de l'HTML pour d'autres intégrations plus complètes

## Informations complémentaires
Blogodo n'a pas pour objectif d'être un générateur de site statique complet et énorme. Je l'ai créé pour me faire mon propre blog que je voulais simpliste à souhait. Il est encore en cours de développement, mais ce n'est pas mon projet principal. Si vous voulez un générateur plus performant/complet, je vous conseil d'aller voir sur [staticgen.com/](https://www.staticgen.com/).

Vous pouvez me retrouver sur Twitter [@Bigaston](https://twitter.com/Bigaston), et si vous voulez me soutenir financièrement, c'est sur [uTip](https://utip.io/bigaston)