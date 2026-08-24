$replacements = @{
    [char]0xE2 + [char]0x84 + [char]0xA2 | ForEach-Object { $_ } = $null
}

$files = Get-ChildItem -Path (Join-Path $PSScriptRoot "..") -Filter *.html -Recurse

foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $text = [System.Text.Encoding]::UTF8.GetString($bytes)

    $updated = $text
    $updated = $updated.Replace([string][char]0x00E2 + [char]0x99 + [char]0xA1, "♡")
    $updated = $updated.Replace([string][char]0x00E2 + [char]0x80 + [char]0x94, "—")
    $updated = $updated.Replace([string][char]0x00E2 + [char]0x82 + [char]0xB1, "₱")

    if ($updated -ne $text) {
        [System.IO.File]::WriteAllText($file.FullName, $updated, [System.Text.UTF8Encoding]::new($false))
    }
}

Write-Output "Encoding fix complete."
