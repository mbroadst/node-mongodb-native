# NOTE: This doesn't _quite_ work, it will generate it to something like:
#       ./src/cmap/grpc/generated/src/cmap/grpc. Also, the generated code still
#       requires the 'grpc' module, but we're on '@grpc-js/grpc' now.

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"
OUT_DIR="./src/cmap/grpc/generated"

npx grpc_tools_node_protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --plugin="protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="service=grpc-node:${OUT_DIR}" \
    --grpc_out="${OUT_DIR}" \
    ./src/cmap/grpc/mongodb.proto
