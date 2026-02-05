#!/bin/sh

mvn clean compile

if [ $? -ne 0 ]; then
  cd ..
  exit 1
fi

mvn spring-boot:run