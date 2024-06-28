#!/bin/bash

quasar build -m pwa

rsync -aWv --delete dist/pwa/ server:/var/www/nboughton.uk/public/apps/break-sheet/
