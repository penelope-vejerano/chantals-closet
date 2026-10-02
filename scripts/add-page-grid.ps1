$utf8 = New-Object System.Text.UTF8Encoding $false
$root = Split-Path $PSScriptRoot -Parent

function Get-Sidebar([string]$prefix) {
    @"
  <aside class="site-sidebar" aria-label="Shop categories">
    <h2>browse</h2>
    <ul>
      <li><a href="${prefix}clothes.html#tops">tops</a></li>
      <li><a href="${prefix}clothes.html#bottoms">bottoms</a></li>
      <li><a href="${prefix}clothes.html#bags">bags</a></li>
      <li><a href="${prefix}clothes.html#shoes">shoes</a></li>
    </ul>
    <p>handpicked thrifted finds, ready for a new story.</p>
  </aside>

"@
}

function Update-Page([string]$path, [string]$prefix) {
    $content = [System.IO.File]::ReadAllText($path)
    if ($content -match 'class="page"') {
        Write-Output "skip $path"
        return
    }

    $pattern = '(?s)(<header class="site-header">.*?</main>\s*)(<footer class="site-footer">.*?</footer>)'
    $sidebar = Get-Sidebar $prefix
    $updated = [regex]::Replace($content, $pattern, {
        param($m)
        "  <div class=`"page`">`r`n" + $m.Groups[1].Value + $sidebar + $m.Groups[2].Value + "`r`n  </div>"
    })

    if ($updated -eq $content) {
        Write-Output "NO MATCH $path"
        return
    }

    [System.IO.File]::WriteAllText($path, $updated, $utf8)
    Write-Output "updated $path"
}

$rootFiles = @(
    "index.html", "home.html", "about.html", "contact.html",
    "clothes.html", "buy.html", "account.html"
)

foreach ($file in $rootFiles) {
    Update-Page (Join-Path $root $file) ""
}

Get-ChildItem (Join-Path $root "products") -Filter *.html | ForEach-Object {
    Update-Page $_.FullName "../"
}
