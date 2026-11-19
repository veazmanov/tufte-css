#!/usr/bin/env bash
# Release to tufte.vjbe.net (run with `npm run release`, which builds tufte.min.css first).
#
# Lays out dist/ as
#   /                 the demo page and the latest release
#   /<major>/         the latest release of that major version, e.g. /2/tufte.css  <- link to this
#   /<version>/       a fixed copy that never changes, e.g. /2.0.0/tufte.css
# then rsyncs it with `deploy dist tufte` and tags the commit v<version>.
set -euo pipefail
cd "$(dirname "$0")"

version=$(node -p "require('./package.json').version")
major=${version%%.*}

if [ -n "$(git status --porcelain)" ]; then
    echo "Uncommitted changes (tufte.min.css included); commit them first." >&2
    exit 1
fi
if git rev-parse -q --verify "refs/tags/v$version" >/dev/null; then
    echo "v$version is already released; bump the version in package.json." >&2
    exit 1
fi

rm -rf dist
mkdir -p "dist/$version" "dist/$major"
files=(tufte.css tufte.min.css theme.js et-book LICENSE)
cp -R "${files[@]}" "dist/$version/"
cp -R "${files[@]}" "dist/$major/"
cp -R "${files[@]}" index.html img dist/

deploy dist tufte

git tag -a "v$version" -m "v$version"
git push origin "v$version"
echo "Released v$version: https://tufte.vjbe.net/$major/tufte.css (fixed: /$version/)"
