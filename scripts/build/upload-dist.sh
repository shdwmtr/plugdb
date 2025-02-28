#!/bin/bash
echo "::group::Database"

PLUGIN_NAME=$1

cd dist

echo "Building plugin archive..."
zip -r "$PLUGIN_NAME.zip" .

echo "Successfully built plugin."

id=$(jq -r '.id' "$PLUGIN_NAME"/metadata.json) || { echo "::error::Failed to extract id from $PLUGIN_NAME/metadata.json"; exit 1; }

echo "Uploading plugin to database with id $id"
gsutil cp "$PLUGIN_NAME.zip" gs://millennium-d9ce0.appspot.com/plugins/"$id.zip"
echo "Successfully uploaded plugin to database."
rm "$PLUGIN_NAME.zip"

echo "::endgroup::"
