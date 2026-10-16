# Unified Reverse Proxy

FROM envoyproxy/envoy:v1.33.0

COPY .envoy/envoy.yml /etc/envoy/envoy.yaml

EXPOSE 8090

CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy/envoy.yaml"]
