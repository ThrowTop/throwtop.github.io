# build_routes.ps1
param([string]$Manifest = "routes.json")
$ErrorActionPreference = "Stop"

if (-not (Test-Path $Manifest)) { Write-Host "No routes.json; skipping."; exit 0 }

$routes = Get-Content $Manifest -Raw | ConvertFrom-Json

if (-not (Test-Path ".nojekyll")) { New-Item -ItemType File -Name ".nojekyll" | Out-Null }

foreach ($name in $routes.PSObject.Properties.Name) {
    $target = $routes.$name

    if ($target -match '^https?://') {
        $content = (Invoke-WebRequest -Uri $target -UseBasicParsing -MaximumRedirection 5).Content
    } else {
        if (-not (Test-Path $target)) { throw "Missing local source: $target" }
        $content = Get-Content $target -Raw -Encoding UTF8
    }

    # Write to repo root as an extensionless file (e.g., ./backup)
    $outPath = Join-Path "." $name
    Set-Content -Path $outPath -Value $content -NoNewline -Encoding UTF8
    Write-Host "Wrote route '$name' from '$target'"
}
