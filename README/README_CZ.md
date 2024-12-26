

# Discord Game Bot

Discord Game Bot je vícejazyčný herní bot pro Discord, který je aktuálně ve vývoji. Bot je navržen tak, aby umožňoval pořádání různých her na Discord serverech a podporuje čtyři jazyky: ukrajinštinu (UA), ruštinu (RU), angličtinu (EN) a češtinu (CZ).

## Funkce

- Podpora vícero jazyků (UA, RU, EN, CZ)
- Různé mini-hry (ve vývoji)
- Systém uživatelského balancování
- Slash příkazy pro snadnou interakci

## Instalace

1. Klonujte repozitář:
   ```
   git clone https://github.com/Mop157/discord_game_bot.git
   ```

2. Přesuňte se do adresáře projektu:
   ```
   cd discord-game-bot
   ```

3. Nainstalujte závislosti:
   ```
   npm install
   ```

4. Vytvořte soubor `.env` v kořenovém adresáři projektu a přidejte následující proměnné prostředí:
   ```
   DISCORD_TOKEN=your_discord_bot_token
   CLIENT_ID=client ID
   GUILD_ID=your guild ID
   MONGODB_URI=your_mongodb_connection_string
   PREFIX=prefix bota
   LANGUAGES=language // "UA" or "RU" or "EN" or "CZ"
   ```

5. Zkompilujte projekt:
   ```
   npm run build
   ```

## Použití

1. Spusťte bota:
   ```
   npm start
   ```

2. Pozvěte bota na váš Discord server pomocí odkazu s potřebnými oprávněními.

3. Používejte slash příkazy k interakci s botem. Například:
   ```
   /slot - pro hraní slotové hry
   ```

## Vývoj

Pro spuštění bota v režimu vývoje použijte:
```
npm run dev
```

Pro nasazení nových slash příkazů použijte:
```
npm run deploy
```

## Aktuální stav

Projekt je aktivně ve vývoji. Některé funkce mohou být nedostupné nebo vyžadovat ruční nastavení. Sledujte aktualizace!

## Přispívání

Vítáme přispění do projektu! Pokud máte nějaké nápady nebo návrhy, prosím vytvořte issue nebo pošlete pull request.

