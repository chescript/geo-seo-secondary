@echo off
echo ================================================
echo FireGEO Project Cleanup Script
echo Removing unused directories and files...
echo ================================================
echo.

REM Remove old Firecrawl landing page (entire directory)
echo [1/6] Removing ai-ready-website directory...
if exist "ai-ready-website" (
    rmdir /s /q "ai-ready-website"
    echo ✓ Removed ai-ready-website
) else (
    echo   Already removed
)

REM Remove unused Firecrawl components
echo [2/6] Removing components/shared...
if exist "components\shared" (
    rmdir /s /q "components\shared"
    echo ✓ Removed components/shared
) else (
    echo   Already removed
)

echo [3/6] Removing components/app...
if exist "components\app" (
    rmdir /s /q "components\app"
    echo ✓ Removed components/app
) else (
    echo   Already removed
)

REM Remove unused Firecrawl styles
echo [4/6] Removing styles directory...
if exist "styles" (
    rmdir /s /q "styles"
    echo ✓ Removed styles directory
) else (
    echo   Already removed
)

REM Remove backup config files
echo [5/6] Removing backup config files...
if exist "package-firegeo.json" del /q "package-firegeo.json"
if exist "tsconfig-firegeo.json" del /q "tsconfig-firegeo.json"
if exist "next.config-firegeo.ts" del /q "next.config-firegeo.ts"
if exist ".env-firegeo.example" del /q ".env-firegeo.example"
if exist "app\page-firegeo-original.tsx" del /q "app\page-firegeo-original.tsx"
echo ✓ Removed backup files

REM Remove utils directory if it only has Firecrawl utils
echo [6/6] Checking utils directory...
if exist "utils" (
    echo   Note: utils directory kept (may have useful functions)
    echo   You can manually remove if not needed
)

echo.
echo ================================================
echo Cleanup Complete!
echo ================================================
echo.
echo Removed:
echo   - ai-ready-website/       (old Firecrawl landing)
echo   - components/shared/       (unused Firecrawl components)
echo   - components/app/          (unused Firecrawl components)
echo   - styles/                  (unused Firecrawl CSS)
echo   - Backup config files
echo.
echo Your project should now be cleaner and lighter!
echo Run "npm run dev" to test everything still works.
echo.
pause
