#!/bin/bash

kubectl delete secret redis-secret
kubectl create secret generic redis-secret \
  --from-literal=PASSWORD="@kraikub.redis" \

kubectl apply -f k8s/redis/deployment.yaml
kubectl apply -f k8s/redis/service.yaml