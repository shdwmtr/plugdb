#!/bin/bash

parse_plugin() {
    local plugins_dir=$1
    local submodule=$2
    local submodule_path="$plugins_dir/$submodule"
    local plugin_name commit_id
    
    plugin_name=$(git -C "$submodule_path" rev-list --max-parents=0 HEAD 2>/dev/null | tr -d '\n')
    commit_id=$(git -C "$submodule_path" rev-parse HEAD 2>/dev/null | tr -d '\n')

    echo "{\"id\": \"$plugin_name\", \"commitId\": \"$commit_id\"}"
}

plugins_dir="$(pwd)/plugins"
plugin_ids=()

if [[ -d "$plugins_dir" ]]; then
    while IFS= read -r submodule; do
        parse_plugin "$plugins_dir" "$submodule"
    done < <(ls "$plugins_dir")
fi | jq -s '.' > metadata.json
