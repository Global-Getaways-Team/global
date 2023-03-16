# Schritte zum Aufsetzen des Projektes

## Systemvoraussetzungen:
- Docker Desktop ^v4.16
- git
- npm ^v9.4.0 
- Node.js ^v19.5.0

## 1. 
### Ein Terminal bzw. eine Konsole öffnen und das folgende Projekt-Repository mit dem entsprechenden Behl in ein beliebiges Verzeichnis klonen:
```
git clone https://github.com/Global-Getaways-Team/global.git
```

## 2. 
### Mit dem folgenden Befehl über das Terminal bzw. die Konsole ins Root-Verzeichnis des geklonten Repositories wechseln:
```
cd global
```

## 3. 
### Anschließend werden übers Terminal bzw. die Konsole mit dem folgenden docker-compose Befehl die entsprechenden Frontend- sowie Backend-Container des Projektes in Docker erstellt und gestartet:
```
docker-compose up
```

## 4. 
### Sobald die entsprechenden Docker-Container erfolgreich erstellt und hochgefahren sind, kann die Webseite im Browser über den nachfolgenden Link geöffnet und verwendet werden:
```
http://localhost:5173/
```

## 5.
### Erst beim zweiten Klick eines erstellten Blogbeitrags, werden diese als Favoriten angezeigt.