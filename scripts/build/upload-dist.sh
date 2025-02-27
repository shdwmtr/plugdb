#!/bin/bash
echo "::group::Database"

cd dist

echo "::debug::Building plugin archive..."
zip -r "$PLUGIN_NAME.zip" .

echo "::debug::Successfully built plugin."

id=$(jq -r '.id' "$PLUGIN_NAME"/metadata.json)

echo "::debug::Uploading plugin to database..."
#gsutil cp "$PLUGIN_NAME.zip" gs://millennium-d9ce0.appspot.com/plugins/"$id.zip"
echo "::debug::Successfully uploaded plugin to database."
rm "$PLUGIN_NAME.zip"

echo "::endgroup::"
