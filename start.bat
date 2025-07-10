@echo off
echo Stello Business Management System
echo ================================
echo.
echo Choose an application to start:
echo 1. POS (Point of Sale)
echo 2. Manager (Business Dashboard)
echo 3. Install dependencies for both
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Starting POS application...
    cd pos
    npm start
) else if "%choice%"=="2" (
    echo Starting Manager application...
    cd manager
    npm start
) else if "%choice%"=="3" (
    echo Installing dependencies for both applications...
    echo Installing POS dependencies...
    cd pos
    npm install
    echo Installing Manager dependencies...
    cd ../manager
    npm install
    echo Dependencies installed successfully!
    pause
) else if "%choice%"=="4" (
    echo Goodbye!
    exit
) else (
    echo Invalid choice. Please try again.
    pause
) 