# Generate Swagger and TypeScript

This tool uses several other tools to generate both Swagger JSON and TypeScipt classes from an exposed Swagger Endpoint.  The Swagger Endpoint must be running (e.g. in a Spring Boot applicaiton) prior to generation.

## Version
This tool only uses Node.js.  Tested version is v24.13.0

## 3rd Party Tools
This application uses the swagger-typescript-api library.  It is installed via the node-web-server's package.json

## Install
The main install is for the Node.js server:
```
% cd node-web-server
% npm install
```

To optionally install and run the example Spring Boot server:
```
% cd example-server
% ./build_run.sh
```

## Swagger Endpoint
There are many ways to expose a Swagger Endpoint however, the easiest for Spring Boot (or other servers) is to add the maven dependency:

```
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

Using this, the Swagger endpoint can be reached via:
```
- Raw JSON: http://localhost/v3/api-docs
- HTML: http://localhost/swagger-ui/index.html#/
```

## Run
The following will run the Node.js server on http://localhost:3000
```
% cd node-web-server
% node index.js
```
Then point a web browser to http://localhost:3000/

There are several fields on the UI that control various aspects of generation:
1) Swagger File Name: The name of the generated Swagger file.
2) TypeScript File Name: the name of the gnerated TypeScript file.
3) Server URL: The URL of the server that is exposing the Swagger endpoint.

When the ```Generate``` button is clicked it will display the Swagger JSON in the UI and will download the Swagger and TypeScript files in a zip file.

## Example
There is an example Spring Boot server that exposes the Swagger Endpoint.

