# Unified Reverse Proxy

FROM envoyproxy/envoy:v1.40.1

COPY .envoy/envoy.yml /etc/envoy/envoy.yaml

EXPOSE 8090

CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy/envoy.yaml"]
