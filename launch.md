# Launch LexiDict On Expo Go

Follow these steps exactly when launching the app on your phone with Expo Go.

## 1. Open The Project Folder

In PowerShell, run:

```powershell
cd c:\Users\RCA\Desktop\tempula\mobile-dictionary
```

## 2. Stop Conflicting Expo Servers

If another Expo server is already running, stop it first by pressing:

```text
Ctrl+C
```

If you are not sure, close old Expo/Metro terminals before starting again.

## 3. Clear Port 8081

Run this command to stop any process using port `8081`:

```powershell
$pids = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; foreach ($pidValue in $pids) { Stop-Process -Id $pidValue -Force -ErrorAction SilentlyContinue }
```

## 4. Start Expo Go Tunnel

Run this command:

```powershell
npx expo start --tunnel --clear --port 8081 --no-dev --minify
```

Wait until the terminal shows:

```text
Tunnel ready.
```

## 5. Open On Phone

On your phone:

1. Fully close Expo Go.
2. Reopen Expo Go.
3. Scan the QR code shown in the terminal.

If scanning fails, choose **Enter URL manually** in Expo Go and use the URL shown by the terminal, for example:

```text
exp://r8c8bb8-anonymous-8081.exp.direct
```

The exact URL can change when Expo restarts, so always use the one printed in your current terminal.

## 6. If It Gets Stuck

Do this clean restart:

```powershell
cd c:\Users\RCA\Desktop\tempula\mobile-dictionary
$pids = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; foreach ($pidValue in $pids) { Stop-Process -Id $pidValue -Force -ErrorAction SilentlyContinue }
npx expo start --tunnel --clear --port 8081 --no-dev --minify
```

Then fully close and reopen Expo Go before scanning again.

