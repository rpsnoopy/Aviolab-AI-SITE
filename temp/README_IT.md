# Script di Installazione Agenti TTR-SUITE

## Panoramica
Questo script installa automaticamente i file DLL degli agenti TTR-SUITE nella directory di installazione di TTR-SUITE.

## Requisiti
- TTR-SUITE deve essere installato in `C:\TTR-SUITE\`
- File agenti in formato ZIP o come singoli file DLL
- Windows con supporto PowerShell (per estrazione ZIP)

## Come Utilizzare

### Metodo 1: Rilevamento Automatico (Consigliato)
1. Posiziona il file ZIP degli agenti nella stessa directory di `install-agents.bat`
2. Fai doppio clic su `install-agents.bat`
3. Lo script rileverà automaticamente il file ZIP e chiederà conferma
4. Segui le istruzioni a schermo

### Metodo 2: Selezione Manuale
1. Esegui `install-agents.bat`
2. Quando richiesto, fornisci uno dei seguenti:
   - Percorso completo di un file ZIP (es. `C:\Downloads\agents.zip`)
   - Directory contenente file DLL (es. `C:\Downloads\agents\`)
   - Directory contenente file ZIP (es. `C:\Downloads\`)

### Metodo 3: File ZIP Multipli
Se vengono trovati più file ZIP, lo script:
1. Mostra un elenco numerato dei file ZIP disponibili
2. Ti chiede di scegliere quale installare
3. Processa solo il file selezionato

## Cosa Fa lo Script

1. **Verifica**: Controlla se TTR-SUITE è installato in `C:\TTR-SUITE\`
2. **Creazione Directory**: Crea `C:\TTR-SUITE\AppData\AgentCodes\` se non esiste
3. **Rilevamento File**: Cerca file ZIP o DLL nella posizione specificata
4. **Estrazione**: Se trova file ZIP, li estrae in una directory temporanea
5. **Installazione**: Copia tutti i file DLL nella directory AgentCodes di TTR-SUITE
6. **Verifica**: Conferma che ogni file sia stato copiato correttamente
7. **Pulizia**: Rimuove i file temporanei

## Tipi di File Supportati
- **File ZIP**: Estratti automaticamente per trovare file DLL
- **File DLL**: Copiati direttamente in TTR-SUITE

## Gestione Errori
Lo script include una gestione completa degli errori per:
- Installazione TTR-SUITE mancante
- Percorsi file non validi
- Errori di estrazione
- Errori di copia
- Problemi di permessi

## Riepilogo Installazione
Dopo l'installazione, lo script fornisce:
- Numero di file installati con successo
- Numero di file che non sono riusciti a installarsi
- Totale file processati
- Messaggi di errore specifici per la risoluzione dei problemi

## Risoluzione Problemi

### Problemi Comuni
1. **"TTR-SUITE non trovato"**: Assicurati che TTR-SUITE sia installato in `C:\TTR-SUITE\`
2. **"Permesso negato"**: Esegui lo script come Amministratore
3. **"Impossibile estrarre ZIP"**: Assicurati che il file ZIP non sia corrotto
4. **"Nessun file DLL trovato"**: Verifica che lo ZIP contenga file DLL degli agenti

### Installazione Manuale
Se lo script fallisce, puoi copiare manualmente i file DLL in:
```
C:\TTR-SUITE\AppData\AgentCodes\
```

## Note
- Lo script non crea backup - assicurati di avere i tuoi backup
- Riavvia TTR-SUITE dopo l'installazione per caricare i nuovi agenti
- Lo script funziona con directory nidificate nei file ZIP
- Più file DLL possono essere installati in una singola esecuzione