#!/bin/bash

set -euo pipefail

source tools/shell/utils/print-utils.sh ''

source tools/shell/utils/config.sh

# --------------------------------------------------------
# Usage:
#   bash ./tools/shell/diagrams.sh  SOURCE_DIR  TARGET_DIR
#
# Example:
#   bash ./tools/shell/diagrams.sh ./diagrams ./html
# --------------------------------------------------------

print_info_title "<< Generating diagrams >>"
print_name_and_value "dist" "./dist/diagrams"
print_gap

SRC_PATH="${1:-./tools/diagrams}"
DIST_PATH="${2:-./dist/diagrams}"

mkdir -p "$DIST_PATH"

MERMAID_SCRIPTS=$(cat <<'EOF'
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});</script>
EOF
)

# iterate over all *.mmd files in the source directory
shopt -s nullglob
for SRC_FILE in "$SRC_PATH"/*.mmd; do
    # strip directory and extension
    FILE_NAME=$(basename "$SRC_FILE" .mmd)
    DIST_FILE="$DIST_PATH/${FILE_NAME}.html"

    # read the mermaid source
    DIAGRAM_SOURCE=$(<"$SRC_FILE")

    # write a minimal HTML wrapper
    cat >"$DIST_FILE" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${FILE_NAME}</title>
${MERMAID_SCRIPTS}
</head>
<body>
<div class="mermaid">
${DIAGRAM_SOURCE}
</div>
</body>
</html>
HTML

    echo "Generated $DIST_FILE"
done
shopt -u nullglob
