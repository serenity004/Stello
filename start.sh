#!/bin/bash

echo "Stello Business Management System"
echo "================================"
echo ""
echo "Choose an application to start:"
echo "1. POS (Point of Sale)"
echo "2. Manager (Business Dashboard)"
echo "3. Install dependencies for both"
echo "4. Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "Starting POS application..."
        cd pos
        npm start
        ;;
    2)
        echo "Starting Manager application..."
        cd manager
        npm start
        ;;
    3)
        echo "Installing dependencies for both applications..."
        echo "Installing POS dependencies..."
        cd pos
        npm install
        echo "Installing Manager dependencies..."
        cd ../manager
        npm install
        echo "Dependencies installed successfully!"
        ;;
    4)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice. Please try again."
        ;;
esac 