@echo off
:: =====================================================================
:: eligere_2025_vers_11b.bat
:: ---------------------------------------------------------------------
:: Tool di scansione e aggregazione file by @ALFONSO MONTAGNI (Eligere)
:: Versione 11 – 2025‑05‑02
:: ---------------------------------------------------------------------
::  * Menu principale:
::       0‑10 come prima + 11 = MHTML (solo lista percorsi)
::  * Sottomenu Media: opzioni 1‑9 + b (back) + q (quit).
::  * Funzione :collect con modalità LIST / FULL.
:: =====================================================================

setlocal EnableDelayedExpansion

:: ---------------------------------------------------------------------
:: Cambio directory se l'utente passa un path come argomento
:: ---------------------------------------------------------------------
if not "%~1"=="" (
    pushd "%~1" || (echo Impossibile accedere a "%~1" & pause & goto :eof)
)

for %%A in ("%cd%") do set "CURDIR=%%~nxA"

:: ---------------------------------------------------------------------
:: MENU PRINCIPALE
:: ---------------------------------------------------------------------
:MENU
cls
@echo  ==============================================================
@echo   Eligere Scan   Vers 11b (2025 05 02)    Cartella: %CURDIR%
@echo  ==============================================================
@echo   0  Componenti (TS + HTML + spec)
@echo   1  HTML
@echo   2  TypeScript
@echo   3  JSON
@echo   4  CSS / SCSS
@echo   5  Tutto Frontend (zero a 4)
@echo   6  Solo TS in formato .ts
@echo   7  Test Jasmine
@echo   8  Backend (java, sql, xml, properties)
@echo   9  Services Angular
@echo  10  Media ^& Archivi (SOLO lista percorsi)
@echo  11  MHTML (solo lista percorsi)
@echo  --------------------------------------------------------------
@echo   q  Esci
@echo  --------------------------------------------------------------
set /p CHOICE="Seleziona opzione: "

if /i "%CHOICE%"=="q" goto END

if "%CHOICE%"=="0"  goto COMPONENT_ALL
if "%CHOICE%"=="1"  goto HTML
if "%CHOICE%"=="2"  goto TS
if "%CHOICE%"=="3"  goto JSON
if "%CHOICE%"=="4"  goto CSS
if "%CHOICE%"=="5"  goto ALL_FRONT
if "%CHOICE%"=="6"  goto ONLY_TS
if "%CHOICE%"=="7"  goto TEST
if "%CHOICE%"=="8"  goto BE
if "%CHOICE%"=="9"  goto SERVICES
if "%CHOICE%"=="10" goto MEDIA_MENU
if "%CHOICE%"=="11" goto MHTML

@echo [!] Opzione non valida.
pause
goto MENU

:: ---------------------------------------------------------------------
:: Funzione per cartella output
:: ---------------------------------------------------------------------
:ensureOutDir
if defined OUTDIR goto :eof
set "STAMP=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "OUTDIR=%cd%\_reports_%STAMP%"
md "%OUTDIR%" 2>nul
goto :eof

:: ---------------------------------------------------------------------
:: Funzione COLLECT – parametri:
::   %1 pattern (es. "*.ts")
::   %2 basename per file output
::   %3 ext override (ts per .ts, altrimenti .txt)
::   %4 mode: LIST (solo percorsi) o vuoto (FULL)
:: ---------------------------------------------------------------------
:collect
call :ensureOutDir
set "PATTERN=%~1"
set "BASENAME=%~2"
set "EXT=%~3"
set "MODE=%~4"
if "%EXT%"=="ts" (set "EXT=.ts") else set "EXT=.txt"
set "OUTFILE=%OUTDIR%\%CURDIR%_%BASENAME%%EXT%"

for /r %%i in (%PATTERN%) do (
  if /I not "%%~nxi"=="%~nx0" (
     if /I "%MODE%"=="LIST" (
        >>"%OUTFILE%" echo %%~fi
     ) else (
        >>"%OUTFILE%" echo Directory e tipo: %%~pxi
        >>"%OUTFILE%" echo.
        >>"%OUTFILE%" echo Nome file: %%~nxi
        >>"%OUTFILE%" echo.
        type "%%i" >>"%OUTFILE%"
        >>"%OUTFILE%" echo.
        >>"%OUTFILE%" echo =============================================================
     )
  )
)
@echo   [+] Creato "%OUTFILE%"
goto :eof

