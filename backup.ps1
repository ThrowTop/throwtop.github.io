if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    $scriptPath = "`"$PSCommandPath`""
    $args_ = "-NoProfile -ExecutionPolicy Bypass -File $scriptPath"

    if (Get-Command wt -ErrorAction SilentlyContinue) {
        try {
            Start-Process wt "pwsh $args_" -Verb RunAs -ErrorAction Stop
        } catch {
            Start-Process wt "powershell $args_" -Verb RunAs
        }
    } elseif (Get-Command pwsh -ErrorAction SilentlyContinue) {
        Start-Process pwsh $args_ -Verb RunAs
    } else {
        Start-Process powershell $args_ -Verb RunAs
    }

    exit
}



# Hide Cursor

Add-Type @"
using System;
using System.Runtime.InteropServices;

public class CursorControl {
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr GetStdHandle(int nStdHandle);

    [DllImport("kernel32.dll")]
    public static extern bool SetConsoleCursorInfo(IntPtr hConsoleOutput, ref CONSOLE_CURSOR_INFO cci);

    public struct CONSOLE_CURSOR_INFO {
        public int dwSize;
        public bool bVisible;
    }
}
"@

$handle = [CursorControl]::GetStdHandle(-11) # STD_OUTPUT_HANDLE
$cursorInfo = New-Object CursorControl+CONSOLE_CURSOR_INFO
$cursorInfo.dwSize = 1
$cursorInfo.bVisible = $false
[CursorControl]::SetConsoleCursorInfo($handle, [ref]$cursorInfo)



enum Filter {
    Whitelist
    Blacklist
    Regex
}

$BackupItems = @{
    custom       = @{ 
        Name   = "Custom Folder"
        Source = "C:\custom"
        Filter = @{ 
            Type  = [Filter]::Blacklist
            Paths = @() 
        } 
    }
    ShareX       = @{ 
        Name   = "ShareX Settings"
        Source = "C:\Users\$env:USERNAME\Documents\ShareX"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("ApplicationConfig.json", "HotkeysConfig.json") 
        } 
    }
    FlowLauncher = @{ 
        Name   = "FlowLauncher Settings"
        Source = "C:\Users\$env:USERNAME\AppData\Roaming\FlowLauncher"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("Settings", "Plugins", "Environments") 
        } 
    }
    Portal2      = @{ 
        Name   = "Portal 2 Config + Sar"; 
        Source = "C:\Program Files (x86)\Steam\steamapps\common\Portal 2\portal2"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("cfg", "sar.dll") 
        } 
    }
    CS2          = @{ 
        Name   = "CS:2 Config"
        Source = "C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("usercfg", "ae.cfg", "autoexec.cfg", "ez.cfg") 
        } 
    }
    OBS          = @{ 
        Name   = "OBS Studio Settings"
        Source = "$env:APPDATA\obs-studio"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("basic", "global.ini", "service.json") 
        } 
    }
    WinRar       = @{
        Name   = "Winrar Activation"
        Source = "C:\Program Files\WinRAR"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("rarreg.key") 
        } 
    }
    PowerShell   = @{ 
        Name   = "PowerShell Profile (Custom Link)"
        Source = "C:\Users\$env:USERNAME\Documents\Powershell"
        Filter = @{ 
            Type  = [Filter]::Whitelist
            Paths = @("Microsoft.PowerShell_profile.ps1") 
        } 
    }
}


$packages = [ordered]@{
    main          = @("Discord.Discord", "RARLab.WinRAR", "ShareX.ShareX", "Brave.Brave", "Valve.Steam", "Bitwarden.Bitwarden", "SublimeHQ.SublimeText.4", "Flow-Launcher.Flow-Launcher", "AutoHotkey.AutoHotkey", "Gyan.FFmpeg")
    code          = @("Microsoft.VisualStudio.2022.Community.Preview", "Git.Git", "ajeetdsouza.zoxide", "Microsoft.VisualStudioCode", "DEVCOM.Lua", "Python.Python.3.13", "yt-dlp.yt-dlp", "Microsoft.PowerShell")
    customization = @("winaero.tweaker", "Vendicated.Vencord", "JanDeDobbeleer.OhMyPosh", "Microsoft.PowerToys", "LianLi.LConnect3", "OpenRGB.OpenRGB")
    streaming     = @("PrivateInternetAccess.PrivateInternetAccess", "Stremio.Stremio")
    recording     = @("OBSProject.OBSStudio", "univrsal.input-overlay")
    faceit        = @("FACEITLTD.FACEITClient", "FACEITLTD.FACEITAC")
}

function Show-YesNoPrompt { 
    param (
        [bool]$Default = $true
    )

    $done = $false
    while (-not $done) {
        $Key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown").VirtualKeyCode
        switch ($Key) {
            89 { $done = $true; return $true }   # Y
            78 { $done = $true; return $false }  # N
            13 { $done = $true; return $Default }# Enter
            27 { $done = $true; return $false }  # Escape
        }
    }
}


function Show-MultiSelectMenu {
    param (
        [Parameter(Mandatory)][string[]]$Items,
        [string]$Prompt = "Select options:",
        [bool]$DefaultSelected = $false
    )

    $Selected = @($DefaultSelected) * $Items.Count
    $CurrentIndex = 0
    $done = $false

    while (-not $done) {
        Clear-Host
        Write-Host "$Prompt" -ForegroundColor Cyan
        for ($i = 0; $i -lt $Items.Count; $i++) {
            if ($CurrentIndex -eq $i) {
                Write-Host "> [$(if ($Selected[$i]) {"X"} else {" "})] $($Items[$i])" -ForegroundColor Yellow
            } else {
                Write-Host "  [$(if ($Selected[$i]) {"X"} else {" "})] $($Items[$i])"
            }
        }

        Write-Host "UP/DOWN = navigate, SPACE = toggle, ENTER = confirm, ESC = cancel" -ForegroundColor Magenta 

        $Key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown").VirtualKeyCode
        switch ($Key) {
            27 { return @() }
            38 { $CurrentIndex = ($CurrentIndex - 1) % $Items.Count; if ($CurrentIndex -lt 0) { $CurrentIndex = $Items.Count - 1 } }
            40 { $CurrentIndex = ($CurrentIndex + 1) % $Items.Count }
            32 { $Selected[$CurrentIndex] = -not $Selected[$CurrentIndex] }
            13 { $done = $true }
        }
    }

    return $Items | Where-Object { $Selected[$Items.IndexOf($_)] }
}

function Show-MultiSelectHierarchicalMenu {
    param (
        [hashtable]$Items,
        [string]$Prompt = "Select items to install"
    )

    $groupKeys = $Items.Keys
    $groupStates = @{}
    $itemStates = @{}
    $expanded = @{}
    $flatView = @()

    foreach ($group in $groupKeys) {
        $groupStates[$group] = $false
        $expanded[$group] = $false
        foreach ($pkg in $Items[$group]) {
            $itemStates["$group|$pkg"] = $false
        }
    }

    $selectedIndex = 0

    function Render {
        Clear-Host
        Write-Host "$Prompt" -ForegroundColor Cyan
        $flatView = @()
        foreach ($group in $groupKeys) {
            $gState = if ($groupStates[$group]) { "X" } else { " " }
            $prefix = if ($expanded[$group]) { " >>" } else { "..." }
            $flatView += [pscustomobject]@{
                Type  = "group"; 
                Group = $group; 
                Text  = "[$gState] $group$prefix"
            }
            if ($expanded[$group]) {
                foreach ($pkg in $Items[$group]) {
                    $pState = if ($itemStates["$group|$pkg"]) { "X" } else { " " }
                    $flatView += [pscustomobject]@{
                        Type = "item"; Group = $group; Id = $pkg; Text = "  [$pState] $pkg"
                    }
                }
            }
        }

        for ($i = 0; $i -lt $flatView.Count; $i++) {
            if ($i -eq $selectedIndex) {
                Write-Host "> $($flatView[$i].Text)" -ForegroundColor Yellow
            } else {
                Write-Host "  $($flatView[$i].Text)"
            }
        }
        Write-Host "UP/DOWN = navigate, RIGHT = expand, LEFT = collapse, SPACE = toggle, ENTER = confirm, ESC = cancel" -ForegroundColor Magenta
        return $flatView
    }


    $done = $false
    while (-not $done) {
        $flatView = Render
        $line = $flatView[$selectedIndex]
        $key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown").VirtualKeyCode

        switch ($key) {
            38 { $selectedIndex = ($selectedIndex - 1 + $flatView.Count) % $flatView.Count }
            40 { $selectedIndex = ($selectedIndex + 1) % $flatView.Count }
            37 {
                if ($line.Type -eq "group") {
                    $expanded[$line.Group] = $false
                } elseif ($line.Type -eq "item") {
                    $expanded[$line.Group] = $false
                    for ($i = 0; $i -lt $flatView.Count; $i++) {
                        if ($flatView[$i].Type -eq "group" -and $flatView[$i].Group -eq $line.Group) {
                            $selectedIndex = $i
                            break
                        }
                    }
                }
            }
            39 {
                if ($line.Type -eq "group") {
                    foreach ($g in $groupKeys) {
                        $expanded[$g] = $false
                    }
                    $expanded[$line.Group] = $true
                }
            }
            32 {
                if ($line.Type -eq "group") {
                    $groupStates[$line.Group] = -not $groupStates[$line.Group]
                    foreach ($pkg in $Items[$line.Group]) {
                        $itemStates["$($line.Group)|$pkg"] = $groupStates[$line.Group]
                    }
                } elseif ($line.Type -eq "item") {
                    $key = "$($line.Group)|$($line.Id)"
                    $itemStates[$key] = -not $itemStates[$key]
                    $allSelected = $true
                    foreach ($pkg in $Items[$line.Group]) {
                        if (-not $itemStates["$($line.Group)|$pkg"]) {
                            $allSelected = $false
                            break
                        }
                    }
                    $groupStates[$line.Group] = $allSelected
                }
            }
            13 { $done = $true }
        }

    }


    $result = @{}
    foreach ($group in $groupKeys) {
        $selectedPkgs = @()
        foreach ($pkg in $Items[$group]) {
            if ($itemStates["$group|$pkg"]) {
                $selectedPkgs += $pkg
            }
        }
        if ($selectedPkgs.Count -gt 0) {
            $result[$group] = $selectedPkgs
        }
    }

    return $result
}

function Show-SingleSelectMenu {
    param (
        [Parameter(Mandatory)] $Items,
        [string] $Prompt = "Select an option:"
    )

    $CurrentIndex = 0
    $done = $false

    while (-not $done) {
        Clear-Host
        Write-Host "$Prompt" -ForegroundColor Cyan

        for ($i = 0; $i -lt $Items.Count; $i++) {
            $item = $Items[$i]
            $optionNumber = $i + 1
            if ($i -eq $CurrentIndex) {
                Write-Host "> [$optionNumber] $($item)" -ForegroundColor Yellow
            } elseif ($optionNumber -gt 9) {
                Write-Host "  [X] $($item)" -ForegroundColor DarkGray
            } else {
                Write-Host "  [$optionNumber] $($item)"
            }
        }

        $Key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown").VirtualKeyCode
        if ($Key -ge 49 -and $Key -le 57) {
            $inputIndex = [int]$Key - 49
            if ($inputIndex -lt $Items.Count) {
                $CurrentIndex = $inputIndex
                $done = $true
            }
        }

        switch ($Key) {
            13 { $done = $true }
            38 { $CurrentIndex = ($CurrentIndex - 1 + $Items.Count) % $Items.Count }
            40 { $CurrentIndex = ($CurrentIndex + 1) % $Items.Count }
        }
    }

    return $Items[$CurrentIndex]
}

function Copy-FilteredContent {
    param (
        [string]$Source,
        [string]$Destination,
        [hashtable]$Filter
    )

    $filterType = $Filter.Type
    $paths = $Filter.Paths
    $files = Get-ChildItem -Path $Source -Recurse -Force -File

    foreach ($file in $files) {
        $relPath = $file.FullName.Substring($Source.Length).TrimStart("\\")
        switch ($filterType) {
            "Whitelist" {
                if ($paths -contains $relPath.Split('\')[0] -or $paths -contains $relPath) {
                    $destPath = Join-Path $Destination $relPath
                    New-Item -ItemType Directory -Path (Split-Path $destPath) -Force | Out-Null
                    Copy-Item $file.FullName -Destination $destPath -Force
                }
            }
            "Blacklist" {
                if (-not ($paths -contains $relPath.Split('\')[0] -or $paths -contains $relPath)) {
                    $destPath = Join-Path $Destination $relPath
                    New-Item -ItemType Directory -Path (Split-Path $destPath) -Force | Out-Null
                    Copy-Item $file.FullName -Destination $destPath -Force
                }
            }
            "Regex" {
                foreach ($pattern in $paths) {
                    if ($relPath -match $pattern) {
                        $destPath = Join-Path $Destination $relPath
                        New-Item -ItemType Directory -Path (Split-Path $destPath) -Force | Out-Null
                        Copy-Item $file.FullName -Destination $destPath -Force
                        break
                    }
                }
            }
        }
    }
}

function Compress-BackupFolder {
    param (
        [string]$BackupPath = "C:\backup",
        [string]$ZipPath = "C:\backup.zip"
    )

    if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }
    if (Test-Path $BackupPath) {
        Compress-Archive -Path "$BackupPath\*" -DestinationPath $ZipPath -Force
        Write-Host "Backup zipped to $ZipPath" -ForegroundColor Green
    } else {
        Write-Warning "Backup folder not found: $BackupPath"
    }
}



function Expand-BackupIfNeeded {
    param (
        [string]$BackupPath = "C:\backup",
        [string]$ZipPath = "C:\backup.zip"
    )

    if (-not (Test-Path $BackupPath) -and (Test-Path $ZipPath)) {
        Expand-Archive -Path $ZipPath -DestinationPath $BackupPath -Force
        Write-Host "Unzipped backup from $ZipPath" -ForegroundColor Green
    }
}


function Restore-FilteredContent {
    param (
        [string]$Key,
        [hashtable]$Item
    )

    $backupPath = "C:\backup\$Key"
    $sourcePath = $Item.Source
    if (-not (Test-Path $backupPath)) {
        Write-Warning "No backup found for $Key"
        return
    }

    $files = Get-ChildItem $backupPath -Recurse -File
    foreach ($file in $files) {
        $relPath = $file.FullName.Substring($backupPath.Length).TrimStart("\\")
        $dest = Join-Path $sourcePath $relPath
        New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
        Move-Item -Path $file.FullName -Destination $dest -Force
    }
}

function Install-Packages {
    param (
        [string[]]$Ids
    )

    foreach ($id in $Ids) {
        Write-Host "Installing: $id" -ForegroundColor Cyan
        Start-Process "winget" -ArgumentList @("install", "--id", $id, "--accept-source-agreements", "--accept-package-agreements", "-e") -Wait -NoNewWindow
    }
}

# Main Menu Loop

$running = $true
while ($running) {
    $action = Show-SingleSelectMenu -Items @("Backup", "Restore", "Zip Backup Folder", "Install Packages", "Exit") -Prompt "======= Backup Manager ======="


    switch ($action) {
        "Backup" {
            $targets = Show-MultiSelectMenu -Items $BackupItems.Keys -Prompt "Select items to backup"
            if (-not $targets -or $targets.Count -eq 0) { continue }

            foreach ($key in $targets) {
                $item = $BackupItems[$key]
                $dest = "C:\backup\$key"
                if ($dest.StartsWith("C:\backup\", [System.StringComparison]::InvariantCultureIgnoreCase)) {
                    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force -ErrorAction SilentlyContinue }
                    New-Item -ItemType Directory -Path $dest -Force | Out-Null
                    try {
                        $filterType = $item.Filter.Type
                        $paths = $item.Filter.Paths
                        $files = Get-ChildItem -Path $item.Source -Recurse -Force -File -ErrorAction SilentlyContinue
                        foreach ($file in $files) {
                            $relPath = $file.FullName.Substring($item.Source.Length).TrimStart("\")
                            $include = switch ($filterType) {
                                "Whitelist" { $paths -contains $relPath.Split('\')[0] -or $paths -contains $relPath }
                                "Blacklist" { -not ($paths -contains $relPath.Split('\')[0] -or $paths -contains $relPath) }
                                "Regex" { $paths | Where-Object { $relPath -match $_ } }
                            }
                            if ($include) {
                                $destPath = Join-Path $dest $relPath
                                New-Item -ItemType Directory -Path (Split-Path $destPath) -Force | Out-Null
                                try {
                                    Copy-Item -Path $file.FullName -Destination $destPath -Force -ErrorAction Stop
                                } catch {
                                    try {
                                        $stream = [System.IO.File]::Open($file.FullName, 'Open', 'Read', 'ReadWrite')
                                        $fs = New-Object System.IO.FileStream($destPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
                                        $stream.CopyTo($fs)
                                        $fs.Close()
                                        $stream.Close()
                                    } catch {
                                        Write-Warning "Skipped locked file: $($file.FullName)"
                                    }
                                }
                            }
                        }
                        Write-Host "Backed up: $key -> $dest"
                    } catch {
                        Write-Warning "Failed to backup $key : $_"
                    }
                } else {
                    Write-Warning "Invalid destination path: $dest"
                }
            }
            Pause
        }
        "Restore" {
            Expand-BackupIfNeeded

            $existingBackups = Get-ChildItem -Path "C:\backup" -Directory -Force -ErrorAction SilentlyContinue |
            Where-Object { $BackupItems.ContainsKey($_.Name) } |
            Select-Object -ExpandProperty Name

            if (-not $existingBackups) {
                Write-Host "No backups found in C:\backup" -ForegroundColor Red
                Pause
                continue
            }

            $keys = Show-MultiSelectMenu -Items $existingBackups -Prompt "Select items to restore"
            if (-not $keys -or $keys.Count -eq 0) { continue }
            foreach ($key in $keys) {
                Restore-FilteredContent -Key $key -Item $BackupItems[$key]
                Write-Host "Restored: $key"
            }
            Pause
        }
        "Install Packages" {

            $toInstall = Show-MultiSelectHierarchicalMenu -Items $Packages -Prompt "Select package groups to install"

            if ($toInstall.Count -eq 0) {
                Write-Host "No packages selected." -ForegroundColor Red
                Pause
                continue
            }

            Clear-Host
            Write-Host "Install the following packages? (Y/n)" -ForegroundColor Cyan
            Write-Host ""

            foreach ($group in $Packages.Keys) {
                if (-not $toInstall.ContainsKey($group)) { continue }

                $capitalized = ($group.Substring(0, 1).ToUpper()) + $group.Substring(1)
                Write-Host "${capitalized}:" -ForegroundColor Yellow
                foreach ($pkg in $toInstall[$group]) {
                    Write-Host "$pkg" -ForegroundColor Gray
                }
                Write-Host ""
            }

            Write-Host "Confirm (Y/n) (Enter/Esc)..."
            $confirmed = Show-YesNoPrompt 
            if ($confirmed) {
                $flatList = @()
                foreach ($groupList in $toInstall.Values) {
                    $flatList += $groupList
                }
                Install-Packages -Ids $flatList
            } else {
                Write-Host "Installation cancelled."
            }

            Pause
        }
        "Zip Backup Folder" {
            Compress-BackupFolder

            Pause
        }
        "Exit" {
            $running = $false
            break
        }
    }
}

