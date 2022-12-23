# Envoy proxy for gRPC.

FROM envoyproxy/envoy-alpine:v1.21.6

COPY .envoy/envoy.yml /etc/envoy/envoy.yaml

EXPOSE 8090

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml
