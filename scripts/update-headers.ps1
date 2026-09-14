$rootHeader = @'
  <header class="site-header">
    <h1 class="logo">chantal's closet</h1>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="clothes.html">clothes</a></li>
        <li><a href="buy.html" class="buy-link">buy</a></li>
        <li><a href="account.html" class="account-link">account</a></li>
      </ul>
    </nav>
  </header>
'@

$productHeader = @'
  <header class="site-header">
    <h1 class="logo">chantal's closet</h1>

    <nav class="site-nav" aria-label="Main navigation">
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../contact.html">Contact</a></li>
        <li><a href="../clothes.html">clothes</a></li>
        <li><a href="../buy.html" class="buy-link">buy</a></li>
        <li><a href="../account.html" class="account-link">account</a></li>
      </ul>
    </nav>
  </header>
'@

$headerPattern = '(?s)  <header class="header">.*?</header>'

$rootFiles = @(
    "index.html", "home.html", "about.html", "contact.html",
    "clothes.html", "buy.html", "account.html"
)

foreach ($file in $rootFiles) {
    $path = Join-Path (Join-Path $PSScriptRoot "..") $file
    $content = Get-Content $path -Raw
    $updated = [regex]::Replace($content, $headerPattern, $rootHeader)
    Set-Content $path $updated -NoNewline -Encoding UTF8
}

$productFiles = Get-ChildItem (Join-Path $PSScriptRoot "..\products") -Filter *.html
foreach ($file in $productFiles) {
    $content = Get-Content $file.FullName -Raw
    $updated = [regex]::Replace($content, $headerPattern, $productHeader)
    Set-Content $file.FullName $updated -NoNewline -Encoding UTF8
}

Write-Output "Updated headers in root and product pages."