:: ---------------------------------------------------------------------
:: SEZIONI OPERATIVE
:: ---------------------------------------------------------------------
:COMPONENT_ALL
call :collect "*.ts"      "Component" "" ""
call :collect "*.html"    "Component" "" ""
call :collect "*.spec.ts" "Component" "" ""
pause
goto MENU

:HTML
call :collect "*.htm"  "HTML" "" ""
call :collect "*.html" "HTML" "" ""
pause
goto MENU

:TS
call :collect "*.ts" "TS" "" ""
pause
goto MENU

:JSON
call :collect "*.json" "JSON" "" ""
pause
goto MENU

:CSS
call :collect "*.css"  "CSS" "" ""
call :collect "*.scss" "CSS" "" ""
pause
goto MENU

:ALL_FRONT
call :COMPONENT_ALL
pause
goto MENU

:ONLY_TS
call :collect "*.ts" "ONLY_TS" "ts" ""
pause
goto MENU

:TEST
call :collect "*.spec.ts" "TEST" "" ""
pause
goto MENU

:BE
call :collect "*.java"       "BE" "" ""
call :collect "*.vm"         "BE" "" ""
call :collect "*.xml"        "BE" "" ""
call :collect "*.properties" "BE" "" ""
call :collect "*.config"     "BE" "" ""
call :collect "*.jsp"        "BE" "" ""
call :collect "*.sql"        "BE" "" ""
pause
goto MENU

:SERVICES
call :collect "*.service.ts" "SERVICES" "" ""
pause
goto MENU

:MHTML
call :collect "*.mhtml" "MHTML" "" "LIST"
pause
goto MENU

:: ---------------------------------------------------------------------
:: SOTTOMENU MEDIA ^& ARCHIVI
:: ---------------------------------------------------------------------
:MEDIA_MENU
cls
@echo  +-------------------------------------------+
@echo    MEDIA ^& ARCHIVI  Solo lista percorsi
@echo  +-------------------------------------------+
@echo   1  PDF
@echo   2  AVI
@echo   3  MKV
@echo   4  MP4
@echo   5  MP3
@echo   6  EPUB
@echo   7  Immagini (png, jpg, jpeg, bmp)
@echo   8  Archivi (zip, rar, 7z)
@echo   9  Video+Audio+Lettura (PDF,AVI,MKV,MP4,MP3,EPUB)
@echo  --------------------------------------------
@echo   b  Torna al menu principale
@echo   q  Esci dallo script
@echo  --------------------------------------------
set /p MOPT="Seleziona opzione: "

if /i "%MOPT%"=="b" goto MENU
if /i "%MOPT%"=="q" goto END

if "%MOPT%"=="1" call :collect "*.pdf"  "PDF"  "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="2" call :collect "*.avi"  "AVI"  "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="3" call :collect "*.mkv"  "MKV"  "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="4" call :collect "*.mp4"  "MP4"  "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="5" call :collect "*.mp3"  "MP3"  "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="6" call :collect "*.epub" "EPUB" "" "LIST" & pause & goto MEDIA_MENU
if "%MOPT%"=="7" (
    call :collect "*.png"  "IMG_PNG"  "" "LIST"
    call :collect "*.jpg"  "IMG_JPG"  "" "LIST"
    call :collect "*.jpeg" "IMG_JPEG" "" "LIST"
    call :collect "*.bmp"  "IMG_BMP"  "" "LIST"
    pause & goto MEDIA_MENU
)
if "%MOPT%"=="8" (
    call :collect "*.zip" "ZIP" "" "LIST"
    call :collect "*.rar" "RAR" "" "LIST"
    call :collect "*.7z"  "SEVENZ" "" "LIST"
    pause & goto MEDIA_MENU
)
if "%MOPT%"=="9" (
    call :collect "*.pdf"  "PDF"  "" "LIST"
    call :collect "*.avi"  "AVI"  "" "LIST"
    call :collect "*.mkv"  "MKV"  "" "LIST"
    call :collect "*.mp4"  "MP4"  "" "LIST"
    call :collect "*.mp3"  "MP3"  "" "LIST"
    call :collect "*.epub" "EPUB" "" "LIST"
    pause & goto MEDIA_MENU
)

@echo [!] Opzione non valida.
pause
goto MEDIA_MENU

:END
@echo Arrivederci da Eligere Scan.
if defined OUTDIR echo Report salvati in %OUTDIR%
pause
endlocal
exit /b 0
