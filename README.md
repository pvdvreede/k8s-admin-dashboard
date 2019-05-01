# Kubernetes Admin Dashboard

This is an alternative to the official dashboard. The official dashboard's progress seems to have slowed down due to Angular migrations, it also does not expose certain functionality around some adminitrator actions like draining a Node.

This project is an experiment to see if we can replicate and then improve on the functionality of the current dashboard by utilising react-admin (https://marmelab.com/react-admin/) to handle most of the UI work for us.

## Initial goal

The initial goal is to be able to list, filter and show Nodes, with admin actions for cordoning, uncordoning and draining Nodes.

## Architecture

The idea here is to have an openresty/nginx server running in cluster as a Deployment that will serve the static assets for react-admin as well as proxy any requests from `/api` or `/apis` through to the incluster Kubernetes API server.

This means the api requests will not require CORs but we do not need to write any backend API code - it is just forwarded through to the Kubernetes API.

For Authentication, the proposal is to also run keycloak-gatekeeper (https://github.com/keycloak/keycloak-gatekeeper) in the same pod as the app, and have authentication delegate through OIDC that the Kubernetes API server trusts. Then the browser will send through the keycloak cookie which is tied to an OIDC JWT token tied to the user of the dashboard. This way we do not need to write any AuthN/Z code, and any requests made are limited to the access of the user of the dashboard, and will expire as per the OIDC setup.
